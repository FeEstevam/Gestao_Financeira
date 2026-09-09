<<<<<<< HEAD
import { useLocation, useNavigate } from "react-router-dom";
import { MailCheck, ArrowLeft, Wallet } from "lucide-react";
=======
import { useLocation, useNavigate, Link } from "react-router-dom";
import { MailCheck, ArrowLeft, ArrowRight } from "lucide-react";
>>>>>>> 8aaefac (New UI:UX etc..)

export default function EmailSent() {
  const navigate = useNavigate();
  const { state } = useLocation();
<<<<<<< HEAD
  const email = state?.email ?? "seu-email@exemplo.com";

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
        <div className="w-full bg-[#16161a] border border-white/5 rounded-[32px] p-8 shadow-2xl shadow-black/50 text-center">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-6 border border-blue-500/20 rotate-3 animate-in zoom-in-50 duration-500">
               <MailCheck className="h-10 w-10 text-blue-500 -rotate-12" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Email instructions sent</h2>
            <p className="text-sm text-white/40 leading-relaxed px-4">
              Please follow the instructions we sent to your inbox.
            </p>
            <p className="text-sm font-bold text-white mt-4 tracking-tight underline underline-offset-4 decoration-blue-700">{email}</p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="w-full h-14 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-white font-bold text-base transition-all active:scale-[0.98]"
          >
            Back to login
          </button>
          
          <p className="mt-8 text-xs text-white/30 font-medium">
            Didn't receive the email? <span className="text-blue-500 cursor-pointer hover:underline underline-offset-2">Send it again</span>
          </p>
        </div>
      </div>
=======
  const email = state?.email ?? "seu.email@empresa.com";

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
        <div className="w-full rounded-[10px] border border-[#1c1d22] bg-[#040406] p-7 sm:p-9 shadow-2xl space-y-6 text-center">
          
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-[#2e3038] bg-[#121317] flex items-center justify-center text-[#cc9166] mb-1">
              <MailCheck className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-semibold text-[#cc9166] uppercase tracking-wider font-mono">
              INSTRUÇÕES ENVIADAS
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-white font-normal">
              Verifique sua caixa de entrada.
            </h2>
            <p className="text-[13px] text-[#9194a1] leading-relaxed">
              Enviamos um link seguro para redefinição de acesso para o endereço:
            </p>
            <div className="px-4 py-2 rounded-full border border-[#2e3038] bg-[#08080a] text-[13px] font-mono text-white inline-block">
              {email}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate("/login")}
              className="w-full h-12 rounded-full bg-[#ffffff] text-[#000000] hover:bg-[#f0f0f4] font-medium text-[14px] transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Retornar ao Login</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="text-[12px] text-[#5e616e] pt-2">
            Não recebeu o email? Verifique sua caixa de spam ou tente novamente em alguns minutos.
          </p>

        </div>

      </div>

>>>>>>> 8aaefac (New UI:UX etc..)
    </div>
  );
}
