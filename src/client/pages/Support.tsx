import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  MessageCircle,
  Mail,
  BookOpen,
  ChevronDown,
  Plus,
  Send,
  HelpCircle,
  ArrowRight,
  User,
  FileText,
  MessageSquare,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSession } from "@/client/lib/auth";
import { cn } from "@/client/lib/utils";
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
  },
];

const channels = [
  {
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
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn(
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
        </div>
      </button>
      <div className={cn(
        "grid transition-all duration-300 ease-in-out",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <div className="px-5 pb-4 text-xs text-[#8a8880] font-sans leading-relaxed border-t border-[#1c1d22]/50 pt-3">
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
              </Button>
            )}
          </div>
        </div>
      </header>

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
            </p>
          </div>
        </section>

        {/* Support Channels */}
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
                      </Link>
                    )}
                  </Button>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

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
      </footer>
    </div>
  );
}
