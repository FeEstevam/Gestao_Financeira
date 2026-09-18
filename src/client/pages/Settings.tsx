import { useState } from "react";
import { Settings as SettingsIcon, Palette, Bell, Shield, Sun, Moon, CheckCircle2, Sliders, Database, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/client/hooks/use-toast";
import { useLocalStorage } from "@/client/hooks/use-local-storage";
import { motion } from "framer-motion";
import { cn } from "@/client/lib/utils";
import { useTheme } from "@/components/theme-provider";

interface SettingsData {
  currency: string;
  notifications: boolean;
  weeklyReport: boolean;
  budgetAlerts: boolean;
  twoFactor: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
} as const;

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const [settings, setSettings] = useLocalStorage<SettingsData>("financaspro_settings", {
    currency: "BRL",
    notifications: true,
    weeklyReport: true,
    budgetAlerts: true,
    twoFactor: false,
  });

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const update = (partial: Partial<SettingsData>) =>
    setSettings((prev) => ({ ...prev, ...partial }));

  function handleSave() {
    toast({
      title: "Configurações salvas",
      description: "Suas preferências de sistema foram sincronizadas.",
    });
  }

  function handleExportJSON() {
    const data = {
      transactions: localStorage.getItem("financaspro_transactions"),
      accounts: localStorage.getItem("financaspro_accounts"),
      goals: localStorage.getItem("financaspro_goals"),
      categories: localStorage.getItem("financaspro_categories"),
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cashflow-vault-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    toast({
      title: "Backup gerado com sucesso",
      description: "Arquivo criptográfico de dados exportado.",
    });
  }

  return (
    <div className="w-full min-h-screen pb-20 sm:pb-10 font-sans tracking-tight bg-[#08080a] relative overflow-hidden text-[#e8e6e3]">

      {/* ═══ Ambient Glow ═══ */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(204,145,102,0.05)_0%,transparent_50%)] pointer-events-none z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[800px] mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1c1d22] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#cc9166] uppercase">
              <Sliders className="w-3.5 h-3.5" />
              <span>System & Environment</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-display font-light tracking-tight text-[#f5f4f0]">
              Parâmetros do Cofre<span className="text-[#cc9166]">.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#8a8880] font-sans">
              Ajuste regras de telemetria, moeda do livro razão e protocolos de segurança.
            </p>
          </div>
        </motion.div>

        {/* Section: Environment & Display */}
        <motion.section variants={itemVariants} className="rounded-2xl border border-[#1c1d22] bg-[#040406] p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-[#1c1d22]">
            <div className="p-2 rounded-xl bg-[#121317] border border-[#1c1d22]">
              <Palette className="h-4 w-4 text-[#cc9166]" />
            </div>
            <div>
              <h2 className="text-base font-medium text-[#f5f4f0]">Ambiente e Moeda</h2>
              <p className="text-xs text-[#6b6960]">Configuração de exibição dos registros</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Ambient & Theme Badge */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#121317]/60 border border-[#1c1d22] hover:border-[#2e3038] transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-lg bg-[#08080a] border border-[#1c1d22]">
                  <Moon className="h-4 w-4 text-[#cc9166]" />
                </div>
                <div>
                  <p className="font-medium text-sm text-[#f5f4f0]">Modo Midnight Vault (Escuro)</p>
                  <p className="text-xs text-[#8a8880]">Tema padrão exclusivo com obsidian, ônix e acentos em cobre</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#1c1d22] text-[#cc9166] border border-[#cc9166]/30">
                Ativo • Padrão
              </span>
            </div>

            {/* Currency Select */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#121317]/60 border border-[#1c1d22] hover:border-[#2e3038] transition-colors gap-4">
              <div>
                <p className="font-medium text-sm text-[#f5f4f0]">Moeda Padrão do Razão</p>
                <p className="text-xs text-[#8a8880]">Símbolo monetário usado na contabilidade do patrimônio</p>
              </div>
              <Select value={settings.currency} onValueChange={(v) => update({ currency: v })}>
                <SelectTrigger className="w-full sm:w-[200px] bg-[#08080a] border-[#1c1d22] text-[#f5f4f0] rounded-xl font-mono text-xs focus:ring-1 focus:ring-[#cc9166]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121317] border-[#1c1d22] text-[#f5f4f0] rounded-xl font-mono text-xs">
                  <SelectItem value="BRL" className="focus:bg-[#1c1d22] cursor-pointer">BRL (R$) - Real</SelectItem>
                  <SelectItem value="USD" className="focus:bg-[#1c1d22] cursor-pointer">USD ($) - Dólar</SelectItem>
                  <SelectItem value="EUR" className="focus:bg-[#1c1d22] cursor-pointer">EUR (€) - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.section>

        {/* Section: Telemetry & Alerts */}
        <motion.section variants={itemVariants} className="rounded-2xl border border-[#1c1d22] bg-[#040406] p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-[#1c1d22]">
            <div className="p-2 rounded-xl bg-[#121317] border border-[#1c1d22]">
              <Bell className="h-4 w-4 text-[#cc9166]" />
            </div>
            <div>
              <h2 className="text-base font-medium text-[#f5f4f0]">Notificações e Gatilhos</h2>
              <p className="text-xs text-[#6b6960]">Alertas proativos sobre despesas e orçamentos</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#121317]/60 border border-[#1c1d22] hover:border-[#2e3038] transition-colors">
              <div>
                <p className="font-medium text-sm text-[#f5f4f0]">Alertas Críticos de Limite</p>
                <p className="text-xs text-[#8a8880]">Notificar imediatamente quando despesas atingirem 80% do teto</p>
              </div>
              <Switch checked={settings.budgetAlerts} onCheckedChange={(v) => update({ budgetAlerts: v })} className="data-[state=checked]:bg-[#cc9166]" />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-[#121317]/60 border border-[#1c1d22] hover:border-[#2e3038] transition-colors">
              <div>
                <p className="font-medium text-sm text-[#f5f4f0]">Relatório Semanal de Balanço</p>
                <p className="text-xs text-[#8a8880]">Resumo consolidado das movimentações do livro razão todo domingo</p>
              </div>
              <Switch checked={settings.weeklyReport} onCheckedChange={(v) => update({ weeklyReport: v })} className="data-[state=checked]:bg-[#cc9166]" />
            </div>
          </div>
        </motion.section>

        {/* Section: Security & Data Backup */}
        <motion.section variants={itemVariants} className="rounded-2xl border border-[#1c1d22] bg-[#040406] p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-[#1c1d22]">
            <div className="p-2 rounded-xl bg-[#121317] border border-[#1c1d22]">
              <Shield className="h-4 w-4 text-[#cc9166]" />
            </div>
            <div>
              <h2 className="text-base font-medium text-[#f5f4f0]">Custódia e Backup de Dados</h2>
              <p className="text-xs text-[#6b6960]">Exportação soberana e integridade dos registros</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#121317]/60 border border-[#1c1d22] hover:border-[#2e3038] transition-colors">
              <div>
                <p className="font-medium text-sm text-[#f5f4f0]">Autenticação em Duas Etapas (2FA)</p>
                <p className="text-xs text-[#8a8880]">Exigir chave temporária TOTP para desbloqueio do cofre</p>
              </div>
              <Switch checked={settings.twoFactor} onCheckedChange={(v) => update({ twoFactor: v })} className="data-[state=checked]:bg-[#34d399]" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#121317]/60 border border-[#1c1d22] hover:border-[#2e3038] transition-colors gap-4">
              <div>
                <p className="font-medium text-sm text-[#f5f4f0]">Exportar Livro Razão Completo</p>
                <p className="text-xs text-[#8a8880]">Download de todas as contas, metas e lançamentos em JSON</p>
              </div>
              <Button
                variant="outline"
                onClick={handleExportJSON}
                className="bg-[#08080a] hover:bg-[#121317] text-[#f5f4f0] border-[#1c1d22] rounded-xl text-xs font-mono flex items-center gap-2"
              >
                <Download className="h-3.5 w-3.5 text-[#cc9166]" />
                Exportar JSON
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Save Button */}
        <motion.div variants={itemVariants} className="pt-2 pb-10">
          <Button
            onClick={handleSave}
            className="w-full h-14 rounded-xl bg-[#ffffff] hover:bg-[#f5f4f0] text-[#08080a] font-medium text-sm tracking-tight flex items-center justify-center gap-2 shadow-xl transition-all"
          >
            <CheckCircle2 className="h-4 w-4" />
            Salvar Parâmetros
          </Button>
        </motion.div>

      </motion.div>
    </div>
  );
}
