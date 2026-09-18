import { createWorker, PSM, OEM } from "tesseract.js";

export interface ScannedReceiptResult {
  amount: number;
  formattedAmount: string;
  date: string; // YYYY-MM-DD
  description: string;
  paymentMethod: "PIX" | "TED" | "DOC" | "Boleto" | "Debito" | "Credito" | "Dinheiro" | "Outros";
  type: "income" | "expense";
  rawText: string;
  confidence: number;
  preprocessedImage?: string; // Imagem em preto e branco com alta nitidez
}

export interface ScanOptions {
  onProgress?: (progressPercent: number) => void;
  onStageChange?: (stage: string) => void;
}

/**
 * Carrega uma imagem (DataURL, Blob URL ou path) em um canvas HTML para processamento
 */
function loadImageToCanvas(src: string): Promise<{ canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0);
      resolve({ canvas, ctx });
    };
    img.onerror = (err) => reject(new Error("Falha ao carregar a imagem: " + String(err)));
    img.src = src;
  });
}

/**
 * Otimiza a resolução da imagem (upscale suave para 1600-2000px de largura)
 */
function upscaleIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, targetWidth = 1600): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  if (canvas.width >= targetWidth && canvas.width <= 2400) return { canvas, ctx };

  let scale = 1;
  if (canvas.width < targetWidth) {
    scale = targetWidth / canvas.width;
  } else if (canvas.width > 2400) {
    scale = 2000 / canvas.width;
  }
  if (scale === 1) return { canvas, ctx };

  const newCanvas = document.createElement("canvas");
  newCanvas.width = Math.round(canvas.width * scale);
  newCanvas.height = Math.round(canvas.height * scale);
  const newCtx = newCanvas.getContext("2d", { willReadFrequently: true })!;
  newCtx.imageSmoothingEnabled = true;
  newCtx.imageSmoothingQuality = "high";
  newCtx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
  return { canvas: newCanvas, ctx: newCtx };
}

/**
 * Converte a imagem para Preto e Branco (escala de cinza de alto contraste para documentos)
 */
function convertToBlackAndWhite(imageData: ImageData): ImageData {
  const data = imageData.data;
  const totalPixels = data.length / 4;

  // 1. Converte para escala de cinza e gera histograma
  const histogram = new Array(256).fill(0);
  for (let i = 0; i < data.length; i += 4) {
    const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    data[i] = data[i + 1] = data[i + 2] = gray;
    histogram[gray]++;
  }

  // 2. Esticamento adaptativo de contraste com corte nos extremos (1% e 99%)
  const clip1 = Math.floor(totalPixels * 0.02);
  const clip99 = Math.floor(totalPixels * 0.98);
  let min = 0, max = 255;
  let cumSum = 0;

  for (let i = 0; i < 256; i++) {
    cumSum += histogram[i];
    if (cumSum > clip1) { min = i; break; }
  }
  cumSum = 0;
  for (let i = 255; i >= 0; i--) {
    cumSum += histogram[i];
    if (cumSum > (totalPixels - clip99)) { max = i; break; }
  }

  const range = Math.max(1, max - min);
  for (let i = 0; i < data.length; i += 4) {
    const val = data[i];
    // Normaliza entre 0 (preto profundo) e 255 (branco puro)
    let stretched = Math.round(((Math.min(Math.max(val, min), max) - min) / range) * 255);
    
    // Curva gama suave para dar mais nitidez aos textos escuros em fundo claro
    stretched = Math.pow(stretched / 255, 1.15) * 255;
    const finalVal = Math.min(255, Math.max(0, Math.round(stretched)));

    data[i] = data[i + 1] = data[i + 2] = finalVal;
  }

  return imageData;
}

/**
 * Filtro de Convolução 3x3 de Alta Nitidez (Sharpening Kernel)
 * Realça bordas, letras finas, números, pontos e vírgulas
 */
function applySharpenFilter(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, amount = 0.55): ImageData {
  const w = canvas.width;
  const h = canvas.height;
  const src = ctx.getImageData(0, 0, w, h);
  const dst = ctx.createImageData(w, h);
  const s = src.data;
  const d = dst.data;

  // Unsharp mask via 3x3 box blur subtraction
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;

      // Média dos 8 vizinhos circundantes
      let blur = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          blur += s[((y + dy) * w + (x + dx)) * 4];
        }
      }
      blur /= 9;

      // Realce de nitidez: original + ganho * (original - média local)
      const sharpVal = s[idx] + amount * (s[idx] - blur);
      const clamped = Math.min(255, Math.max(0, Math.round(sharpVal)));

      d[idx] = d[idx + 1] = d[idx + 2] = clamped;
      d[idx + 3] = 255;
    }
  }

  // Preenche as bordas externas de 1px
  for (let y = 0; y < h; y++) {
    const row = y * w * 4;
    d[row] = d[row + 1] = d[row + 2] = s[row];
    d[row + 3] = 255;
    const endRow = (y * w + (w - 1)) * 4;
    d[endRow] = d[endRow + 1] = d[endRow + 2] = s[endRow];
    d[endRow + 3] = 255;
  }

  return dst;
}

/**
 * Pipeline de pré-processamento de imagem:
 * 1. Upscale de resolução
 * 2. Conversão para Preto e Branco (alto contraste)
 * 3. Aumento de Nitidez Convolucional (Unsharp Mask)
 */
export async function preprocessImage(
  src: string,
  onStage?: (stage: string) => void
): Promise<string> {
  onStage?.("Carregando imagem...");
  let { canvas, ctx } = await loadImageToCanvas(src);

  onStage?.("Otimizando resolução do comprovante...");
  ({ canvas, ctx } = upscaleIfNeeded(canvas, ctx));

  onStage?.("Convertendo para preto e branco...");
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  imageData = convertToBlackAndWhite(imageData);
  ctx.putImageData(imageData, 0, 0);

  onStage?.("Aumentando nitidez do texto e números...");
  const sharpenedData = applySharpenFilter(canvas, ctx, 0.6);
  ctx.putImageData(sharpenedData, 0, 0);

  return canvas.toDataURL("image/png");
}

/**
 * Limpa e normaliza o texto bruto do OCR corrigindo ruídos de scanner
 */
function cleanOcrText(rawText: string): string {
  if (!rawText) return "";

  let t = rawText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Corrige símbolos de moeda (R$, RS, R5, R§, BRL)
  t = t.replace(/\b(R\$|RS|R5|R§|RŞ|BRL|Brl)\b/gi, "R$");
  t = t.replace(/R\s+[\$S5]/gi, "R$");
  t = t.replace(/R\$/g, " R$ ");

  // Junta linhas onde "Valor" está numa linha e o valor na seguinte
  t = t.replace(/(valor\s*(?:da\s*transfer[eê]ncia|do\s*pix|pago|recebido|total|líquido|cobrado|principal)?|total|pagamento|quantia|vlr)[:\s]*\n+[\s]*(?:R\$)?/gi, "$1: R$ ");

  // Corrige espaçamentos espúrios em decimais (ex: "150 , 00" -> "150,00")
  t = t.replace(/(\d+)\s*([.,])\s*(\d{2})\b/g, "$1$2$3");
  t = t.replace(/(\d+)\s*\.\s*(\d{3})\b/g, "$1.$2");

  return t;
}

/**
 * Converte uma string candidata em número float válido
 */
function parseAmountCandidate(raw: string): number {
  if (!raw) return 0;

  let clean = raw.trim().replace(/[^\d,.-]/g, "");

  if (/^\d{1,3}(?:\.\d{3})+,\d{2}$/.test(clean)) {
    clean = clean.replace(/\./g, "").replace(",", ".");
  } else if (/^\d+,\d{2}$/.test(clean)) {
    clean = clean.replace(",", ".");
  } else if (/^\d{1,3}(?:,\d{3})+\.\d{2}$/.test(clean)) {
    clean = clean.replace(/,/g, "");
  } else if (/^\d+\.\d{2}$/.test(clean)) {
    // Ok
  } else if (/^\d+[- ]\d{2}$/.test(clean)) {
    clean = clean.replace(/[- ]/, ".");
  } else if (clean.includes(",") || clean.includes(".")) {
    const lastComma = clean.lastIndexOf(",");
    const lastDot = clean.lastIndexOf(".");
    const sepIdx = Math.max(lastComma, lastDot);
    const intPart = clean.slice(0, sepIdx).replace(/[.,]/g, "");
    const decPart = clean.slice(sepIdx + 1);
    clean = `${intPart}.${decPart}`;
  }

  const num = parseFloat(clean);
  return !isNaN(num) && num > 0.05 && num < 10_000_000 ? num : 0;
}

/**
 * Substitui letras lidas erroneamente em contextos de dígitos
 */
function fixOcrDigits(str: string): string {
  return str
    .replace(/[Oo]/g, "0")
    .replace(/[lI|]/g, "1")
    .replace(/[Ss§]/g, "5")
    .replace(/[Bb]/g, "8");
}

/**
 * Extrai o valor monetário do comprovante com 4 estratégias de fallback
 */
export function extractAmountFromText(text: string): number {
  if (!text) return 0;
  const cleaned = cleanOcrText(text);

  // 1. Palavras-chave bancárias (Maior prioridade)
  const keywordRegex = /(?:valor(?:\s+(?:da\s+transfer[eê]ncia|do\s+pix|pago|recebido|total|líquido|cobrado|principal|transa[cç][aã]o|documento))?|total|pagamento|quantia|vlr)[:\s]*(?:R\$)?\s*([0-9OlISs\s.,-]{2,20})/gi;
  let match: RegExpExecArray | null;
  const keywordAmounts: number[] = [];
  while ((match = keywordRegex.exec(cleaned)) !== null) {
    const candidateStr = fixOcrDigits(match[1]);
    const parsed = parseAmountCandidate(candidateStr);
    if (parsed > 0) keywordAmounts.push(parsed);
  }
  if (keywordAmounts.length > 0) {
    const nonZero = keywordAmounts.filter(a => a >= 0.1);
    if (nonZero.length > 0) return nonZero[0];
  }

  // 2. Prefixo R$ explícito
  const rsRegex = /R\$\s*([0-9OlISs\s.,-]{2,18})/gi;
  const rsAmounts: number[] = [];
  while ((match = rsRegex.exec(cleaned)) !== null) {
    const candidateStr = fixOcrDigits(match[1]);
    const parsed = parseAmountCandidate(candidateStr);
    if (parsed > 0) rsAmounts.push(parsed);
  }
  if (rsAmounts.length > 0) {
    const valid = rsAmounts.filter(a => a >= 0.5);
    if (valid.length > 0) return Math.max(...valid);
  }

  // 3. Formato numérico de moeda brasileira em qualquer ponto
  const brlNumberRegex = /\b(\d{1,3}(?:\.\d{3})+,\d{2})\b|\b(\d+,\d{2})\b|\b(\d{1,3}(?:,\d{3})+\.\d{2})\b/g;
  const generalAmounts: number[] = [];
  while ((match = brlNumberRegex.exec(cleaned)) !== null) {
    const valStr = match[1] || match[2] || match[3];
    const parsed = parseAmountCandidate(valStr);
    if (parsed > 0) generalAmounts.push(parsed);
  }

  const filteredGeneral = generalAmounts.filter(a => {
    if (a < 0.5) return false;
    if (a >= 2020 && a <= 2030 && Number.isInteger(a)) return false;
    return true;
  });

  if (filteredGeneral.length > 0) {
    return Math.max(...filteredGeneral);
  }

  // 4. Fallback linha por linha
  const lines = cleaned.split("\n");
  for (const line of lines) {
    const lineTrim = line.trim();
    const numMatch = lineTrim.match(/(\d+[.,]\d{2})/);
    if (numMatch) {
      const parsed = parseAmountCandidate(numMatch[1]);
      if (parsed >= 0.5) return parsed;
    }
  }

  return 0;
}

/**
 * Extrai a data da transação do texto do comprovante
 */
export function extractDateFromText(text: string): string {
  const p = /(\d{2})[\/\.-](\d{2})[\/\.-](\d{2,4})/;
  const m = text.match(p);
  if (m) {
    const [, d, mo, yr] = m;
    const year = yr.length === 2 ? `20${yr}` : yr;
    const dateObj = new Date(`${year}-${mo}-${d}`);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toISOString().substring(0, 10);
    }
  }
  return new Date().toISOString().substring(0, 10);
}

/**
 * Extrai a descrição ou favorecido do comprovante
 */
export function extractDescriptionFromText(text: string): string {
  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.length > 3 && l.length < 90 && !/^[\d\s.,:/$R-]+$/.test(l));

  const keywords = ["pix", "ted", "transferencia", "pagamento", "compra", "debito", "credito", "beneficiario", "favorecido", "destinatario", "estabelecimento", "nome"];
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (keywords.some(k => lower.includes(k))) {
      const clean = line.replace(/^(?:para|benefici[aá]rio|favorecido|nome|estabelecimento|destinat[aá]rio)[:\s]*/i, "").trim();
      if (clean.length > 3) return clean.substring(0, 60);
    }
  }
  return lines[0]?.substring(0, 60) || "Comprovante digitalizado";
}

/**
 * Detecta a forma de pagamento (PIX, TED, Boleto, Cartão, etc.)
 */
export function detectPaymentMethodFromText(text: string): ScannedReceiptResult["paymentMethod"] {
  const lower = text.toLowerCase();
  if (lower.includes("pix")) return "PIX";
  if (lower.includes("ted")) return "TED";
  if (lower.includes("doc")) return "DOC";
  if (lower.includes("boleto") || lower.includes("c[oó]digo de barras")) return "Boleto";
  if (lower.includes("debito") || lower.includes("débito")) return "Debito";
  if (lower.includes("credito") || lower.includes("crédito") || lower.includes("cartao") || lower.includes("cartão")) return "Credito";
  if (lower.includes("dinheiro") || lower.includes("especie")) return "Dinheiro";
  return "PIX";
}

/**
 * Detecta se é receita ou despesa
 */
export function detectTransactionTypeFromText(text: string): "income" | "expense" {
  const lower = text.toLowerCase();
  const incomeScore = ["recebido", "recebimento", "credito", "entrada", "deposito", "salario"].filter(w => lower.includes(w)).length;
  const expenseScore = ["pago", "pagamento", "debito", "saida", "transferencia enviada", "compra"].filter(w => lower.includes(w)).length;
  return incomeScore > expenseScore ? "income" : "expense";
}

/**
 * Função principal de Scanner de Comprovante Bancário
 * 
 * @param imageSource DataURL em base64 ou URL da imagem
 * @param options Callbacks opcionais de progresso e estágio
 * @returns Objeto estruturado com os dados financeiros extraídos
 */
export async function scanReceipt(
  imageSource: string,
  options: ScanOptions = {}
): Promise<ScannedReceiptResult> {
  const { onProgress, onStageChange } = options;

  // 1. Pré-processamento de imagem
  const preprocessed = await preprocessImage(imageSource, onStageChange);

  // 2. Inicialização do motor Tesseract com suporte a português e inglês
  onStageChange?.("Inicializando motor OCR...");
  const worker = await createWorker(["por", "eng"], OEM.DEFAULT, {
    logger: (m: any) => {
      if (m.status === "recognizing text" && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    },
  });

  try {
    // Pass 1: Leitura estruturada automática (PSM.AUTO) na imagem tratada
    onStageChange?.("Analisando layout do comprovante...");
    await worker.setParameters({ tessedit_pageseg_mode: PSM.AUTO });
    const result1 = await worker.recognize(preprocessed);
    let bestText = result1.data.text;
    let bestConfidence = result1.data.confidence;
    let detectedAmount = extractAmountFromText(bestText);

    // Pass 2: Fallback para texto esparso (PSM.SPARSE_TEXT) se não encontrou valor
    if (detectedAmount === 0 || bestConfidence < 50) {
      onStageChange?.("Buscando valores em texto esparso...");
      onProgress?.(0);
      await worker.setParameters({ tessedit_pageseg_mode: PSM.SPARSE_TEXT });
      const result2 = await worker.recognize(preprocessed);
      const amount2 = extractAmountFromText(result2.data.text);
      if (amount2 > 0 || result2.data.confidence > bestConfidence) {
        bestText = result2.data.text;
        bestConfidence = result2.data.confidence;
        detectedAmount = amount2;
      }
    }

    // Pass 3: Fallback na imagem original se ainda não encontrou
    if (detectedAmount === 0) {
      onStageChange?.("Tentando leitura direta da imagem original...");
      onProgress?.(0);
      await worker.setParameters({ tessedit_pageseg_mode: PSM.AUTO });
      const result3 = await worker.recognize(imageSource);
      const amount3 = extractAmountFromText(result3.data.text);
      if (amount3 > 0) {
        bestText = result3.data.text;
        detectedAmount = amount3;
      }
    }

    onStageChange?.("Extraindo dados financeiros...");

    return {
      amount: detectedAmount,
      formattedAmount: detectedAmount > 0 ? detectedAmount.toFixed(2).replace(".", ",") : "",
      date: extractDateFromText(bestText),
      description: extractDescriptionFromText(bestText),
      paymentMethod: detectPaymentMethodFromText(bestText),
      type: detectTransactionTypeFromText(bestText),
      rawText: bestText,
      confidence: bestConfidence,
      preprocessedImage: preprocessed,
    };
  } finally {
    await worker.terminate();
  }
}
