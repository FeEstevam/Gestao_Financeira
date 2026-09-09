import { Link } from "react-router-dom";
<<<<<<< HEAD
import { BookOpen, Wallet, Target, CreditCard, ChevronRight, FileBarChart, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
=======
import { BookOpen, Wallet, Target, CreditCard, ChevronRight, FileBarChart, Zap, ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/client/components/ui/tilt-card";
>>>>>>> 8aaefac (New UI:UX etc..)

const sections = [
  {
    icon: Wallet,
<<<<<<< HEAD
    title: "Primeiros Passos",
    desc: "Aprenda a configurar sua conta e registrar suas primeiras transações de forma rápida.",
    color: "text-blue-500 bg-blue-500/10",
=======
    title: "Primeiros Passos no Cofre",
    desc: "Aprenda a cadastrar seus primeiros lançamentos de receitas e despesas no livro razão.",
>>>>>>> 8aaefac (New UI:UX etc..)
    link: "primeiros-passos"
  },
  {
    icon: Target,
<<<<<<< HEAD
    title: "Metas Financeiras",
    desc: "Descubra como criar, acompanhar e atingir seus objetivos a curto, médio e longo prazo.",
    color: "text-emerald-500 bg-emerald-500/10",
=======
    title: "Metas Patrimoniais 3D",
    desc: "Descubra como criar, acompanhar e atingir seus objetivos de curto, médio e longo prazo.",
>>>>>>> 8aaefac (New UI:UX etc..)
    link: "metas-financeiras"
  },
  {
    icon: CreditCard,
<<<<<<< HEAD
    title: "Gerenciando Contas e Cartões",
    desc: "Cadastre bancos, unifique faturas de cartão de crédito e acompanhe seus saldos em um só lugar.",
    color: "text-purple-500 bg-purple-500/10",
=======
    title: "Gestão de Contas e Cartões",
    desc: "Cadastre bancos, unifique faturas de cartão de crédito e acompanhe seus saldos em um só lugar.",
>>>>>>> 8aaefac (New UI:UX etc..)
    link: "gerenciar-contas"
  },
  {
    icon: FileBarChart,
<<<<<<< HEAD
    title: "Relatórios e Exportação",
    desc: "Gere relatórios complexos, visualize gráficos avançados e exporte dados para PDF ou Excel.",
    color: "text-rose-500 bg-rose-500/10",
=======
    title: "Relatórios DRE e Exportação",
    desc: "Gere demonstrações contábeis completas, visualize gráficos gilded e exporte dados para JSON ou CSV.",
>>>>>>> 8aaefac (New UI:UX etc..)
    link: "relatorios-exportacao"
  },
  {
    icon: Zap,
<<<<<<< HEAD
    title: "Dicas de Produtividade",
    desc: "Atalhos de teclado, comandos rápidos e formas de otimizar sua gestão financeira diária.",
    color: "text-amber-500 bg-amber-500/10",
=======
    title: "Finanças Estratégicas & 50/30/20",
    desc: "Utilize a regra dos potes e proteções de limite de cartão para manter seu caixa saudável.",
>>>>>>> 8aaefac (New UI:UX etc..)
    link: "dicas-produtividade"
  }
];

export default function Documentation() {
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/suporte"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight">Centro de Ajuda</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Guias Oficiais V2.0</p>
=======
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
>>>>>>> 8aaefac (New UI:UX etc..)
          </div>
        </div>
      </header>

<<<<<<< HEAD
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-16">
        
        <div className="space-y-4 text-center pb-12 card-reveal">
          <div className="mx-auto w-fit p-4 rounded-2xl bg-primary/10 mb-6">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter">
            Como podemos te <span className="text-primary italic">ajudar?</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            Tutoriais passo a passo e respostas detalhadas para você dominar o CashFlow Premium.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8">
          {sections.map((sec, i) => (
             <Link key={i} to={`/documentacao/${sec.link}`} className="glass-card p-6 rounded-2xl border flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform duration-300 group cursor-pointer card-shadow">
               <div className={`p-3 rounded-xl ${sec.color}`}>
                 <sec.icon className="h-6 w-6" />
               </div>
               <div className="space-y-2 flex-1">
                 <h2 className="text-xl font-bold">{sec.title}</h2>
                 <p className="text-sm text-muted-foreground leading-relaxed">{sec.desc}</p>
               </div>
               <div className="mt-4 flex items-center text-primary font-semibold text-sm group-hover:underline w-full justify-between">
                 <span>Ler artigo completo</span>
                 <ChevronRight className="h-4 w-4" />
               </div>
             </Link>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl gradient-primary text-white text-center shadow-xl space-y-4 overflow-hidden relative group">
           <BookOpen className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
           <h3 className="text-2xl font-black relative z-10">Não encontrou o que procurava?</h3>
           <p className="opacity-90 relative z-10 max-w-md mx-auto">Nossos especialistas estão disponíveis no chat para te auxiliar com qualquer dúvida específica.</p>
           <Button variant="secondary" size="lg" className="rounded-xl font-bold mt-4 relative z-10" asChild>
             <Link to="/chat">Falar com o Suporte</Link>
           </Button>
=======
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
>>>>>>> 8aaefac (New UI:UX etc..)
        </div>
      </main>
    </div>
  );
}
