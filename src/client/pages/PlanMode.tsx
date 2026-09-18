import { useState } from "react";
import { CheckCircle2, Shield, Sparkles, ArrowRight, Zap, Crown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/client/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "@/client/components/ui/tilt-card";

export const PLAN_DETAILS = [
  {
    id: "basic",
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
    ]
  },
  {
    id: "business",
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
    ]
  },
  {
    id: "enterprise",
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
    ]
  }
];

export default function PlanMode() {
  const navigate = useNavigate();
  const [activePlanId, setActivePlanId] = useState("business");

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
                            {plan.badge}
                          </span>
                        )}
                      </div>

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
    </div>
  );
}
