import {
  AreaChart,
  Area,
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

interface MonthlyChartProps {
  transactions: Transaction[];
}

export function MonthlyChart({ transactions }: MonthlyChartProps) {
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), 5 - i);
    return {
      date,
      label: format(date, "MMM", { locale: ptBR }),
      fullLabel: format(date, "MMMM yyyy", { locale: ptBR }),
      start: startOfMonth(date),
      end: endOfMonth(date),
    };
  });

  const data = months.map((m) => {
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
  );
}
