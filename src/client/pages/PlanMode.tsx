import { useState } from "react";
<<<<<<< HEAD
import { CheckCircle2, Sparkles as SparklesIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/client/lib/utils";
import { getSession } from "@/client/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
=======
import { CheckCircle2, Shield, Sparkles, ArrowRight, Zap, Crown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/client/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "@/client/components/ui/tilt-card";
>>>>>>> 8aaefac (New UI:UX etc..)

export const PLAN_DETAILS = [
  {
    id: "basic",
<<<<<<< HEAD
    name: "Starter",
    price: "R$ 0",
    numericPrice: 0,
    period: "para sempre",
    description: "O essencial para organizar as rotinas do seu dia a dia.",
    buttonText: "Começar Grátis",
    featuresTitle: "Tudo que você precisa para iniciar:",
    features: [
      "Lançamentos de Receitas e Despesas",
      "Dashboard com resumo mensal parcial",
      "Até 5 Categorias personalizadas",
      "Gestão de apenas 1 Conta/Cartão",
      "Modo Privacidade Anti-Curiosos"
=======
    name: "Starter Vault",
    price: "R$ 0",
    numericPrice: 0,
    period: "gratuito",
    description: "Para iniciantes organizarem suas primeiras rotinas financeiras.",
    buttonText: "Acessar Starter",
    badge: null,
    icon: Zap,
    featuresTitle: "Recursos essenciais incluídos:",
    features: [
      "Lançamentos de receitas e despesas",
      "Dashboard com resumo mensal parcial",
      "Até 5 categorias personalizadas",
      "Gestão de 1 cofre bancário",
      "Modo privacidade anti-olhares"
>>>>>>> 8aaefac (New UI:UX etc..)
    ]
  },
  {
    id: "business",
<<<<<<< HEAD
    name: "CashFlow Pro",
    price: "R$ 14,90",
    numericPrice: 14.90,
    period: "por mês",
    description: "Poder analítico. Múltiplas contas, metas livres e gráficos.",
    buttonText: "Assinar o Pro",
    badge: "Mais Popular",
    featuresTitle: "Tudo do Starter e ainda:",
    features: [
      "Contas Bancárias e Cartões Ilimitados",
      "Categorias Financeiras Ilimitadas",
      "Módulo Completo de Metas (Projeção)",
      "Página de Relatórios e Análise Gráfica",
      "Suporte Prioritário 24 horas por E-mail"
=======
    name: "Pro Vault",
    price: "R$ 14,90",
    numericPrice: 14.90,
    period: "/ mês",
    description: "Poder analítico ilimitado, inteligência preditiva e múltiplas contas.",
    buttonText: "Assinar Pro Vault",
    badge: "Mais Escolhido",
    icon: Sparkles,
    featuresTitle: "Tudo do Starter e ainda:",
    features: [
      "Contas bancárias e cartões ilimitados",
      "Categorias e tags financeiras sem limite",
      "Módulo estratégico de metas com projeção 3D",
      "Relatórios contábeis, DRE e área gilded",
      "Suporte prioritário via protocolo direto"
>>>>>>> 8aaefac (New UI:UX etc..)
    ]
  },
  {
    id: "enterprise",
<<<<<<< HEAD
    name: "Lifetime",
    price: "R$ 197",
    numericPrice: 197,
    period: "pagamento único",
    description: "Passaporte vitalício para quem respira gestão patrimonial.",
    buttonText: "Garantir Vitalício",
    featuresTitle: "Todos os poderes do Pro e mais:",
    features: [
      "Acesso vitalício garantido ao app",
      "Zero mensalidades (pague 1 vez)",
      "Importação e Exportação CSV / PDF",
      "Visão de Finanças Estratégicas Avançadas",
      "Acesso antecipado a Novas Funções (Beta)"
=======
    name: "Lifetime Sovereignty",
    price: "R$ 197",
    numericPrice: 197,
    period: "pagamento único",
    description: "Acesso vitalício garantido ao ecossistema com todas as atualizações.",
    buttonText: "Garantir Vitalício",
    badge: "Acesso Eterno",
    icon: Crown,
    featuresTitle: "Poder total vitalício:",
    features: [
      "Acesso vitalício permanente sem mensalidades",
      "Exportação soberana em JSON, CSV e PDF",
      "Visão de finanças estratégicas avançada",
      "Acesso antecipado aos novos módulos do cofre",
      "Criptografia local de ponta a ponta"
>>>>>>> 8aaefac (New UI:UX etc..)
    ]
  }
];

export default function PlanMode() {
  const navigate = useNavigate();
  const [activePlanId, setActivePlanId] = useState("business");

<<<<<<< HEAD
  // Reorder plans so the active one is always in the center (index 1) on desktop
  const activePlan = PLAN_DETAILS.find(p => p.id === activePlanId)!;
  const otherPlans = PLAN_DETAILS.filter(p => p.id !== activePlanId);
  const displayPlans = [otherPlans[0], activePlan, otherPlans[1]];

=======
>>>>>>> 8aaefac (New UI:UX etc..)
  const handleSelectPlan = (planId: string) => {
    setActivePlanId(planId);
  };

  const handleCheckout = (e: React.MouseEvent, planId: string) => {
    e.stopPropagation();
    if (planId === "basic") {
      navigate("/");
    } else {
      navigate(`/pagamento?plan=${planId}`);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center py-20 px-6 font-sans overflow-hidden">

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-indigo-600/[0.03] blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-20 relative z-10 font-sans">

        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <h1
            className="text-4xl md:text-5xl lg:text-[4rem] font-black tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Um plano para <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent italic pr-2">cada fase</span> da vida
          </h1>
          <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto font-medium">
            Transforme sua gestão patrimonial com nossa tecnologia de alto padrão. Não é só sobre poupar dinheiro, é sobre comprar paz mental.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch lg:px-10 perspective-1000 relative">
          <AnimatePresence>
            {displayPlans.map((plan, index) => {
              if (!plan) return null; // fallback
              const isSelected = plan.id === activePlanId;

              return (
                <motion.div
                  layout
                  layoutId={`plan-card-${plan.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: isSelected ? 1 : 0.6,
                    scale: isSelected ? 1.05 : 0.95,
                    zIndex: isSelected ? 40 : 10,
                    y: isSelected ? -20 : 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 20,
                    mass: 0.8
                  }}
                  onClick={() => handleSelectPlan(plan.id)}
                  key={plan.id}
                  className={cn(
                    "group relative rounded-[2rem] flex flex-col overflow-hidden border bg-[#090910]/40 backdrop-blur-3xl cursor-pointer shadow-2xl",
                    isSelected
                      ? "border-purple-500/40 ring-2 ring-purple-500/20 shadow-[0_0_80px_-20px_rgba(139,92,246,0.25)]"
                      : "border-white/[0.06] hover:border-white/20"
                  )}
                >
                  <div className={cn(
                    "p-8 lg:p-10 space-y-6 relative transition-colors duration-500",
                    isSelected && "bg-gradient-to-br from-purple-900/40 to-transparent"
                  )}>
                    {isSelected && (
                      <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-30">
                        <SparklesIcon className="h-20 w-20 text-purple-400" />
                      </div>
                    )}

                    <div className="flex justify-between items-start relative z-10">
                      <div className="space-y-1">
                        <p className={cn("text-sm font-bold tracking-wide uppercase", isSelected ? "text-purple-300" : "text-white/50")}>
                          {plan.name}
                        </p>
                        {plan.badge && (
                          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-bold text-purple-300 uppercase tracking-widest">
=======
    <div className="min-h-screen bg-[#08080a] text-[#e8e6e3] flex flex-col items-center justify-center py-16 px-6 font-sans overflow-hidden relative">

      {/* ─── Ambient Glow ─── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#cc9166]/[0.04] blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-16 relative z-10">

        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121317] border border-[#1c1d22] text-[#cc9166] text-[10px] font-mono uppercase tracking-widest">
            <Shield className="w-3 h-3" />
            <span>Planos de Acesso ao Cofre</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif-display font-light tracking-tight text-[#f5f4f0]">
            Soberania para cada nível de patrimônio<span className="text-[#cc9166]">.</span>
          </h1>

          <p className="text-[#8a8880] text-sm md:text-base font-sans leading-relaxed">
            Escolha o nível de custódia e inteligência que melhor se adapta aos seus objetivos financeiros. Sem contratos ocultos.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PLAN_DETAILS.map((plan) => {
            const isSelected = plan.id === activePlanId;
            const IconComponent = plan.icon;

            return (
              <div
                key={plan.id}
                onClick={() => handleSelectPlan(plan.id)}
                className="cursor-pointer"
              >
                <TiltCard
                  tiltLimit={8}
                  scale={isSelected ? 1.02 : 1.0}
                  className="h-full"
                >
                  <div className={cn(
                    "h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 relative overflow-hidden",
                    isSelected
                      ? "bg-[#040406] border-[#cc9166]/60 shadow-[0_0_50px_rgba(204,145,102,0.15)] ring-1 ring-[#cc9166]/30"
                      : "bg-[#040406] border-[#1c1d22] hover:border-[#2e3038] shadow-lg"
                  )}>
                    {/* Top Glow on Selected */}
                    {isSelected && (
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#cc9166]/15 rounded-full blur-[50px] pointer-events-none" />
                    )}

                    <div className="space-y-6">
                      {/* Header inside card */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className={cn(
                            "p-2 rounded-xl border",
                            isSelected ? "bg-[#cc9166]/10 border-[#cc9166]/30 text-[#cc9166]" : "bg-[#121317] border-[#1c1d22] text-[#8a8880]"
                          )}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-mono uppercase tracking-wider text-[#8a8880]">
                            {plan.name}
                          </span>
                        </div>

                        {plan.badge && (
                          <span className={cn(
                            "px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border",
                            isSelected
                              ? "bg-[#cc9166]/15 border-[#cc9166]/40 text-[#cc9166]"
                              : "bg-[#121317] border-[#1c1d22] text-[#8a8880]"
                          )}>
>>>>>>> 8aaefac (New UI:UX etc..)
                            {plan.badge}
                          </span>
                        )}
                      </div>
<<<<<<< HEAD
                    </div>

                    <div className="space-y-1 relative z-10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl lg:text-6xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {plan.price}
                        </span>
                        <span className="text-sm text-white/40 font-semibold">{plan.period}</span>
                      </div>
                      <p className="text-sm text-white/40 font-medium">{plan.description}</p>
                    </div>

                    <Button
                      onClick={(e) => handleCheckout(e, plan.id)}
                      className={cn(
                        "w-full h-14 rounded-2xl text-[15px] font-bold transition-all duration-500 border relative z-10",
                        isSelected
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/40 border-0"
                          : "bg-white/[0.03] text-white/80 hover:bg-white/10 hover:text-white border-white/10"
                      )}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>

                  <div className="px-8 lg:px-10">
                    <div className="h-px w-full bg-white/[0.06]" />
                  </div>

                  <div className="p-8 lg:p-10 flex-1 space-y-6 bg-white/[0.01]">
                    <p className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em]">
                      FEATURES
                    </p>
                    <p className="text-xs font-semibold text-white/40 -mt-2">
                      {plan.featuresTitle}
                    </p>
                    <ul className="space-y-5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3.5 group/feature">
                          <div className={cn(
                            "shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                            isSelected ? "border-purple-500/40 bg-purple-500/10" : "border-white/10"
                          )}>
                            <CheckCircle2 className={cn("h-3.5 w-3.5", isSelected ? "text-purple-400" : "text-white/30")} />
                          </div>
                          <span className={cn("text-[13px] font-medium tracking-tight", isSelected ? "text-white/80" : "text-white/50")}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {isSelected && (
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/20 blur-[60px] pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      <div className="fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
      <div className="fixed inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none" />
      <div className="fixed inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none" />
=======

                      {/* Price */}
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl sm:text-5xl font-serif-display font-light text-[#f5f4f0] tracking-tight">
                            {plan.price}
                          </span>
                          <span className="text-xs font-mono text-[#8a8880]">{plan.period}</span>
                        </div>
                        <p className="text-xs text-[#8a8880] leading-relaxed pt-1">
                          {plan.description}
                        </p>
                      </div>

                      {/* Action Button */}
                      <Button
                        onClick={(e) => handleCheckout(e, plan.id)}
                        className={cn(
                          "w-full h-12 rounded-xl text-xs font-medium tracking-tight transition-all",
                          isSelected
                            ? "bg-[#ffffff] hover:bg-[#f5f4f0] text-[#08080a] shadow-lg shadow-white/10"
                            : "bg-[#121317] hover:bg-[#1c1d22] text-[#f5f4f0] border border-[#1c1d22]"
                        )}
                      >
                        {plan.buttonText}
                      </Button>

                      {/* Divider */}
                      <div className="h-px w-full bg-[#1c1d22]" />

                      {/* Features */}
                      <div className="space-y-3.5">
                        <p className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider">
                          {plan.featuresTitle}
                        </p>
                        <ul className="space-y-2.5">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-[#8a8880]">
                              <CheckCircle2 className={cn(
                                "h-3.5 w-3.5 shrink-0 mt-0.5",
                                isSelected ? "text-[#cc9166]" : "text-[#6b6960]"
                              )} />
                              <span className={cn(isSelected ? "text-[#e8e6e3]" : "text-[#8a8880]")}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="p-6 rounded-2xl bg-[#040406] border border-[#1c1d22] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#121317] border border-[#1c1d22] text-[#34d399] shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#f5f4f0]">Garantia Incondicional de 7 Dias</h4>
              <p className="text-xs text-[#8a8880]">Experimente todos os recursos do Pro Vault sem riscos. Cancele a qualquer instante com 1 clique.</p>
            </div>
          </div>
          <Link
            to="/suporte"
            className="text-xs font-mono text-[#cc9166] hover:underline shrink-0"
          >
            Dúvidas sobre os planos?
          </Link>
        </div>

      </div>
>>>>>>> 8aaefac (New UI:UX etc..)
    </div>
  );
}
