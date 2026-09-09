import { useMemo, useState } from "react";
import {
  FileBarChart,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_COLORS } from "@/client/lib/finance-data";
import { format, startOfMonth, endOfMonth, isWithinInterval, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFinance } from "@/client/hooks/use-finance";
import { cn } from "@/client/lib/utils";
import { TiltCard } from "@/client/components/ui/tilt-card";

type Period = "1" | "3" | "6" | "12";

const fmt = (v: number) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

export default function Reports() {
  const [period, setPeriod] = useState<Period>("3");
  const { transactions } = useFinance();

  const now = new Date();
  const months = parseInt(period);

  const filtered = useMemo(() => {
    const start = startOfMonth(subMonths(now, months - 1));
    const end = endOfMonth(now);
    return transactions.filter((t) =>
      isWithinInterval(new Date(t.date), { start, end })
    );
  }, [transactions, months]);

  const totalIncome = filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.filter((t) => t.type === "expense").forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filtered]);

  const monthlyData = useMemo(() => {
    const map: Record<string, { income: number; expense: number }> = {};
    for (let i = months - 1; i >= 0; i--) {
      const d = subMonths(now, i);
      const key = format(d, "MMM/yy", { locale: ptBR });
      map[key] = { income: 0, expense: 0 };
    }
    filtered.forEach((t) => {
      const key = format(new Date(t.date), "MMM/yy", { locale: ptBR });
      if (map[key]) {
        if (t.type === "income") map[key].income += t.amount;
        else map[key].expense += t.amount;
      }
    });
    return Object.entries(map).map(([month, data]) => ({
      month,
      ...data,
      balance: data.income - data.expense,
    }));
  }, [filtered, months]);

  function handleExport() {
    const csvRows = ["Descrição,Tipo,Categoria,Forma de Pagamento,Valor,Data"];
    filtered.forEach((t) => {
      csvRows.push(`"${t.description}",${t.type},${t.category},${t.paymentMethod},${t.amount},${format(new Date(t.date), "dd/MM/yyyy")}`);
    });
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio-financeiro-${format(now, "yyyy-MM")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full min-h-screen pb-16 bg-[#08080a] text-[#e2e3e9] relative selection:bg-[#cc9166]/20">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-8 space-y-8 relative z-10">

        {/* ─── Header Section ─── */}
        <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-[#1c1d22]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#cc9166] text-xs font-mono tracking-widest uppercase">
              <FileBarChart className="h-3.5 w-3.5" />
              <span>Demonstrativo &middot; DRE e Auditoria</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-display font-medium tracking-tight text-white">
              Relatórios & Análise de Fluxo<span className="text-[#cc9166]">.</span>
            </h1>
            <p className="text-sm text-[#9194a1] max-w-xl">
              Consolidação de fluxo de caixa histórico, divisão setorial e exportação de dados auditáveis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
              <SelectTrigger className="w-[150px] h-9 bg-[#121317] border-[#1c1d22] text-xs text-white rounded-lg">
                <Calendar className="h-3.5 w-3.5 mr-2 text-[#cc9166]" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#08080a] border-[#1c1d22] text-white">
                <SelectItem value="1">Último Mês</SelectItem>
                <SelectItem value="3">Último Trimestre</SelectItem>
                <SelectItem value="6">Último Semestre</SelectItem>
                <SelectItem value="12">Ano Atual</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleExport}
              className="h-9 px-4 bg-white hover:bg-white/90 text-black font-semibold text-xs rounded-lg shadow-sm gap-2 border-0"
            >
              <Download className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Exportar CSV</span>
            </Button>
          </div>
        </section>

        {/* ─── Hero Metrics Strip ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Receitas do Período",
              value: fmt(totalIncome),
              icon: TrendingUp,
              color: "text-emerald-400",
              badgeBg: "bg-emerald-950/40 border-emerald-800/30",
            },
            {
              label: "Despesas do Período",
              value: fmt(totalExpense),
              icon: TrendingDown,
              color: "text-rose-400",
              badgeBg: "bg-rose-950/40 border-rose-800/30",
            },
            {
              label: "Saldo Líquido",
              value: fmt(balance),
              icon: Wallet,
              color: balance >= 0 ? "text-emerald-400" : "text-rose-400",
              badgeBg: balance >= 0 ? "bg-emerald-950/40 border-emerald-800/30" : "bg-rose-950/40 border-rose-800/30",
            },
            {
              label: "Transações Computadas",
              value: String(filtered.length),
              icon: Activity,
              color: "text-[#cc9166]",
              badgeBg: "bg-[#121317] border-[#1c1d22]",
            },
          ].map((metric, i) => (
            <TiltCard key={i} tiltLimit={8} scale={1.01} perspective={1000}>
              <div className="bg-[#040406] border border-[#1c1d22] p-5 rounded-2xl shadow-xl flex flex-col justify-between h-full space-y-3 hover:border-[#2e3038] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#9194a1] uppercase tracking-widest">{metric.label}</span>
                  <div className={cn("p-1.5 rounded-lg border", metric.badgeBg, metric.color)}>
                    <metric.icon className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <p className="text-2xl font-serif-display font-semibold text-white tracking-tight">{metric.value}</p>
                  <p className="text-[11px] text-[#9194a1]">Período selecionado ({months}m)</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* ─── Main Charts Area ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

          {/* Area Chart */}
          <div className="bg-[#040406] rounded-2xl border border-[#1c1d22] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c1d22]">
              <div>
                <h3 className="text-base font-serif-display font-semibold text-white">Evolução de Fluxo</h3>
                <p className="text-xs text-[#9194a1]">Histórico comparativo mensal</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[#9194a1]">Receitas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span className="text-[#9194a1]">Despesas</span>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f87171" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1c1d22" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#9194a1" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#9194a1" }}
                    tickFormatter={(v) => `R$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#040406",
                      border: "1px solid #2e3038",
                      borderRadius: "12px",
                      color: "#e2e3e9",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    name="Receita"
                    stroke="#34d399"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#incomeGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    name="Despesa"
                    stroke="#f87171"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#expenseGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-[#040406] rounded-2xl border border-[#1c1d22] p-6 shadow-xl flex flex-col justify-between">
            <div className="pb-3 border-b border-[#1c1d22]">
              <h3 className="text-base font-serif-display font-semibold text-white">Distribuição por Categoria</h3>
              <p className="text-xs text-[#9194a1]">Onde se concentram as despesas</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
              {categoryData.length === 0 ? (
                <div className="text-xs font-mono text-[#9194a1]">Sem despesas registradas</div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((entry) => (
                        <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#cc9166"} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => fmt(value)}
                      contentStyle={{
                        backgroundColor: "#040406",
                        border: "1px solid #2e3038",
                        borderRadius: "12px",
                        color: "#e2e3e9",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="text-[11px] text-[#9194a1] text-center font-mono">
              {categoryData.length} categorias apuradas
            </div>
          </div>
        </div>

        {/* ─── Breakdown Sublist ─── */}
        <section className="bg-[#040406] rounded-2xl border border-[#1c1d22] p-6 shadow-xl space-y-4">
          <div className="pb-3 border-b border-[#1c1d22]">
            <h3 className="text-base font-serif-display font-semibold text-white">Detalhamento Setorial</h3>
            <p className="text-xs text-[#9194a1]">Desdobramento de gastos por centro de custo</p>
          </div>

          {categoryData.length === 0 ? (
            <p className="text-center text-xs font-mono text-[#9194a1] py-8">
              Não há dados suficientes no período selecionado.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categoryData.map((cat) => {
                const count = filtered.filter((t) => t.category === cat.name && t.type === "expense").length;
                const pct = totalExpense > 0 ? ((cat.value / totalExpense) * 100) : 0;
                const color = CATEGORY_COLORS[cat.name] || "#cc9166";

                return (
                  <div key={cat.name} className="p-3.5 rounded-xl bg-[#08080a] border border-[#1c1d22] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        <span className="font-medium text-xs text-white">{cat.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#9194a1]">
                        {count} {count === 1 ? 'registro' : 'registros'}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold font-mono text-white">{fmt(cat.value)}</span>
                      <span className="text-xs font-mono font-medium" style={{ color }}>{pct.toFixed(1)}%</span>
                    </div>

                    <div className="w-full bg-[#121317] rounded-full h-1.5 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
