import { useLocation, useNavigate, Link } from "react-router-dom";
import { MailCheck, ArrowLeft, ArrowRight } from "lucide-react";

export default function EmailSent() {
  const navigate = useNavigate();
  const { state } = useLocation();
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

    </div>
  );
}
