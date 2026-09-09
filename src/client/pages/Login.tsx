import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, LockKeyhole } from "lucide-react";
import { login } from "@/client/lib/auth";
import { cn } from "@/client/lib/utils";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.identifier || !form.password) {
      setError("Preencha todos os campos para acessar o cofre.");
      return;
    }
    setLoading(true);
    try {
      await login(form.identifier, form.password);
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Credenciais inválidas ou acesso não autorizado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#08080a] text-[#e2e3e9] flex items-center justify-center p-5 sm:p-8 relative selection:bg-[#cc9166]/20 selection:text-white font-sans overflow-x-hidden">
      
      {/* Subtle Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#cc9166]/[0.03] to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1040px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ─── Left Panel: Auth Vault Form (7 cols) ─── */}
        <div className="lg:col-span-7 rounded-[10px] border border-[#1c1d22] bg-[#040406] p-7 sm:p-10 shadow-2xl flex flex-col justify-between space-y-8">
          
          <div className="space-y-6">
            
            {/* Top Brand & Navigation */}
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-7 h-7 rounded-full border border-[#2e3038] bg-[#08080a] flex items-center justify-center transition-colors group-hover:border-[#cc9166]">
                  <span className="font-serif-display text-white text-base font-bold select-none">/</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-white font-serif-display">
                    CashFlow<span className="text-[#cc9166]">.</span>
                  </span>
                </div>
              </Link>
              
              <Link
                to="/apresentacao"
                className="text-[12px] font-medium text-[#9194a1] hover:text-white transition-colors"
              >
                Voltar à página inicial
              </Link>
            </div>

            {/* Header Typography */}
            <div className="space-y-2 pt-2">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc9166]" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#cc9166] font-mono">
                  ACESSO AO COFRE
                </span>
              </div>
              <h1 className="font-serif-display text-3xl sm:text-4xl text-white font-normal tracking-[0.01em]">
                Entrar na sua tesouraria.
              </h1>
              <p className="text-[14px] text-[#9194a1] leading-relaxed">
                Insira suas credenciais institucionais para gerenciar suas contas e conciliações em tempo real.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              
              {/* Identifier (Email / Username) */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-[#c7c9d1] uppercase tracking-wider block">
                  Email ou Usuário
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5e616e]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    name="identifier"
                    type="text"
                    placeholder="seu.email@empresa.com"
                    required
                    value={form.identifier}
                    onChange={handleChange}
                    className="w-full h-12 pl-11 pr-4 rounded-full bg-[#08080a] border border-[#2e3038] text-white placeholder:text-[#5e616e] text-[14px] focus:outline-none focus:border-[#777a88] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-medium text-[#c7c9d1] uppercase tracking-wider block">
                    Senha de Segurança
                  </label>
                  <Link
                    to="/esqueci-senha"
                    className="text-[12px] text-[#cc9166] hover:text-white transition-colors"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5e616e]">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••••••"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="w-full h-12 pl-11 pr-11 rounded-full bg-[#08080a] border border-[#2e3038] text-white placeholder:text-[#5e616e] text-[14px] focus:outline-none focus:border-[#777a88] transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5e616e] hover:text-white transition-colors"
                    aria-label={showPass ? "Ocultar senha" : "Ver senha"}
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3.5 rounded-[8px] bg-[#121317] border border-red-500/30 text-red-300 text-[13px] flex items-center gap-2.5 animate-in fade-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-full border border-[#2e3038] bg-[#08080a] checked:bg-[#ffffff] transition-all cursor-pointer appearance-none checked:border-white flex items-center justify-center after:content-[''] checked:after:w-1.5 checked:after:h-1.5 checked:after:bg-black checked:after:rounded-full"
                  />
                  <span className="text-[13px] text-[#9194a1] font-normal">
                    Manter sessão segura neste navegador
                  </span>
                </label>
              </div>

              {/* Primary Action Button (White pill, black text) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-full bg-[#ffffff] text-[#000000] hover:bg-[#f0f0f4] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-[14px] transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-sm cursor-pointer mt-3"
              >
                {loading ? (
                  <span>Descriptografando cofre...</span>
                ) : (
                  <>
                    <span>Acessar Tesouraria</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Bottom Switch Link */}
          <div className="pt-6 border-t border-[#1c1d22] text-center">
            <p className="text-[13px] text-[#9194a1]">
              Ainda não possui um cofre institucional?{" "}
              <Link to="/cadastro" className="text-[#cc9166] hover:text-white font-medium transition-colors">
                Abrir Conta
              </Link>
            </p>
          </div>

        </div>

        {/* ─── Right Panel: Institutional Vault Showcase (5 cols) ─── */}
        <div className="hidden lg:flex lg:col-span-5 rounded-[10px] border border-[#1c1d22] bg-[#040406] p-8 flex-col justify-between relative overflow-hidden">
          
          {/* Subtle gilded corner glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#cc9166]/[0.05] blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            
            <div className="w-10 h-10 rounded-full border border-[#2e3038] bg-[#121317] flex items-center justify-center">
              <LockKeyhole className="h-5 w-5 text-[#cc9166]" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-[#cc9166] uppercase tracking-wider font-mono block">
                SEGURANÇA INSTITUCIONAL
              </span>
              <h2 className="font-serif-display text-2xl text-white font-normal">
                Padrão de custódia e isolamento de chaves.
              </h2>
              <p className="text-[13px] text-[#9194a1] leading-relaxed">
                Cada sessão é autenticada através de tokens de curta duração com criptografia AES-256-GCM e auditoria contínua de integridade.
              </p>
            </div>

            {/* Checklist items */}
            <div className="space-y-3 pt-2">
              {[
                "Criptografia ponta a ponta AES-256-GCM",
                "Conexão bancária com isolamento de credenciais",
                "Logs imutáveis de conciliação de tesouraria",
                "Conformidade e backup redundante diário",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[12px] text-[#c7c9d1]">
                  <CheckCircle2 className="h-4 w-4 text-[#cc9166] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom quote card */}
          <div className="p-4 rounded-[8px] border border-[#1c1d22] bg-[#08080a] space-y-2 relative z-10 mt-6">
            <p className="text-[12px] text-[#acafb9] italic leading-relaxed">
              "A segurança e a precisão do livro-caixa do CashFlow nos deram a confiança necessária para migrar 100% da tesouraria."
            </p>
            <div className="flex items-center justify-between text-[11px] pt-1 text-[#5e616e]">
              <span className="font-medium text-[#e2e3e9]">Auditoria Contábil 2026</span>
              <span className="text-[#4ade80]">● 99.98% Uptime</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
