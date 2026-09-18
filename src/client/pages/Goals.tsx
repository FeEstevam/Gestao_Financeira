import { useState } from "react";
import {
  Target,
  Plus,
  Trash2,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  CreditCard,
  Rocket,
  Lock,
} from "lucide-react";
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
import { useFinance } from "@/client/hooks/use-finance";
import { cn } from "@/client/lib/utils";
import { TiltCard } from "@/client/components/ui/tilt-card";

const COLORS = [
  "#cc9166", // Copper
  "#10b981", // Emerald
  "#6366f1", // Indigo
  "#f59e0b", // Amber
  "#06b6d4", // Cyan
  "#ec4899", // Pink
];

const fmt = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function Goals() {
  const { goals, addGoal, deleteGoal, updateGoalCurrent } = useFinance();
  const [open, setOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [deadline, setDeadline] = useState("");

  const resetForm = () => {
    setName("");
    setTarget("");
    setCurrent("");
    setDeadline("");
  };

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !target || !deadline) return;
    addGoal({
      name,
      target: parseFloat(target),
      current: parseFloat(current || "0"),
      deadline,
      color: COLORS[goals.length % COLORS.length],
    });
    resetForm();
    setOpen(false);
  }

  function handleDelete(id: string) {
    deleteGoal(id);
  }

  function handleAddValue(id: string) {
    const value = prompt("Quanto deseja aportar nesta meta agora? (R$)");
    if (!value || isNaN(Number(value))) return;
    updateGoalCurrent(id, Number(value));
  }

  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const totalCurrent = goals.reduce((s, g) => s + g.current, 0);
  const totalCompletionPct =
    totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-in fade-in slide-in-from-bottom-3 duration-500 font-sans">
      
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#1c1d22]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2e3038] bg-[#040406] text-[#cc9166] font-semibold uppercase tracking-wider text-[11px] font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            CARTÕES DE TESOURARIA 3D
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl text-white font-normal tracking-[0.01em]">
            Metas & Acervos 3D
          </h1>
          <p className="text-[14px] text-[#9194a1] max-w-xl leading-relaxed">
            Mova o mouse sobre qualquer cartão para sentir a inclinação 3D dinâmica, reflexo de luz e profundidade de camadas.
          </p>
        </div>

        <Dialog
          open={open}
          onOpenChange={(v) => {
            if (!v) resetForm();
            setOpen(v);
          }}
        >
          <DialogTrigger asChild>
            <Button className="h-11 px-6 gap-2 rounded-full bg-[#ffffff] hover:bg-[#f0f0f4] text-[#000000] font-medium text-[14px] shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="h-4 w-4" /> Novo Objetivo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[440px] bg-[#040406] border border-[#1c1d22] text-[#e2e3e9] rounded-[14px] p-0 overflow-hidden shadow-2xl">
            <div className="p-7 relative z-10 space-y-6">
              <DialogHeader className="space-y-2 text-left">
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cc9166]" />
                  <span className="text-[11px] font-semibold text-[#cc9166] uppercase tracking-wider font-mono">
                    PROJETO FINANCEIRO
                  </span>
                </div>
                <DialogTitle className="font-serif-display text-2xl text-white font-normal">
                  Criar Novo Alvo
                </DialogTitle>
                <p className="text-[13px] text-[#9194a1]">
                  Defina o valor-alvo e o prazo de conquista para cálculo de aportes.
                </p>
              </DialogHeader>

              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[#c7c9d1] text-[12px] font-medium uppercase tracking-wider">
                    Nome do Objetivo
                  </Label>
                  <div className="relative">
                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5e616e]" />
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Reserva de Emergência, Expansão B2B..."
                      maxLength={100}
                      required
                      className="h-12 pl-11 bg-[#08080a] border border-[#2e3038] rounded-full text-white placeholder:text-[#5e616e] text-[13px] focus:outline-none focus:border-[#777a88]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[#c7c9d1] text-[12px] font-medium uppercase tracking-wider">
                      Valor Alvo (R$)
                    </Label>
                    <Input
                      type="number"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      min="1"
                      step="0.01"
                      placeholder="50000.00"
                      required
                      className="h-12 px-4 font-mono font-medium text-white bg-[#08080a] border border-[#2e3038] rounded-full text-[14px] focus:border-[#777a88]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[#c7c9d1] text-[12px] font-medium uppercase tracking-wider">
                      Já Acumulado
                    </Label>
                    <Input
                      type="number"
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="h-12 px-4 font-mono font-medium text-[#4ade80] bg-[#08080a] border border-[#2e3038] rounded-full text-[14px] focus:border-[#777a88]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[#c7c9d1] text-[12px] font-medium uppercase tracking-wider">
                    Data Limite
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5e616e]" />
                    <Input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      required
                      className="h-12 pl-11 pr-4 bg-[#08080a] border border-[#2e3038] rounded-full text-white font-medium text-[13px] focus:border-[#777a88] [&::-webkit-calendar-picker-indicator]:invert-[1]"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-full bg-[#ffffff] text-[#000000] hover:bg-[#f0f0f4] font-medium text-[14px] shadow-sm transition-all mt-3"
                >
                  Registrar Alvo no Cofre
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* ─── Summary Global 3D Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Card 1: Active Projects */}
        <TiltCard
          tiltLimit={15}
          scale={1.05}
          perspective={1200}
          effect="evade"
          spotlight={true}
          className="border border-[#1c1d22] bg-[#040406] p-6 shadow-xl"
        >
          <div className="space-y-2 [transform:translateZ(30px)]">
            <div className="flex items-center justify-between text-[#9194a1] text-[11px] font-semibold uppercase tracking-wider font-mono">
              <span>PROJETOS ATIVOS</span>
              <Target className="h-4 w-4 text-[#cc9166]" />
            </div>
            <p className="font-serif-display text-4xl text-white font-normal">
              {goals.length}
            </p>
            <p className="text-[12px] text-[#5e616e]">
              Cofres com teto financeiro definido
            </p>
          </div>
        </TiltCard>

        {/* Card 2: Accumulated Capital */}
        <TiltCard
          tiltLimit={15}
          scale={1.05}
          perspective={1200}
          effect="evade"
          spotlight={true}
          className="border border-[#1c1d22] bg-[#040406] p-6 shadow-xl"
        >
          <div className="space-y-2 [transform:translateZ(30px)]">
            <div className="flex items-center justify-between text-[#9194a1] text-[11px] font-semibold uppercase tracking-wider font-mono">
              <span>CAPITAL ACUMULADO</span>
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            </div>
            <p className="font-serif-display text-3xl sm:text-4xl text-white font-normal truncate">
              {fmt(totalCurrent)}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#2e3038] bg-[#121317] text-[11px] font-medium text-[#4ade80]">
              <TrendingUp className="h-3 w-3" />
              <span>{totalCompletionPct.toFixed(1)}% do alvo global</span>
            </div>
          </div>
        </TiltCard>

        {/* Card 3: Total Target */}
        <TiltCard
          tiltLimit={15}
          scale={1.05}
          perspective={1200}
          effect="evade"
          spotlight={true}
          className="border border-[#1c1d22] bg-[#040406] p-6 shadow-xl"
        >
          <div className="space-y-2.5 [transform:translateZ(30px)]">
            <div className="flex items-center justify-between text-[#9194a1] text-[11px] font-semibold uppercase tracking-wider font-mono">
              <span>ALVO PATRIMONIAL TOTAL</span>
              <ShieldCheck className="h-4 w-4 text-[#cc9166]" />
            </div>
            <p className="font-serif-display text-3xl sm:text-4xl text-[#e2e3e9] font-normal truncate">
              {fmt(totalTarget)}
            </p>
            <div className="w-full bg-[#1c1d22] h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(totalCompletionPct, 100)}%`,
                  background:
                    "linear-gradient(90deg, rgb(174, 147, 87), rgb(255, 240, 204))",
                }}
              />
            </div>
          </div>
        </TiltCard>

      </div>

      {/* ─── Goals 3D Cards Grid ─── */}
      {goals.length === 0 ? (
        <div className="py-20 px-6 flex flex-col items-center justify-center text-center rounded-[14px] border border-dashed border-[#1c1d22] bg-[#040406] text-[#9194a1] space-y-4">
          <div className="w-16 h-16 rounded-full border border-[#2e3038] bg-[#121317] flex items-center justify-center text-[#cc9166]">
            <Target className="h-7 w-7" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="font-serif-display text-xl text-white font-normal">
              Nenhuma meta registrada no cofre
            </h3>
            <p className="text-[13px] text-[#9194a1]">
              Comece criando seu primeiro objetivo para acompanhar a evolução do patrimônio com cartões 3D interativos.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const rawPct = (goal.current / goal.target) * 100;
            const pct = isNaN(rawPct) ? 0 : Math.min(rawPct, 100);
            const isFinished = pct >= 100;

            return (
              <TiltCard
                key={goal.id}
                tiltLimit={18}
                scale={1.05}
                perspective={1200}
                effect="evade"
                spotlight={true}
                className={cn(
                  "border bg-gradient-to-br from-[#0a0a0e] via-[#040406] to-[#08080c] p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between min-h-[310px] shadow-2xl relative group",
                  isFinished
                    ? "border-[#4ade80]/40 shadow-[#4ade80]/10"
                    : "border-[#1c1d22] hover:border-[#777a88]"
                )}
              >
                {/* 3D Decorative Top Elements */}
                <div className="space-y-4 [transform:translateZ(35px)]">
                  
                  {/* Category / Deadline / Delete */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#2e3038] bg-[#08080a] text-[10px] font-mono text-[#cc9166] uppercase">
                        <span>Prazo: {new Date(goal.deadline).toLocaleDateString("pt-BR")}</span>
                      </div>
                      <h3 className="font-serif-display text-2xl text-white font-normal leading-tight tracking-tight">
                        {goal.name}
                      </h3>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(goal.id);
                      }}
                      className="p-1.5 rounded-full border border-transparent hover:border-[#2e3038] text-[#5e616e] hover:text-red-400 hover:bg-[#121317] transition-colors"
                      title="Excluir meta"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Amounts with 3D Pop */}
                  <div className="pt-2 [transform:translateZ(20px)]">
                    <span className="text-[11px] text-[#9194a1] uppercase tracking-wider font-mono block">
                      SALDO ACUMULADO
                    </span>
                    <div className="flex items-baseline justify-between gap-2 mt-0.5">
                      <span className="font-serif-display text-3xl text-white font-normal tracking-tight">
                        {fmt(goal.current)}
                      </span>
                      <span className="text-[12px] font-mono text-[#9194a1]">
                        / {fmt(goal.target)}
                      </span>
                    </div>
                  </div>

                </div>

                {/* 3D Bottom Section: Progress Bar & Aporte Action */}
                <div className="space-y-4 pt-4 border-t border-[#1c1d22] [transform:translateZ(40px)]">
                  
                  {/* Progress Line */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] font-mono">
                      <span className="text-[#9194a1]">Progresso</span>
                      <span
                        className={cn(
                          "font-semibold",
                          isFinished ? "text-[#4ade80]" : "text-[#cc9166]"
                        )}
                      >
                        {pct.toFixed(1)}%
                      </span>
                    </div>

                    <div className="w-full bg-[#08080a] h-2 rounded-full overflow-hidden border border-[#2e3038]">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: isFinished
                            ? "linear-gradient(90deg, #10b981, #34d399)"
                            : "linear-gradient(103deg, rgb(174, 147, 87), rgb(255, 240, 204) 40%, rgb(174, 147, 87) 70%)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  {!isFinished ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddValue(goal.id);
                      }}
                      className="w-full py-2.5 px-4 rounded-full border border-[#2e3038] hover:border-[#777a88] bg-[#08080a] hover:bg-[#121317] text-white text-[13px] font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <TrendingUp className="h-3.5 w-3.5 text-[#cc9166]" />
                      <span>Fazer Aporte</span>
                    </button>
                  ) : (
                    <div className="py-2 px-3 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 text-[#4ade80] text-[12px] font-medium text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Objetivo Alcançado com Sucesso</span>
                    </div>
                  )}

                </div>
              </TiltCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
