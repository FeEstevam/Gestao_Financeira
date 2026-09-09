import {
<<<<<<< HEAD
  BarChart,
  Bar,
=======
  AreaChart,
  Area,
>>>>>>> 8aaefac (New UI:UX etc..)
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Transaction } from "@/client/lib/finance-data";
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
<<<<<<< HEAD
import { useTheme } from "@/components/theme-provider";
=======
>>>>>>> 8aaefac (New UI:UX etc..)

interface MonthlyChartProps {
  transactions: Transaction[];
}

export function MonthlyChart({ transactions }: MonthlyChartProps) {
<<<<<<< HEAD
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

=======
>>>>>>> 8aaefac (New UI:UX etc..)
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), 5 - i);
    return {
      date,
      label: format(date, "MMM", { locale: ptBR }),
<<<<<<< HEAD
=======
      fullLabel: format(date, "MMMM yyyy", { locale: ptBR }),
>>>>>>> 8aaefac (New UI:UX etc..)
      start: startOfMonth(date),
      end: endOfMonth(date),
    };
  });

  const data = months.map((m) => {
<<<<<<< HEAD
    const monthTx = transactions.filter((t) =>
      isWithinInterval(new Date(t.date), { start: m.start, end: m.end })
    );
    return {
      month: m.label,
      Receitas: monthTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
      Despesas: monthTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    };
  });

  const axisColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const tickColor = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.45)";
  const gridColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barGap={6} barSize={18}>
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
            <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb7185" stopOpacity={1} />
            <stop offset="100%" stopColor="#e11d48" stopOpacity={0.8} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={gridColor}
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: tickColor, fontWeight: 600 }}
          stroke={axisColor}
          axisLine={false}
          tickLine={false}
          dy={8}
        />
        <YAxis
          tick={{ fontSize: 10, fill: tickColor, fontWeight: 600 }}
          stroke={axisColor}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          axisLine={false}
          tickLine={false}
          dx={-5}
        />
        <Tooltip
          formatter={(value: number) =>
            `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
          }
          contentStyle={{
            borderRadius: "16px",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
            boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.6)" : "0 8px 32px rgba(0,0,0,0.1)",
            backgroundColor: isDark ? "rgba(8,8,16,0.95)" : "rgba(255,255,255,0.95)",
            color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)",
            backdropFilter: "blur(12px)",
            fontSize: "12px",
            fontWeight: "600",
            padding: "10px 16px",
          }}
          itemStyle={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}
          labelStyle={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontWeight: "700", textTransform: "uppercase", fontSize: "10px", letterSpacing: "0.05em" }}
          cursor={{ fill: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}
        />
        <Legend
          wrapperStyle={{
            fontSize: "11px",
            fontWeight: "700",
            color: tickColor,
            paddingTop: "12px"
          }}
          iconType="circle"
          iconSize={8}
        />
        <Bar
          dataKey="Receitas"
          fill="url(#incomeGradient)"
          radius={[6, 6, 0, 0]}
          animationDuration={1200}
          animationBegin={0}
        />
        <Bar
          dataKey="Despesas"
          fill="url(#expenseGradient)"
          radius={[6, 6, 0, 0]}
          animationDuration={1200}
          animationBegin={200}
        />
      </BarChart>
    </ResponsiveContainer>
=======
    const monthTx = transactions.filter((t) => {
      try {
        const txDate = new Date(t.date);
        return isWithinInterval(txDate, { start: m.start, end: m.end });
      } catch {
        return false;
      }
    });

    const income = monthTx.filter((t) => t.type === "income").reduce((s, t) => s + (Number(t.amount) || 0), 0);
    const expense = monthTx.filter((t) => t.type === "expense").reduce((s, t) => s + (Number(t.amount) || 0), 0);

    return {
      month: m.label.toUpperCase(),
      fullLabel: m.fullLabel,
      Receitas: income,
      Despesas: expense,
    };
  });

  const hasData = data.some((d) => d.Receitas > 0 || d.Despesas > 0);

  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height={290}>
        <AreaChart data={data} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
          <defs>
            {/* Gilded Emerald Gradient for Incomes Line */}
            <linearGradient id="gildedIncomeArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#34d399" stopOpacity={0.0} />
            </linearGradient>

            {/* Gilded Rose/Copper Gradient for Expenses Line */}
            <linearGradient id="gildedExpenseArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cc9166" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#cc9166" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: "#8a8880", fontFamily: "monospace" }}
            stroke="#1c1d22"
            axisLine={{ stroke: "#1c1d22" }}
            tickLine={false}
            dy={8}
          />

          <YAxis
            tick={{ fontSize: 9, fill: "#6b6960", fontFamily: "monospace" }}
            stroke="#1c1d22"
            tickFormatter={(v) => `R$${Math.abs(v) >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
            axisLine={false}
            tickLine={false}
            dx={-2}
          />

          <Tooltip
            formatter={(value: number, name: string) => [
              `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
              name,
            ]}
            contentStyle={{
              borderRadius: "14px",
              border: "1px solid #1c1d22",
              boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
              backgroundColor: "#040406",
              color: "#f5f4f0",
              fontSize: "11px",
              padding: "10px 14px",
            }}
            labelStyle={{
              color: "#cc9166",
              fontWeight: "600",
              textTransform: "uppercase",
              fontSize: "10px",
              letterSpacing: "0.05em",
              marginBottom: "4px",
              fontFamily: "monospace",
            }}
            cursor={{ stroke: "#2e3038", strokeWidth: 1, strokeDasharray: "3 3" }}
          />

          <Legend
            verticalAlign="top"
            align="right"
            height={36}
            iconType="circle"
            iconSize={7}
            wrapperStyle={{
              fontSize: "10px",
              fontFamily: "monospace",
              color: "#8a8880",
              paddingBottom: "10px",
            }}
          />

          {/* Smooth Line Curve for Incomes */}
          <Area
            type="monotone"
            dataKey="Receitas"
            name="Receitas"
            stroke="#34d399"
            strokeWidth={2.5}
            fill="url(#gildedIncomeArea)"
            dot={{ r: 3.5, fill: "#34d399", stroke: "#040406", strokeWidth: 1.5 }}
            activeDot={{ r: 6, fill: "#ffffff", stroke: "#34d399", strokeWidth: 2.5 }}
            animationDuration={1200}
          />

          {/* Smooth Line Curve for Expenses */}
          <Area
            type="monotone"
            dataKey="Despesas"
            name="Despesas"
            stroke="#cc9166"
            strokeWidth={2.5}
            fill="url(#gildedExpenseArea)"
            dot={{ r: 3.5, fill: "#cc9166", stroke: "#040406", strokeWidth: 1.5 }}
            activeDot={{ r: 6, fill: "#ffffff", stroke: "#cc9166", strokeWidth: 2.5 }}
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>

      {!hasData && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#040406]/60 backdrop-blur-[2px] rounded-xl pointer-events-none">
          <p className="text-xs font-mono text-[#8a8880] bg-[#121317] px-3 py-1.5 rounded-lg border border-[#1c1d22]">
            Nenhuma movimentação computada no semestre
          </p>
        </div>
      )}
    </div>
>>>>>>> 8aaefac (New UI:UX etc..)
  );
}
