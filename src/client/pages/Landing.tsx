import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Wallet,
  TrendingUp,
  ShieldCheck,
  BarChart3,
<<<<<<< HEAD
  Target,
  Zap,
  ArrowRight,
  Star,
  PiggyBank,
  LineChart,
  Bell,
  Lock,
  ChevronRight,
  Sparkles,
  Activity,
  Cpu,
  Layers,
  CheckCircle2,
  ChevronDown,
=======
  Zap,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
>>>>>>> 8aaefac (New UI:UX etc..)
  Plus,
  Minus,
  Menu,
  X,
<<<<<<< HEAD
=======
  CreditCard,
  Building2,
  Lock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  FileSpreadsheet,
  Sliders,
  ChevronDown,
  Layers,
  Sparkles,
  Search,
>>>>>>> 8aaefac (New UI:UX etc..)
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/client/lib/utils";

<<<<<<< HEAD
/* ─── Data ─── */

const features = [
  {
    icon: Cpu,
    title: "IA Financeira",
    description:
      "Nossa IA analisa seus padrões de consumo e sugere economias personalizadas todos os dias.",
    gradient: "from-purple-500/20 to-violet-600/5",
    iconColor: "text-purple-400",
    borderHover: "group-hover:border-purple-500/30",
  },
  {
    icon: Activity,
    title: "Insights em Tempo Real",
    description:
      "Visualize o fluxo de caixa com precisão absoluta, antecipando gargalos e oportunidades.",
    gradient: "from-blue-500/20 to-cyan-600/5",
    iconColor: "text-blue-400",
    borderHover: "group-hover:border-blue-500/30",
  },
  {
    icon: ShieldCheck,
    title: "Privacidade Híbrida",
    description:
      "Seus dados sensíveis permanecem sob sua custódia total, criptografados ponta a ponta.",
    gradient: "from-emerald-500/20 to-teal-600/5",
    iconColor: "text-emerald-400",
    borderHover: "group-hover:border-emerald-500/30",
  },
  {
    icon: Zap,
    title: "Automação Inteligente",
    description:
      "Crie regras de categorização e metas automáticas que trabalham por você 24/7.",
    gradient: "from-amber-500/20 to-orange-600/5",
    iconColor: "text-amber-400",
    borderHover: "group-hover:border-amber-500/30",
  },
  {
    icon: BarChart3,
    title: "Visualização de Dados",
    description:
      "Gráficos e relatórios interativos que transformam números complexos em decisões claras.",
    gradient: "from-rose-500/20 to-pink-600/5",
    iconColor: "text-rose-400",
    borderHover: "group-hover:border-rose-500/30",
  },
];

const howItWorksSteps = [
  {
    step: "01",
    title: "Crie sua Conta",
    description:
      "Cadastre-se gratuitamente em segundos e configure seu perfil financeiro personalizado.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Conecte suas Finanças",
    description:
      "Adicione suas contas, categorias e metas. Nossa IA começa a trabalhar imediatamente.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Acompanhe o Progresso",
    description:
      "Monitore seus gastos, receitas e metas em tempo real com insights poderosos.",
    icon: TrendingUp,
=======
/* ─── Mock Data & Config ─── */

const stats = [
  { value: "R$ 4.8B+", label: "Volume transacionado protegido" },
  { value: "99.98%", label: "Precisão em conciliações automáticas" },
  { value: "14.200+", label: "Empresas e cofres corporativos" },
  { value: "< 90s", label: "Tempo médio de conciliação diária" },
];

const features = [
  {
    icon: RefreshCw,
    tag: "CONCILIAÇÃO",
    title: "Conciliação Automatizada 24/7",
    description:
      "Importação e reconciliação contínua de extratos bancários, cartões e PIX com regras personalizadas de alta precisão.",
  },
  {
    icon: TrendingUp,
    tag: "PROJEÇÃO",
    title: "Previsibilidade & DRE Dinâmico",
    description:
      "Simulações de fluxo de caixa para 30, 60 e 90 dias, antecipando quebras operacionais e identificando sazonalidades.",
  },
  {
    icon: Lock,
    tag: "SEGURANÇA",
    title: "Cofre Criptografado & Custódia",
    description:
      "Criptografia ponta a ponta AES-256-GCM. Suas informações financeiras permanecem sob controle restrito e blindado.",
  },
  {
    icon: Sliders,
    tag: "CONTROLE",
    title: "Subcontas & Tetos de Gastos",
    description:
      "Defina orçamentos inflexíveis por centro de custo, equipe ou projeto com alertas preventivos de estouro de limite.",
  },
  {
    icon: FileSpreadsheet,
    tag: "AUDITORIA",
    title: "Relatórios Fiscais & Exportações",
    description:
      "Gere balancetes, relatórios de tesouraria e exportações limpas em XLSX e PDF formatados para contabilidade e sócios.",
  },
  {
    icon: Zap,
    tag: "INTELIGÊNCIA",
    title: "Detecção de Anomalias & Vencimentos",
    description:
      "Alertas automáticos para cobranças duplicadas, desvios de padrão de gastos e lembretes com antecedência estratégica.",
  },
];

const howItWorks = [
  {
    step: "01",
    tag: "ONBOARDING INSTANTÂNEO",
    title: "Estruture suas Contas em Minutos",
    description:
      "Cadastre suas contas bancárias, cartões e categorias essenciais com estrutura contábil padronizada e sem atritos.",
  },
  {
    step: "02",
    tag: "AUTOMAÇÃO & REGRAS",
    title: "Defina Políticas de Fluxo e Limites",
    description:
      "Configure regras inteligentes de classificação e tetos orçamentários que organizam seus lançamentos no piloto automático.",
  },
  {
    step: "03",
    tag: "DECISÃO ESTRATÉGICA",
    title: "Assuma o Comando com Visão de Cofre",
    description:
      "Acompanhe balanços consolidados, indicadores de margem e relatórios executivos para tomar decisões com segurança inabalável.",
  },
];

const mockTransactions = [
  {
    id: "tx-1",
    merchant: "Stripe Payouts",
    category: "Receita Operacional",
    amount: "+R$ 28.450,00",
    isPositive: true,
    date: "Hoje, 14:32",
    type: "Receita",
    status: "Conciliado",
  },
  {
    id: "tx-2",
    merchant: "Amazon Web Services",
    category: "Infraestrutura Cloud",
    amount: "-R$ 3.820,40",
    isPositive: false,
    date: "Hoje, 11:15",
    type: "Despesa",
    status: "Liquidado",
  },
  {
    id: "tx-3",
    merchant: "Meta Ads Enterprise",
    category: "Marketing & Aquisição",
    amount: "-R$ 6.200,00",
    isPositive: false,
    date: "Ontem, 19:40",
    type: "Despesa",
    status: "Liquidado",
  },
  {
    id: "tx-4",
    merchant: "Venda B2B — Software Corp",
    category: "Assinaturas Anuais",
    amount: "+R$ 45.000,00",
    isPositive: true,
    date: "Ontem, 16:10",
    type: "Receita",
    status: "Conciliado",
  },
  {
    id: "tx-5",
    merchant: "Google Cloud Platform",
    category: "Serviços e APIs",
    amount: "-R$ 1.450,80",
    isPositive: false,
    date: "06 Set, 09:22",
    type: "Despesa",
    status: "Liquidado",
  },
];

const articles = [
  {
    category: "TESOURARIA",
    date: "Setembro 2026",
    readTime: "4 min de leitura",
    title: "O manual definitivo para estruturar a reserva de caixa operacional",
    excerpt:
      "Como calcular o runway real da sua operação e blindar a liquidez contra oscilações de mercado sem congelar capital.",
  },
  {
    category: "AUTOMAÇÃO",
    date: "Agosto 2026",
    readTime: "6 min de leitura",
    title: "Por que planilhas falham na escala e como auditar o fluxo em tempo real",
    excerpt:
      "A transição de controles manuais para arquiteturas de livro-caixa automatizadas e imunes a erro humano.",
  },
  {
    category: "SEGURANÇA",
    date: "Agosto 2026",
    readTime: "5 min de leitura",
    title: "Criptografia de ponta a ponta na gestão de dados contábeis",
    excerpt:
      "Como a segregação de chaves e custódia local elevam o padrão de compliance e privacidade financeira.",
>>>>>>> 8aaefac (New UI:UX etc..)
  },
];

const testimonials = [
  {
<<<<<<< HEAD
    name: "Lucas M.",
    role: "Empreendedor",
    text: "O CashFlow transformou a forma como eu gerencio meu negócio. Os insights de IA são incríveis.",
    avatar: "LM",
    rating: 5,
  },
  {
    name: "Ana S.",
    role: "Product Manager",
    text: "A interface é simplesmente linda e os relatórios me poupam horas de trabalho toda semana.",
    avatar: "AS",
    rating: 5,
  },
  {
    name: "Diego P.",
    role: "UX Designer",
    text: "Finalmente uma ferramenta financeira que parece ter sido feita no futuro. Recomendo fortemente.",
    avatar: "DP",
    rating: 5,
=======
    quote:
      "O CashFlow trouxe uma sobriedade cirúrgica para a nossa tesouraria. A precisão do fluxo diário e os relatórios com acabamento impecável nos deram clareza absoluta nas rodadas de planejamento.",
    author: "Eduardo Vasconcellos",
    role: "Diretor Financeiro / CFO — Grupo Vértice",
    company: "Vértice Capital",
  },
  {
    quote:
      "Substituímos três ferramentas fragmentadas por uma única central com visual de cofre suíço. A conciliação automática economiza mais de 15 horas da nossa equipe toda semana.",
    author: "Helena Siqueira",
    role: "Fundadora & CEO — Lumina Tech",
    company: "Lumina",
  },
  {
    quote:
      "Design de altíssimo nível com seriedade financeira real. Não parece um app genérico colorido; parece um terminal de banco privado desenhado para a nova era.",
    author: "Marcelo Albuquerque",
    role: "Head de Operações — Aetheris Studio",
    company: "Aetheris",
>>>>>>> 8aaefac (New UI:UX etc..)
  },
];

const faqItems = [
  {
<<<<<<< HEAD
    question: "Quanto tempo leva para configurar?",
    answer:
      "Menos de 2 minutos! Basta criar sua conta, adicionar suas contas financeiras e nossa IA faz o resto. Sem configurações complexas.",
  },
  {
    question: "O CashFlow é realmente gratuito?",
    answer:
      "Sim! Oferecemos um plano gratuito com todos os recursos essenciais. Planos premium desbloqueiam funcionalidades avançadas de IA e relatórios.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Absolutamente. Usamos criptografia AES-256-GCM de ponta a ponta, autenticação JWT com dois fatores e seus dados sensíveis nunca saem do seu dispositivo.",
  },
  {
    question: "Posso integrar com minhas ferramentas?",
    answer:
      "Sim, o CashFlow se integra com diversas ferramentas e estamos constantemente adicionando novas integrações baseadas no feedback dos usuários.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Claro! Sem contratos ou compromissos. Você pode cancelar seu plano premium a qualquer momento e continuar usando o plano gratuito.",
  },
];

const partners = ["LOGOIPSUM", "TRACLE", "LGPSM", "PHYLUM", "QUANTIX"];

/* ─── Animated Counter Hook ─── */
function useCountUp(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, start, duration]);

  return { count, ref };
}

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── FAQ Item Component ─── */
function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqItems)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "border rounded-2xl transition-all duration-500 overflow-hidden",
        isOpen
          ? "border-purple-500/30 bg-purple-500/5"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <span className="text-[15px] sm:text-base font-semibold text-white/90 pr-4">
          {item.question}
        </span>
        <div
          className={cn(
            "shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
            isOpen
              ? "bg-purple-500/20 text-purple-400 rotate-0"
              : "bg-white/5 text-white/40 group-hover:bg-white/10"
          )}
        >
          {isOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </div>
      </button>
      <div
        className={cn(
          "grid transition-all duration-500",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-[14px] sm:text-[15px] text-white/40 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Landing Page ─── */
export default function Landing() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useInView(0.1);
  const featuresRef = useInView(0.1);
  const howItWorksRef = useInView(0.1);
  const testimonialsRef = useInView(0.1);
  const faqRef = useInView(0.1);
  const ctaRef = useInView(0.1);

  const usersCount = useCountUp(10000, 2500);
  const transCount = useCountUp(2, 2500);
  const countriesCount = useCountUp(50, 2000);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col selection:bg-purple-500/30 font-sans overflow-x-hidden">
      {/* ─── Ambient Glows ─── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[30%] w-[60%] h-[60%] rounded-full bg-purple-600/[0.07] blur-[180px] animate-pulse" />
        <div className="absolute top-[40%] right-[-20%] w-[50%] h-[50%] rounded-full bg-blue-600/[0.05] blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[40%] rounded-full bg-indigo-600/[0.06] blur-[140px]" />
      </div>

      {/* ─── Navbar ─── */}
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          scrolled
            ? "bg-black/60 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span
              className="text-xl font-black tracking-tighter"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Cash<span className="text-purple-400 italic">Flow</span>
            </span>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.03]">
              {[
                { label: "Features", href: "#features" },
                { label: "Como Funciona", href: "#how-it-works" },
                { label: "Depoimentos", href: "#testimonials" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-[13px] font-semibold text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Action */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:block text-[13px] font-semibold text-white/50 hover:text-white transition-colors px-4 py-2"
            >
              Entrar
            </Link>
            <Link to="/cadastro">
              <Button className="rounded-full px-6 h-10 bg-purple-600 hover:bg-purple-500 text-white font-semibold border-0 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all active:scale-95 text-[13px] gap-2">
                Começar Grátis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/[0.06] text-white/60 hover:text-white transition-all"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
=======
    question: "O que diferencia o CashFlow de sistemas tradicionais de gestão financeira?",
    answer:
      "O CashFlow opera sob o conceito de 'Midnight Vault': unimos uma arquitetura de dados austera e segura com automações de conciliação bancária, tetos orçamentários inflexíveis e relatórios executivos de alto contraste. É feito para quem valoriza precisão, privacidade e design editorial.",
  },
  {
    question: "Como funciona a segurança e custódia dos dados financeiros?",
    answer:
      "Adotamos criptografia de padrão militar AES-256-GCM. Seus dados contábeis, chaves de acesso e extratos são protegidos em camadas isoladas com autenticação forte e controle rigoroso de sessões.",
  },
  {
    question: "Posso importar lançamentos e exportar para minha contabilidade?",
    answer:
      "Sim. Você pode importar extratos via OFX/CSV/XLSX e exportar relatórios gerenciais consolidados em PDF e planilhas totalmente formatadas para envio ao seu contador ou sócios.",
  },
  {
    question: "Existe plano gratuito para começar?",
    answer:
      "Sim. Oferecemos acesso completo aos módulos essenciais de fluxo de caixa, categorias e relatórios para você estruturar suas finanças sem custo inicial.",
  },
  {
    question: "Posso cancelar ou migrar de plano a qualquer momento?",
    answer:
      "Sim. Não há fidelidade ou contratos de aprisionamento. Você pode alterar seu plano ou exportar o histórico completo das suas finanças com um único clique a qualquer instante.",
  },
];

/* ─── Chart Data by Period ─── */
const chartDataSets: Record<
  string,
  { balance: string; change: string; points: string; values: number[] }
> = {
  "1D": {
    balance: "R$ 384.920,45",
    change: "+1.2% hoje",
    points: "M 0 60 Q 50 55, 100 50 T 200 45 T 300 35 T 400 30",
    values: [380, 381, 382.5, 383.8, 384.9],
  },
  "1S": {
    balance: "R$ 384.920,45",
    change: "+4.8% esta semana",
    points: "M 0 75 Q 50 65, 100 58 T 200 48 T 300 38 T 400 25",
    values: [367, 371, 375, 380, 384.9],
  },
  "1M": {
    balance: "R$ 384.920,45",
    change: "+18.4% este mês",
    points: "M 0 85 C 60 80, 110 55, 170 60 C 230 65, 290 35, 400 20",
    values: [325, 340, 355, 370, 384.9],
  },
  "1A": {
    balance: "R$ 384.920,45",
    change: "+64.2% em 12 meses",
    points: "M 0 95 C 70 85, 130 70, 200 55 C 270 40, 330 30, 400 15",
    values: [234, 268, 310, 350, 384.9],
  },
  Tudo: {
    balance: "R$ 384.920,45",
    change: "+142.0% consolidado",
    points: "M 0 98 C 80 90, 150 65, 220 50 C 290 35, 350 25, 400 12",
    values: [158, 210, 280, 340, 384.9],
  },
};

export default function Landing() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1M");
  const [emailInput, setEmailInput] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tableFilter, setTableFilter] = useState<string>("Todos");
  const [spendLimit, setSpendLimit] = useState<number>(45000);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentChart = chartDataSets[selectedPeriod] || chartDataSets["1M"];

  const filteredTransactions = mockTransactions.filter((tx) => {
    if (tableFilter === "Todos") return true;
    if (tableFilter === "Receitas") return tx.isPositive;
    if (tableFilter === "Despesas") return !tx.isPositive;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#08080a] text-[#e2e3e9] flex flex-col font-sans selection:bg-[#cc9166]/20 selection:text-white antialiased overflow-x-hidden">

      {/* ─── Global SVG Gradients Definition ─── */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="gildedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(174, 147, 87)" />
            <stop offset="40%" stopColor="rgb(255, 240, 204)" />
            <stop offset="70%" stopColor="rgb(174, 147, 87)" />
            <stop offset="100%" stopColor="rgba(189, 157, 79, 0.4)" />
          </linearGradient>
          <linearGradient id="gildedArea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 240, 204, 0.18)" />
            <stop offset="50%" stopColor="rgba(174, 147, 87, 0.05)" />
            <stop offset="100%" stopColor="rgba(8, 8, 10, 0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* ─── Fixed Header (Navigation) ─── */}
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-[#08080a]/90 backdrop-blur-md border-b border-[#1c1d22] py-3.5 shadow-xl shadow-black/40"
            : "bg-transparent border-b border-transparent py-5"
        )}
      >
        <div className="max-w-[1216px] mx-auto px-5 sm:px-8 flex items-center justify-between">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border border-[#2e3038] bg-[#040406] flex items-center justify-center transition-colors group-hover:border-[#cc9166]">
              <span className="font-serif-display text-white text-lg font-bold leading-none select-none">/</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] font-bold tracking-tight text-white flex items-center gap-1.5 font-serif-display">
                CashFlow<span className="text-[#cc9166]">.</span>
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Visão Geral", href: "#hero" },
              { label: "Recursos", href: "#features" },
              { label: "Como Funciona", href: "#how-it-works" },
              { label: "Auditoria & Ledger", href: "#ledger" },
              { label: "Editorial", href: "#insights" },
              { label: "FAQ", href: "#faq" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-[14px] font-medium text-[#9194a1] hover:text-[#ffffff] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full border border-[#2e3038] hover:border-[#777a88] bg-transparent text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#121317]"
            >
              Entrar
            </Link>

            <Link
              to="/cadastro"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#ffffff] text-[#000000] text-[14px] font-medium hover:bg-[#f0f0f4] active:scale-[0.98] transition-all duration-200"
            >
              Começar Agora
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-[#1c1d22] bg-[#040406] text-[#9194a1] hover:text-white"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
>>>>>>> 8aaefac (New UI:UX etc..)
            </button>
          </div>
        </div>

<<<<<<< HEAD
        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden transition-all duration-500 overflow-hidden",
            mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-6 pb-6 pt-2 space-y-1 border-t border-white/[0.06] bg-black/80 backdrop-blur-2xl">
            {[
              { label: "Features", href: "#features" },
              { label: "Como Funciona", href: "#how-it-works" },
              { label: "Depoimentos", href: "#testimonials" },
=======
        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#1c1d22] bg-[#08080a] px-6 py-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            {[
              { label: "Visão Geral", href: "#hero" },
              { label: "Recursos", href: "#features" },
              { label: "Como Funciona", href: "#how-it-works" },
              { label: "Auditoria & Ledger", href: "#ledger" },
              { label: "Editorial", href: "#insights" },
>>>>>>> 8aaefac (New UI:UX etc..)
              { label: "FAQ", href: "#faq" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
<<<<<<< HEAD
                className="block px-4 py-3 rounded-xl text-[14px] font-semibold text-white/50 hover:text-white hover:bg-white/[0.06] transition-all"
=======
                className="block py-2 text-[15px] font-medium text-[#9194a1] hover:text-white"
>>>>>>> 8aaefac (New UI:UX etc..)
              >
                {link.label}
              </a>
            ))}
<<<<<<< HEAD
            <Link
              to="/login"
              className="block px-4 py-3 rounded-xl text-[14px] font-semibold text-white/50 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              Entrar
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ─── Hero Section ─── */}
        <section
          ref={heroRef.ref}
          className="relative pt-36 sm:pt-44 pb-20 sm:pb-32 px-4 sm:px-6 flex flex-col items-center text-center overflow-hidden"
        >
          {/* Top radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-purple-600/[0.12] blur-[200px] pointer-events-none" />

          <div
            className={cn(
              "max-w-5xl mx-auto space-y-8 relative z-10 transition-all duration-1000",
              heroRef.inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            {/* Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-purple-500/20 bg-purple-500/[0.08] backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-purple-300">
                  Otimize Suas Finanças
                </span>
              </div>
            </div>

            {/* Tagline */}
            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.92] text-white"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Controle Financeiro com{" "}
              <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400">
                Automação e IA.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-medium">
              Uma plataforma inovadora que simplifica suas tarefas financeiras e
              ajuda seu negócio a crescer com confiança. Potencializado por IA
              para estabilidade inteligente.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/cadastro">
                <Button
                  size="lg"
                  className="h-14 rounded-full px-10 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[15px] shadow-2xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all hover:scale-[1.03] active:scale-95 border-0 gap-3"
                >
                  Começar Agora Grátis
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button
                  variant="ghost"
                  size="lg"
                  className="h-14 rounded-full px-10 border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/20 font-bold text-[15px] gap-3 transition-all"
                >
                  Explorar Features
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </a>
            </div>

            {/* Dashboard Showcase */}
            <div className="mt-16 sm:mt-24 relative group">
              {/* Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-violet-600/10 to-blue-600/20 blur-[80px] -z-10 rounded-[3rem] opacity-40 group-hover:opacity-70 transition-opacity duration-1000" />

              {/* Floating elements */}
              <div className="absolute -top-6 -right-3 sm:-right-6 z-20 p-4 rounded-2xl bg-[#0c0c10]/90 border border-white/[0.08] backdrop-blur-xl shadow-2xl animate-bounce-slow hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-white/40 font-medium">
                      Receitas
                    </p>
                    <p className="text-sm font-bold text-emerald-400">
                      +12.8%
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-2 sm:-left-6 z-20 p-4 rounded-2xl bg-[#0c0c10]/90 border border-white/[0.08] backdrop-blur-xl shadow-2xl hidden sm:block" style={{ animation: "bounce-slow 3s ease-in-out 1s infinite" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-white/40 font-medium">
                      Meta atingida!
                    </p>
                    <p className="text-sm font-bold text-purple-400">
                      Viagem 2026
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/[0.08] p-1.5 sm:p-2 bg-white/[0.03] backdrop-blur-3xl shadow-2xl overflow-hidden group-hover:border-purple-500/20 transition-all duration-700">
                <img
                  src="/dashboard_showcase.png"
                  alt="CashFlow Dashboard Showcase"
                  className="w-full rounded-[1.2rem] sm:rounded-[2rem] opacity-90 group-hover:opacity-100 transition-opacity duration-500 border border-white/[0.04]"
                />
                {/* Glass overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/60 via-transparent to-transparent pointer-events-none rounded-[2.5rem]" />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section
          id="features"
          ref={featuresRef.ref}
          className="py-24 sm:py-40 px-4 sm:px-6 relative overflow-hidden"
        >
          <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/[0.04] blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div
              className={cn(
                "flex flex-col items-center text-center space-y-6 mb-16 sm:mb-24 transition-all duration-700",
                featuresRef.inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <div className="px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/[0.06] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-purple-400">
                Features
              </div>
              <h2
                className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Acelere seu controle com{" "}
                <br className="hidden sm:block" />
                <span className="text-purple-400 italic">
                  processos inteligentes.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-white/35 max-w-2xl mx-auto leading-relaxed">
                Todas as ferramentas que você precisa para otimizar operações,
                aumentar produtividade e crescer com confiança.
              </p>
            </div>

            {/* Feature Cards: 3 on top, 2 on bottom centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {features.slice(0, 3).map((f, i) => (
                <div
                  key={i}
                  className={cn(
                    "group relative rounded-[1.8rem] border border-white/[0.06] bg-[#09090c] p-8 sm:p-10 space-y-6 overflow-hidden transition-all duration-700 hover:scale-[1.02]",
                    f.borderHover,
                    featuresRef.inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: featuresRef.inView ? `${i * 100}ms` : "0ms",
                  }}
                >
                  {/* Background gradient */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                      f.gradient
                    )}
                  />

                  <div className="relative z-10">
                    <div
                      className={cn(
                        "inline-flex p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:bg-white/[0.08]"
                      )}
                    >
                      <f.icon className={cn("h-7 w-7", f.iconColor)} />
                    </div>
                  </div>

                  <div className="relative z-10 space-y-3">
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      {f.title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-white/35 leading-relaxed font-medium">
                      {f.description}
                    </p>
                  </div>

                  {/* Decorative corner glow */}
                  <div className="absolute right-[-30px] bottom-[-30px] w-40 h-40 rounded-full bg-purple-500/[0.03] blur-3xl group-hover:bg-purple-500/[0.08] transition-all duration-700" />
                </div>
              ))}
            </div>

            {/* Bottom 2 cards centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-5 sm:mt-6 max-w-2xl lg:max-w-[66.666%] mx-auto">
              {features.slice(3).map((f, i) => (
                <div
                  key={i + 3}
                  className={cn(
                    "group relative rounded-[1.8rem] border border-white/[0.06] bg-[#09090c] p-8 sm:p-10 space-y-6 overflow-hidden transition-all duration-700 hover:scale-[1.02]",
                    f.borderHover,
                    featuresRef.inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: featuresRef.inView
                      ? `${(i + 3) * 100}ms`
                      : "0ms",
                  }}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                      f.gradient
                    )}
                  />

                  <div className="relative z-10">
                    <div className="inline-flex p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:bg-white/[0.08]">
                      <f.icon className={cn("h-7 w-7", f.iconColor)} />
                    </div>
                  </div>

                  <div className="relative z-10 space-y-3">
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      {f.title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-white/35 leading-relaxed font-medium">
                      {f.description}
                    </p>
                  </div>

                  <div className="absolute right-[-30px] bottom-[-30px] w-40 h-40 rounded-full bg-purple-500/[0.03] blur-3xl group-hover:bg-purple-500/[0.08] transition-all duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section
          id="how-it-works"
          ref={howItWorksRef.ref}
          className="py-24 sm:py-40 px-4 sm:px-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/[0.04] blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto">
            <div
              className={cn(
                "flex flex-col items-center text-center space-y-6 mb-16 sm:mb-24 transition-all duration-700",
                howItWorksRef.inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <div className="px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/[0.06] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">
                Como Funciona
              </div>
              <h2
                className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Configure Rápido,{" "}
                <br className="hidden sm:block" />
                <span className="text-blue-400 italic">
                  Comece a Usar Agora.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
              {/* Connection line (desktop only) */}
              <div className="hidden md:block absolute top-[4.5rem] left-[16.666%] right-[16.666%] h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

              {howItWorksSteps.map((step, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative flex flex-col items-center text-center space-y-6 transition-all duration-700",
                    howItWorksRef.inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: howItWorksRef.inView
                      ? `${i * 150}ms`
                      : "0ms",
                  }}
                >
                  {/* Step Number Circle */}
                  <div className="relative">
                    <div className="w-[5.5rem] h-[5.5rem] rounded-3xl bg-gradient-to-br from-purple-600/20 to-blue-600/10 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                      <span
                        className="text-2xl font-black text-purple-400"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {step.step}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <step.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div className="space-y-3 max-w-xs">
                    <h3
                      className="text-xl font-bold tracking-tight"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-white/35 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section
          id="testimonials"
          ref={testimonialsRef.ref}
          className="py-24 sm:py-40 px-4 sm:px-6 relative overflow-hidden"
        >
          <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/[0.04] blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div
              className={cn(
                "flex flex-col items-center text-center space-y-6 mb-16 sm:mb-24 transition-all duration-700",
                testimonialsRef.inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <div className="px-5 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-emerald-400">
                Depoimentos
              </div>
              <h2
                className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Quem usa CashFlow{" "}
                <br className="hidden sm:block" />
                <span className="text-emerald-400 italic">
                  não volta atrás.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={cn(
                    "group relative rounded-[1.8rem] border border-white/[0.06] bg-[#09090c] p-8 sm:p-10 space-y-6 transition-all duration-700 hover:border-purple-500/20 hover:scale-[1.02]",
                    testimonialsRef.inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: testimonialsRef.inView
                      ? `${i * 100}ms`
                      : "0ms",
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>

                  <p className="text-[15px] text-white/50 leading-relaxed font-medium italic">
                    "{t.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/[0.04]">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600/30 to-blue-600/20 border border-white/[0.08] flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-300">
                        {t.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.name}</p>
                      <p className="text-xs text-white/30 font-medium">
                        {t.role}
                      </p>
                    </div>
=======
            <div className="pt-3 border-t border-[#1c1d22] flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full text-center py-2.5 rounded-full border border-[#2e3038] text-[14px] font-medium text-white"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="w-full text-center py-2.5 rounded-full bg-white text-black text-[14px] font-medium"
              >
                Começar Agora
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ─── Main Content ─── */}
      <main className="flex-1" id="hero">

        {/* ─── 1. Hero Section (Split Layout 50/50, 1216px max width) ─── */}
        <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 px-5 sm:px-8 max-w-[1216px] mx-auto relative">

          {/* Subtle Ambient Backlight */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#cc9166]/[0.04] to-transparent blur-[120px] pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* Left Column: Editorial Headlines & Action (6 cols) */}
            <div className="lg:col-span-6 space-y-7 text-left">

              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc9166]" />
                <span className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[#cc9166]">
                  Vault de Fluxo de Caixa & Tesouraria
                </span>
              </div>

              {/* Display Heading in High-Contrast Serif */}
              <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-[64px] font-normal leading-[1.08] text-white tracking-[0.01em]">
                Midnight vault com precisão de livro-caixa.
              </h1>

              {/* Body Text */}
              <p className="text-[16px] sm:text-[18px] text-[#9194a1] leading-relaxed max-w-xl font-normal">
                Visibilidade institucional, conciliação em tempo real e limites automatizados. O padrão ouro em gestão financeira para negócios que exigem rigor e elegância.
              </p>

              {/* Email Capture Input & Primary Action Button (Unified Pill Design) */}
              <div className="pt-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = `/cadastro?email=${encodeURIComponent(emailInput)}`;
                  }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center max-w-md p-1.5 rounded-2xl sm:rounded-full border border-[#2e3038] bg-[#040406] focus-within:border-[#777a88] transition-colors gap-2"
                >
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Seu email corporativo"
                    className="flex-1 bg-transparent px-4 sm:px-5 py-2.5 text-[14px] text-white placeholder-[#777a88] focus:outline-none rounded-full"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#ffffff] text-[#000000] text-[14px] font-medium hover:bg-[#f0f0f4] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm"
                  >
                    Começar Grátis
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                {/* Subtext Guarantees */}
                <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#5e616e] mt-3.5 px-2">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#cc9166]" /> Sem necessidade de cartão
                  </span>
                  <span>•</span>
                  <span>Criptografia ponta a ponta</span>
                  <span>•</span>
                  <span>Setup em &lt; 2 minutos</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Hero Chart Card + Transactions (6 cols) */}
            <div className="lg:col-span-6 space-y-4">

              {/* Main Chart Card in Onyx */}
              <div className="rounded-[10px] border border-[#1c1d22] bg-[#040406] p-6 sm:p-7 shadow-2xl relative overflow-hidden">

                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1c1d22]">
                  <div>
                    <span className="text-[12px] font-semibold text-[#9194a1] uppercase tracking-wider block mb-1">
                      Saldo Consolidado
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif-display text-3xl sm:text-4xl text-white font-normal">
                        {currentChart.balance}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium text-[#4ade80] border border-[#2e3038] bg-[#121317]">
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />
                        {currentChart.change}
                      </span>
                    </div>
                  </div>

                  {/* Period Filter Pill Tags */}
                  <div className="flex items-center gap-1 p-1 rounded-full border border-[#1c1d22] bg-[#121317] self-start sm:self-auto">
                    {["1D", "1S", "1M", "1A", "Tudo"].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[12px] font-medium transition-all duration-200",
                          selectedPeriod === period
                            ? "bg-white text-black font-semibold shadow-sm"
                            : "text-[#9194a1] hover:text-white"
                        )}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gilded SVG Chart Line */}
                <div className="py-5 relative">
                  <div className="h-44 w-full relative">
                    <svg
                      viewBox="0 0 400 100"
                      className="w-full h-full overflow-visible"
                      preserveAspectRatio="none"
                    >
                      {/* Area Fill */}
                      <path
                        d={`${currentChart.points} L 400 100 L 0 100 Z`}
                        fill="url(#gildedArea)"
                        className="transition-all duration-500"
                      />
                      {/* Gilded Stroke Line */}
                      <path
                        d={currentChart.points}
                        fill="none"
                        stroke="url(#gildedGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-500"
                      />
                    </svg>

                    {/* Interactive Active Point */}
                    <div className="absolute right-0 top-3 -translate-x-1/2 flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[#fff0cc] ring-4 ring-[#ae9357]/40 shadow-lg" />
                      <div className="mt-2 px-2.5 py-1 rounded-md bg-[#121317] border border-[#2e3038] text-[11px] text-white font-mono whitespace-nowrap shadow-xl">
                        R$ 384.920,45
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spend Limit Gauge / Control Slider */}
                <div className="pt-4 border-t border-[#1c1d22] space-y-2">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#9194a1] font-medium flex items-center gap-1.5">
                      <Sliders className="h-3.5 w-3.5 text-[#cc9166]" /> Limite Mensal Automatizado
                    </span>
                    <span className="font-mono text-white text-[12px]">
                      R$ {spendLimit.toLocaleString("pt-BR")},00 / R$ 50.000
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1c1d22] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(spendLimit / 50000) * 100}%`,
                        background:
                          "linear-gradient(90deg, rgb(174, 147, 87), rgb(255, 240, 204))",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Compact Transaction Rows preview */}
              <div className="rounded-[10px] border border-[#1c1d22] bg-[#040406] p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between text-[12px] text-[#9194a1] pb-2 border-b border-[#1c1d22]">
                  <span className="font-medium uppercase tracking-wider">Últimas Conciliações</span>
                  <span className="text-[#cc9166] text-[11px] font-semibold">Feed em Tempo Real</span>
                </div>

                <div className="space-y-2.5">
                  {mockTransactions.slice(0, 3).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-[#121317] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full border border-[#2e3038] bg-[#121317] flex items-center justify-center text-[11px] font-mono text-[#acafb9]">
                          {tx.merchant[0]}
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-white leading-tight">
                            {tx.merchant}
                          </p>
                          <p className="text-[11px] text-[#5e616e]">{tx.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={cn(
                            "text-[13px] font-mono font-medium block",
                            tx.isPositive ? "text-[#e2e3e9]" : "text-[#9194a1]"
                          )}
                        >
                          {tx.amount}
                        </span>
                        <span className="text-[10px] text-[#5e616e]">{tx.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ─── 2. Stats Bar (Full Bleed Proof Points with Serif Numerals) ─── */}
        <section className="py-16 border-y border-[#1c1d22] bg-[#040406]/50">
          <div className="max-w-[1216px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1.5 text-left">
                  <div className="font-serif-display text-3xl sm:text-4xl lg:text-[44px] text-white font-normal leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-[13px] sm:text-[14px] text-[#9194a1] font-normal leading-snug">
                    {stat.label}
>>>>>>> 8aaefac (New UI:UX etc..)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* ─── FAQ ─── */}
        <section
          id="faq"
          ref={faqRef.ref}
          className="py-24 sm:py-40 px-4 sm:px-6 relative overflow-hidden"
        >
          <div className="max-w-3xl mx-auto">
            <div
              className={cn(
                "flex flex-col items-center text-center space-y-6 mb-16 transition-all duration-700",
                faqRef.inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <div className="px-5 py-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-violet-400">
                FAQ
              </div>
              <h2
                className="text-3xl sm:text-5xl font-black tracking-tighter"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Tudo que Você Precisa{" "}
                <br className="hidden sm:block" />
                <span className="text-violet-400 italic">Saber Antes.</span>
              </h2>
              <p className="text-base text-white/35 max-w-xl mx-auto">
                Respostas para as perguntas mais frequentes, assim você pode
                começar com total confiança.
              </p>
            </div>

            <div
              className={cn(
                "space-y-3 transition-all duration-700",
                faqRef.inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              {faqItems.map((item, i) => (
                <FAQItem
                  key={i}
                  item={item}
                  isOpen={openFAQ === i}
                  onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA Final ─── */}
        <section ref={ctaRef.ref} className="py-20 sm:py-32 px-4 sm:px-6">
          <div
            className={cn(
              "max-w-5xl mx-auto relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] transition-all duration-1000",
              ctaRef.inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-violet-900/30 to-blue-900/40" />
            <div className="absolute inset-0 bg-[#030303]/30" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-purple-500/20 blur-[120px]" />

            {/* Decorative border */}
            <div className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] border border-purple-500/10" />

            <div className="relative z-10 py-16 sm:py-24 px-6 sm:px-16 flex flex-col items-center text-center space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center mb-2">
                <Sparkles className="h-8 w-8 text-purple-400" />
              </div>

              <h2
                className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Pronto para Tomar{" "}
                <br className="hidden sm:block" />
                Controle?
              </h2>
              <p className="text-base sm:text-lg text-white/45 max-w-xl mx-auto leading-relaxed">
                Junte-se a milhares de usuários que já transformaram seu futuro
                financeiro. Comece agora, é grátis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                <Link to="/cadastro">
                  <Button
                    size="lg"
                    className="h-14 sm:h-16 rounded-full px-10 sm:px-14 bg-white text-black hover:bg-white/90 font-black text-base sm:text-lg transition-all active:scale-95 shadow-2xl shadow-white/10 hover:shadow-white/20 border-0"
                  >
                    Começar Agora
                  </Button>
                </Link>
                <Link
                  to="/documentacao"
                  className="text-white/50 hover:text-white font-bold text-base underline underline-offset-8 decoration-purple-500/30 hover:decoration-purple-500 transition-all"
                >
                  Ver Documentação
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="py-16 sm:py-20 px-4 sm:px-6 border-t border-white/[0.04] bg-[#010101]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">
          <div className="col-span-2 md:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-600 shadow-lg shadow-purple-600/20">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-black tracking-tighter">
                Cash<span className="text-purple-400 italic">Flow</span>
              </span>
            </div>
            <p className="text-white/30 text-[13px] leading-relaxed max-w-xs">
              Sua inteligência financeira personalizada. Transformando dados em
              liberdade real.
            </p>
          </div>

          <div>
            <h4 className="text-white/80 font-bold mb-5 uppercase tracking-widest text-[11px]">
              Navegação
            </h4>
            <ul className="space-y-3 text-white/30 text-[13px] font-medium">
              <li>
                <a
                  href="#features"
                  className="hover:text-purple-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-purple-400 transition-colors"
                >
                  Como Funciona
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-purple-400 transition-colors"
                >
                  Depoimentos
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-purple-400 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 font-bold mb-5 uppercase tracking-widest text-[11px]">
              Recursos
            </h4>
            <ul className="space-y-3 text-white/30 text-[13px] font-medium">
              <li>
                <Link
                  to="/documentacao"
                  className="hover:text-purple-400 transition-colors"
                >
                  Documentação
                </Link>
              </li>
              <li>
                <Link
                  to="/suporte"
                  className="hover:text-purple-400 transition-colors"
                >
                  Suporte
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 font-bold mb-5 uppercase tracking-widest text-[11px]">
              Legal
            </h4>
            <ul className="space-y-3 text-white/30 text-[13px] font-medium">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-14 sm:mt-20 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-[12px] font-medium text-white/20">
            © {new Date().getFullYear()} CashFlow. Todos os direitos reservados.
          </span>
          <div className="flex gap-8 items-center text-[11px] font-bold uppercase tracking-widest text-white/20">
            <a
              href="#"
              className="hover:text-purple-400 transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="hover:text-purple-400 transition-colors"
            >
              Discord
            </a>
            <a
              href="#"
              className="hover:text-purple-400 transition-colors"
            >
              Github
            </a>
=======
        {/* ─── 3. Features Section (3-Column Onyx Cards with 1px Hairline Borders) ─── */}
        <section id="features" className="py-28 sm:py-36 px-5 sm:px-8 max-w-[1216px] mx-auto">

          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc9166]" />
              <span className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[#cc9166]">
                Engenharia Financeira
              </span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-white font-normal tracking-[0.01em]">
              Arquitetura de precisão para seu caixa.
            </h2>
            <p className="text-[16px] text-[#9194a1] leading-relaxed">
              Desenvolvido para eliminar atritos operacionais e garantir visibilidade irrestrita com a austeridade de um livro-caixa institucional.
            </p>
          </div>

          {/* 3x2 Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="rounded-[10px] border border-[#1c1d22] bg-[#040406] p-7 space-y-5 transition-all duration-300 hover:border-[#2e3038] hover:bg-[#07070a] group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full border border-[#2e3038] bg-[#121317] flex items-center justify-center text-white transition-colors group-hover:border-[#777a88]">
                    <item.icon className="h-5 w-5 text-[#c7c9d1]" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#cc9166] uppercase tracking-wider font-mono">
                    {item.tag}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <h3 className="text-[18px] font-medium text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-[#9194a1] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4. Live Ledger & Sandbox Section ─── */}
        <section id="ledger" className="py-24 border-t border-[#1c1d22] bg-[#040406]">
          <div className="max-w-[1216px] mx-auto px-5 sm:px-8">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-2 max-w-xl">
                <span className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[#cc9166]">
                  ● LIVRO-CAIXA EM TEMPO REAL
                </span>
                <h2 className="font-serif-display text-3xl sm:text-4xl text-white font-normal">
                  Transparência de dados sem contêineres poluídos.
                </h2>
                <p className="text-[15px] text-[#9194a1]">
                  Tabelas com divisores de 1px em Graphite, tipografia precisa e alinhamento numérico à direita.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 p-1 rounded-full border border-[#1c1d22] bg-[#121317]">
                {["Todos", "Receitas", "Despesas"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTableFilter(filter)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors",
                      tableFilter === filter
                        ? "bg-white text-black font-semibold"
                        : "text-[#9194a1] hover:text-white"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Data Table Container */}
            <div className="border-t border-b border-[#1c1d22] overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#1c1d22] text-[12px] uppercase text-[#9194a1] tracking-wider">
                    <th className="py-3 px-4 font-medium">Lançamento / Origem</th>
                    <th className="py-3 px-4 font-medium">Categoria</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Data / Hora</th>
                    <th className="py-3 px-4 font-medium text-right">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c1d22] text-[14px]">
                  {filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-[#121317]/60 transition-colors group"
                    >
                      <td className="py-3.5 px-4 font-medium text-white flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full border border-[#2e3038] bg-[#08080a] flex items-center justify-center text-[11px] font-mono text-[#acafb9]">
                          {tx.merchant[0]}
                        </div>
                        {tx.merchant}
                      </td>
                      <td className="py-3.5 px-4 text-[#9194a1]">{tx.category}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border border-[#2e3038] text-[#acafb9] bg-[#08080a]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] mr-1.5" />
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#5e616e] font-mono text-[12px]">
                        {tx.date}
                      </td>
                      <td
                        className={cn(
                          "py-3.5 px-4 text-right font-mono font-medium",
                          tx.isPositive ? "text-[#e2e3e9]" : "text-[#acafb9]"
                        )}
                      >
                        {tx.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-4 text-[12px] text-[#5e616e]">
              <span>Mostrando {filteredTransactions.length} lançamentos sincronizados</span>
              <span className="text-[#9194a1]">Conciliação bancária ativa via OFX/API</span>
            </div>

          </div>
        </section>

        {/* ─── 5. How It Works (01, 02, 03 Structured Progression) ─── */}
        <section id="how-it-works" className="py-28 sm:py-36 px-5 sm:px-8 max-w-[1216px] mx-auto">

          <div className="max-w-2xl mx-auto text-center space-y-4 mb-20">
            <span className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[#cc9166]">
              ● EXECUÇÃO SISTEMÁTICA
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-white font-normal">
              Três passos para a soberania do caixa.
            </h2>
            <p className="text-[16px] text-[#9194a1]">
              Fluxo desenhado para implementação limpa e sem fricção com sua equipe contábil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {howItWorks.map((step, idx) => (
              <div
                key={idx}
                className="rounded-[10px] border border-[#1c1d22] bg-[#040406] p-8 space-y-6 relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1c1d22] pb-4">
                    <span className="font-serif-display text-4xl text-[#ffffff] font-normal">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-semibold text-[#cc9166] uppercase tracking-wider font-mono">
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="text-[19px] font-medium text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-[#9194a1] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1c1d22] flex items-center justify-between text-[12px] text-[#5e616e]">
                  <span>Fase {step.step}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#777a88]" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 6. Editorial Testimonials ─── */}
        <section className="py-24 border-t border-[#1c1d22] bg-[#040406]/70">
          <div className="max-w-[1216px] mx-auto px-5 sm:px-8">

            <div className="max-w-xl mb-14 space-y-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[#cc9166]">
                ● QUEM CONFIA NO VAULT
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-white font-normal">
                Depoimentos de lideranças financeiras.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-[10px] border border-[#1c1d22] bg-[#08080a] p-7 flex flex-col justify-between space-y-6"
                >
                  <p className="text-[15px] text-[#c7c9d1] leading-relaxed font-normal italic">
                    "{t.quote}"
                  </p>

                  <div className="pt-4 border-t border-[#1c1d22] space-y-1">
                    <p className="text-[14px] font-medium text-white">{t.author}</p>
                    <p className="text-[12px] text-[#9194a1]">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── 7. Editorial Insights & Blog Cards ─── */}
        <section id="insights" className="py-28 sm:py-36 px-5 sm:px-8 max-w-[1216px] mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div className="space-y-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[#cc9166]">
                ● ARTIGOS & NOTAS DE TESOURARIA
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-white font-normal">
                Insights para gestão de alto impacto.
              </h2>
            </div>
            <Link
              to="/documentacao"
              className="text-[14px] font-medium text-[#cc9166] hover:text-white transition-colors flex items-center gap-1 self-start"
            >
              Acessar Documentação Completa <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-[10px] border border-[#1c1d22] bg-[#040406] p-7 hover:border-[#2e3038] transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[12px] font-semibold text-[#cc9166] uppercase tracking-wider font-mono">
                      {art.category}
                    </span>
                    <span className="text-[#5e616e]">{art.date}</span>
                  </div>

                  <h3 className="text-[18px] font-medium text-white group-hover:text-[#ffffff] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-[14px] text-[#9194a1] leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1c1d22] flex items-center justify-between text-[12px] text-[#acafb9]">
                  <span>{art.readTime}</span>
                  <span className="text-[#cc9166] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Ler nota <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ─── 8. FAQ Accordion Section ─── */}
        <section id="faq" className="py-24 border-t border-[#1c1d22] bg-[#040406]">
          <div className="max-w-[780px] mx-auto px-5 sm:px-8">

            <div className="text-center space-y-3 mb-14">
              <span className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[#cc9166]">
                ● RESPOSTAS DIRETAS
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-white font-normal">
                Perguntas Frequentes
              </h2>
              <p className="text-[15px] text-[#9194a1]">
                Tudo o que você precisa saber sobre o cofre, segurança e operação.
              </p>
            </div>

            <div className="space-y-3">
              {faqItems.map((faq, i) => {
                const isOpen = openFAQ === i;
                return (
                  <div
                    key={i}
                    className="rounded-[10px] border border-[#1c1d22] bg-[#08080a] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFAQ(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                    >
                      <span className="text-[15px] font-medium text-white pr-4">
                        {faq.question}
                      </span>
                      <div className="shrink-0 w-6 h-6 rounded-full border border-[#2e3038] flex items-center justify-center text-[#9194a1]">
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#1c1d22]/50 text-[14px] text-[#9194a1] leading-relaxed animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ─── 9. Final CTA (Midnight Vault Conversion Band) ─── */}
        <section className="py-28 sm:py-36 px-5 sm:px-8 relative overflow-hidden">

          {/* Subtle Gilded Center Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#cc9166]/[0.06] via-[#fff0cc]/[0.03] to-transparent blur-[140px] pointer-events-none -z-10" />

          <div className="max-w-[1000px] mx-auto rounded-[10px] border border-[#1c1d22] bg-[#040406] p-10 sm:p-16 text-center space-y-8 shadow-2xl relative">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2e3038] bg-[#121317]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc9166]" />
              <span className="text-[12px] font-medium text-[#c7c9d1]">
                Abertura de Cofre Instantânea
              </span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-[56px] text-white font-normal leading-[1.12]">
              Eleve seu negócio ao padrão ouro.
            </h2>

            <p className="text-[16px] sm:text-[18px] text-[#9194a1] max-w-xl mx-auto leading-relaxed">
              Junte-se a milhares de gestores que abandonaram a desordem das planilhas em favor da precisão institucional.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/cadastro"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#ffffff] text-[#000000] text-[15px] font-medium hover:bg-[#f0f0f4] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Abrir Minha Conta Gratuita
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#2e3038] hover:border-[#777a88] bg-transparent text-[15px] font-medium text-white hover:bg-[#121317] transition-all"
              >
                Acessar Demonstração
              </Link>
            </div>

          </div>
        </section>

      </main>

      {/* ─── 10. Footer (5-Column Grid on Obsidian) ─── */}
      <footer className="border-t border-[#1c1d22] bg-[#08080a] py-16 px-5 sm:px-8 text-[13px]">
        <div className="max-w-[1216px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* Col 1: Brand & Status */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full border border-[#2e3038] bg-[#040406] flex items-center justify-center">
                <span className="font-serif-display text-white text-base font-bold select-none">/</span>
              </div>
              <span className="text-[16px] font-bold text-white tracking-tight font-serif-display">CashFlow<span className="text-[#cc9166]">.</span></span>
            </div>
            <p className="text-[#9194a1] max-w-sm leading-relaxed text-[13px]">
              Plataforma de gestão de fluxo de caixa, conciliação e tesouraria sob demanda. Construído com estética de cofre escuro e linhas de livro-caixa douradas.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#1c1d22] bg-[#040406] text-[11px] text-[#9194a1]">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              Sistemas Operacionais — 99.98% uptime
            </div>
          </div>

          {/* Col 2: Produtos */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold text-white uppercase tracking-wider block">
              Produto
            </span>
            <ul className="space-y-2 text-[#9194a1]">
              <li><a href="#features" className="hover:text-white transition-colors">Visão Consolidada</a></li>
              <li><a href="#ledger" className="hover:text-white transition-colors">Conciliação Automática</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Tetos & Orçamentos</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Relatórios & DRE</a></li>
            </ul>
          </div>

          {/* Col 3: Empresa & Recursos */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold text-white uppercase tracking-wider block">
              Recursos
            </span>
            <ul className="space-y-2 text-[#9194a1]">
              <li><Link to="/documentacao" className="hover:text-white transition-colors">Documentação</Link></li>
              <li><Link to="/suporte" className="hover:text-white transition-colors">Central de Suporte</Link></li>
              <li><a href="#insights" className="hover:text-white transition-colors">Notas de Tesouraria</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status da API</a></li>
            </ul>
          </div>

          {/* Col 4: Conformidade & Legal */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold text-white uppercase tracking-wider block">
              Institucional
            </span>
            <ul className="space-y-2 text-[#9194a1]">
              <li><a href="#" className="hover:text-white transition-colors">Privacidade & Dados</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Segurança & Criptografia</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Auditoria Contábil</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-[1216px] mx-auto mt-14 pt-8 border-t border-[#1c1d22] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#5e616e] text-[12px]">
          <span>© {new Date().getFullYear()} CashFlow. Todos os direitos reservados.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#9194a1] transition-colors">Twitter / X</a>
            <a href="#" className="hover:text-[#9194a1] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[#9194a1] transition-colors">GitHub</a>
>>>>>>> 8aaefac (New UI:UX etc..)
          </div>
        </div>
      </footer>

<<<<<<< HEAD
      {/* ─── Custom Animations ─── */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
=======
>>>>>>> 8aaefac (New UI:UX etc..)
    </div>
  );
}
