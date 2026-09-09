import { Link } from "react-router-dom";
import { BookOpen, Wallet, Target, CreditCard, ChevronRight, FileBarChart, Zap, ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/client/components/ui/tilt-card";

const sections = [
  {
    icon: Wallet,
    title: "Primeiros Passos no Cofre",
    desc: "Aprenda a cadastrar seus primeiros lançamentos de receitas e despesas no livro razão.",
    link: "primeiros-passos"
  },
  {
    icon: Target,
    title: "Metas Patrimoniais 3D",
    desc: "Descubra como criar, acompanhar e atingir seus objetivos de curto, médio e longo prazo.",
    link: "metas-financeiras"
  },
  {
    icon: CreditCard,
    title: "Gestão de Contas e Cartões",
    desc: "Cadastre bancos, unifique faturas de cartão de crédito e acompanhe seus saldos em um só lugar.",
    link: "gerenciar-contas"
  },
  {
    icon: FileBarChart,
    title: "Relatórios DRE e Exportação",
    desc: "Gere demonstrações contábeis completas, visualize gráficos gilded e exporte dados para JSON ou CSV.",
    link: "relatorios-exportacao"
  },
  {
    icon: Zap,
    title: "Finanças Estratégicas & 50/30/20",
    desc: "Utilize a regra dos potes e proteções de limite de cartão para manter seu caixa saudável.",
    link: "dicas-produtividade"
  }
];

export default function Documentation() {
  return (
    <div className="min-h-screen bg-[#08080a] text-[#e8e6e3] flex flex-col font-sans">
      <header className="sticky top-0 z-50 border-b border-[#1c1d22] bg-[#040406]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="text-[#8a8880] hover:text-[#f5f4f0] hover:bg-[#121317]">
              <Link to="/suporte"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xs font-medium text-[#f5f4f0] tracking-tight">Manuais & Documentação</h1>
              <p className="text-[10px] text-[#cc9166] font-mono uppercase tracking-wider">Cashflow v2.0</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8a8880] bg-[#121317] px-2.5 py-1 rounded-full border border-[#1c1d22]">
            <Shield className="w-3 h-3 text-[#cc9166]" />
            Docs Oficiais
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10 sm:py-14">

        <div className="space-y-3 text-center pb-10">
          <div className="mx-auto w-fit p-3 rounded-2xl bg-[#121317] border border-[#1c1d22] text-[#cc9166] mb-4">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-display font-light tracking-tight text-[#f5f4f0]">
            Base de Conhecimento do Cofre<span className="text-[#cc9166]">.</span>
          </h1>
          <p className="text-[#8a8880] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Tutoriais passo a passo e resoluções detalhadas para você dominar todos os módulos do Cashflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-4">
          {sections.map((sec, i) => (
            <TiltCard key={i} tiltLimit={6} scale={1.02} className="h-full">
              <Link
                to={`/documentacao/${sec.link}`}
                className="h-full bg-[#040406] border border-[#1c1d22] hover:border-[#2e3038] rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all block group"
              >
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-[#121317] border border-[#1c1d22] w-fit text-[#cc9166] group-hover:border-[#cc9166]/40 transition-colors">
                    <sec.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium text-[#f5f4f0] group-hover:text-white transition-colors">{sec.title}</h2>
                    <p className="text-xs text-[#8a8880] leading-relaxed">{sec.desc}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center text-xs font-mono text-[#cc9166] justify-between border-t border-[#1c1d22]">
                  <span>Acessar guia técnico</span>
                  <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-2xl bg-[#040406] border border-[#1c1d22] text-center space-y-4 relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <h3 className="text-lg font-serif-display font-light text-[#f5f4f0]">Dúvidas Específicas sobre seu Livro Razão?</h3>
            <p className="text-xs text-[#8a8880] max-w-md mx-auto">
              Nossa equipe e o assistente virtual do cofre estão online para orientar qualquer operação em tempo real.
            </p>
          </div>
          <Button size="sm" className="rounded-xl bg-[#ffffff] hover:bg-[#f5f4f0] text-[#08080a] text-xs font-medium px-5 relative z-10" asChild>
            <Link to="/chat">Iniciar Conversa no Suporte</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
