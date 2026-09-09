import { useState } from "react";
import { Link } from "react-router-dom";
import {
<<<<<<< HEAD
  Wallet,
=======
  Shield,
>>>>>>> 8aaefac (New UI:UX etc..)
  MessageCircle,
  Mail,
  BookOpen,
  ChevronDown,
<<<<<<< HEAD
  ChevronUp,
  LifeBuoy,
  Plus,
  Send,
  HelpCircle,
  Sparkles as SparklesIcon,
  ArrowRight,
  User,
  FileText,
  MessageSquare
=======
  Plus,
  Send,
  HelpCircle,
  ArrowRight,
  User,
  FileText,
  MessageSquare,
  Lock
>>>>>>> 8aaefac (New UI:UX etc..)
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSession } from "@/client/lib/auth";
import { cn } from "@/client/lib/utils";
<<<<<<< HEAD

const faqs = [
  {
    q: "Como adicionar uma transação?",
    a: 'Clique no botão "Nova Transação" na barra lateral ou no painel principal. Preencha o tipo (receita/despesa), valor, categoria e data.',
  },
  {
    q: "Como funciona o tema claro/escuro?",
    a: 'Acesse Configurações e ative o switch de tema escuro. A preferência é salva automaticamente no seu navegador.',
  },
  {
    q: "Meus dados são salvos?",
    a: "Sim! Todos os dados são armazenados localmente no seu navegador de forma segura. Não compartilhamos nenhuma informação.",
  },
  {
    q: "Como criar uma meta financeira?",
    a: 'Acesse a página "Metas" pelo menu lateral e clique em "Nova Meta". Defina o nome, valor e prazo desejado.',
  },
  {
    q: "Posso excluir uma transação?",
    a: "Sim! Na lista de transações, clique no ícone de lixeira ao lado da transação que deseja remover.",
  },
  {
    q: "Como exportar meus relatórios?",
    a: 'Acesse a página "Relatórios" e utilize os gráficos interativos. No futuro adicionaremos exportação em PDF e CSV.',
=======
import { TiltCard } from "@/client/components/ui/tilt-card";

const faqs = [
  {
    q: "Como os dados do meu cofre são protegidos?",
    a: "Todos os seus lançamentos e credenciais são armazenados localmente e criptografados em tempo real no seu navegador, sem transmissão para servidores de terceiros.",
  },
  {
    q: "Como cadastrar novos cofres bancários ou cartões?",
    a: 'Acesse a aba "Contas" no menu lateral e clique em "+ Adicionar Conta". Defina o tipo de custódia (corrente, investimentos ou cartão) e o saldo inicial.',
  },
  {
    q: "Como exportar meus registros contábeis?",
    a: 'Acesse "Configurações" ou "Relatórios" para fazer o download soberano de todos os seus dados em formato JSON, CSV ou visualização em DRE.',
  },
  {
    q: "Como funciona a projeção 3D de metas?",
    a: 'No módulo "Metas", você define o valor-alvo e o prazo. O cofre calcula automaticamente a taxa de economia necessária com alertas visuais dinâmicos.',
  },
  {
    q: "Posso utilizar em múltiplos dispositivos?",
    a: 'Sim, você pode exportar seu backup em JSON nas configurações e restaurar instantaneamente em qualquer outro navegador seguro.',
  },
  {
    q: "Posso utilizar em múltiplos dispositivos?",
    a: 'Sim, você pode exportar seu backup em JSON nas configurações e restaurar instantaneamente em qualquer outro navegador seguro.',
>>>>>>> 8aaefac (New UI:UX etc..)
  },
];

const channels = [
  {
<<<<<<< HEAD
    icon: Mail,
    title: "E-mail",
    desc: "Resposta em até 24 horas",
    action: "Nos envie um e-mail",
    href: "mailto:suporte@mymoneyfriend.app",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    icon: MessageCircle,
    title: "Chat ao vivo",
    desc: "Disponível de seg. a sex., 9h–18h",
    action: "Iniciar conversa",
    href: "/chat",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: BookOpen,
    title: "Documentação",
    desc: "Guias e tutoriais completos",
    action: "Ver documentação",
    href: "/documentacao",
    color: "from-emerald-500/20 to-teal-500/20"
=======
    icon: MessageCircle,
    title: "Chat do Cofre",
    desc: "Atendimento interativo em tempo real",
    action: "Abrir Protocolo",
    href: "/chat",
  },
  {
    icon: Mail,
    title: "E-mail de Custódia",
    desc: "Retorno oficial em até 24 horas",
    action: "Enviar Mensagem",
    href: "mailto:suporte@slashvault.finance",
  },
  {
    icon: BookOpen,
    title: "Base de Conhecimento",
    desc: "Manuais e guias de arquitetura",
    action: "Consultar Guias",
    href: "/documentacao",
>>>>>>> 8aaefac (New UI:UX etc..)
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn(
<<<<<<< HEAD
      "group border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300",
      open ? "bg-white/[0.03] border-white/10" : "hover:border-white/10"
    )}>
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={cn(
          "font-bold text-sm tracking-tight transition-colors",
          open ? "text-white" : "text-white/70"
        )}>{q}</span>
        <div className={cn(
          "h-6 w-6 rounded-lg flex items-center justify-center transition-all duration-300",
          open ? "bg-white/10 rotate-180" : "bg-white/[0.03]"
        )}>
          <ChevronDown className="h-4 w-4 text-white/40" />
=======
      "border rounded-xl overflow-hidden transition-all duration-300",
      open ? "bg-[#121317] border-[#cc9166]/40" : "bg-[#040406] border-[#1c1d22] hover:border-[#2e3038]"
    )}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={cn(
          "text-xs font-medium tracking-tight transition-colors",
          open ? "text-[#f5f4f0]" : "text-[#8a8880]"
        )}>{q}</span>
        <div className={cn(
          "h-5 w-5 rounded-md flex items-center justify-center transition-all duration-300",
          open ? "bg-[#1c1d22] text-[#cc9166] rotate-180" : "text-[#6b6960]"
        )}>
          <ChevronDown className="h-3.5 w-3.5" />
>>>>>>> 8aaefac (New UI:UX etc..)
        </div>
      </button>
      <div className={cn(
        "grid transition-all duration-300 ease-in-out",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
<<<<<<< HEAD
          <div className="px-6 pb-5 text-[13px] text-white/40 font-medium leading-relaxed">
=======
          <div className="px-5 pb-4 text-xs text-[#8a8880] font-sans leading-relaxed border-t border-[#1c1d22]/50 pt-3">
>>>>>>> 8aaefac (New UI:UX etc..)
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Support() {
  const session = getSession();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
<<<<<<< HEAD
    // Simulate send
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-[#020205] text-white flex flex-col font-sans selection:bg-purple-500/30 overflow-x-hidden">

      {/* ─── Ambient Glows ─── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 rounded-full bg-purple-600/[0.08] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 rounded-full bg-blue-600/[0.08] blur-[120px]" />
      </div>

      {/* Header / Nav */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 py-6 pointer-events-none">
        <div className="max-w-5xl mx-auto flex items-center justify-between h-14 px-6 rounded-full border border-white/[0.08] bg-black/40 backdrop-blur-xl pointer-events-auto shadow-2xl shadow-black/50">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-purple-500/20">
              <Wallet className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter">Cash<span className="text-purple-400 italic font-medium">Flow</span></span>
          </Link>

          <div className="flex items-center gap-4">
            {session ? (
              <Button asChild className="h-9 px-5 rounded-full bg-white text-black hover:bg-white/90 font-bold text-xs transition-all active:scale-95 border-0">
                <Link to="/">Meu Painel</Link>
              </Button>
            ) : (
              <Button asChild className="h-9 px-5 rounded-full bg-white text-black hover:bg-white/90 font-bold text-xs transition-all active:scale-95 border-0">
                <Link to="/cadastro">Começar Agora</Link>
=======
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-[#08080a] text-[#e8e6e3] flex flex-col font-sans selection:bg-[#cc9166]/30 overflow-x-hidden">

      {/* ─── Ambient Glow ─── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#cc9166]/[0.04] blur-[150px]" />
      </div>

      {/* Header / Nav */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 py-4 pointer-events-none">
        <div className="max-w-5xl mx-auto flex items-center justify-between h-12 px-6 rounded-full border border-[#1c1d22] bg-[#040406]/90 backdrop-blur-xl pointer-events-auto shadow-2xl">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1 rounded-md bg-[#121317] border border-[#1c1d22] text-[#cc9166]">
              <Shield className="h-4 w-4" />
            </div>
            <span className="text-sm font-serif-display text-[#f5f4f0] tracking-wide">Cashflow</span>
          </Link>

          <div className="flex items-center gap-3">
            {session ? (
              <Button asChild className="h-8 px-4 rounded-lg bg-[#ffffff] text-[#08080a] hover:bg-[#f5f4f0] text-xs font-medium">
                <Link to="/">Meu Cofre</Link>
              </Button>
            ) : (
              <Button asChild className="h-8 px-4 rounded-lg bg-[#ffffff] text-[#08080a] hover:bg-[#f5f4f0] text-xs font-medium">
                <Link to="/cadastro">Criar Conta</Link>
>>>>>>> 8aaefac (New UI:UX etc..)
              </Button>
            )}
          </div>
        </div>
      </header>

<<<<<<< HEAD
      <main className="flex-1 pt-32 lg:pt-40">

        {/* Banner Hero */}
        <section className="px-6 pb-20 text-center relative">
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.08] text-purple-400 text-[11px] font-black uppercase tracking-[0.2em]">
              <LifeBuoy className="h-3.5 w-3.5" />
              Central de Ajuda
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tighter leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Como podemos <br />
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent italic">ajudar você?</span>
            </h1>
            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto font-medium">
              Estamos aqui para garantir que sua jornada financeira seja tranquila e eficiente. Explore nossos recursos ou fale com a gente.
=======
      <main className="flex-1 pt-28 lg:pt-36">

        {/* Banner Hero */}
        <section className="px-6 pb-16 text-center relative">
          <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1c1d22] bg-[#121317] text-[#cc9166] text-[10px] font-mono uppercase tracking-widest">
              <Lock className="h-3 w-3" />
              <span>Suporte & Assistência Técnica</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif-display font-light tracking-tight text-[#f5f4f0]">
              Central de Atendimento ao Titular<span className="text-[#cc9166]">.</span>
            </h1>
            <p className="text-[#8a8880] text-xs sm:text-sm max-w-xl mx-auto font-sans leading-relaxed">
              Consulte documentações técnicas, tire dúvidas sobre custódia ou abra um chamado prioritário com nossos especialistas.
>>>>>>> 8aaefac (New UI:UX etc..)
            </p>
          </div>
        </section>

        {/* Support Channels */}
<<<<<<< HEAD
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {channels.map((c, i) => (
              <div
                key={c.title}
                className="group relative bg-[#090910]/40 backdrop-blur-3xl border border-white/[0.06] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center hover:border-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Channel Background Glow */}
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500", c.color)} />

                <div className="relative z-10 space-y-6 flex flex-col items-center h-full">
                  <div className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl group-hover:bg-white/10 transition-all duration-500">
                    <c.icon className="h-8 w-8 text-white/50 group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl tracking-tight">{c.title}</h3>
                    <p className="text-sm text-white/40 font-medium leading-relaxed">{c.desc}</p>
                  </div>
                  <Button variant="ghost" asChild className="mt-auto w-full h-12 rounded-xl border border-white/[0.06] hover:bg-white hover:text-black font-bold text-[13px] group-hover:shadow-2xl transition-all">
                    {c.href.startsWith("mailto:") ? (
                      <a href={c.href}>{c.action}</a>
                    ) : (
                      <Link to={c.href} className="flex items-center gap-2">
                        {c.action} <ArrowRight className="h-4 w-4" />
=======
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {channels.map((c) => (
              <TiltCard key={c.title} tiltLimit={6} scale={1.02} className="h-full">
                <div className="h-full bg-[#040406] border border-[#1c1d22] hover:border-[#2e3038] rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xl">
                  <div className="space-y-4">
                    <div className="p-3 bg-[#121317] border border-[#1c1d22] rounded-xl w-fit text-[#cc9166]">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-[#f5f4f0]">{c.title}</h3>
                      <p className="text-xs text-[#8a8880] leading-relaxed">{c.desc}</p>
                    </div>
                  </div>

                  <Button variant="outline" asChild className="w-full h-10 rounded-xl bg-[#121317] hover:bg-[#1c1d22] text-[#f5f4f0] border-[#1c1d22] text-xs font-mono">
                    {c.href.startsWith("mailto:") ? (
                      <a href={c.href}>{c.action}</a>
                    ) : (
                      <Link to={c.href} className="flex items-center justify-center gap-1.5">
                        {c.action} <ArrowRight className="h-3.5 w-3.5 text-[#cc9166]" />
>>>>>>> 8aaefac (New UI:UX etc..)
                      </Link>
                    )}
                  </Button>
                </div>
<<<<<<< HEAD
              </div>
=======
              </TiltCard>
>>>>>>> 8aaefac (New UI:UX etc..)
            ))}
          </div>
        </section>

<<<<<<< HEAD
        {/* Content Section: FAQ + Contact Form */}
        <section className="px-6 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              {/* Left Column: FAQ */}
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-6 w-6 text-purple-400/50" />
                    <h2 className="text-2xl font-bold tracking-tight">Perguntas Frequentes</h2>
                  </div>
                  <p className="text-sm text-white/40 font-medium">As soluções mais rápidas para suas dúvidas comuns.</p>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 flex items-center justify-between gap-6 group">
                  <div className="space-y-1">
                    <p className="font-bold text-sm">Não encontrou o que procurava?</p>
                    <p className="text-xs text-white/40 font-medium">Explore nossa base de conhecimento completa.</p>
                  </div>
                  <Link to="/documentacao" className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-110 transition-transform">
                    <Plus className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="relative">
                {/* Form Decoration */}
                <div className="absolute -top-10 -right-10 p-10 opacity-10 pointer-events-none">
                  <Sparkles className="h-40 w-40 text-purple-400" />
                </div>

                <div className={cn(
                  "relative p-8 lg:p-10 rounded-[2.5rem] border transition-all duration-700 backdrop-blur-3xl overflow-hidden shadow-2xl",
                  sent ? "bg-emerald-500/[0.02] border-emerald-500/20" : "bg-white/[0.03] border-white/[0.08]"
                )}>
                  {sent ? (
                    <div className="text-center space-y-8 py-10 animate-in zoom-in-95 duration-500">
                      <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                        <Send className="h-8 w-8 text-emerald-400" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold tracking-tight">Recebemos sua mensagem!</h3>
                        <p className="text-sm text-white/40 font-medium max-w-[280px] mx-auto leading-relaxed">
                          Nossa equipe já está com seu pedido e retornaremos em até 24 horas.
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => setSent(false)}
                        className="font-bold text-xs uppercase tracking-widest text-white/50 hover:text-white"
                      >
                        Enviar outra mensagem
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">Enviar Mensagem</h2>
                        <p className="text-xs font-medium text-white/40">Responderemos o mais rápido possível.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Nome</Label>
                            <div className="relative group">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                              <Input
                                id="name"
                                name="name"
                                placeholder="Como se chama?"
                                value={form.name}
                                onChange={handleChange}
                                className="h-14 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 rounded-2xl text-white font-semibold placeholder:text-white/20 transition-all focus:bg-white/[0.05]"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">E-mail</Label>
                            <div className="relative group">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="seu@exemplo.com"
                                value={form.email}
                                onChange={handleChange}
                                className="h-14 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 rounded-2xl text-white font-semibold placeholder:text-white/20 transition-all focus:bg-white/[0.05]"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Assunto</Label>
                          <div className="relative group">
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                            <Input
                              id="subject"
                              name="subject"
                              placeholder="Qual o motivo do contato?"
                              value={form.subject}
                              onChange={handleChange}
                              className="h-14 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 rounded-2xl text-white font-semibold placeholder:text-white/20 transition-all focus:bg-white/[0.05]"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Mensagem</Label>
                          <div className="relative group">
                            <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="Descreva como podemos ajudar com o máximo de detalhes..."
                              value={form.message}
                              onChange={handleChange}
                              rows={5}
                              className="pl-12 pr-4 pt-4 bg-white/[0.03] border border-white/[0.08] focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 rounded-2xl text-white font-semibold placeholder:text-white/20 transition-all focus:bg-white/[0.05] resize-none"
                              required
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-widest border-0 shadow-[0_0_30px_rgba(147,51,234,0.3)] active:scale-[0.98] transition-all rounded-2xl flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>Enviar pedido de ajuda <Send className="h-4 w-4" /></>
                          )}
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 py-12 border-t border-white/[0.06] text-center">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-white/20 text-xs font-bold uppercase tracking-widest">
            <SparklesIcon className="h-3 w-3" />
            CashFlow Intelligence
          </div>
          <p className="text-[11px] text-white/30 font-medium tracking-wide">
            © {new Date().getFullYear()} CashFlow Finance. Protegendo seus dados com criptografia de ponta a ponta.
          </p>
        </div>
=======
        {/* FAQ + Form */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left Column: FAQ */}
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#cc9166] uppercase tracking-wider">
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>Dúvidas Frequentes</span>
                </div>
                <h2 className="text-2xl font-serif-display font-light text-[#f5f4f0]">Respostas Imediatas</h2>
                <p className="text-xs text-[#8a8880]">As principais resoluções para o dia a dia no cofre.</p>
              </div>

              <div className="space-y-2.5">
                {faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>

            {/* Right Column: Contact Ticket Form */}
            <div className="rounded-2xl border border-[#1c1d22] bg-[#040406] p-6 sm:p-8 shadow-xl relative">
              {sent ? (
                <div className="text-center space-y-4 py-8 animate-in zoom-in-95 duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-[#121317] border border-[#1c1d22] text-[#34d399] flex items-center justify-center mx-auto">
                    <Send className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-[#f5f4f0]">Protocolo Aberto com Sucesso</h3>
                    <p className="text-xs text-[#8a8880] max-w-[260px] mx-auto">
                      Seu ticket foi registrado com criptografia e responderemos em até 24h úteis.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSent(false)}
                    className="text-xs font-mono text-[#cc9166] border-[#1c1d22] bg-[#121317] mt-2"
                  >
                    Enviar Outra Mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1 border-b border-[#1c1d22] pb-3">
                    <h2 className="text-sm font-medium text-[#f5f4f0]">Abrir Chamado Direto</h2>
                    <p className="text-[11px] text-[#6b6960]">Envie sua solicitação para a equipe de suporte</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-[10px] font-mono text-[#8a8880] uppercase">Nome</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome"
                        value={form.name}
                        onChange={handleChange}
                        className="h-10 bg-[#121317] border-[#1c1d22] focus:border-[#cc9166] text-[#f5f4f0] text-xs rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-[10px] font-mono text-[#8a8880] uppercase">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className="h-10 bg-[#121317] border-[#1c1d22] focus:border-[#cc9166] text-[#f5f4f0] text-xs rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="subject" className="text-[10px] font-mono text-[#8a8880] uppercase">Assunto</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Ex: Dúvida sobre conciliação bancária"
                      value={form.subject}
                      onChange={handleChange}
                      className="h-10 bg-[#121317] border-[#1c1d22] focus:border-[#cc9166] text-[#f5f4f0] text-xs rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-[10px] font-mono text-[#8a8880] uppercase">Mensagem Detalhada</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Descreva seu cenário com detalhes..."
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className="bg-[#121317] border-[#1c1d22] focus:border-[#cc9166] text-[#f5f4f0] text-xs rounded-xl resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-[#ffffff] hover:bg-[#f5f4f0] text-[#08080a] text-xs font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    {isSubmitting ? "Transmitindo ticket..." : "Transmitir Chamado ao Suporte"}
                  </Button>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      <footer className="px-6 py-8 border-t border-[#1c1d22] text-center bg-[#040406]">
        <p className="text-[11px] font-mono text-[#6b6960]">
          © {new Date().getFullYear()} Slash Vault Finance. Protocolos criptográficos ativos.
        </p>
>>>>>>> 8aaefac (New UI:UX etc..)
      </footer>
    </div>
  );
}
<<<<<<< HEAD

function Sparkles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 0L105.8 84.2L190 90L105.8 95.8L100 180L94.2 95.8L10 90L94.2 84.2L100 0Z" fill="currentColor" />
    </svg>
  );
}
=======
>>>>>>> 8aaefac (New UI:UX etc..)
