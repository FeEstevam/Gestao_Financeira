import { useState } from "react";
import { useFinance } from "@/client/hooks/use-finance";
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
  Plus,
  Trash2,
  Edit2,
  Tags,
  Sparkles,
  LayoutGrid
} from "lucide-react";
import { cn } from "@/client/lib/utils";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "@/client/lib/finance-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AVAILABLE_ICONS, getIconComponent } from "@/client/lib/icons";
<<<<<<< HEAD
import { useTheme } from "@/components/theme-provider";

export default function Categories() {
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

=======
import { TiltCard } from "@/client/components/ui/tilt-card";

export default function Categories() {
>>>>>>> 8aaefac (New UI:UX etc..)
  const { customCategories, addCustomCategory, editCustomCategory, deleteCustomCategory } = useFinance();
  const [open, setOpen] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [selectedIcon, setSelectedIcon] = useState<string>("");

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setType("expense");
    setSelectedIcon("");
  };

  const handleOpenNew = () => {
    resetForm();
    setOpen(true);
  };

  const handleOpenEdit = (cat: any) => {
    setEditingId(cat.id);
    setName(cat.name);
    setType(cat.type);
    setSelectedIcon(cat.icon);
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !selectedIcon) return;

<<<<<<< HEAD
    // Check uniqueness (cannot exist in default or other custom categories)
=======
>>>>>>> 8aaefac (New UI:UX etc..)
    const isNameTaken =
      INCOME_CATEGORIES.includes(name) ||
      EXPENSE_CATEGORIES.includes(name) ||
      customCategories.some(c => c.name.toLowerCase() === name.toLowerCase() && c.id !== editingId);

    if (isNameTaken) {
      alert("Já existe uma categoria com este nome.");
      return;
    }

    if (editingId) {
      editCustomCategory(editingId, { name, type, icon: selectedIcon });
    } else {
      addCustomCategory({ name, type, icon: selectedIcon, color: type === "income" ? "text-income" : "text-expense" });
    }
    setOpen(false);
  };

<<<<<<< HEAD
  // The rule is: an icon can only be used ONCE.
  const usedIcons = customCategories.map(c => c.icon);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-border/50">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 font-bold uppercase tracking-widest text-[10px]">
            <Sparkles className="h-3.5 w-3.5" />
            Taxonomia Inteligente
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-outfit">Categorias Customizadas</h1>
          <p className="text-muted-foreground font-medium text-sm max-w-lg">
            Crie classificações personalizadas para agrupar suas despesas e receitas exatamente com a cara da sua rotina.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleOpenNew}
              className="h-11 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black shadow-lg shadow-indigo-500/20 gap-2 transition-all active:scale-95 border-0"
            >
              <Plus className="h-5 w-5" /> Montar Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-background border border-border rounded-3xl p-0 overflow-hidden shadow-2xl">
            <div className={cn("absolute inset-0 opacity-10 blur-[100px] pointer-events-none transition-colors duration-500", type === "income" ? "bg-emerald-500" : "bg-rose-500")} />
            <div className="p-6 relative z-10">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-black text-foreground text-center flex items-center justify-center gap-2">
                  <Tags className="h-6 w-6 text-muted-foreground/50" />
                  {editingId ? "Editar Classificação" : "Nova Classificação"}
                </DialogTitle>
                <p className="text-xs text-muted-foreground font-medium text-center mt-1">Personalize a gaveta financeira para classificar seus lançamentos.</p>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs font-bold uppercase tracking-widest pl-1">Nomenclatura Única</Label>
                  <div className="relative group">
                    <Tags className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Ex: Roupas de Grife..."
                      className="h-12 pl-11 bg-muted/30 border border-border rounded-2xl text-foreground text-sm font-semibold focus:border-primary/50 focus:bg-muted/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs font-bold uppercase tracking-widest pl-1">Natureza da Categoria</Label>
                  <Select value={type} onValueChange={(v: "income" | "expense") => setType(v)}>
                    <SelectTrigger className="h-12 bg-muted/30 border border-border rounded-xl text-foreground font-semibold focus:ring-1 focus:border-primary/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border text-popover-foreground rounded-xl shadow-xl">
                      <SelectItem value="income" className="font-semibold text-emerald-500 focus:bg-emerald-500/10 focus:text-emerald-400 rounded-lg cursor-pointer">Receita (Dinheiro Entrando)</SelectItem>
                      <SelectItem value="expense" className="font-semibold text-rose-500 focus:bg-rose-500/10 focus:text-rose-400 rounded-lg cursor-pointer">Despesa (Dinheiro Saindo)</SelectItem>
=======
  const usedIcons = customCategories.map(c => c.icon);

  return (
    <div className="w-full min-h-screen pb-16 bg-[#08080a] text-[#e2e3e9] relative selection:bg-[#cc9166]/20">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-8 space-y-8 relative z-10">

        {/* ─── Header ─── */}
        <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-[#1c1d22]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#cc9166] text-xs font-mono tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Taxonomia &middot; Centros de Custo</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-display font-medium tracking-tight text-white">
              Categorias Personalizadas<span className="text-[#cc9166]">.</span>
            </h1>
            <p className="text-sm text-[#9194a1] max-w-xl">
              Crie classificações personalizadas para agrupar suas despesas e receitas conforme a sua necessidade operacional.
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleOpenNew}
                className="h-9 px-4 rounded-lg bg-white hover:bg-white/90 text-black font-semibold text-xs gap-2 border-0 shadow-sm"
              >
                <Plus className="h-3.5 w-3.5 stroke-[2.5]" /> Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#040406] border border-[#1c1d22] text-[#e2e3e9] p-6 rounded-2xl">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-xl font-serif-display font-semibold text-white flex items-center gap-2">
                  <Tags className="h-5 w-5 text-[#cc9166]" />
                  <span>{editingId ? "Editar Categoria" : "Nova Categoria"}</span>
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-mono text-[#9194a1] uppercase">Nome da Categoria</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ex: Assinaturas Digitais..."
                    className="bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg h-9"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-mono text-[#9194a1] uppercase">Natureza</Label>
                  <Select value={type} onValueChange={(v: "income" | "expense") => setType(v)}>
                    <SelectTrigger className="bg-[#121317] border-[#1c1d22] text-white text-xs rounded-lg h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#08080a] border-[#1c1d22] text-white">
                      <SelectItem value="expense" className="text-xs text-rose-400">Despesa (Saída)</SelectItem>
                      <SelectItem value="income" className="text-xs text-emerald-400">Receita (Entrada)</SelectItem>
>>>>>>> 8aaefac (New UI:UX etc..)
                    </SelectContent>
                  </Select>
                </div>

<<<<<<< HEAD
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex justify-between pl-1 pr-1">
                    <span>Simbologia Visual</span>
                    <span className="text-muted-foreground/50 lowercase font-normal italic">escolha 1 ícone exclusivo</span>
                  </Label>
                  <div className="grid grid-cols-6 sm:grid-cols-7 gap-2.5 p-4 rounded-2xl bg-muted/30 border border-border/50 max-h-[220px] overflow-y-auto custom-scrollbar shadow-inner">
=======
                <div className="space-y-2">
                  <Label className="text-xs font-mono text-[#9194a1] uppercase flex justify-between">
                    <span>Ícone Visual</span>
                    <span className="text-[#9194a1] font-mono">1 ícone exclusivo</span>
                  </Label>
                  <div className="grid grid-cols-6 gap-2 p-3 rounded-xl bg-[#08080a] border border-[#1c1d22] max-h-[180px] overflow-y-auto">
>>>>>>> 8aaefac (New UI:UX etc..)
                    {AVAILABLE_ICONS.map((IconObj) => {
                      const isUsed = usedIcons.includes(IconObj.name) && IconObj.name !== selectedIcon;
                      const isSelected = selectedIcon === IconObj.name;
                      return (
                        <button
                          type="button"
                          key={IconObj.name}
                          disabled={isUsed}
                          onClick={() => setSelectedIcon(IconObj.name)}
                          className={cn(
<<<<<<< HEAD
                            "aspect-square rounded-[0.8rem] flex items-center justify-center transition-all duration-300 relative group overflow-hidden",
                            isSelected
                              ? "bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-500/50 scale-105"
                              : "bg-muted/50 border border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:border-primary/50",
                            isUsed && "opacity-20 cursor-not-allowed scale-95"
                          )}
                          title={isUsed ? "Ícone em uso por outra categoria" : IconObj.name}
                        >
                          {isSelected && <div className="absolute inset-0 bg-white/20 blur-sm mix-blend-overlay" />}
                          <IconObj.icon className="h-5 w-5 relative z-10" />
                        </button>
                      )
=======
                            "aspect-square rounded-lg flex items-center justify-center transition-all",
                            isSelected
                              ? "bg-white text-black font-bold shadow-md"
                              : "bg-[#121317] border border-[#1c1d22] text-[#9194a1] hover:text-white hover:border-[#2e3038]",
                            isUsed && "opacity-20 cursor-not-allowed"
                          )}
                          title={isUsed ? "Ícone já utilizado" : IconObj.name}
                        >
                          <IconObj.icon className="h-4 w-4" />
                        </button>
                      );
>>>>>>> 8aaefac (New UI:UX etc..)
                    })}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!name || !selectedIcon}
<<<<<<< HEAD
                  className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-base shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all border border-indigo-500/50 active:scale-[0.98] mt-2 group flex items-center gap-2 disabled:bg-indigo-600/50 disabled:border-indigo-600/20"
                >
                  {editingId ? "Salvar Alterações" : "Carimbar Coleção"}
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* ─── Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {customCategories.length === 0 ? (
          <div className="col-span-full py-20 px-6 flex flex-col items-center justify-center text-center rounded-[2rem] border border-border/40 border-dashed bg-card/20 text-muted-foreground">
            <div className="h-20 w-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <LayoutGrid className="h-10 w-10 opacity-40" />
            </div>
            <p className="text-lg font-bold text-foreground">Sua gaveta de categorias está vazia.</p>
            <p className="text-sm font-medium mt-1 max-w-sm">
              Crie tags e ícones que fazem sentido para o seu estilo de vida exclusivista. (Ex: Viagens para Dubai, Joias, etc.)
            </p>
          </div>
        ) : (
          customCategories.map((cat) => {
            const IconComponent = getIconComponent(cat.icon);
            const isIncome = cat.type === "income";

            return (
              <div
                key={cat.id}
                className={cn(
                  "bg-card/40 backdrop-blur-md p-5 rounded-3xl border border-border/40 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-border/80 relative overflow-hidden h-[160px]"
                )}
              >
                {/* Fundo glow sutil no hover */}
                <div className={cn(
                  "absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none",
                  isIncome ? "bg-emerald-500" : "bg-rose-500"
                )} />

                <div className="flex items-start justify-between relative z-10">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner shrink-0",
                    isIncome ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                  )}>
                    <IconComponent className="h-6 w-6" />
                  </div>

                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(cat)}
                      className="h-8 w-8 rounded-lg bg-background/50 hover:bg-background text-muted-foreground hover:text-foreground shadow-sm"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteCustomCategory(cat.id)}
                      className="h-8 w-8 rounded-lg bg-background/50 hover:bg-destructive/10 text-muted-foreground hover:text-destructive shadow-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="font-black text-lg font-outfit tracking-tight truncate pr-2">{cat.name}</p>
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-widest mt-1",
                    isIncome ? "text-emerald-500/70" : "text-rose-500/70"
                  )}>
                    {isIncome ? "Entrada de Caixa" : "Saída de Caixa"}
                  </p>
                </div>
              </div>
            )
          })
        )}
=======
                  className="w-full h-10 rounded-lg bg-white hover:bg-white/90 text-black font-semibold text-xs border-0 mt-2 disabled:opacity-40"
                >
                  {editingId ? "Salvar Alterações" : "Criar Categoria"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </section>

        {/* ─── Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {customCategories.length === 0 ? (
            <div className="col-span-full py-16 px-6 flex flex-col items-center justify-center text-center rounded-2xl border border-[#1c1d22] bg-[#040406] text-[#9194a1] space-y-3">
              <LayoutGrid className="h-10 w-10 text-[#9194a1] opacity-30" />
              <p className="text-sm font-serif-display font-medium text-white">Nenhuma categoria customizada criada.</p>
              <p className="text-xs text-[#9194a1] max-w-sm">
                Crie tags e ícones exclusivos para categorizar despesas e receitas da sua rotina.
              </p>
            </div>
          ) : (
            customCategories.map((cat) => {
              const IconComponent = getIconComponent(cat.icon);
              const isIncome = cat.type === "income";

              return (
                <TiltCard key={cat.id} tiltLimit={8} scale={1.01} perspective={1000}>
                  <div className="bg-[#040406] border border-[#1c1d22] p-5 rounded-2xl shadow-xl flex flex-col justify-between h-[150px] space-y-3 hover:border-[#2e3038] transition-colors group">
                    <div className="flex items-start justify-between">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center border shrink-0",
                        isIncome ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/30" : "bg-rose-950/40 text-rose-400 border-rose-800/30"
                      )}>
                        <IconComponent className="h-5 w-5" />
                      </div>

                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(cat)}
                          className="h-7 w-7 rounded-lg text-[#9194a1] hover:text-white hover:bg-[#121317]"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteCustomCategory(cat.id)}
                          className="h-7 w-7 rounded-lg text-[#9194a1] hover:text-rose-400 hover:bg-rose-950/30"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-sm text-white truncate">{cat.name}</p>
                      <p className={cn(
                        "text-[10px] font-mono uppercase tracking-widest mt-0.5",
                        isIncome ? "text-emerald-400" : "text-rose-400"
                      )}>
                        {isIncome ? "Receita" : "Despesa"}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              );
            })
          )}
        </div>
>>>>>>> 8aaefac (New UI:UX etc..)
      </div>
    </div>
  );
}
