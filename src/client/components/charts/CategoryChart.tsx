import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Transaction, CATEGORY_COLORS } from "@/client/lib/finance-data";
import { motion } from "framer-motion";
import { useFinance } from "@/client/hooks/use-finance";

interface CategoryChartProps {
  transactions: Transaction[];
}

// Paleta harmônica de fallback para categorias sem cor explícita
const FALLBACK_PALETTE = [
  "#f97316", // Laranja
  "#3b82f6", // Azul
  "#10b981", // Esmeralda
  "#8b5cf6", // Violeta
  "#ec4899", // Rosa
  "#eab308", // Âmbar
  "#06b6d4", // Ciano
  "#14b8a6", // Teal
  "#f43f5e", // Rose
  "#a855f7", // Roxo
  "#84cc16", // Lima
  "#cc9166", // Dourado cobre
];

function getCategoryColor(name: string, index: number, customCategories: any[]): string {
  // 1. Procura nas cores padrão
  if (CATEGORY_COLORS[name]) return CATEGORY_COLORS[name];

  // 2. Normaliza acentos para tentar mapear
  const normalized = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  for (const [key, color] of Object.entries(CATEGORY_COLORS)) {
    const keyNorm = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (keyNorm === normalized) return color;
  }

  // 3. Procura nas categorias customizadas do usuário
  const custom = customCategories.find(c => c.name.toLowerCase() === name.toLowerCase());
  if (custom?.color) return custom.color;

  // 4. Fallback determinístico da paleta harmônica
  return FALLBACK_PALETTE[index % FALLBACK_PALETTE.length];
}

export function CategoryChart({ transactions }: CategoryChartProps) {
  const { customCategories } = useFinance();

  const { data, total } = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");

    const categoryTotals = expenses.reduce<Record<string, number>>((acc, t) => {
      const cat = t.category || "Outros";
      acc[cat] = (acc[cat] || 0) + (Number(t.amount) || 0);
      return acc;
    }, {});

    const sortedData = Object.entries(categoryTotals)
      .map(([name, value], idx) => ({
        name,
        value,
        color: getCategoryColor(name, idx, customCategories),
      }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);

    const sum = sortedData.reduce((s, d) => s + d.value, 0);
    return { data: sortedData, total: sum };
  }, [transactions, customCategories]);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[220px] text-[#9194a1] p-4 text-center">
        <div className="h-12 w-12 rounded-full border border-dashed border-[#2e3038] flex items-center justify-center mb-2 bg-[#0c0d10]">
          <span className="text-xl opacity-60">📊</span>
        </div>
        <p className="text-xs font-semibold text-white">Sem despesas registradas</p>
        <p className="text-[10px] text-[#9194a1] mt-0.5">
          Adicione ou escaneie comprovantes para visualizar
        </p>
      </div>
    );
  }

  const formatCenterTotal = (val: number) => {
    if (val >= 1000) {
      return `R$ ${(val / 1000).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}k`;
    }
    return `R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-4 py-1">
      {/* Donut Chart */}
      <div className="w-36 h-36 shrink-0 relative flex items-center justify-center">
        <div className="absolute inset-[-10%] rounded-full bg-[#cc9166]/10 blur-[24px] pointer-events-none" />
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={42}
              outerRadius={64}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                  style={{ filter: `drop-shadow(0 0 3px ${entry.color}60)` }}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [
                `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
                "Valor",
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #2e3038",
                boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
                backgroundColor: "#0c0d10",
                color: "#e2e3e9",
                fontSize: "11px",
                fontWeight: "600",
                padding: "6px 12px",
              }}
              itemStyle={{ color: "#ffffff" }}
              labelStyle={{ color: "#cc9166", fontWeight: "700", fontSize: "11px" }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[9px] text-[#9194a1] uppercase tracking-wider font-semibold">
            Total
          </span>
          <span className="text-xs font-bold text-white tracking-tight mt-0.5">
            {formatCenterTotal(total)}
          </span>
        </div>
      </div>

      {/* Legend Items with Progress Indicators */}
      <div className="w-full flex-1 max-h-[220px] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-[#1c1d22]">
        {data.map((d, i) => {
          const pct = total > 0 ? ((d.value / total) * 100).toFixed(0) : "0";
          return (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.03 * i }}
              className="p-2 rounded-lg bg-[#08080a] border border-[#1c1d22]/60 hover:border-[#2e3038] transition-all group"
            >
              <div className="flex items-center justify-between gap-2 text-xs mb-1">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: d.color, boxShadow: `0 0 6px ${d.color}50` }}
                  />
                  <span
                    className="text-xs text-[#e2e3e9] truncate font-medium group-hover:text-white transition-colors"
                    title={d.name}
                  >
                    {d.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 font-mono text-right">
                  <span className="text-[10px] text-[#9194a1] px-1 py-0.5 rounded bg-[#121317]">
                    {pct}%
                  </span>
                  <span className="text-xs font-semibold text-white">
                    R$ {d.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Mini progress bar */}
              <div className="w-full h-1 rounded-full bg-[#121317] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: d.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
