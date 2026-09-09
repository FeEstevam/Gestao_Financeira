import { useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Transaction } from "@/client/lib/finance-data";
import { isSameDay } from "date-fns";
import { cn } from "@/client/lib/utils";

interface FinanceCalendarProps {
  transactions: Transaction[];
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  currentMonth: Date;
}

export function FinanceCalendar({
  transactions,
  selectedDate,
  onSelectDate,
  currentMonth,
}: FinanceCalendarProps) {
  const dayData = useMemo(() => {
    const map = new Map<string, { income: number; expense: number }>();
    transactions.forEach((t) => {
      const key = new Date(t.date).toDateString();
      const prev = map.get(key) || { income: 0, expense: 0 };
      if (t.type === "income") prev.income += t.amount;
      else prev.expense += t.amount;
      map.set(key, prev);
    });
    return map;
  }, [transactions]);

  return (
    <div className="space-y-3">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        month={currentMonth}
        className="p-3 pointer-events-auto w-full"
        classNames={{
          months: "flex flex-col w-full",
          month: "space-y-4 w-full",
          table: "w-full border-collapse",
          head_row: "flex w-full",
          head_cell: "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] text-center",
          row: "flex w-full mt-1",
          cell: "flex-1 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
          day: "h-10 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-[#1a1b23] text-[#e2e3e9] rounded-lg flex flex-col items-center justify-center gap-0.5 transition-colors",
          day_selected: "!bg-[#cc9166] !text-black font-semibold hover:!bg-[#e8a87c] shadow-md",
          day_today: "border border-[#cc9166]/50 text-white font-semibold",
          day_outside: "text-[#4a4c5e] opacity-40",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium text-white",
          nav: "hidden",
        }}
        components={{
          DayContent: ({ date }) => {
            const key = date.toDateString();
            const data = dayData.get(key);
            return (
              <div className="flex flex-col items-center">
                <span className="text-xs">{date.getDate()}</span>
                {data && (
                  <div className="flex gap-0.5">
                    {data.income > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm" />
                    )}
                    {data.expense > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-sm" />
                    )}
                  </div>
                )}
              </div>
            );
          },
        }}
      />

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-[#9194a1] pt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm" />
          <span>Receita</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400 shadow-sm" />
          <span>Despesa</span>
        </div>
      </div>

      {/* Selected day summary */}
      {selectedDate && (() => {
        const key = selectedDate.toDateString();
        const data = dayData.get(key);
        const dayTransactions = transactions.filter((t) =>
          isSameDay(new Date(t.date), selectedDate)
        );
        if (!dayTransactions.length) return null;
        return (
          <div
            className="rounded-xl p-3.5 space-y-2.5 border shadow-lg"
            style={{
              background: "linear-gradient(180deg, #0c0d12 0%, #08080c 100%)",
              borderColor: "#2e3038",
            }}
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-[#1c1d26]">
              <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc9166]" />
                Transações do dia
              </p>
              <span className="text-[10px] font-mono text-[#cc9166] px-1.5 py-0.5 rounded bg-[#1a1b23] border border-[#2e3038]">
                {dayTransactions.length} {dayTransactions.length === 1 ? "registro" : "registros"}
              </span>
            </div>

            <div className="max-h-[150px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-[#1c1d26]">
              {dayTransactions.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#0f1015] border border-[#1c1d26]/80 hover:border-[#2e3038] transition-colors"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="truncate text-[#e2e3e9] font-medium" title={t.description}>
                      {t.description}
                    </p>
                    <p className="text-[10px] text-[#9194a1]">{t.category || "Geral"}</p>
                  </div>
                  <span
                    className={cn(
                      "font-semibold font-mono text-xs shrink-0 whitespace-nowrap",
                      t.type === "income" ? "text-emerald-400" : "text-rose-400"
                    )}
                  >
                    {t.type === "income" ? "+" : "-"} R$ {t.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
