import { Link } from "react-router-dom";
import {
  MessageCircle,
  Send,
  ArrowLeft,
  Bot,
  Shield,
  Sparkles,
  RotateCcw,
  User as UserIcon,
  HelpCircle,
  CreditCard,
  Target,
  Camera,
  PieChart,
  Lock,
  TrendingUp,
  FileText,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { useFinance } from "@/client/hooks/use-finance";
import { getSession } from "@/client/lib/auth";
import {
  processLocalQuery,
  QUICK_SUGGESTIONS,
  ChatContext,
} from "@/client/lib/chat-bot-engine";

interface Message {
  id: string;
  role: "user" | "agent";
  text: string;
  time: string;
}

// Format simple markdown into JSX
function FormattedMessage({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-xs leading-relaxed">
      {lines.map((line, idx) => {
        if (!line.trim()) {
          return <div key={idx} className="h-1.5" />;
        }

        // Process bold (**text**) and code (`code`)
        const formattedLine = line.split(/(\*\*.*?\*\*|`.*?`)/g).map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-semibold text-[#f5f4f0]">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code
                key={pIdx}
                className="px-1.5 py-0.5 rounded bg-[#1c1d22] text-[#cc9166] font-mono text-[11px] border border-[#2a2b32]"
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          return part;
        });

        // Bullet line
        if (line.trim().startsWith("•")) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1">
              <span className="text-[#cc9166] mt-0.5">•</span>
              <span className="flex-1">{formattedLine.slice(1)}</span>
            </div>
          );
        }

        return <p key={idx}>{formattedLine}</p>;
      })}
    </div>
  );
}

export default function ChatSupport() {
  const { transactions, accounts, goals, customCategories, budgetRules } = useFinance();
  const session = getSession();
  const userName = session?.name || "Usuário";
  const userAvatar = session?.avatar_url;

  const getInitialMessage = (): Message => ({
    id: "init",
    role: "agent",
    text: `Olá, **${userName}**! 👋 Sou a **Inteligência de Suporte do CashFlow**.\n\nPosso analisar seu saldo, despesas e metas em tempo real, ou te orientar sobre as funcionalidades do sistema (Scanner OCR, Regra 50/30/20, Privacidade e Contas).\n\nComo posso ajudar suas finanças hoje?`,
    time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
  });

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    const context: ChatContext = {
      transactions,
      accounts,
      goals,
      customCategories,
      budgetRules,
      userName,
    };

    // Simulate smart thinking delay
    setTimeout(() => {
      const reply = processLocalQuery(text, context);
      const agentMsg: Message = {
        id: `agent-${Date.now()}`,
        role: "agent",
        text: reply,
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleResetChat = () => {
    setMessages([getInitialMessage()]);
  };

  const getSuggestionIcon = (index: number) => {
    const icons = [
      <CreditCard className="w-3.5 h-3.5 text-[#cc9166]" key="card" />,
      <PieChart className="w-3.5 h-3.5 text-[#e05252]" key="pie" />,
      <Shield className="w-3.5 h-3.5 text-[#38bdf8]" key="shield" />,
      <Camera className="w-3.5 h-3.5 text-[#a855f7]" key="cam" />,
      <Target className="w-3.5 h-3.5 text-[#34d399]" key="target" />,
      <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" key="sparkle" />,
      <TrendingUp className="w-3.5 h-3.5 text-[#10b981]" key="trend" />,
      <CreditCard className="w-3.5 h-3.5 text-[#f97316]" key="card2" />,
      <FileText className="w-3.5 h-3.5 text-[#06b6d4]" key="file" />,
      <Compass className="w-3.5 h-3.5 text-[#ec4899]" key="compass" />,
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#e8e6e3] flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#1c1d22] bg-[#040406]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-[#8a8880] hover:text-[#f5f4f0] hover:bg-[#121317] rounded-xl"
            >
              <Link to="/suporte">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#121317] border border-[#1c1d22] text-[#cc9166] relative shadow-inner">
                <Bot className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#34d399] border-2 border-[#040406]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xs font-semibold text-[#f5f4f0] tracking-tight">
                    Assistente Inteligente CashFlow
                  </h1>
                  <span className="px-1.5 py-0.2 text-[9px] font-mono font-medium rounded bg-[#cc9166]/10 text-[#cc9166] border border-[#cc9166]/20">
                    IA Local
                  </span>
                </div>
                <p className="text-[10px] font-mono text-[#34d399] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] inline-block animate-pulse"></span>
                  Conectado ao Cofre
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetChat}
              title="Limpar conversa"
              className="h-8 px-2.5 text-xs text-[#8a8880] hover:text-[#f5f4f0] hover:bg-[#121317] rounded-lg border border-transparent hover:border-[#1c1d22]"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              <span className="hidden sm:inline">Reiniciar</span>
            </Button>

            <div className="flex items-center gap-1 text-[10px] font-mono text-[#8a8880] bg-[#121317] px-2.5 py-1 rounded-full border border-[#1c1d22]">
              <Shield className="w-3 h-3 text-[#cc9166]" />
              <span className="hidden sm:inline">Offline & Privado</span>
              <span className="sm:hidden">100% Offline</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Body */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col h-[calc(100vh-3.5rem)]">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4 px-1 custom-scrollbar">
          <div className="text-center text-[10px] font-mono text-[#6b6960] my-2 uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-[#1c1d22]" />
            <span>Sessão Criptografada em Memória</span>
            <span className="h-px w-12 bg-[#1c1d22]" />
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-end gap-2.5 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "agent" && (
                <div className="w-7 h-7 rounded-xl bg-[#121317] border border-[#1c1d22] flex items-center justify-center shrink-0 text-[#cc9166] shadow-sm mb-1">
                  <Bot className="h-3.5 w-3.5" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] sm:max-w-[78%] transition-all ${
                  m.role === "user"
                    ? "bg-[#cc9166] text-[#08080a] font-normal rounded-br-none shadow-lg"
                    : "bg-[#0f1015] border border-[#1c1d22] text-[#d6d4cf] rounded-bl-none shadow-md"
                }`}
              >
                {m.role === "agent" ? (
                  <FormattedMessage text={m.text} />
                ) : (
                  <p className="text-xs font-medium leading-relaxed whitespace-pre-wrap">
                    {m.text}
                  </p>
                )}

                <div
                  className={`mt-1.5 text-[9px] font-mono text-right ${
                    m.role === "user" ? "text-[#08080a]/60" : "text-[#6b6960]"
                  }`}
                >
                  {m.time}
                </div>
              </div>

              {m.role === "user" && (
                <div className="w-7 h-7 rounded-xl bg-[#cc9166]/15 border border-[#cc9166]/30 flex items-center justify-center shrink-0 overflow-hidden shadow-sm mb-1">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="h-3.5 w-3.5 text-[#cc9166]" />
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-2.5 justify-start animate-fade-in">
              <div className="w-7 h-7 rounded-xl bg-[#121317] border border-[#1c1d22] flex items-center justify-center shrink-0 text-[#cc9166]">
                <Bot className="h-3.5 w-3.5 animate-pulse" />
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0f1015] border border-[#1c1d22] rounded-bl-none flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc9166] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc9166] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc9166] animate-bounce" />
                <span className="text-[11px] font-mono text-[#8a8880] ml-1">
                  Consultando dados...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        <div className="pt-2 pb-3">
          <div className="flex items-center gap-1 text-[10px] text-[#8a8880] font-mono mb-1.5 px-1">
            <Sparkles className="w-3 h-3 text-[#cc9166]" />
            <span>Sugestões Rápidas:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {QUICK_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(sug.query)}
                disabled={isTyping}
                className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-xl bg-[#121317] hover:bg-[#1c1d22] border border-[#1c1d22] hover:border-[#cc9166]/40 text-[#d6d4cf] hover:text-[#f5f4f0] text-[11px] font-sans transition-all shadow-sm active:scale-95 disabled:opacity-50"
              >
                {getSuggestionIcon(idx)}
                <span>{sug.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleFormSubmit}
          className="p-1.5 bg-[#0e0f14] border border-[#1c1d22] focus-within:border-[#cc9166]/60 rounded-2xl flex items-center gap-2 shadow-2xl transition-colors"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Pergunte sobre seu saldo, despesas, metas ou funcionalidades..."
            className="flex-1 border-0 shadow-none focus-visible:ring-0 bg-transparent px-3 text-xs text-[#f5f4f0] placeholder:text-[#6b6960]"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isTyping}
            size="icon"
            className="rounded-xl shrink-0 bg-[#cc9166] hover:bg-[#b87d52] text-[#08080a] h-9 w-9 disabled:opacity-40 transition-all active:scale-95"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      </main>
    </div>
  );
}
