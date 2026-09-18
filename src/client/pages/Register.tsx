import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { register } from "@/client/lib/auth";
import { cn } from "@/client/lib/utils";

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Pre-fill email if passed from Landing page URL parameter
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setForm((prev) => ({ ...prev, email: emailParam }));
    }
  }, [searchParams]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { firstName, lastName, email, password, confirm } = form;
    if (!firstName || !lastName || !email || !password || !confirm) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve conter no mínimo 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("A confirmação de senha não coincide com a senha digitada.");
      return;
    }
    if (!acceptTerms) {
      setError("Você deve concordar com os Termos de Serviço e Política de Privacidade.");
      return;
    }

    setLoading(true);
    try {
      await register(`${firstName.trim()} ${lastName.trim()}`, email.trim(), password);
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao abrir o cofre. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#08080a] text-[#e2e3e9] flex items-center justify-center p-5 sm:p-8 relative selection:bg-[#cc9166]/20 selection:text-white font-sans overflow-x-hidden">
      
      {/* Subtle Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#cc9166]/[0.03] to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1040px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ─── Left Panel: Registration Form (7 cols) ─── */}
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
                  ABERTURA DE COFRE
                </span>
              </div>
              <h1 className="font-serif-display text-3xl sm:text-4xl text-white font-normal tracking-[0.01em]">
                Criar conta institucional.
              </h1>
              <p className="text-[14px] text-[#9194a1] leading-relaxed">
                Inicie sua gestão de fluxo de caixa com isolamento de dados e conciliação em tempo real.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
              
              {/* First Name + Last Name (Grid 2 cols) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[12px] font-medium text-[#c7c9d1] uppercase tracking-wider block">
                    Nome
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5e616e]">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="Ex: Carlos"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-4 rounded-full bg-[#08080a] border border-[#2e3038] text-white placeholder:text-[#5e616e] text-[13px] focus:outline-none focus:border-[#777a88] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[12px] font-medium text-[#c7c9d1] uppercase tracking-wider block">
                    Sobrenome
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5e616e]">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Ex: Silveira"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-4 rounded-full bg-[#08080a] border border-[#2e3038] text-white placeholder:text-[#5e616e] text-[13px] focus:outline-none focus:border-[#777a88] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[12px] font-medium text-[#c7c9d1] uppercase tracking-wider block">
                  Email Corporativo ou Pessoal
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5e616e]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="seu.nome@empresa.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full h-11 pl-10 pr-4 rounded-full bg-[#08080a] border border-[#2e3038] text-white placeholder:text-[#5e616e] text-[13px] focus:outline-none focus:border-[#777a88] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[12px] font-medium text-[#c7c9d1] uppercase tracking-wider block">
                  Definir Senha de Acesso
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5e616e]">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Mínimo de 6 caracteres"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="w-full h-11 pl-10 pr-10 rounded-full bg-[#08080a] border border-[#2e3038] text-white placeholder:text-[#5e616e] text-[13px] focus:outline-none focus:border-[#777a88] transition-colors font-mono"
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

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-[12px] font-medium text-[#c7c9d1] uppercase tracking-wider block">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5e616e]">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    name="confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repita sua senha"
                    required
                    value={form.confirm}
                    onChange={handleChange}
                    className="w-full h-11 pl-10 pr-10 rounded-full bg-[#08080a] border border-[#2e3038] text-white placeholder:text-[#5e616e] text-[13px] focus:outline-none focus:border-[#777a88] transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5e616e] hover:text-white transition-colors"
                    aria-label={showConfirm ? "Ocultar senha" : "Ver senha"}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded-full border border-[#2e3038] bg-[#08080a] checked:bg-[#ffffff] transition-all cursor-pointer appearance-none checked:border-white flex items-center justify-center after:content-[''] checked:after:w-1.5 checked:after:h-1.5 checked:after:bg-black checked:after:rounded-full shrink-0"
                  />
                  <span className="text-[12px] text-[#9194a1] leading-relaxed">
                    Concordo com os Termos de Uso e a custódia criptografada de dados financeiros.
                  </span>
                </label>
              </div>

              {/* Submit Button (White pill, black text) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-full bg-[#ffffff] text-[#000000] hover:bg-[#f0f0f4] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-[14px] transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-sm cursor-pointer mt-3"
              >
                {loading ? (
                  <span>Criando cofre criptografado...</span>
                ) : (
                  <>
                    <span>Criar Minha Conta Gratuita</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Bottom Switch Link */}
          <div className="pt-6 border-t border-[#1c1d22] text-center">
            <p className="text-[13px] text-[#9194a1]">
              Já possui uma conta ativa?{" "}
              <Link to="/login" className="text-[#cc9166] hover:text-white font-medium transition-colors">
                Fazer Login
              </Link>
            </p>
          </div>

        </div>

        {/* ─── Right Panel: Vault Benefits & Architecture (5 cols) ─── */}
        <div className="hidden lg:flex lg:col-span-5 rounded-[10px] border border-[#1c1d22] bg-[#040406] p-8 flex-col justify-between relative overflow-hidden">
          
          {/* Subtle gilded corner glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#cc9166]/[0.05] blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            
            <div className="w-10 h-10 rounded-full border border-[#2e3038] bg-[#121317] flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-[#cc9166]" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-[#cc9166] uppercase tracking-wider font-mono block">
                BENEFÍCIOS DO COFRE
              </span>
              <h2 className="font-serif-display text-2xl text-white font-normal">
                Prontidão operacional imediata.
              </h2>
              <p className="text-[13px] text-[#9194a1] leading-relaxed">
                Ao criar seu cofre, você tem acesso imediato a todas as ferramentas essenciais de tesouraria.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-3 pt-2">
              {[
                {
                  title: "Conciliação Sem Planilhas",
                  desc: "Importe extratos OFX/CSV e deixe as regras inteligentes categorizarem tudo.",
                },
                {
                  title: "Projeções de DRE Dinâmico",
                  desc: "Visibilidade do saldo futuro para 30, 60 e 90 dias com antecipação de quebras.",
                },
                {
                  title: "Privacidade Híbrida Blindada",
                  desc: "Seus extratos e números permanecem criptografados ponta a ponta.",
                },
              ].map((feat, i) => (
                <div key={i} className="p-3.5 rounded-[8px] border border-[#1c1d22] bg-[#08080a] space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#cc9166]" />
                    <span className="text-[13px] font-medium text-white">{feat.title}</span>
                  </div>
                  <p className="text-[11px] text-[#9194a1] pl-5.5 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Assurance */}
          <div className="p-4 rounded-[8px] border border-[#1c1d22] bg-[#08080a] space-y-1 relative z-10 mt-6">
            <span className="text-[12px] font-medium text-white block">Sem fidelidade ou custos ocultos</span>
            <p className="text-[11px] text-[#5e616e]">
              Acesso inicial gratuito com exportação irrestrita de dados contábeis a qualquer momento.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
