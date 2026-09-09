import { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { Key, Eye, EyeOff, ArrowLeft, Wallet, CheckCircle2 } from "lucide-react";
=======
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowLeft, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
>>>>>>> 8aaefac (New UI:UX etc..)

export default function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
<<<<<<< HEAD
=======
  const [error, setError] = useState("");
>>>>>>> 8aaefac (New UI:UX etc..)
  const [loading, setLoading] = useState(false);

  const isPasswordValid = form.password.length >= 6;
  const isConfirmValid = form.confirm === form.password && form.confirm.length >= 6;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
<<<<<<< HEAD
    if (!isPasswordValid || !isConfirmValid) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-600/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        {/* Back Link */}
        <button 
          onClick={() => navigate("/login")}
          className="absolute left-0 -top-12 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back To Main
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2.5 rounded-2xl bg-blue-600/20 border border-blue-500/30">
            <Wallet className="h-6 w-6 text-blue-500" />
          </div>
          <span className="text-white font-black text-2xl tracking-tighter">
            Cash<span className="text-blue-500 italic">Flow</span>
          </span>
        </div>

        {/* Card */}
        <div className="w-full bg-[#16161a] border border-white/5 rounded-[32px] p-8 shadow-2xl shadow-black/50">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-6 border border-blue-500/20 rotate-3">
               <Key className="h-10 w-10 text-blue-500 -rotate-12" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Reset your password</h2>
            <p className="text-sm text-white/40 leading-relaxed px-4">
              Enter a new password below to regain access to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                  <Key className="h-5 w-5" />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="New password"
                  required
                  value={form.password}
                  onChange={(e) => setForm(f => ({...f, password: e.target.value}))}
                  className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all font-medium"
=======
    if (!isPasswordValid) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (!isConfirmValid) {
      setError("A confirmação de senha não confere.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-[#08080a] text-[#e2e3e9] flex items-center justify-center p-5 sm:p-8 relative selection:bg-[#cc9166]/20 selection:text-white font-sans overflow-x-hidden">
      
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-b from-[#cc9166]/[0.03] to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        
        {/* Back Link */}
        <div className="w-full flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-[#9194a1] hover:text-white transition-colors text-[13px] font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao login
          </button>
        </div>

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 mb-8 group">
          <div className="w-8 h-8 rounded-full border border-[#2e3038] bg-[#040406] flex items-center justify-center transition-colors group-hover:border-[#cc9166]">
            <span className="font-serif-display text-white text-base font-bold select-none leading-none">/</span>
          </div>
            <span className="text-lg font-bold tracking-tight text-white font-serif-display">
              CashFlow<span className="text-[#cc9166]">.</span>
            </span>
        </Link>

        {/* Card */}
        <div className="w-full rounded-[10px] border border-[#1c1d22] bg-[#040406] p-7 sm:p-9 shadow-2xl space-y-6">
          
          <div className="space-y-3 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-[#2e3038] bg-[#121317] flex items-center justify-center text-[#cc9166] mb-1">
              <KeyRound className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-semibold text-[#cc9166] uppercase tracking-wider font-mono">
              NOVA CREDENCIAL
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-white font-normal">
              Criar nova senha.
            </h2>
            <p className="text-[13px] text-[#9194a1] leading-relaxed">
              Defina uma chave forte para restabelecer o acesso seguro ao seu cofre.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            
            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-[#c7c9d1] uppercase tracking-wider block">
                Nova Senha
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5e616e]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  required
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full h-12 pl-11 pr-11 rounded-full bg-[#08080a] border border-[#2e3038] text-white placeholder:text-[#5e616e] text-[14px] focus:outline-none focus:border-[#777a88] transition-colors font-mono"
>>>>>>> 8aaefac (New UI:UX etc..)
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
<<<<<<< HEAD
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors px-1"
                >
                  {showPass ? "Hide" : "Show"}
=======
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5e616e] hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
>>>>>>> 8aaefac (New UI:UX etc..)
                </button>
              </div>
            </div>

<<<<<<< HEAD
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  required
                  value={form.confirm}
                  onChange={(e) => setForm(f => ({...f, confirm: e.target.value}))}
                  className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all font-medium"
=======
            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-[#c7c9d1] uppercase tracking-wider block">
                Confirmar Nova Senha
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5e616e]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repita a nova senha"
                  required
                  value={form.confirm}
                  onChange={(e) => setForm((prev) => ({ ...prev, confirm: e.target.value }))}
                  className="w-full h-12 pl-11 pr-11 rounded-full bg-[#08080a] border border-[#2e3038] text-white placeholder:text-[#5e616e] text-[14px] focus:outline-none focus:border-[#777a88] transition-colors font-mono"
>>>>>>> 8aaefac (New UI:UX etc..)
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
<<<<<<< HEAD
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors px-1"
                >
                   {showConfirm ? "Hide" : "Show"}
=======
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5e616e] hover:text-white transition-colors"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
>>>>>>> 8aaefac (New UI:UX etc..)
                </button>
              </div>
            </div>

<<<<<<< HEAD
            <div className="py-2">
               <p className="text-[11px] text-white/30 leading-relaxed">
                  Minimum 6 characters. Must contain upper and lowercase, numbers, and symbols.
               </p>
            </div>

            <button
              type="submit"
              disabled={loading || !isPasswordValid || !isConfirmValid}
              className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] mt-2"
            >
              {loading ? "Updating..." : "Reset my password"}
            </button>
          </form>
        </div>
      </div>
=======
            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-[8px] bg-[#121317] border border-red-500/30 text-red-300 text-[13px] flex items-center gap-2.5 animate-in fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-[#ffffff] text-[#000000] hover:bg-[#f0f0f4] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-[14px] transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-sm cursor-pointer mt-2"
            >
              {loading ? (
                <span>Atualizando credencial...</span>
              ) : (
                <>
                  <span>Redefinir e Entrar no Cofre</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

        </div>

      </div>

>>>>>>> 8aaefac (New UI:UX etc..)
    </div>
  );
}
