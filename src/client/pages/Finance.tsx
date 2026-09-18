import { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  CandlestickChart,
  Sparkles,
  PieChart as PieChartIcon
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { usePrivacy } from "@/client/hooks/use-privacy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/client/lib/utils";
import { TiltCard } from "@/client/components/ui/tilt-card";

interface FixedIncome {
  id: string;
  name: string;
  type: "CDB" | "Tesouro Direto" | "LCI" | "LCA" | "Debêntures";
  amount: number;
  rate: string;
  deadline: string;
}

interface VariableIncome {
  id: string;
  ticker: string;
  type: "Ações" | "FIIs" | "ETFs";
  quantity: number;
  avgPrice: number;
  currentPrice: number;
}

const initialFixed: FixedIncome[] = [];
const initialVariable: VariableIncome[] = [];

const PIE_COLORS = ["#cc9166", "#e2e3e9", "#9194a1", "#34d399", "#f87171", "#a78bfa"];

const fmt = (v: number) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
const fmtPct = (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(2)}%`;

export default function Finance() {
  const { isPrivate } = usePrivacy();

  const [fixedAssets, setFixedAssets] = useState<FixedIncome[]>(initialFixed);
  const [variableAssets, setVariableAssets] = useState<VariableIncome[]>(initialVariable);

  // Modal states
  const [openModal, setOpenModal] = useState<"fixed" | "variable" | null>(null);

  // Form State - Fixed
  const [fName, setFName] = useState("");
  const [fType, setFType] = useState<FixedIncome["type"]>("CDB");
  const [fAmount, setFAmount] = useState("");
  const [fRate, setFRate] = useState("");
  const [fDeadline, setFDeadline] = useState("");

  // Form State - Variable
  const [vTicker, setVTicker] = useState("");
  const [vType, setVType] = useState<VariableIncome["type"]>("Ações");
  const [vQuantity, setVQuantity] = useState("");
  const [vAvgPrice, setVAvgPrice] = useState("");
  const [vCurrentPrice, setVCurrentPrice] = useState("");

  const totalFixed = useMemo(() => fixedAssets.reduce((s, a) => s + a.amount, 0), [fixedAssets]);
  const totalVariable = useMemo(() => variableAssets.reduce((s, a) => s + (a.quantity * a.currentPrice), 0), [variableAssets]);
  const totalVariableInvested = useMemo(() => variableAssets.reduce((s, a) => s + (a.quantity * a.avgPrice), 0), [variableAssets]);

  const netWorth = totalFixed + totalVariable;
  const variableProfit = totalVariable - totalVariableInvested;
  const variableProfitPct = totalVariableInvested > 0 ? (variableProfit / totalVariableInvested) * 100 : 0;

  // Pie Chart Data
  const allocationData = [
    { name: "Tesouro Direto", value: fixedAssets.filter(a => a.type === "Tesouro Direto").reduce((s, a) => s + a.amount, 0) },
    { name: "CDB/LCI/LCA", value: fixedAssets.filter(a => ["CDB", "LCI", "LCA"].includes(a.type)).reduce((s, a) => s + a.amount, 0) },
    { name: "Debêntures", value: fixedAssets.filter(a => a.type === "Debêntures").reduce((s, a) => s + a.amount, 0) },
    { name: "Ações", value: variableAssets.filter(a => a.type === "Ações").reduce((s, a) => s + (a.quantity * a.currentPrice), 0) },
    { name: "FIIs", value: variableAssets.filter(a => a.type === "FIIs").reduce((s, a) => s + (a.quantity * a.currentPrice), 0) },
    { name: "ETFs", value: variableAssets.filter(a => a.type === "ETFs").reduce((s, a) => s + (a.quantity * a.currentPrice), 0) },
  ].filter(d => d.value > 0).sort((a, b) => b.value - a.value);

  function handleAddFixed(e: React.FormEvent) {
    e.preventDefault();
    if (!fName || !fAmount || !fRate || !fDeadline) return;
    setFixedAssets(prev => [...prev, {
      id: String(Date.now()),
      name: fName, type: fType, amount: Number(fAmount), rate: fRate, deadline: fDeadline
    }]);
    setOpenModal(null);
  }

  function handleAddVariable(e: React.FormEvent) {
    e.preventDefault();
    if (!vTicker || !vQuantity || !vAvgPrice || !vCurrentPrice) return;
    setVariableAssets(prev => [...prev, {
      id: String(Date.now()),
      ticker: vTicker.toUpperCase(), type: vType, quantity: Number(vQuantity), avgPrice: Number(vAvgPrice), currentPrice: Number(vCurrentPrice)
    }]);
    setOpenModal(null);
  }

  return (
    <div className="w-full min-h-screen pb-16 bg-[#08080a] text-[#e2e3e9] relative selection:bg-[#cc9166]/20">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-8 space-y-8 relative z-10">

        {/* ─── Hero Header ─── */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#1c1d22]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#cc9166] text-xs font-mono tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Gestão de Ativos &middot; Portfólio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-display font-medium tracking-tight text-white">
              Investimentos & Patrimônio<span className="text-[#cc9166]">.</span>
            </h1>
            <p className="text-sm text-[#9194a1] max-w-xl">
              Alocação estratégica entre segurança em renda fixa e exposição calibrada a ativos de risco.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Add Fixed Modal */}
            <Dialog open={openModal === "fixed"} onOpenChange={(v) => setOpenModal(v ? "fixed" : null)}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-9 px-3.5 rounded-lg border-[#2e3038] bg-[#121317] hover:bg-[#1c1d22] text-white text-xs font-medium gap-2">
                  <Plus className="h-3.5 w-3.5" /> Renda Fixa
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-[#040406] border border-[#1c1d22] text-[#e2e3e9] p-6 rounded-2xl">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-serif-display font-semibold text-white">
                    Novo Título de Renda Fixa
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddFixed} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-mono text-[#9194a1] uppercase">Nome do Título</Label>
                    <Input value={fName} onChange={e => setFName(e.target.value)} placeholder="Ex: CDB Banco Inter 110%" required className="bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg h-9" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-mono text-[#9194a1] uppercase">Classe</Label>
                      <Select value={fType} onValueChange={(v: any) => setFType(v)}>
                        <SelectTrigger className="bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#08080a] border-[#1c1d22] text-white">
                          {["CDB", "Tesouro Direto", "LCI", "LCA", "Debêntures"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-mono text-[#9194a1] uppercase">Valor (R$)</Label>
                      <Input type="number" step="0.01" value={fAmount} onChange={e => setFAmount(e.target.value)} required placeholder="0.00" className="bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg h-9 font-mono" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-mono text-[#9194a1] uppercase">Taxa / Indexador</Label>
                      <Input value={fRate} onChange={e => setFRate(e.target.value)} placeholder="Ex: 115% CDI" required className="bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-mono text-[#9194a1] uppercase">Vencimento</Label>
                      <Input type="date" value={fDeadline} onChange={e => setFDeadline(e.target.value)} required className="bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg h-9" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-10 rounded-lg text-black bg-white hover:bg-white/90 font-semibold text-xs mt-2 border-0">
                    Cadastrar Título
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Add Variable Modal */}
            <Dialog open={openModal === "variable"} onOpenChange={(v) => setOpenModal(v ? "variable" : null)}>
              <DialogTrigger asChild>
                <Button className="h-9 px-3.5 rounded-lg bg-white hover:bg-white/90 text-black text-xs font-semibold gap-2 border-0 shadow-sm">
                  <Plus className="h-3.5 w-3.5 stroke-[2.5]" /> Renda Variável
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-[#040406] border border-[#1c1d22] text-[#e2e3e9] p-6 rounded-2xl">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-serif-display font-semibold text-white">
                    Nova Posição de Renda Variável
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddVariable} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-mono text-[#9194a1] uppercase">Ticker / Código</Label>
                      <Input value={vTicker} onChange={e => setVTicker(e.target.value.toUpperCase())} placeholder="Ex: BOVA11" required className="bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg h-9 font-mono uppercase" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-mono text-[#9194a1] uppercase">Tipo</Label>
                      <Select value={vType} onValueChange={(v: any) => setVType(v)}>
                        <SelectTrigger className="bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#08080a] border-[#1c1d22] text-white">
                          {["Ações", "FIIs", "ETFs"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-mono text-[#9194a1] uppercase">Quantidade de Cotas</Label>
                    <Input type="number" placeholder="100" value={vQuantity} onChange={e => setVQuantity(e.target.value)} required className="bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg h-9 font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-mono text-[#9194a1] uppercase">Preço Médio (R$)</Label>
                      <Input type="number" step="0.01" placeholder="0.00" value={vAvgPrice} onChange={e => setVAvgPrice(e.target.value)} required className="bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg h-9 font-mono" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-mono text-[#9194a1] uppercase">Cotação Atual (R$)</Label>
                      <Input type="number" step="0.01" placeholder="0.00" value={vCurrentPrice} onChange={e => setVCurrentPrice(e.target.value)} required className="bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg h-9 font-mono" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-10 rounded-lg text-black bg-white hover:bg-white/90 font-semibold text-xs mt-2 border-0">
                    Salvar Posição
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* ─── Global Dashboard Summaries ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Total Net Worth */}
            <TiltCard tiltLimit={8} scale={1.01} perspective={1000} className="w-full">
              <div className="bg-[#040406] border border-[#2e3038] p-6 rounded-2xl shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#cc9166]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#cc9166] uppercase tracking-widest">Patrimônio Investido</span>
                  <div className="p-1.5 rounded-lg bg-[#121317] border border-[#1c1d22] text-[#cc9166]">
                    <Wallet className="h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h2 className="text-3xl font-serif-display font-semibold text-white tracking-tight">
                    {isPrivate ? "R$ •••••" : fmt(netWorth)}
                  </h2>
                  <p className="text-xs text-[#9194a1]">Total acumulado sob custódia</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1c1d22] flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[#9194a1] block text-[10px]">RENDA FIXA</span>
                    <span className="text-emerald-400 font-semibold">{isPrivate ? "••••" : fmt(totalFixed)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#9194a1] block text-[10px]">RENDA VARIÁVEL</span>
                    <span className="text-violet-400 font-semibold">{isPrivate ? "••••" : fmt(totalVariable)}</span>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Variable Performance */}
            <TiltCard tiltLimit={8} scale={1.01} perspective={1000} className="w-full">
              <div className="bg-[#040406] border border-[#1c1d22] p-6 rounded-2xl shadow-xl flex flex-col justify-between h-full hover:border-[#2e3038] transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#9194a1] uppercase tracking-widest">Retorno Renda Variável</span>
                  <div className={cn(
                    "p-1.5 rounded-lg border",
                    variableProfit >= 0
                      ? "bg-emerald-950/40 border-emerald-800/30 text-emerald-400"
                      : "bg-rose-950/40 border-rose-800/30 text-rose-400"
                  )}>
                    {variableProfit >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  </div>
                </div>
                <div className="space-y-1">
                  <h2 className={cn("text-3xl font-serif-display font-semibold tracking-tight", variableProfit >= 0 ? "text-emerald-400" : "text-rose-400")}>
                    {isPrivate ? "••••" : fmtPct(variableProfitPct)}
                  </h2>
                  <p className="text-xs text-[#9194a1]">Rentabilidade não realizada</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1c1d22] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9194a1]">Resultado Nominal:</span>
                  <span className={cn("font-semibold", variableProfit >= 0 ? "text-emerald-400" : "text-rose-400")}>
                    {isPrivate ? "••••" : fmt(variableProfit)}
                  </span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Allocation Donut */}
          <div className="lg:col-span-4 bg-[#040406] border border-[#1c1d22] p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#cc9166] uppercase tracking-widest">Alocação de Classes</span>
              <PieChartIcon className="h-4 w-4 text-[#9194a1]" />
            </div>
            <div className="w-full h-[160px]">
              {allocationData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-[#9194a1] font-mono">
                  Sem ativos registrados
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#040406', borderRadius: '12px', border: '1px solid #2e3038', color: '#e2e3e9' }}
                      itemStyle={{ color: '#fff', fontSize: '11px' }}
                    />
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {allocationData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="text-[11px] text-[#9194a1] text-center font-mono">
              {allocationData.length} classes mapeadas
            </div>
          </div>
        </div>

        {/* ─── Renda Fixa Section ─── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1c1d22]">
            <Landmark className="h-4 w-4 text-[#cc9166]" />
            <h2 className="text-lg font-serif-display font-semibold text-white">Renda Fixa & Títulos</h2>
          </div>

          {fixedAssets.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#040406] border border-[#1c1d22] text-xs text-[#9194a1] font-mono">
              Nenhum título de renda fixa cadastrado.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {fixedAssets.map(asset => (
                <TiltCard key={asset.id} tiltLimit={8} scale={1.01} perspective={1000}>
                  <div className="bg-[#040406] border border-[#1c1d22] p-5 rounded-2xl shadow-xl flex flex-col justify-between h-full space-y-4 hover:border-[#2e3038] transition-colors">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#cc9166] px-2 py-0.5 rounded bg-[#121317] border border-[#1c1d22] inline-block">
                        {asset.type}
                      </span>
                      <h3 className="text-sm font-semibold text-white mt-2 truncate">{asset.name}</h3>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-[#1c1d22]">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#9194a1]">Alocação:</span>
                        <span className="text-white font-semibold">{isPrivate ? "••••" : fmt(asset.amount)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#9194a1]">Taxa:</span>
                        <span className="text-emerald-400">{asset.rate}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#9194a1]">Vencimento:</span>
                        <span className="text-[#e2e3e9]">{asset.deadline}</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          )}
        </section>

        {/* ─── Renda Variável Section ─── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1c1d22]">
            <CandlestickChart className="h-4 w-4 text-[#cc9166]" />
            <h2 className="text-lg font-serif-display font-semibold text-white">Renda Variável (Ações, FIIs, ETFs)</h2>
          </div>

          {variableAssets.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#040406] border border-[#1c1d22] text-xs text-[#9194a1] font-mono">
              Nenhuma posição de renda variável registrada.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {variableAssets.map(asset => {
                const totalInvested = asset.quantity * asset.avgPrice;
                const currentTotal = asset.quantity * asset.currentPrice;
                const profitCalc = currentTotal - totalInvested;
                const profitPct = totalInvested > 0 ? (profitCalc / totalInvested) * 100 : 0;
                const isUp = profitPct >= 0;

                return (
                  <TiltCard key={asset.id} tiltLimit={8} scale={1.01} perspective={1000}>
                    <div className="bg-[#040406] border border-[#1c1d22] p-5 rounded-2xl shadow-xl flex flex-col justify-between h-full space-y-4 hover:border-[#2e3038] transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-mono font-bold text-white">{asset.ticker}</h3>
                          <span className="text-[10px] font-mono text-[#9194a1] uppercase">{asset.type} &middot; {asset.quantity} Cotas</span>
                        </div>
                        <div className={cn(
                          "p-1.5 rounded-lg border",
                          isUp
                            ? "bg-emerald-950/40 border-emerald-800/30 text-emerald-400"
                            : "bg-rose-950/40 border-rose-800/30 text-rose-400"
                        )}>
                          {isUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#1c1d22]">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#9194a1]">Preço Médio:</span>
                          <span className="text-white">R$ {asset.avgPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#9194a1]">Cotação Atual:</span>
                          <span className="text-white font-semibold">R$ {asset.currentPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs font-mono pt-1 border-t border-[#1c1d22]/50">
                          <span className="text-[#9194a1]">Retorno:</span>
                          <span className={cn("font-semibold", isUp ? "text-emerald-400" : "text-rose-400")}>
                            {fmtPct(profitPct)} ({fmt(profitCalc)})
                          </span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
