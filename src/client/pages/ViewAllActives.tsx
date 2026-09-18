import { useState, useMemo } from "react";
import { format, parseISO, isToday, isYesterday, isSameWeek, isSameMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFinance } from "@/client/hooks/use-finance";
import { getIconComponent, DEFAULT_CATEGORY_ICON_MAP } from "@/client/lib/icons";
import { NotificationToggle } from "@/components/finance/NotificationToggle";
import {
  ArrowLeft,
  Search,
  Trash2,
  LayoutGrid,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Receipt,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Transaction, CATEGORY_COLORS } from "@/client/lib/finance-data";
import { usePrivacy } from "@/client/hooks/use-privacy";
import { cn } from "@/client/lib/utils";
import { motion } from "framer-motion";

type FilterType = "all" | "income" | "expense";

export default function ViewAllActives() {
  const { transactions, deleteTransaction, toggleNotification, customCategories } = useFinance();
  const { isPrivate } = usePrivacy();
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group duplicate transactions
  const groupedTransactions = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};

    transactions.forEach(t => {
      const key = `${t.description}_${t.amount}_${t.category}_${t.paymentMethod || ''}_${t.type}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(t);
    });

    const result: Transaction[] = [];

    Object.values(groups).forEach(group => {
      if (group.length > 1) {
        const sortedDates = group.map(g => parseISO(g.date)).sort((a, b) => a.getTime() - b.getTime());
        const minDate = sortedDates[0];
        const maxDate = sortedDates[sortedDates.length - 1];

        const dateStr = `${format(minDate, "dd/MM/yy")} a ${format(maxDate, "dd/MM/yy")}`;

        result.push({
          ...group[0],
          id: group.map(g => g.id).join(","),
          date: maxDate.toISOString(),
          virtualRange: dateStr,
          groupedIds: group.map(g => g.id),
        });
      } else {
        result.push(group[0]);
      }
    });

    return result;
  }, [transactions]);

  // Apply filters
  const filteredTransactions = useMemo(() => {
    let result = groupedTransactions;

    if (filterType !== "all") {
      result = result.filter(t => t.type === filterType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.paymentMethod && t.paymentMethod.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter(t => t.category === selectedCategory);
    }

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [groupedTransactions, filterType, searchQuery, selectedCategory]);

  // Group by date sections
  const groupedByDate = useMemo(() => {
    const groups: { label: string; transactions: Transaction[] }[] = [];
    const labelMap = new Map<string, Transaction[]>();

    filteredTransactions.forEach(t => {
      const date = new Date(t.date);
      let label: string;

      if (isToday(date)) {
        label = "Hoje";
      } else if (isYesterday(date)) {
        label = "Ontem";
      } else if (isSameWeek(date, new Date(), { weekStartsOn: 0 })) {
        label = "Esta Semana";
      } else if (isSameMonth(date, new Date())) {
        label = "Este Mês";
      } else {
        label = format(date, "MMMM yyyy", { locale: ptBR });
        label = label.charAt(0).toUpperCase() + label.slice(1);
      }

      if (!labelMap.has(label)) labelMap.set(label, []);
      labelMap.get(label)!.push(t);
    });

    labelMap.forEach((txns, label) => {
      groups.push({ label, transactions: txns });
    });

    return groups;
  }, [filteredTransactions]);

  // Stats
  const stats = useMemo(() => {
    const income = filteredTransactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = filteredTransactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { total: filteredTransactions.length, income, expense };
  }, [filteredTransactions]);

  // Categories for filter
  const categories = useMemo(() => {
    const cats = new Set<string>();
    groupedTransactions.forEach(t => cats.add(t.category));
    return Array.from(cats).sort();
  }, [groupedTransactions]);

  const handleDelete = (id: string) => {
    if (id.includes(",")) {
      id.split(",").forEach(singleId => deleteTransaction(singleId));
    } else {
      deleteTransaction(id);
    }
  };

  const handleToggle = (id: string) => {
    if (id.includes(",")) {
      id.split(",").forEach(singleId => toggleNotification(singleId));
    } else {
      toggleNotification(id);
    }
  };

  const fmt = (v: number) => isPrivate ? "R$ •••••" : `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  const filterTabs: { key: FilterType; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: "Todas", icon: <LayoutGrid className="h-3.5 w-3.5" /> },
    { key: "income", label: "Receitas", icon: <ArrowUpRight className="h-3.5 w-3.5" /> },
    { key: "expense", label: "Despesas", icon: <ArrowDownRight className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="w-full min-h-screen pb-16 bg-[#08080a] text-[#e2e3e9] relative selection:bg-[#cc9166]/20">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 py-8 space-y-8 relative z-10">

        {/* ─── Hero Header ─── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-[#121317] hover:bg-[#1c1d22] text-[#9194a1] hover:text-white rounded-lg border border-[#1c1d22] transition-colors"
              asChild
            >
              <Link to="/"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div className="flex items-center gap-2 text-xs font-mono text-[#9194a1] uppercase tracking-widest">
              <Link to="/" className="hover:text-white transition-colors">Painel</Link>
              <span>/</span>
              <span className="text-[#cc9166]">Todas as Atividades</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#1c1d22]">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-serif-display font-medium tracking-tight text-white">
                Livro Razão Completo<span className="text-[#cc9166]">.</span>
              </h1>
              <p className="text-sm text-[#9194a1]">
                Extrato detalhado de transações, agrupamentos automáticos e auditoria patrimonial.
              </p>
            </div>

            {/* Quick Stats Strip */}
            <div className="flex items-center gap-3 bg-[#040406] px-4 py-2 rounded-xl border border-[#1c1d22]">
              <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{fmt(stats.income)}</span>
              </div>
              <div className="w-px h-3.5 bg-[#1c1d22]" />
              <div className="flex items-center gap-1.5 font-mono text-xs text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>{fmt(stats.expense)}</span>
              </div>
              <div className="w-px h-3.5 bg-[#1c1d22]" />
              <span className="text-[11px] font-mono text-[#9194a1]">{stats.total} itens</span>
            </div>
          </div>
        </section>

        {/* ─── Filter Bar ─── */}
        <section className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9194a1] pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por descrição, categoria ou meio de pagamento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-9 bg-[#040406] border border-[#1c1d22] rounded-xl text-xs text-white placeholder:text-[#9194a1] focus:outline-none focus:border-[#2e3038] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-[#121317] text-[#9194a1] hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Type Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#040406] p-1 rounded-xl border border-[#1c1d22]">
              {filterTabs.map(tab => {
                const isActive = filterType === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setFilterType(tab.key)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      isActive
                        ? "bg-[#121317] text-white border border-[#2e3038]"
                        : "text-[#9194a1] hover:text-white border border-transparent"
                    )}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter Chips */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-colors border",
                  !selectedCategory
                    ? "bg-[#ffffff] text-black border-[#ffffff] font-semibold"
                    : "bg-[#040406] text-[#9194a1] border-[#1c1d22] hover:text-white hover:border-[#2e3038]"
                )}
              >
                Todas
              </button>
              {categories.map(cat => {
                const isActive = selectedCategory === cat;
                const color = CATEGORY_COLORS[cat] || "#cc9166";
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(isActive ? null : cat)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-colors border flex items-center gap-1.5",
                      isActive
                        ? "bg-[#121317] text-white border-[#2e3038]"
                        : "bg-[#040406] text-[#9194a1] border-[#1c1d22] hover:text-white hover:border-[#2e3038]"
                    )}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* ─── Transaction Feed ─── */}
        <section className="space-y-6">
          {filteredTransactions.length === 0 ? (
            <div className="rounded-2xl bg-[#040406] border border-[#1c1d22] p-12 text-center space-y-3">
              <Receipt className="h-10 w-10 text-[#9194a1] mx-auto opacity-40" />
              <h3 className="text-base font-serif-display font-medium text-white">Nenhum lançamento encontrado</h3>
              <p className="text-xs text-[#9194a1] max-w-sm mx-auto">
                Tente ajustar seus filtros ou cadastre novas despesas e receitas.
              </p>
              {(searchQuery || selectedCategory || filterType !== "all") && (
                <Button
                  onClick={() => { setSearchQuery(""); setSelectedCategory(null); setFilterType("all"); }}
                  variant="outline"
                  size="sm"
                  className="rounded-lg text-xs border-[#2e3038] bg-[#121317] text-white hover:bg-white hover:text-black"
                >
                  Limpar Filtros
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {groupedByDate.map((group) => (
                <div key={group.label} className="space-y-2.5">
                  <div className="flex items-center gap-2 px-1">
                    <CalendarDays className="h-3.5 w-3.5 text-[#cc9166]" />
                    <span className="text-xs font-mono uppercase tracking-widest text-[#cc9166]">{group.label}</span>
                    <div className="flex-1 h-px bg-[#1c1d22]" />
                    <span className="text-[11px] font-mono text-[#9194a1]">{group.transactions.length} itens</span>
                  </div>

                  <div className="rounded-2xl bg-[#040406] border border-[#1c1d22] overflow-hidden divide-y divide-[#1c1d22]">
                    {group.transactions.map((t) => {
                      const customCat = customCategories.find(c => c.name === t.category);
                      const iconName = customCat ? customCat.icon : DEFAULT_CATEGORY_ICON_MAP[t.category];
                      const CategoryIcon = getIconComponent(iconName);
                      const catColor = CATEGORY_COLORS[t.category] || "#cc9166";

                      return (
                        <div
                          key={t.id}
                          className="flex items-center gap-3 sm:gap-4 p-4 hover:bg-[#121317]/50 transition-colors group"
                        >
                          <div
                            className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border border-[#1c1d22] bg-[#08080a]"
                          >
                            <CategoryIcon className="h-4 w-4" style={{ color: catColor }} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-white truncate group-hover:text-[#cc9166] transition-colors">
                              {t.description}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap text-[11px] font-mono text-[#9194a1]">
                              <span className="text-[#e2e3e9]">{t.category}</span>
                              {t.paymentMethod && <span>&middot; {t.paymentMethod}</span>}
                              <span>&middot; {t.virtualRange ? t.virtualRange : format(new Date(t.date), "dd/MM/yyyy")}</span>
                              {t.groupedIds && t.groupedIds.length > 1 && (
                                <span className="text-[10px] text-[#cc9166] bg-[#cc9166]/10 px-1 rounded">
                                  {t.groupedIds.length}x
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right">
                              <p className={cn(
                                "text-xs sm:text-sm font-semibold font-mono",
                                t.type === "income" ? "text-emerald-400" : "text-rose-400"
                              )}>
                                {t.type === "income" ? "+" : "-"} {fmt(t.amount)}
                              </p>
                              <p className="text-[10px] font-mono text-[#9194a1] uppercase">
                                {t.type === "income" ? "Receita" : "Despesa"}
                              </p>
                            </div>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <NotificationToggle
                                active={t.email_notification_active ?? false}
                                onToggle={() => handleToggle(t.id)}
                              />
                              <button
                                onClick={() => handleDelete(t.id)}
                                className="p-1.5 rounded-lg hover:bg-rose-950/30 text-[#9194a1] hover:text-rose-400 transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
