import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Camera, Upload, X, Check, ScanLine, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Transaction,
  TransactionType,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  DEFAULT_PAYMENT_METHODS,
} from "@/client/lib/finance-data";
import { useFinance } from "@/client/hooks/use-finance";
import { motion, AnimatePresence } from "framer-motion";
import { scanReceipt } from "@/client/lib/receipt-scanner";

interface ReceiptScannerProps {
  onAdd: (transactions: Omit<Transaction, "id">[]) => void;
}

type ScanStep = "idle" | "source" | "camera" | "preview" | "processing" | "confirm";

/** Parser robusto para valores digitados ou extraídos no formato monetário brasileiro */
function parseMoneyInput(val: string): number {
  if (!val) return 0;
  const cleaned = val.trim().replace(/[^\d.,]/g, "");
  if (!cleaned) return 0;

  // Se tiver vírgula (ex: 1.250,50 ou 150,00)
  if (cleaned.includes(",")) {
    const withoutDots = cleaned.replace(/\./g, "").replace(",", ".");
    const num = parseFloat(withoutDots);
    return isNaN(num) ? 0 : num;
  }

  // Se tiver apenas ponto
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/** Cria uma data ISO segura sem sofrer deslocamento de fuso horário / timezone */
function buildSafeIsoDate(dateStr: string): string {
  if (!dateStr) return new Date().toISOString();
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const localDate = new Date(y, m - 1, d, 12, 0, 0);
    return localDate.toISOString();
  }
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

export function ReceiptScanner({ onAdd }: ReceiptScannerProps) {
  const { accounts, customCategories } = useFinance();
  const [step, setStep] = useState<ScanStep>("idle");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [showProcessedView, setShowProcessedView] = useState(true);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState("Preparando...");
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Form states
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Outros");
  const [paymentMethod, setPaymentMethod] = useState("PIX");
  const [accountId, setAccountId] = useState<string>("");
  const [txType, setTxType] = useState<TransactionType>("expense");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Lista dinâmica de categorias com base nas preferências e tipo (receita/despesa)
  const currentCategories = useMemo(() => {
    const base = txType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    const custom = customCategories.filter((c) => c.type === txType).map((c) => c.name);
    return Array.from(new Set([...base, ...custom, "Outros"]));
  }, [txType, customCategories]);

  // Lista dinâmica de formas de pagamento e contas
  const paymentMethodsList = useMemo(() => {
    return Array.from(new Set([...DEFAULT_PAYMENT_METHODS, "TED", "DOC", "Boleto", "Outros"]));
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    setStep("camera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setCameraError("Não foi possível acessar a câmera. Verifique as permissões do navegador.");
    }
  }, []);

  const captureFromCamera = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setCapturedImage(dataUrl);
    setProcessedImage(null);
    stopCamera();
    setStep("preview");
  }, [stopCamera]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCapturedImage(ev.target?.result as string);
      setProcessedImage(null);
      setStep("preview");
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const runOCR = useCallback(async (imageData: string) => {
    setStep("processing");
    setOcrProgress(0);
    setProcessingStage("Otimizando em preto e branco e aumentando nitidez...");

    try {
      const result = await scanReceipt(imageData, {
        onProgress: (p) => setOcrProgress(p),
        onStageChange: (stage) => setProcessingStage(stage),
      });

      console.log("[ReceiptScanner Result]:", result);

      if (result.preprocessedImage) {
        setProcessedImage(result.preprocessedImage);
        setShowProcessedView(true);
      }

      setAmount(result.formattedAmount);
      setDate(result.date || new Date().toISOString().split("T")[0]);
      setDescription(result.description || "Comprovante escaneado");
      setPaymentMethod(result.paymentMethod || "PIX");
      setTxType(result.type || "expense");
      setCategory("Outros");
      setStep("confirm");
    } catch (err) {
      console.error("[ReceiptScanner] OCR error:", err);
      toast.error("Não foi possível processar o comprovante. Tente com uma imagem mais nítida.");
      setStep("preview");
    }
  }, []);

  const handleSave = () => {
    const numericAmount = parseMoneyInput(amount);
    if (!numericAmount || numericAmount <= 0) {
      toast.error("Informe um valor numérico válido maior que zero.");
      return;
    }

    const isoDate = buildSafeIsoDate(date);
    const finalDescription = description.trim() || "Comprovante digitalizado";

    const newTransaction: Omit<Transaction, "id"> = {
      description: finalDescription,
      amount: numericAmount,
      type: txType,
      category: category || "Outros",
      paymentMethod: paymentMethod || "PIX",
      date: isoDate,
      ...(accountId ? { accountId } : {}),
    };

    console.log("[ReceiptScanner] Salvando transação:", newTransaction);
    onAdd([newTransaction]);

    toast.success(
      `Transação de R$ ${numericAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} salva com sucesso!`
    );

    handleClose();
  };

  const handleClose = () => {
    stopCamera();
    setStep("idle");
    setCapturedImage(null);
    setOcrProgress(0);
    setCameraError(null);
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setDescription("");
    setCategory("Outros");
    setPaymentMethod("PIX");
    setAccountId("");
    setTxType("expense");
    setProcessingStage("Preparando...");
  };

  useEffect(() => () => stopCamera(), [stopCamera]);

  const isOpen = step !== "idle";

  return (
    <>
      <Button
        onClick={() => setStep("source")}
        className="gap-2 h-9 sm:h-10 font-semibold shadow-md border-0 relative overflow-hidden group"
        style={{
          background: "linear-gradient(135deg, #1a1b23 0%, #2a2b38 100%)",
          border: "1px solid #3d3f52",
          color: "#e2e3e9",
        }}
      >
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg, #cc9166 0%, #e8a87c 100%)" }}
        />
        <Camera className="h-4 w-4 relative z-10 group-hover:text-black transition-colors" />
        <span className="hidden sm:inline relative z-10 group-hover:text-black transition-colors">
          Escanear
        </span>
      </Button>

      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent
          className="max-w-md w-full p-0 overflow-hidden"
          style={{ background: "#0c0d10", border: "1px solid #1c1d26" }}
        >
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle className="flex items-center gap-2 text-white font-serif-display">
              <div
                className="p-1.5 rounded-lg"
                style={{ background: "#1a1b23", border: "1px solid #2e3038" }}
              >
                <ScanLine className="h-4 w-4 text-[#cc9166]" />
              </div>
              Escanear Comprovante
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 space-y-4">
            <AnimatePresence mode="wait">
              {step === "source" && (
                <motion.div
                  key="source"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-3"
                >
                  <p className="text-sm text-[#9194a1]">Escolha como capturar o comprovante:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={startCamera}
                      className="flex flex-col items-center gap-3 p-5 rounded-xl border transition-all duration-200 hover:border-[#cc9166]/60 hover:bg-[#1a1b23] group"
                      style={{ background: "#0f1015", border: "1px solid #1c1d26" }}
                    >
                      <div
                        className="p-3 rounded-full group-hover:bg-[#cc9166]/10 transition-colors"
                        style={{ background: "#1a1b23" }}
                      >
                        <Camera className="h-6 w-6 text-[#cc9166]" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-white">Câmera</div>
                        <div className="text-[11px] text-[#9194a1] mt-0.5">Fotografar agora</div>
                      </div>
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center gap-3 p-5 rounded-xl border transition-all duration-200 hover:border-[#cc9166]/60 hover:bg-[#1a1b23] group"
                      style={{ background: "#0f1015", border: "1px solid #1c1d26" }}
                    >
                      <div
                        className="p-3 rounded-full group-hover:bg-[#cc9166]/10 transition-colors"
                        style={{ background: "#1a1b23" }}
                      >
                        <Upload className="h-6 w-6 text-[#cc9166]" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-white">Galeria</div>
                        <div className="text-[11px] text-[#9194a1] mt-0.5">Enviar imagem</div>
                      </div>
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </motion.div>
              )}

              {step === "camera" && (
                <motion.div
                  key="camera"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {cameraError ? (
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                      <AlertCircle className="h-10 w-10 text-rose-400" />
                      <p className="text-sm text-rose-300">{cameraError}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setStep("source")}
                        className="border-[#2e3038] text-[#e2e3e9] bg-transparent hover:bg-[#1a1b23]"
                      >
                        Voltar
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div
                        className="relative rounded-xl overflow-hidden"
                        style={{ background: "#000" }}
                      >
                        <video
                          ref={videoRef}
                          className="w-full object-cover"
                          style={{ maxHeight: "280px" }}
                          playsInline
                          muted
                        />
                        <div className="absolute inset-0 pointer-events-none">
                          <div
                            className="absolute inset-6 rounded-lg"
                            style={{ border: "2px solid rgba(204,145,102,0.7)" }}
                          />
                          <motion.div
                            className="absolute left-6 right-6 h-0.5 bg-[#cc9166]/60"
                            animate={{ top: ["25%", "75%", "25%"] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </div>
                      </div>
                      <canvas ref={canvasRef} className="hidden" />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 border-[#2e3038] text-[#9194a1] bg-transparent hover:bg-[#1a1b23]"
                          onClick={() => {
                            stopCamera();
                            setStep("source");
                          }}
                        >
                          <X className="h-4 w-4 mr-1.5" /> Cancelar
                        </Button>
                        <Button
                          className="flex-1 font-semibold"
                          style={{
                            background: "linear-gradient(135deg, #cc9166, #e8a87c)",
                            color: "#000",
                          }}
                          onClick={captureFromCamera}
                        >
                          <Camera className="h-4 w-4 mr-1.5" /> Capturar
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {step === "preview" && capturedImage && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-3"
                >
                  <div
                    className="relative rounded-xl overflow-hidden border"
                    style={{ borderColor: "#1c1d26" }}
                  >
                    <img
                      src={capturedImage}
                      alt="Comprovante capturado"
                      className="w-full object-contain max-h-[240px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-[#2e3038] text-[#9194a1] bg-transparent hover:bg-[#1a1b23] gap-1.5"
                      onClick={() => {
                        setCapturedImage(null);
                        setStep("source");
                      }}
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Nova foto
                    </Button>
                    <Button
                      className="flex-1 font-semibold gap-1.5"
                      style={{
                        background: "linear-gradient(135deg, #cc9166, #e8a87c)",
                        color: "#000",
                      }}
                      onClick={() => runOCR(capturedImage)}
                    >
                      <ScanLine className="h-4 w-4" /> Processar
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 flex flex-col items-center gap-5"
                >
                  <div className="relative">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #1a1b23, #2a2b38)",
                        border: "1px solid #2e3038",
                      }}
                    >
                      <ScanLine className="h-8 w-8 text-[#cc9166]" />
                    </div>
                    <motion.div
                      className="absolute -inset-1 rounded-full border-2 border-[#cc9166]/30"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                  </div>
                  <div className="text-center space-y-1.5 w-full">
                    <p className="text-sm font-semibold text-white">Processando comprovante...</p>
                    <motion.p
                      key={processingStage}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-[#cc9166] font-mono"
                    >
                      {processingStage}
                    </motion.p>
                    <div className="mx-auto mt-3 w-full max-w-[200px]">
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: "#1a1b23" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #cc9166, #e8a87c)" }}
                          animate={{ width: `${ocrProgress}%` }}
                          transition={{ ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-[10px] text-[#9194a1] font-mono mt-1.5 text-right">
                        {ocrProgress > 0 ? `${ocrProgress}%` : "—"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "confirm" && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-4"
                >
                  <div
                    className="flex items-center gap-2 p-3 rounded-xl"
                    style={{ background: "#0f1015", border: "1px solid #1c1d26" }}
                  >
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <p className="text-xs text-[#9194a1]">
                      Dados extraídos com sucesso! Revise e confirme antes de salvar.
                    </p>
                  </div>

                  {/* Preview da foto analisada (Preto e Branco com alta nitidez) */}
                  {(processedImage || capturedImage) && (
                    <div
                      className="rounded-xl overflow-hidden border relative group"
                      style={{ background: "#050608", borderColor: "#1c1d26" }}
                    >
                      <img
                        src={showProcessedView && processedImage ? processedImage : capturedImage!}
                        alt="Comprovante processado"
                        className="w-full object-contain max-h-[160px] bg-black/40"
                      />
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#cc9166]">
                        <ScanLine className="h-3 w-3" />
                        {showProcessedView && processedImage ? "P&B + Alta Nitidez" : "Original"}
                      </div>
                      {processedImage && (
                        <button
                          type="button"
                          onClick={() => setShowProcessedView(!showProcessedView)}
                          className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/10 text-[10px] text-white/80 transition-colors"
                        >
                          {showProcessedView ? "Ver original" : "Ver P&B nítido"}
                        </button>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    {(["expense", "income"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTxType(t)}
                        className={`py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                          txType === t
                            ? t === "expense"
                              ? "bg-rose-950/60 border-rose-500/50 text-rose-300"
                              : "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                            : "border-[#1c1d26] text-[#9194a1] bg-transparent hover:border-[#2e3038]"
                        }`}
                      >
                        {t === "expense" ? "Despesa" : "Receita"}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-[#9194a1]">Valor (R$)</Label>
                        <Input
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0,00"
                          className="bg-[#0f1015] border-[#1c1d26] text-white placeholder-[#4a4c5e] focus:border-[#cc9166] h-9"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-[#9194a1]">Data</Label>
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="bg-[#0f1015] border-[#1c1d26] text-white focus:border-[#cc9166] h-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-[#9194a1]">Descrição</Label>
                      <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ex: Pagamento PIX Mercado"
                        className="bg-[#0f1015] border-[#1c1d26] text-white placeholder-[#4a4c5e] focus:border-[#cc9166] h-9"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-[#9194a1]">Categoria</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger className="bg-[#0f1015] border-[#1c1d26] text-white focus:border-[#cc9166] h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0f1015] border-[#1c1d26] max-h-56">
                            {currentCategories.map((c) => (
                              <SelectItem
                                key={c}
                                value={c}
                                className="text-white hover:bg-[#1a1b23] focus:bg-[#1a1b23]"
                              >
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs text-[#9194a1]">Pagamento</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger className="bg-[#0f1015] border-[#1c1d26] text-white focus:border-[#cc9166] h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0f1015] border-[#1c1d26] max-h-56">
                            {paymentMethodsList.map((m) => (
                              <SelectItem
                                key={m}
                                value={m}
                                className="text-white hover:bg-[#1a1b23] focus:bg-[#1a1b23]"
                              >
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {accounts.length > 0 && (
                      <div className="space-y-1.5">
                        <Label className="text-xs text-[#9194a1]">Conta / Cartão (Opcional)</Label>
                        <Select value={accountId || "none"} onValueChange={(v) => setAccountId(v === "none" ? "" : v)}>
                          <SelectTrigger className="bg-[#0f1015] border-[#1c1d26] text-white focus:border-[#cc9166] h-9">
                            <SelectValue placeholder="Nenhuma conta vinculada" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0f1015] border-[#1c1d26] max-h-56">
                            <SelectItem value="none" className="text-[#9194a1] hover:bg-[#1a1b23]">
                              Nenhuma conta vinculada
                            </SelectItem>
                            {accounts.map((acc) => (
                              <SelectItem
                                key={acc.id}
                                value={acc.id}
                                className="text-white hover:bg-[#1a1b23] focus:bg-[#1a1b23]"
                              >
                                {acc.name} ({acc.institution || "Geral"})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-[#2e3038] text-[#9194a1] bg-transparent hover:bg-[#1a1b23]"
                      onClick={() => {
                        setCapturedImage(null);
                        setStep("source");
                      }}
                    >
                      <X className="h-3.5 w-3.5 mr-1.5" /> Cancelar
                    </Button>
                    <Button
                      className="flex-1 font-semibold gap-1.5"
                      style={{
                        background: "linear-gradient(135deg, #cc9166, #e8a87c)",
                        color: "#000",
                      }}
                      onClick={handleSave}
                    >
                      <Check className="h-4 w-4" /> Salvar Transação
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
