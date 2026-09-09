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
import { TiltCard } from "@/client/components/ui/tilt-card";

export default function Categories() {
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
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono text-[#9194a1] uppercase flex justify-between">
                    <span>Ícone Visual</span>
                    <span className="text-[#9194a1] font-mono">1 ícone exclusivo</span>
                  </Label>
                  <div className="grid grid-cols-6 gap-2 p-3 rounded-xl bg-[#08080a] border border-[#1c1d22] max-h-[180px] overflow-y-auto">
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
                    })}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!name || !selectedIcon}
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
      </div>
    </div>
  );
}
