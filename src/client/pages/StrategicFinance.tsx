import { useState, useMemo, useEffect } from "react";
import { useFinance } from "@/client/hooks/use-finance";
import { BudgetRule, CardCeiling, EXPENSE_CATEGORIES } from "@/client/lib/finance-data";
import { startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/client/hooks/use-toast";
import { cn } from "@/client/lib/utils";
import {
  Target,
  CreditCard,
  Bell,
  BellOff,
  Plus,
  Trash2,
  TriangleAlert,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  TrendingDown,
  Sliders,
  Sparkles,
  PieChart
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TiltCard } from "@/client/components/ui/tilt-card";

const PRESET_COLORS = [
  "#cc9166", "#e2e3e9", "#10b981", "#f97316",
  "#3b82f6", "#8b5cf6", "#eab308", "#ef4444",
];

function fmt(v: number) {
  return `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}
function pct(used: number, limit: number) {
  if (limit <= 0) return 0;
  return Math.min((used / limit) * 100, 100);
}

function ProgressBar({ value, color, danger }: { value: number; color: string; danger: boolean }) {
  return (
    <div className="w-full h-2 rounded-full bg-[#121317] overflow-hidden border border-[#1c1d22] relative">
      <div
        className={cn("h-full rounded-full transition-all duration-500", danger && "animate-pulse")}
        style={{
          width: `${value}%`,
          backgroundColor: danger ? "#ef4444" : color,
        }}
      />
    </div>
  );
}

export default function StrategicFinance() {
  const { toast } = useToast();
  const {
    transactions,
    accounts,
    budgetRules,
    saveBudgetRules,
    cardCeilings,
    saveCardCeiling,
    deleteCardCeiling,
  } = useFinance();

  const [rules, setRules] = useState<BudgetRule[]>(budgetRules);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);

  const totalPct = rules.reduce((s, r) => s + Number(r.percentage), 0);
  const isValid = Math.abs(totalPct - 100) < 0.01;

  function addRule() {
    const newRule: BudgetRule = {
      id: String(Date.now()),
      label: "Nova Regra",
      category: EXPENSE_CATEGORIES[0],
      percentage: 0,
      color: PRESET_COLORS[rules.length % PRESET_COLORS.length],
    };
    setRules((prev) => [...prev, newRule]);
    setEditingRuleId(newRule.id);
  }

  function updateRule(id: string, field: keyof BudgetRule, value: string | number) {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }

  function removeRule(id: string) {
    setRules((prev) => prev.filter((r) => r.id !== id));
  }

  function handleSaveStrategy() {
    if (!isValid) {
      toast({ title: "Soma inválida", description: `A soma atual é ${totalPct.toFixed(0)}%. Ajuste para 100%.`, variant: "destructive" });
      return;
    }
    saveBudgetRules(rules);
    toast({ title: "Estratégia salva!", description: "Sua distribuição foi atualizada." });
  }

  const [ceilingEdit, setCeilingEdit] = useState<Record<string, Partial<CardCeiling>>>({});

  const creditCards = useMemo(
    () => accounts.filter((a) => a.type === "credit"),
    [accounts]
  );

  function getCeiling(accId: string): CardCeiling {
    const saved = cardCeilings.find((c) => c.accountId === accId);
    return ceilingEdit[accId]
      ? { accountId: accId, limit: 0, alertAt: 80, notifyEnabled: true, ...saved, ...ceilingEdit[accId] }
      : saved ?? { accountId: accId, limit: 0, alertAt: 80, notifyEnabled: true };
  }

  function patchCeiling(accId: string, field: keyof CardCeiling, value: number | boolean) {
    setCeilingEdit((prev) => ({
      ...prev,
      [accId]: { ...prev[accId], [field]: value },
    }));
  }

  function saveCeiling(accId: string) {
    const c = getCeiling(accId);
    saveCardCeiling(c);
    setCeilingEdit((prev) => { const n = { ...prev }; delete n[accId]; return n; });
    toast({ title: "Teto salvo!", description: `Configuração atualizada para ${accounts.find(a => a.id === accId)?.name}.` });
  }

  const monthNow = new Date();
  const monthStart = startOfMonth(monthNow);
  const monthEnd = endOfMonth(monthNow);

  const monthlyExpenses = useMemo(() =>
    transactions.filter(
      (t) => t.type === "expense" && isWithinInterval(new Date(t.date), { start: monthStart, end: monthEnd })
    ),
    [transactions, monthStart, monthEnd]
  );

  const totalMonthExpense = monthlyExpenses.reduce((s, t) => s + t.amount, 0);

  const catSpending = useMemo(() => {
    const map: Record<string, number> = {};
    monthlyExpenses.forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return map;
  }, [monthlyExpenses]);

  const cardSpending = useMemo(() => {
    const map: Record<string, number> = {};
    monthlyExpenses.forEach((t) => {
      if (t.accountId) map[t.accountId] = (map[t.accountId] || 0) + t.amount;
    });
    return map;
  }, [monthlyExpenses]);

  const notifications = useMemo(() => {
    const msgs: { key: string; msg: string; level: "warn" | "danger" }[] = [];

    rules.forEach((rule) => {
      const limit = (rule.percentage / 100) * totalMonthExpense;
      const used = catSpending[rule.category] || 0;
      const ratio = limit > 0 ? used / limit : 0;
      if (ratio >= 1) {
        msgs.push({
          key: `cat-${rule.id}`,
          msg: `Limite excedido em "${rule.label}" — gastou ${fmt(used)} de ${fmt(limit)} (${(ratio * 100).toFixed(0)}%)`,
          level: "danger",
        });
      } else if (ratio >= 0.8) {
        msgs.push({
          key: `cat-${rule.id}`,
          msg: `Já usou ${(ratio * 100).toFixed(0)}% da reserva de "${rule.label}": ${fmt(used)} de ${fmt(limit)}.`,
          level: "warn",
        });
      }
    });

    cardCeilings.filter((c) => c.notifyEnabled && c.limit > 0).forEach((c) => {
      const used = cardSpending[c.accountId] || 0;
      const ratio = used / c.limit;
      const accName = accounts.find((a) => a.id === c.accountId)?.name ?? "Cartão";
      if (ratio >= 1) {
        msgs.push({
          key: `card-${c.accountId}`,
          msg: `Teto excedido em "${accName}" — ${fmt(used)} de ${fmt(c.limit)}`,
          level: "danger",
        });
      } else if (ratio >= c.alertAt / 100) {
        msgs.push({
          key: `card-${c.accountId}`,
          msg: `Você já utilizou ${(ratio * 100).toFixed(0)}% do teto de "${accName}" (${fmt(used)} de ${fmt(c.limit)}).`,
          level: "warn",
        });
      }
    });

    return msgs;
  }, [rules, catSpending, cardCeilings, cardSpending, accounts, totalMonthExpense]);

  return (
    <div className="w-full min-h-screen pb-16 bg-[#08080a] text-[#e2e3e9] relative selection:bg-[#cc9166]/20">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 py-8 space-y-8 relative z-10">

        {/* ─── Header ─── */}
        <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#1c1d22]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#cc9166] text-xs font-mono tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Metodologia &middot; Vault Strategy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-display font-medium tracking-tight text-white">
              Estratégia & Travas de Gastos<span className="text-[#cc9166]">.</span>
            </h1>
            <p className="text-sm text-[#9194a1] max-w-xl">
              Defina sua distribuição ideal de orçamento (ex: 50-30-20) e configure tetos de limite para seus cartões de crédito.
            </p>
          </div>
        </section>

        {/* ─── Notifications ─── */}
        {notifications.length > 0 && (
          <div className="space-y-2">
            {notifications.map((n) => (
              <div
                key={n.key}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl text-xs font-mono border",
                  n.level === "danger"
                    ? "bg-rose-950/30 border-rose-800/40 text-rose-300"
                    : "bg-amber-950/30 border-amber-800/40 text-amber-300"
                )}
              >
                <TriangleAlert className="h-4 w-4 shrink-0" />
                <p className="flex-1">{n.msg}</p>
              </div>
            ))}
          </div>
        )}

        {/* ─── Budget Strategy Section ─── */}
        <section className="bg-[#040406] border border-[#1c1d22] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pb-4 border-b border-[#1c1d22]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#121317] border border-[#1c1d22] text-[#cc9166]">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-serif-display font-semibold text-white">Distribuição do Orçamento</h2>
                <p className="text-xs text-[#9194a1]">Controle percentual de saídas por centro de custo.</p>
              </div>
            </div>
            <div className={cn(
              "text-xs font-mono px-3 py-1 rounded-md border",
              isValid ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/30" : "bg-rose-950/40 text-rose-400 border-rose-800/30"
            )}>
              Total Alocado: {totalPct.toFixed(0)}% / 100%
            </div>
          </div>

          {/* Rule visual strip */}
          <div className="flex h-2.5 rounded-full overflow-hidden border border-[#1c1d22] bg-[#121317]">
            {rules.length === 0 && <div className="w-full bg-[#1c1d22]" />}
            {rules.map((r) => (
              <div
                key={r.id}
                title={`${r.label}: ${r.percentage}%`}
                style={{ width: `${r.percentage}%`, backgroundColor: r.color }}
                className="transition-all duration-500"
              />
            ))}
          </div>

          {/* Rules list */}
          <div className="space-y-3">
            {rules.map((rule) => {
              const catUsed = catSpending[rule.category] || 0;
              const catLimit = (rule.percentage / 100) * totalMonthExpense;
              const ratio = pct(catUsed, catLimit);
              const isDanger = catUsed > catLimit && catLimit > 0;
              const isEditing = editingRuleId === rule.id;

              return (
                <div
                  key={rule.id}
                  className={cn(
                    "border rounded-xl p-4 space-y-3 bg-[#08080a] transition-colors",
                    isDanger ? "border-rose-800/50" : "border-[#1c1d22]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: rule.color }} />
                    {isEditing ? (
                      <Input
                        className="h-8 text-xs font-medium w-44 bg-[#121317] border-[#1c1d22] text-white rounded-lg"
                        value={rule.label}
                        onChange={(e) => updateRule(rule.id, "label", e.target.value)}
                      />
                    ) : (
                      <span className="font-medium text-xs text-white flex-1">{rule.label}</span>
                    )}

                    <span className="text-[11px] font-mono text-[#9194a1] ml-auto">
                      {isDanger ? (
                        <span className="text-rose-400">Excedido</span>
                      ) : (
                        <span className="text-emerald-400">Normal</span>
                      )}
                    </span>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setEditingRuleId(isEditing ? null : rule.id)}
                        className="h-7 w-7 rounded-md flex items-center justify-center bg-[#121317] hover:bg-[#1c1d22] text-[#9194a1] hover:text-white"
                      >
                        {isEditing ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={() => removeRule(rule.id)}
                        className="h-7 w-7 rounded-md flex items-center justify-center bg-rose-950/30 hover:bg-rose-950/60 text-rose-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#1c1d22]">
                      <div className="space-y-1">
                        <Label className="text-[10px] font-mono uppercase text-[#9194a1]">Categoria</Label>
                        <Select
                          value={rule.category}
                          onValueChange={(v) => updateRule(rule.id, "category", v)}
                        >
                          <SelectTrigger className="h-8 bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#08080a] border-[#1c1d22] text-white">
                            {EXPENSE_CATEGORIES.map((c) => (
                              <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-[10px] font-mono uppercase text-[#9194a1]">Percentual ({rule.percentage}%)</Label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={1}
                          className="w-full h-2 bg-[#121317] rounded-lg appearance-none cursor-pointer accent-[#cc9166]"
                          value={rule.percentage}
                          onChange={(e) => updateRule(rule.id, "percentage", Number(e.target.value))}
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-[10px] font-mono uppercase text-[#9194a1]">Cor</Label>
                        <div className="flex gap-1.5 pt-1">
                          {PRESET_COLORS.map((c) => (
                            <button
                              key={c}
                              onClick={() => updateRule(rule.id, "color", c)}
                              className={cn(
                                "w-5 h-5 rounded-full border transition-all",
                                rule.color === c ? "border-white scale-110" : "border-transparent opacity-60"
                              )}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-mono text-[#9194a1]">
                      <span>Gasto: {fmt(catUsed)}</span>
                      <span>Teto: {catLimit > 0 ? fmt(catLimit) : "—"} ({ratio.toFixed(0)}%)</span>
                    </div>
                    <ProgressBar value={ratio} color={rule.color} danger={isDanger} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#1c1d22]">
            <Button
              variant="outline"
              onClick={addRule}
              className="h-8 rounded-lg text-xs font-medium border-[#2e3038] bg-[#121317] text-white hover:bg-[#1c1d22] gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" /> Adicionar Categoria
            </Button>
            <Button
              onClick={handleSaveStrategy}
              disabled={!isValid}
              className="h-8 px-5 rounded-lg bg-white hover:bg-white/90 text-black font-semibold text-xs gap-1.5 border-0 shadow-sm"
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Salvar Estratégia
            </Button>
          </div>
        </section>

        {/* ─── Card Ceilings ─── */}
        <section className="bg-[#040406] border border-[#1c1d22] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#1c1d22]">
            <div className="p-2 rounded-lg bg-[#121317] border border-[#1c1d22] text-[#cc9166]">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif-display font-semibold text-white">Travas de Cartão de Crédito</h2>
              <p className="text-xs text-[#9194a1]">Alertas de teto independentes do limite contratado.</p>
            </div>
          </div>

          {creditCards.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-[#9194a1] rounded-xl bg-[#08080a] border border-[#1c1d22]">
              Nenhum cartão de crédito cadastrado na carteira.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {creditCards.map((card) => {
                const c = getCeiling(card.id);
                const spent = cardSpending[card.id] || 0;
                const ratio = pct(spent, c.limit);
                const isDanger = c.limit > 0 && spent > c.limit;
                const isWarn = c.limit > 0 && ratio >= c.alertAt;
                const isDirty = !!ceilingEdit[card.id];

                return (
                  <TiltCard key={card.id} tiltLimit={8} scale={1.01} perspective={1000}>
                    <div className="bg-[#08080a] border border-[#1c1d22] rounded-2xl p-5 space-y-4 hover:border-[#2e3038] transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: card.color }} />
                          <div>
                            <span className="font-semibold text-xs text-white block">{card.name}</span>
                            <span className="text-[10px] font-mono text-[#9194a1] uppercase">{card.institution}</span>
                          </div>
                        </div>
                        {isDanger ? (
                          <span className="text-[10px] font-mono uppercase text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-800/40">
                            Excedido
                          </span>
                        ) : isWarn ? (
                          <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                            Alerta {c.alertAt}%
                          </span>
                        ) : null}
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="space-y-1">
                          <Label className="text-[10px] font-mono uppercase text-[#9194a1]">Teto Mensal (R$)</Label>
                          <Input
                            type="number"
                            min={0}
                            className="h-8 bg-[#121317] border-[#1c1d22] text-white text-xs font-mono rounded-lg"
                            value={c.limit || ""}
                            placeholder="2000"
                            onChange={(e) => patchCeiling(card.id, "limit", Number(e.target.value))}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] font-mono uppercase text-[#9194a1]">Alarme (%)</Label>
                          <Input
                            type="number"
                            min={1}
                            max={100}
                            className="h-8 bg-[#121317] border-[#1c1d22] text-white text-xs font-mono rounded-lg"
                            value={c.alertAt}
                            onChange={(e) => patchCeiling(card.id, "alertAt", Number(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121317] border border-[#1c1d22]">
                        <Label className="text-[11px] font-mono text-[#9194a1] flex items-center gap-2">
                          {c.notifyEnabled ? <Bell className="h-3.5 w-3.5 text-[#cc9166]" /> : <BellOff className="h-3.5 w-3.5 text-[#9194a1]" />}
                          Alertas de Teto Ativos
                        </Label>
                        <Switch
                          checked={c.notifyEnabled}
                          onCheckedChange={(v) => patchCeiling(card.id, "notifyEnabled", v)}
                        />
                      </div>

                      {c.limit > 0 && (
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[11px] font-mono text-[#9194a1]">
                            <span>Gasto Atual: {fmt(spent)}</span>
                            <span>{ratio.toFixed(0)}% do teto</span>
                          </div>
                          <ProgressBar value={ratio} color={card.color} danger={isDanger} />
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          disabled={!isDirty}
                          onClick={() => saveCeiling(card.id)}
                          className="h-8 flex-1 rounded-lg bg-white hover:bg-white/90 text-black font-semibold text-xs border-0 disabled:opacity-40"
                        >
                          Salvar Trava
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-lg text-[#9194a1] hover:text-rose-400 hover:bg-rose-950/30"
                          onClick={() => deleteCardCeiling(card.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
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
