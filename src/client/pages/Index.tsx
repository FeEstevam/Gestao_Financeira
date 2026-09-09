import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Sparkles,
  Sliders,
  ArrowUpRight,
  Activity,
  Eye,
  Zap,
  Shield,
  PieChart,
  LayoutList,
  Clock,
  ArrowDownRight,
} from "lucide-react";
import { format, startOfMonth, endOfMonth, isWithinInterval, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSearchParams } from "react-router-dom";
import { TransactionList } from "@/components/finance/TransactionList";
import { AddTransactionDialog } from "@/components/finance/AddTransactionDialog";
import { DataExchange } from "@/components/finance/DataExchange";
import { ReceiptScanner } from "@/components/finance/ReceiptScanner";
import { CategoryChart } from "@/components/charts/CategoryChart";
import { MonthlyChart } from "@/components/charts/MonthlyChart";
import { FinanceCalendar } from "@/components/finance/FinanceCalendar";
import { useFinance } from "@/client/hooks/use-finance";
import { usePrivacy } from "@/client/hooks/use-privacy";
import { Button } from "@/components/ui/button";
import { getSession } from "@/client/lib/auth";
import { cn } from "@/client/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "@/client/components/ui/tilt-card";

export const Index = () => {
  const {
    transactions,
    accounts,
    addTransactions,
    deleteTransaction,
    toggleNotification,
    budgetRules,
    cardCeilings,
  } = useFinance();
  const { isPrivate } = usePrivacy();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const user = getSession();

  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setDialogOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const { filtered, totalIncome, totalExpense, balance, transactionCount } = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    const _filtered = transactions.filter((t) =>
      isWithinInterval(new Date(t.date), { start: monthStart, end: monthEnd })
    );

    const _income = _filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const _expense = _filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

    return {
      filtered: _filtered,
      totalIncome: _income,
      totalExpense: _expense,
      balance: _income - _expense,
      transactionCount: _filtered.length,
    };
  }, [transactions, currentMonth]);

  const fmt = (v: number) => isPrivate ? "R$ •••••" : `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  const catSpending = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.filter(t => t.type === "expense").forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return map;
  }, [filtered]);

  const cardSpending = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.filter(t => t.type === "expense" && t.accountId).forEach(t => {
      map[t.accountId!] = (map[t.accountId!] || 0) + t.amount;
    });
    return map;
  }, [filtered]);

  return (
    <div className="w-full min-h-screen pb-16 bg-[#08080a] text-[#e2e3e9] relative selection:bg-[#cc9166]/20">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-8 space-y-8 relative z-10">

        {/* ─── Hero / Executive Summary Header ─── */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[#1c1d22]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#cc9166] text-xs font-mono tracking-widest uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#cc9166]" />
              Painel Financeiro &middot; {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-display font-medium tracking-tight text-white">
              Visão Patrimonial<span className="text-[#cc9166]">.</span>
            </h1>
            <p className="text-sm text-[#9194a1] max-w-xl">
              Consolidado de fluxo de caixa, rendimentos, saídas e saúde financeira em tempo real.
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-3">
            <ReceiptScanner onAdd={addTransactions} />
            <DataExchange onImport={addTransactions} transactions={transactions} />
            <AddTransactionDialog onAdd={addTransactions} open={dialogOpen} onOpenChange={setDialogOpen} />
          </div>
        </section>

        {/* ─── Top KPIs Strip with 3D TiltCards ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Liquid Balance Card (Primary) */}
          <TiltCard tiltLimit={10} scale={1.02} perspective={1000} className="w-full">
            <div className="h-full rounded-2xl bg-[#040406] border border-[#2e3038] p-5 flex flex-col justify-between relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#cc9166]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-[#cc9166]">Saldo Disponível</span>
                <div className="p-1.5 rounded-lg bg-[#121317] border border-[#1c1d22] text-[#e2e3e9]">
                  <Wallet className="h-4 w-4 text-[#cc9166]" />
                </div>
              </div>
              <div className="relative z-10 space-y-1">
                <div className="text-2xl sm:text-3xl font-serif-display font-semibold text-white tracking-tight">
                  {fmt(balance)}
                </div>
                <p className="text-[11px] text-[#9194a1]">
                  Resultado líquido acumulado do mês
                </p>
              </div>
            </div>
          </TiltCard>

          {/* Income Card */}
          <TiltCard tiltLimit={10} scale={1.02} perspective={1000} className="w-full">
            <div className="h-full rounded-2xl bg-[#040406] border border-[#1c1d22] p-5 flex flex-col justify-between relative overflow-hidden shadow-xl hover:border-[#2e3038] transition-colors">
              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Total Receitas</span>
                <div className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/30 text-emerald-400">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="relative z-10 space-y-1">
                <div className="text-2xl sm:text-3xl font-serif-display font-semibold text-white tracking-tight">
                  {fmt(totalIncome)}
                </div>
                <p className="text-[11px] text-[#9194a1]">
                  Entradas confirmadas no período
                </p>
              </div>
            </div>
          </TiltCard>

          {/* Expense Card */}
          <TiltCard tiltLimit={10} scale={1.02} perspective={1000} className="w-full">
            <div className="h-full rounded-2xl bg-[#040406] border border-[#1c1d22] p-5 flex flex-col justify-between relative overflow-hidden shadow-xl hover:border-[#2e3038] transition-colors">
              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-rose-400">Total Despesas</span>
                <div className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-800/30 text-rose-400">
                  <ArrowDownRight className="h-4 w-4" />
                </div>
              </div>
              <div className="relative z-10 space-y-1">
                <div className="text-2xl sm:text-3xl font-serif-display font-semibold text-white tracking-tight">
                  {fmt(totalExpense)}
                </div>
                <p className="text-[11px] text-[#9194a1]">
                  Saídas liquidadas e programadas
                </p>
              </div>
            </div>
          </TiltCard>

          {/* Month Navigator Card */}
          <div className="rounded-2xl bg-[#040406] border border-[#1c1d22] p-5 flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9194a1]">Período de Apuração</span>
              <button
                onClick={() => setCurrentMonth(new Date())}
                className="text-[10px] font-mono text-[#cc9166] hover:underline"
              >
                Mês Atual
              </button>
            </div>
            <div className="flex items-center justify-between my-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#9194a1] hover:text-white hover:bg-[#121317] rounded-lg border border-[#1c1d22]"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-serif-display text-base font-semibold text-white capitalize">
                {format(currentMonth, "MMM yyyy", { locale: ptBR })}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#9194a1] hover:text-white hover:bg-[#121317] rounded-lg border border-[#1c1d22]"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-[11px] text-[#9194a1] text-center font-mono">
              {transactionCount} lançamentos computados
            </div>
          </div>
        </div>

        {/* ─── Main Content Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column (Charts & Graph) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Monthly Flow Chart */}
            <div className="rounded-2xl bg-[#040406] border border-[#1c1d22] p-6 relative overflow-hidden shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1c1d22]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-[#cc9166]" />
                    <h2 className="text-lg font-serif-display font-semibold text-white">
                      Evolução de Fluxo Mensal
                    </h2>
                  </div>
                  <p className="text-xs text-[#9194a1]">
                    Comparativo histórico de receitas versus despesas ao longo do tempo.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]" />
                    <span className="text-[#9194a1]">Receitas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#cc9166]" />
                    <span className="text-[#9194a1]">Despesas</span>
                  </div>
                </div>
              </div>

              <div className="h-[300px] w-full">
                <MonthlyChart transactions={transactions} />
              </div>
            </div>

            {/* Secondary Grid (Calendar & Categories) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Timeline Calendar */}
              <div className="rounded-2xl bg-[#040406] border border-[#1c1d22] p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#1c1d22]">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-[#cc9166]" />
                    <h3 className="text-sm font-serif-display font-semibold text-white">
                      Calendário Térmico
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#9194a1] px-2 py-0.5 rounded bg-[#121317] border border-[#1c1d22]">
                    Mensal
                  </span>
                </div>
                <div className="bg-[#08080a] rounded-xl p-2 border border-[#1c1d22]/50">
                  <FinanceCalendar
                    transactions={filtered}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    currentMonth={currentMonth}
                  />
                </div>
              </div>

              {/* Categories Distribution */}
              <div className="rounded-2xl bg-[#040406] border border-[#1c1d22] p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#1c1d22]">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-[#cc9166]" />
                    <h3 className="text-sm font-serif-display font-semibold text-white">
                      Distribuição por Categoria
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#cc9166] px-2 py-0.5 rounded bg-[#121317] border border-[#1c1d22]">
                    {Object.keys(catSpending).length} Categorias
                  </span>
                </div>
                <div className="w-full min-h-[240px] flex items-center justify-center">
                  <CategoryChart transactions={filtered} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Live History & Budget Watch) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Live Ledger / Transaction Feed */}
            <div className="rounded-2xl bg-[#040406] border border-[#1c1d22] p-5 flex flex-col h-[520px] shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#1c1d22] mb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <LayoutList className="h-4 w-4 text-[#cc9166]" />
                    <h3 className="text-sm font-serif-display font-semibold text-white">
                      Extrato Recente
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#9194a1] font-mono">
                    {transactionCount} registros no mês
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs border-[#2e3038] bg-[#121317] text-[#e2e3e9] hover:bg-white hover:text-black hover:border-white transition-colors rounded-lg"
                  asChild
                >
                  <Link to="/view-all-actives" className="flex items-center gap-1">
                    <span>Ver Tudo</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto pr-1">
                <TransactionList
                  transactions={filtered}
                  onDelete={deleteTransaction}
                  onToggleNotification={toggleNotification}
                />
              </div>
            </div>

            {/* Budget & Card Ceilings Radar */}
            {budgetRules.length > 0 && (
              <div className="rounded-2xl bg-[#040406] border border-[#1c1d22] p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#1c1d22]">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#cc9166]" />
                    <h3 className="text-sm font-serif-display font-semibold text-white">
                      Radar de Limites
                    </h3>
                  </div>
                  <Link
                    to="/estrategia"
                    className="text-xs text-[#9194a1] hover:text-white transition-colors"
                  >
                    <Sliders className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {budgetRules.map((rule) => {
                    const used = catSpending[rule.category] || 0;
                    const limit = (rule.percentage / 100) * totalExpense;
                    const ratio = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
                    const isDanger = limit > 0 && used > limit;

                    return (
                      <div
                        key={rule.id}
                        className="p-3 rounded-xl bg-[#08080a] border border-[#1c1d22] space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-white flex items-center gap-2">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: rule.color }}
                            />
                            {rule.label}
                          </span>
                          <span
                            className={cn(
                              "font-mono text-[10px] px-2 py-0.5 rounded",
                              isDanger
                                ? "bg-rose-950 text-rose-400 border border-rose-800"
                                : "bg-[#121317] text-[#9194a1]"
                            )}
                          >
                            {isDanger ? "ALERTA" : `${ratio.toFixed(0)}%`}
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#121317] overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              isDanger ? "bg-rose-500" : ""
                            )}
                            style={{
                              width: `${ratio}%`,
                              backgroundColor: isDanger ? undefined : rule.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
