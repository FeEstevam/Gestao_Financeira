import { useState, useEffect } from "react";
import {
  CreditCard,
  ChevronLeft,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Info,
  QrCode,
  ArrowRight,
  Sparkles,
  Shield
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/client/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "@/client/components/ui/tilt-card";
import { PLAN_DETAILS } from "./PlanMode";

export default function Payment() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultPlanId = searchParams.get("plan") || "business";

  const initialPlan = PLAN_DETAILS.find(p => p.id === defaultPlanId) || PLAN_DETAILS[1];

  const [method, setMethod] = useState<"card" | "pix">("card");
  const [isLoading, setIsLoading] = useState(false);
  const [activePlan, setActivePlan] = useState(initialPlan);

  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setSearchParams({ plan: activePlan.id });
  }, [activePlan, setSearchParams]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = digitsOnly.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formatted);
    setFormError("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setName(lettersOnly.toUpperCase());
    setFormError("");
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 4);
    let formatted = digitsOnly;
    if (digitsOnly.length > 2) {
      formatted = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
    }
    setExpiry(formatted);
    setFormError("");
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvv(digitsOnly);
    setFormError("");
  };

  const validateCardForm = () => {
    const cleanCard = cardNumber.replace(/\s/g, "");
    const cleanExpiry = expiry.replace("/", "");

    if (cleanCard.length !== 16) return false;
    if (name.trim().length === 0) return false;
    if (cleanExpiry.length !== 4) return false;
    const month = parseInt(cleanExpiry.slice(0, 2), 10);
    if (month < 1 || month > 12) return false;
    if (cvv.length < 3) return false;

    return true;
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (method === "card") {
      if (!validateCardForm()) {
        setFormError("Por favor, preencha todos os campos do cartão corretamente.");
        toast.error("Erro na validação do formulário.");
        return;
      }
    }

    setIsLoading(true);
    setFormError("");

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Custódia de assinatura ativada com sucesso! Bem-vindo ao Vault.");
      navigate("/");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#e8e6e3] font-sans overflow-x-hidden selection:bg-[#cc9166]/30">

      {/* ─── Ambient Glow ─── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#cc9166]/[0.04] blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 lg:py-16 relative z-10">

        {/* Back Link */}
        <Link
          to="/planos"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8a8880] hover:text-[#f5f4f0] transition-colors mb-8 group"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Voltar para Planos do Cofre
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">

          {/* Left Column: Form */}
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="space-y-2 border-b border-[#1c1d22] pb-6">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#cc9166] uppercase">
                <Shield className="w-3.5 h-3.5" />
                <span>Protocolo Seguro de Pagamento</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif-display font-light text-[#f5f4f0] tracking-tight">
                Ativação do Cofre<span className="text-[#cc9166]">.</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#8a8880] font-sans">
                Você está ativando o plano <strong className="text-[#f5f4f0] font-medium">{activePlan.name}</strong> ({activePlan.price} {activePlan.period}).
              </p>
            </header>

            {/* Plan Switcher Pills */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider">Alterar Nível de Assinatura</p>
              <div className="flex flex-wrap gap-2.5">
                {PLAN_DETAILS.map(plan => (
                  <button
                    key={plan.id}
                    onClick={() => setActivePlan(plan)}
                    className={cn(
                      "px-3.5 py-2 rounded-xl border text-xs font-mono transition-all",
                      activePlan.id === plan.id
                        ? "bg-[#121317] text-[#cc9166] border-[#cc9166]/50 shadow-md ring-1 ring-[#cc9166]/30"
                        : "bg-[#040406] text-[#8a8880] border-[#1c1d22] hover:border-[#2e3038] hover:text-[#f5f4f0]"
                    )}
                  >
                    {plan.name} — {plan.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2.5 pt-2">
              <p className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider">Forma de Liquidação</p>
              <div className="flex gap-3 p-1 rounded-xl bg-[#040406] border border-[#1c1d22] w-fit">
                <button
                  onClick={() => setMethod("card")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all",
                    method === "card"
                      ? "bg-[#ffffff] text-[#08080a] font-medium shadow-sm"
                      : "text-[#8a8880] hover:text-[#f5f4f0]"
                  )}
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  Cartão de Crédito
                </button>
                <button
                  onClick={() => setMethod("pix")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all",
                    method === "pix"
                      ? "bg-[#ffffff] text-[#08080a] font-medium shadow-sm"
                      : "text-[#8a8880] hover:text-[#f5f4f0]"
                  )}
                >
                  <QrCode className="h-3.5 w-3.5" />
                  Pix Instantâneo
                </button>
              </div>
            </div>

            {method === "card" ? (
              <form onSubmit={handlePayment} className="space-y-6 max-w-xl">
                {/* 3D Interactive Card Preview */}
                <div className="w-full max-w-md mx-auto sm:mx-0">
                  <TiltCard
                    tiltLimit={14}
                    scale={1.03}
                    perspective={1200}
                    className="w-full"
                  >
                    <div className="relative h-52 w-full rounded-2xl bg-gradient-to-br from-[#1c1d22] via-[#0d0e12] to-[#040406] p-6 shadow-2xl flex flex-col justify-between border border-[#2e3038] overflow-hidden">
                      {/* Background decorative watermark */}
                      <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-[#cc9166]/[0.06] rounded-full blur-2xl pointer-events-none" />

                      {/* Header of Card */}
                      <div className="flex justify-between items-start relative z-10 [transform:translateZ(25px)]">
                        <div className="h-9 w-12 rounded-lg bg-gradient-to-br from-[#cc9166] via-[#e5b38f] to-[#8c5936] shadow-md border border-[#cc9166]/50 flex items-center justify-center">
                          <div className="w-8 h-5 border border-black/30 rounded-sm grid grid-cols-2 gap-0.5 opacity-60">
                            <div className="border-r border-black/30"></div>
                            <div></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-[#cc9166] tracking-widest uppercase block font-semibold">SLASH VAULT</span>
                          <span className="text-[8px] font-mono text-[#8a8880] tracking-wider uppercase">BLACK TIER</span>
                        </div>
                      </div>

                      {/* Card Number */}
                      <div className="relative z-10 [transform:translateZ(30px)] my-auto">
                        <p className="text-lg sm:text-xl font-mono tracking-[0.22em] text-[#f5f4f0] drop-shadow-md">
                          {cardNumber || "•••• •••• •••• ••••"}
                        </p>
                      </div>

                      {/* Card Footer: Holder Name, Expiry & CVV */}
                      <div className="relative z-10 [transform:translateZ(20px)] flex justify-between items-end border-t border-white/[0.06] pt-3">
                        <div className="space-y-0.5 max-w-[55%]">
                          <p className="text-[8px] font-mono text-[#8a8880] uppercase tracking-wider">Titular do Cartão</p>
                          <p className="text-xs font-medium text-[#f5f4f0] uppercase tracking-wider truncate font-mono">
                            {name || "SEU NOME"}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <div className="space-y-0.5 text-right">
                            <p className="text-[8px] font-mono text-[#8a8880] uppercase tracking-wider">Validade</p>
                            <p className="text-xs font-mono text-[#f5f4f0]">{expiry || "MM/AA"}</p>
                          </div>
                          <div className="space-y-0.5 text-right">
                            <p className="text-[8px] font-mono text-[#8a8880] uppercase tracking-wider">CVV</p>
                            <p className="text-xs font-mono text-[#cc9166]">{cvv ? "•••" : "•••"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="flex justify-between text-[10px] font-mono text-[#8a8880] uppercase tracking-wider">
                      <span>Número do Cartão</span>
                      <span className="lowercase text-[#6b6960]">16 dígitos</span>
                    </label>
                    <Input
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      className="h-11 bg-[#121317] border-[#1c1d22] focus:border-[#cc9166] text-[#f5f4f0] font-mono text-sm rounded-xl"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider">Nome Impresso no Cartão</label>
                    <Input
                      placeholder="NOME COMPLETO"
                      value={name}
                      onChange={handleNameChange}
                      className="h-11 bg-[#121317] border-[#1c1d22] focus:border-[#cc9166] text-[#f5f4f0] text-sm rounded-xl uppercase"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider">Validade (MM/AA)</label>
                    <Input
                      placeholder="MM/AA"
                      value={expiry}
                      onChange={handleExpiryChange}
                      maxLength={5}
                      className="h-11 bg-[#121317] border-[#1c1d22] focus:border-[#cc9166] text-[#f5f4f0] font-mono text-sm rounded-xl text-center"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider">Código de Segurança (CVV)</label>
                    <Input
                      placeholder="000"
                      value={cvv}
                      onChange={handleCvvChange}
                      maxLength={4}
                      type="password"
                      className="h-11 bg-[#121317] border-[#1c1d22] focus:border-[#cc9166] text-[#f5f4f0] font-mono text-sm rounded-xl text-center"
                    />
                  </div>
                </div>

                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2"
                  >
                    <Info className="h-4 w-4 shrink-0" />
                    {formError}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-13 rounded-xl bg-[#ffffff] hover:bg-[#f5f4f0] text-[#08080a] font-medium text-sm shadow-xl transition-all mt-2 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-[#08080a]/20 border-t-[#08080a] rounded-full animate-spin" />
                  ) : (
                    <>
                      Confirmar Assinatura Segura
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="p-8 rounded-2xl bg-[#040406] border border-[#1c1d22] text-center space-y-6 max-w-xl">
                <div className="space-y-1">
                  <h3 className="text-base font-medium text-[#f5f4f0]">Pagamento Instantâneo via Pix</h3>
                  <p className="text-xs text-[#8a8880]">O acesso ao <strong className="text-[#f5f4f0]">{activePlan.name}</strong> é liberado automaticamente após a compensação.</p>
                </div>

                <div className="mx-auto w-44 h-44 p-3.5 rounded-2xl bg-white flex items-center justify-center shadow-lg relative group">
                  <QrCode className="h-full w-full text-black" />
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center backdrop-blur-sm cursor-pointer">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-white">Copiar Chave</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-[#121317] border border-[#1c1d22] flex items-center justify-between gap-3 text-left">
                    <p className="text-xs font-mono text-[#8a8880] truncate">00020101021226840014br.gov.bcb.pix0124cashflow...</p>
                    <button
                      type="button"
                      onClick={() => toast.success("Código Copia-e-Cola copiado!")}
                      className="text-xs font-mono text-[#cc9166] hover:underline shrink-0"
                    >
                      Copiar
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[#8a8880] text-[11px]">
                    <Info className="h-3 w-3 text-[#cc9166]" />
                    Chave dinâmica válida por 30 minutos.
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-[#ffffff] text-[#08080a] hover:bg-[#f5f4f0] text-xs font-medium"
                >
                  {isLoading ? "Processando compensação..." : "Simular Liquidação do Pix"}
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <aside className="space-y-6 lg:sticky top-10">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#040406] border border-[#1c1d22] space-y-6 shadow-xl relative overflow-hidden">
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-[#f5f4f0]">Resumo do Pedido</h2>

                <div className="p-4 rounded-xl bg-[#121317] border border-[#1c1d22] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#f5f4f0]">{activePlan.name}</p>
                    <p className="text-[10px] font-mono text-[#cc9166]">Renovação automática</p>
                  </div>
                  <p className="text-base font-serif-display text-[#f5f4f0]">{activePlan.price}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-[#8a8880]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#f5f4f0]">{activePlan.price}</span>
                </div>
                <div className="flex justify-between text-[#8a8880]">
                  <span>Impostos e Taxas</span>
                  <span className="font-mono text-[#34d399]">Isento</span>
                </div>
                <div className="h-px bg-[#1c1d22] my-2" />
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm font-medium text-[#f5f4f0]">Total a liquidar</span>
                  <span className="text-2xl font-serif-display text-[#f5f4f0]">
                    {activePlan.price}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1c1d22]">
                <p className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider mb-3">Benefícios Ativados</p>
                <ul className="space-y-2">
                  {activePlan.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#8a8880]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#cc9166] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-5 rounded-2xl bg-[#040406] border border-[#1c1d22] space-y-3">
              <div className="flex items-center gap-3 text-[#8a8880]">
                <ShieldCheck className="h-4 w-4 text-[#34d399]" />
                <div className="text-[11px]">
                  <p className="font-medium text-[#f5f4f0]">Transação Criptografada</p>
                  <p className="text-[#6b6960]">Ambiente certificado TLS 1.3 / AES-256</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[#8a8880]">
                <Lock className="h-4 w-4 text-[#cc9166]" />
                <div className="text-[11px]">
                  <p className="font-medium text-[#f5f4f0]">Privacidade e Conformidade</p>
                  <p className="text-[#6b6960]">Zero compartilhamento com terceiros</p>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
