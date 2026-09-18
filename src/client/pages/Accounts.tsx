import { useState, useMemo } from "react";
import {
  CreditCard,
  Building2,
  Plus,
  Trash2,
  Wallet,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Landmark,
  PiggyBank,
  Briefcase,
  Wifi,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Sliders,
} from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Account, AccountType } from "@/client/lib/finance-data";
import { useFinance } from "@/client/hooks/use-finance";
import { usePrivacy } from "@/client/hooks/use-privacy";
import { cn } from "@/client/lib/utils";
import { TiltCard } from "@/client/components/ui/tilt-card";

const TYPE_LABELS: Record<AccountType, string> = {
  checking: "Conta Corrente",
  savings: "Poupança",
  credit: "Cartão de Crédito",
  debit: "Cartão de Débito",
  investment: "Carteira de Investimento",
};

const TYPE_ICONS: Record<AccountType, any> = {
  checking: Landmark,
  savings: PiggyBank,
  credit: CreditCard,
  debit: Wallet,
  investment: Briefcase,
};

// Luxury Vault Card Styles
const VAULT_CARD_THEMES = [
  {
    id: "midnight",
    label: "Obsidian Vault",
    bg: "bg-gradient-to-br from-[#121318] via-[#08080a] to-[#040406]",
    border: "border-[#2e3038]",
    accent: "#cc9166",
  },
  {
    id: "copper-gold",
    label: "Gilded Ledger",
    bg: "bg-gradient-to-br from-[#2a1d12] via-[#120d08] to-[#08080a]",
    border: "border-[#cc9166]/40",
    accent: "#cc9166",
  },
  {
    id: "emerald",
    label: "Emerald Reserve",
    bg: "bg-gradient-to-br from-[#062419] via-[#04120d] to-[#08080a]",
    border: "border-[#10b981]/40",
    accent: "#10b981",
  },
  {
    id: "sapphire",
    label: "Imperial Blue",
    bg: "bg-gradient-to-br from-[#0c1a30] via-[#060c18] to-[#08080a]",
    border: "border-[#3b82f6]/40",
    accent: "#3b82f6",
  },
  {
    id: "carbon-purple",
    label: "Deep Amethyst",
    bg: "bg-gradient-to-br from-[#200c30] via-[#0e0514] to-[#08080a]",
    border: "border-[#8b5cf6]/40",
    accent: "#8b5cf6",
  },
];

const fmt = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function Accounts() {
  const { accounts, addAccount, deleteAccount, addTransactions } = useFinance();
  const { isPrivate } = usePrivacy();

  // Create Account Dialog
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<AccountType>("checking");
  const [balance, setBalance] = useState("");
  const [institution, setInstitution] = useState("");
  const [limit, setLimit] = useState("");
  const [cardTheme, setCardTheme] = useState(VAULT_CARD_THEMES[0].id);

  // Quick Transaction Dialog
  const [txDialogOpen, setTxDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [txType, setTxType] = useState<"expense" | "income">("expense");
  const [txAmount, setTxAmount] = useState("");
  const [txDescription, setTxDescription] = useState("");

  const resetForm = () => {
    setName("");
    setBalance("");
    setInstitution("");
    setType("checking");
    setLimit("");
    setCardTheme(VAULT_CARD_THEMES[0].id);
  };

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !institution) return;
    addAccount({
      name,
      type,
      balance: parseFloat(balance || "0"),
      institution,
      limit: parseFloat(limit || "0"),
      color: cardTheme,
    });
    resetForm();
    setOpen(false);
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Deseja realmente remover esta conta/cartão?")) {
      deleteAccount(id);
    }
  };

  function handleOpenQuickTx(account: Account, defaultType: "expense" | "income" = "expense") {
    setSelectedAccount(account);
    setTxType(defaultType);
    setTxAmount("");
    setTxDescription("");
    setTxDialogOpen(true);
  }

  function handleQuickTxSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAccount || !txAmount || !txDescription) return;

    addTransactions([
      {
        description: txDescription.trim(),
        amount: parseFloat(txAmount),
        type: txType,
        category: txType === "income" ? "Outros" : "Compras",
        paymentMethod: selectedAccount.name,
        accountId: selectedAccount.id,
        date: new Date().toISOString(),
      },
    ]);

    setTxDialogOpen(false);
  }

  const totalPositive = useMemo(
    () =>
      accounts
        .filter((a) => a.balance > 0)
        .reduce((s, a) => s + a.balance, 0),
    [accounts]
  );

  const totalDebt = useMemo(
    () =>
      accounts
        .filter((a) => a.balance < 0)
        .reduce((s, a) => s + a.balance, 0),
    [accounts]
  );

  const netWorth = totalPositive + totalDebt;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-in fade-in slide-in-from-bottom-3 duration-500 font-sans">
      
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#1c1d22]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2e3038] bg-[#040406] text-[#cc9166] font-semibold uppercase tracking-wider text-[11px] font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            CARTÕES & TESOURARIA 3D
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl text-white font-normal tracking-[0.01em]">
            Contas & Cartões Institucionais
          </h1>
          <p className="text-[14px] text-[#9194a1] max-w-xl leading-relaxed">
            Passe o mouse sobre os cartões para interagir com a física tridimensional em tempo real. Lance receitas e despesas com sincronização contínua de saldo.
          </p>
        </div>

        <Dialog
          open={open}
          onOpenChange={(v) => {
            if (!v) resetForm();
            setOpen(v);
          }}
        >
          <DialogTrigger asChild>
            <Button className="h-11 px-6 gap-2 rounded-full bg-[#ffffff] hover:bg-[#f0f0f4] text-[#000000] font-medium text-[14px] shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="h-4 w-4" /> Vincular Conta ou Cartão
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[460px] bg-[#040406] border border-[#1c1d22] text-[#e2e3e9] rounded-[14px] p-0 overflow-hidden shadow-2xl">
            <div className="p-7 relative z-10 space-y-6">
              <DialogHeader className="space-y-2 text-left">
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cc9166]" />
                  <span className="text-[11px] font-semibold text-[#cc9166] uppercase tracking-wider font-mono">
                    CADASTRO DE INSTITUIÇÃO
                  </span>
                </div>
                <DialogTitle className="font-serif-display text-2xl text-white font-normal">
                  Vincular Nova Conta
                </DialogTitle>
                <p className="text-[13px] text-[#9194a1]">
                  Cadastre um banco, carteira ou cartão para monitorar saldos e limites em 3D.
                </p>
              </DialogHeader>

              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[#c7c9d1] text-[12px] font-medium uppercase tracking-wider">
                    Apelido da Conta / Cartão
                  </Label>
                  <div className="relative">
                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5e616e]" />
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Nubank Ultravioleta, Itaú Private..."
                      maxLength={100}
                      required
                      className="h-12 pl-11 bg-[#08080a] border border-[#2e3038] rounded-full text-white placeholder:text-[#5e616e] text-[13px] focus:outline-none focus:border-[#777a88]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[#c7c9d1] text-[12px] font-medium uppercase tracking-wider">
                      Instituição
                    </Label>
                    <Input
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="Ex: Nubank, Bradesco"
                      required
                      className="h-12 px-4 bg-[#08080a] border border-[#2e3038] rounded-full text-white placeholder:text-[#5e616e] text-[13px] focus:border-[#777a88]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[#c7c9d1] text-[12px] font-medium uppercase tracking-wider">
                      Saldo Inicial (R$)
                    </Label>
                    <Input
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      step="0.01"
                      placeholder="0.00"
                      className="h-12 px-4 font-mono font-medium text-white bg-[#08080a] border border-[#2e3038] rounded-full text-[14px] focus:border-[#777a88]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[#c7c9d1] text-[12px] font-medium uppercase tracking-wider">
                      Modalidade
                    </Label>
                    <Select value={type} onValueChange={(v) => setType(v as AccountType)}>
                      <SelectTrigger className="h-12 bg-[#08080a] border border-[#2e3038] rounded-full text-white font-medium text-[13px] focus:border-[#777a88]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#040406] border border-[#1c1d22] text-white rounded-[10px]">
                        {Object.entries(TYPE_LABELS).map(([k, v]) => (
                          <SelectItem key={k} value={k} className="hover:bg-[#121317] cursor-pointer">
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[#c7c9d1] text-[12px] font-medium uppercase tracking-wider">
                      Limite / Teto (R$)
                    </Label>
                    <Input
                      type="number"
                      value={limit}
                      onChange={(e) => setLimit(e.target.value)}
                      step="0.01"
                      placeholder="Opcional"
                      className="h-12 px-4 font-mono font-medium text-white bg-[#08080a] border border-[#2e3038] rounded-full text-[14px] focus:border-[#777a88]"
                    />
                  </div>
                </div>

                {/* Card Theme Picker */}
                <div className="space-y-2 pt-1">
                  <Label className="text-[#c7c9d1] text-[12px] font-medium uppercase tracking-wider block">
                    Acabamento do Cartão 3D
                  </Label>
                  <div className="grid grid-cols-5 gap-2">
                    {VAULT_CARD_THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setCardTheme(theme.id)}
                        className={cn(
                          "h-10 rounded-[8px] border transition-all p-1 flex items-center justify-center",
                          theme.bg,
                          cardTheme === theme.id
                            ? "border-white ring-2 ring-white/30 scale-105"
                            : "border-[#2e3038] opacity-60 hover:opacity-100"
                        )}
                        title={theme.label}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: theme.accent }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-full bg-[#ffffff] text-[#000000] hover:bg-[#f0f0f4] font-medium text-[14px] shadow-sm transition-all mt-3"
                >
                  Confirmar e Gerar Cartão 3D
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* ─── Summary Global 3D Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Card 1: Assets */}
        <TiltCard
          tiltLimit={15}
          scale={1.05}
          perspective={1200}
          effect="evade"
          spotlight={true}
          className="border border-[#1c1d22] bg-[#040406] p-6 shadow-xl"
        >
          <div className="space-y-2 [transform:translateZ(30px)]">
            <div className="flex items-center justify-between text-[#9194a1] text-[11px] font-semibold uppercase tracking-wider font-mono">
              <span>ATIVOS EM CONTA</span>
              <TrendingUp className="h-4 w-4 text-[#4ade80]" />
            </div>
            <p className="font-serif-display text-3xl sm:text-4xl text-white font-normal truncate">
              {isPrivate ? "••••••••" : fmt(totalPositive)}
            </p>
            <p className="text-[12px] text-[#5e616e]">
              Saldo positivo consolidado em custódia
            </p>
          </div>
        </TiltCard>

        {/* Card 2: Debt / Credit Card bills */}
        <TiltCard
          tiltLimit={15}
          scale={1.05}
          perspective={1200}
          effect="evade"
          spotlight={true}
          className="border border-[#1c1d22] bg-[#040406] p-6 shadow-xl"
        >
          <div className="space-y-2 [transform:translateZ(30px)]">
            <div className="flex items-center justify-between text-[#9194a1] text-[11px] font-semibold uppercase tracking-wider font-mono">
              <span>FATURAS & PASSIVOS</span>
              <TrendingDown className="h-4 w-4 text-[#ef4444]" />
            </div>
            <p className="font-serif-display text-3xl sm:text-4xl text-[#ef4444] font-normal truncate">
              {isPrivate ? "••••••••" : fmt(Math.abs(totalDebt))}
            </p>
            <p className="text-[12px] text-[#5e616e]">
              Despesas e faturas em aberto no ciclo
            </p>
          </div>
        </TiltCard>

        {/* Card 3: Net Worth */}
        <TiltCard
          tiltLimit={15}
          scale={1.05}
          perspective={1200}
          effect="evade"
          spotlight={true}
          className="border border-[#1c1d22] bg-[#040406] p-6 shadow-xl"
        >
          <div className="space-y-2 [transform:translateZ(30px)]">
            <div className="flex items-center justify-between text-[#9194a1] text-[11px] font-semibold uppercase tracking-wider font-mono">
              <span>PATRIMÔNIO LÍQUIDO</span>
              <ShieldCheck className="h-4 w-4 text-[#cc9166]" />
            </div>
            <p className="font-serif-display text-3xl sm:text-4xl text-[#e2e3e9] font-normal truncate">
              {isPrivate ? "••••••••" : fmt(netWorth)}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#2e3038] bg-[#121317] text-[11px] font-medium text-[#c7c9d1]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc9166]" />
              <span>{accounts.length} contas e cartões ativos</span>
            </div>
          </div>
        </TiltCard>

      </div>

      {/* ─── 3D Smart Vault Cards Grid ─── */}
      {accounts.length === 0 ? (
        <div className="py-20 px-6 flex flex-col items-center justify-center text-center rounded-[14px] border border-dashed border-[#1c1d22] bg-[#040406] text-[#9194a1] space-y-4">
          <div className="w-16 h-16 rounded-full border border-[#2e3038] bg-[#121317] flex items-center justify-center text-[#cc9166]">
            <CreditCard className="h-7 w-7" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="font-serif-display text-xl text-white font-normal">
              Nenhuma conta ou cartão vinculado
            </h3>
            <p className="text-[13px] text-[#9194a1]">
              Adicione seu primeiro banco ou cartão de crédito para gerenciar saldos e despesas com física 3D em tempo real.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => {
            const IconComponent = TYPE_ICONS[account.type] || Building2;
            const isNegative = account.balance < 0;
            const themeConfig =
              VAULT_CARD_THEMES.find((t) => t.id === account.color) ||
              VAULT_CARD_THEMES[0];

            const hasLimit = (account.limit || 0) > 0;
            const usedAmount = Math.abs(account.balance < 0 ? account.balance : 0);
            const limitUsagePct = hasLimit ? Math.min((usedAmount / (account.limit || 1)) * 100, 100) : 0;

            return (
              <TiltCard
                key={account.id}
                tiltLimit={18}
                scale={1.05}
                perspective={1200}
                effect="evade"
                spotlight={true}
                className={cn(
                  "border p-6 sm:p-7 flex flex-col justify-between min-h-[320px] shadow-2xl relative group transition-all duration-300",
                  themeConfig.bg,
                  themeConfig.border
                )}
              >
                {/* 3D Header: Chip, Contactless Wave, Institution & Delete */}
                <div className="space-y-4 [transform:translateZ(35px)]">
                  
                  <div className="flex items-center justify-between">
                    
                    {/* Golden EMV Chip & Contactless */}
                    <div className="flex items-center gap-3">
                      {/* Stylized Golden Chip */}
                      <div className="w-10 h-7 rounded-[5px] bg-gradient-to-br from-[#ffd700] via-[#e6b800] to-[#b8860b] border border-[#d4af37]/60 p-1 flex flex-col justify-between shadow-md relative overflow-hidden">
                        <div className="w-full h-[1px] bg-[#996515] opacity-50" />
                        <div className="w-full h-[1px] bg-[#996515] opacity-50" />
                        <div className="w-3 h-full absolute left-3 top-0 border-x border-[#996515]/40" />
                      </div>
                      <Wifi className="h-4 w-4 text-[#acafb9] rotate-90" />
                    </div>

                    {/* Delete and Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleDelete(account.id, e)}
                        className="p-1.5 rounded-full border border-transparent hover:border-[#2e3038] text-[#5e616e] hover:text-red-400 hover:bg-[#121317] transition-colors"
                        title="Remover conta"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                  </div>

                  {/* Card Title & Institution */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#cc9166] px-2 py-0.5 rounded-full border border-[#2e3038] bg-[#040406]/80">
                        {TYPE_LABELS[account.type]}
                      </span>
                      <span className="text-[11px] font-medium text-[#9194a1] uppercase">
                        {account.institution}
                      </span>
                    </div>

                    <h3 className="font-serif-display text-2xl text-white font-normal tracking-tight truncate pt-1">
                      {account.name}
                    </h3>
                  </div>

                  {/* Embossed Card Number */}
                  <div className="font-mono text-[13px] tracking-[0.2em] text-[#acafb9] font-medium pt-1 [transform:translateZ(20px)]">
                    •••• •••• •••• {account.id.replace(/\D/g, "").slice(-4) || "8821"}
                  </div>

                </div>

                {/* 3D Balance & Limit Display */}
                <div className="space-y-3 pt-3 border-t border-[#1c1d22] [transform:translateZ(40px)]">
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-[#9194a1] uppercase tracking-wider font-mono block">
                        {account.type === "credit" ? "FATURA ATUAL / GASTO" : "SALDO DISPONÍVEL"}
                      </span>
                      <span
                        className={cn(
                          "font-serif-display text-3xl font-normal tracking-tight block mt-0.5",
                          isNegative ? "text-[#ef4444]" : "text-white"
                        )}
                      >
                        {isPrivate ? "••••••••" : fmt(account.balance)}
                      </span>
                    </div>

                    {/* Quick Add Expense / Income Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenQuickTx(account, "expense");
                        }}
                        className="px-2.5 py-1 rounded-full border border-[#2e3038] hover:border-[#ef4444] bg-[#08080a] hover:bg-[#ef4444]/10 text-white text-[11px] font-mono flex items-center gap-1 transition-colors"
                        title="Lançar Despesa"
                      >
                        <ArrowDownRight className="h-3 w-3 text-[#ef4444]" />
                        <span>Despesa</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenQuickTx(account, "income");
                        }}
                        className="px-2.5 py-1 rounded-full border border-[#2e3038] hover:border-[#4ade80] bg-[#08080a] hover:bg-[#4ade80]/10 text-white text-[11px] font-mono flex items-center gap-1 transition-colors"
                        title="Lançar Receita"
                      >
                        <ArrowUpRight className="h-3 w-3 text-[#4ade80]" />
                        <span>Receita</span>
                      </button>
                    </div>
                  </div>

                  {/* Credit Card Spending Limit Gauge */}
                  {hasLimit && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] font-mono text-[#9194a1]">
                        <span>Teto: {fmt(account.limit || 0)}</span>
                        <span>{limitUsagePct.toFixed(0)}% Utilizado</span>
                      </div>
                      <div className="w-full bg-[#08080a] h-1.5 rounded-full overflow-hidden border border-[#2e3038]">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${limitUsagePct}%`,
                            background:
                              limitUsagePct > 85
                                ? "#ef4444"
                                : "linear-gradient(90deg, rgb(174, 147, 87), rgb(255, 240, 204))",
                          }}
                        />
                      </div>
                    </div>
                  )}

                </div>

              </TiltCard>
            );
          })}
        </div>
      )}

      {/* ─── Modal: Quick Transaction directly on Card ─── */}
      <Dialog open={txDialogOpen} onOpenChange={setTxDialogOpen}>
        <DialogContent className="sm:max-w-[420px] bg-[#040406] border border-[#1c1d22] text-[#e2e3e9] rounded-[14px] p-0 overflow-hidden shadow-2xl">
          <div className="p-7 space-y-6">
            <DialogHeader className="space-y-2 text-left">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc9166]" />
                <span className="text-[11px] font-semibold text-[#cc9166] uppercase tracking-wider font-mono">
                  LANÇAMENTO RÁPIDO
                </span>
              </div>
              <DialogTitle className="font-serif-display text-2xl text-white font-normal">
                {selectedAccount?.name}
              </DialogTitle>
              <p className="text-[13px] text-[#9194a1]">
                Insira o valor para atualizar automaticamente o saldo deste cartão/conta.
              </p>
            </DialogHeader>

            <form onSubmit={handleQuickTxSubmit} className="space-y-4">
              {/* Type toggle: Despesa vs Receita */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-full border border-[#1c1d22] bg-[#08080a]">
                <button
                  type="button"
                  onClick={() => setTxType("expense")}
                  className={cn(
                    "py-2 rounded-full text-[13px] font-medium transition-all flex items-center justify-center gap-1.5",
                    txType === "expense"
                      ? "bg-[#ef4444] text-white shadow-sm font-semibold"
                      : "text-[#9194a1] hover:text-white"
                  )}
                >
                  <ArrowDownRight className="h-4 w-4" /> Despesa
                </button>

                <button
                  type="button"
                  onClick={() => setTxType("income")}
                  className={cn(
                    "py-2 rounded-full text-[13px] font-medium transition-all flex items-center justify-center gap-1.5",
                    txType === "income"
                      ? "bg-[#10b981] text-white shadow-sm font-semibold"
                      : "text-[#9194a1] hover:text-white"
                  )}
                >
                  <ArrowUpRight className="h-4 w-4" /> Receita
                </button>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label className="text-[#c7c9d1] text-[12px] font-medium uppercase tracking-wider">
                  Descrição do Lançamento
                </Label>
                <Input
                  value={txDescription}
                  onChange={(e) => setTxDescription(e.target.value)}
                  placeholder="Ex: Supermercado, AWS Cloud, Salário..."
                  required
                  className="h-12 px-4 bg-[#08080a] border border-[#2e3038] rounded-full text-white placeholder:text-[#5e616e] text-[13px] focus:border-[#777a88]"
                />
              </div>

              {/* Amount */}
              <div className="space-y-1.5">
                <Label className="text-[#c7c9d1] text-[12px] font-medium uppercase tracking-wider">
                  Valor (R$)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="h-12 px-4 font-mono font-medium text-white bg-[#08080a] border border-[#2e3038] rounded-full text-[14px] focus:border-[#777a88]"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-full bg-[#ffffff] text-[#000000] hover:bg-[#f0f0f4] font-medium text-[14px] shadow-sm transition-all mt-3"
              >
                Efetivar e Atualizar Saldo
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
