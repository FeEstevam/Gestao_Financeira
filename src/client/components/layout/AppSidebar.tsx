import {
  LayoutDashboard,
  Target,
  CreditCard,
  FileBarChart,
<<<<<<< HEAD
  Settings,
=======
>>>>>>> 8aaefac (New UI:UX etc..)
  Wallet,
  Plus,
  LifeBuoy,
  Sparkles,
<<<<<<< HEAD
  CheckCircle2,
  Tags,
  Sliders,
  CandlestickChart,
=======
  Tags,
  Sliders,
  CandlestickChart,
  HelpCircle,
  FileText,
  User as UserIcon,
>>>>>>> 8aaefac (New UI:UX etc..)
} from "lucide-react";
import { NavLink } from "./NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
<<<<<<< HEAD
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { cn } from "@/client/lib/utils";
import { useTheme } from "@/components/theme-provider";

const menuItems = [
  { title: "Painel", url: "/", icon: LayoutDashboard },
  { title: "Metas", url: "/metas", icon: Target },
  { title: "Contas", url: "/contas", icon: CreditCard },
  { title: "Categorias", url: "/categorias", icon: Tags },
  { title: "Estratégia", url: "/estrategia", icon: Sliders },
  { title: "Investimentos", url: "/investimentos", icon: CandlestickChart },
  { title: "Relatórios", url: "/relatorios", icon: FileBarChart },
=======
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { cn } from "@/client/lib/utils";
import { getSession } from "@/client/lib/auth";
import { useState, useEffect } from "react";

const menuItems = [
  { title: "Painel Principal", url: "/", icon: LayoutDashboard },
  { title: "Metas Financeiras", url: "/metas", icon: Target },
  { title: "Contas & Cartões", url: "/contas", icon: CreditCard },
  { title: "Categorias", url: "/categorias", icon: Tags },
  { title: "Estratégia Vault", url: "/estrategia", icon: Sliders },
  { title: "Investimentos", url: "/investimentos", icon: CandlestickChart },
  { title: "Relatórios & DRE", url: "/relatorios", icon: FileBarChart },
  { title: "Documentação", url: "/documentacao", icon: FileText },
>>>>>>> 8aaefac (New UI:UX etc..)
  { title: "Suporte", url: "/suporte", icon: LifeBuoy },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
<<<<<<< HEAD
  const { theme } = useTheme();
  const isCollapsed = state === "collapsed";
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
=======
  const isCollapsed = state === "collapsed";

  const [user, setUser] = useState(() => getSession());
  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    const session = getSession();
    if (session?.avatar_url) return session.avatar_url;
    try {
      const stored = localStorage.getItem("financaspro_profile");
      if (stored) return JSON.parse(stored).avatarUrl || "";
    } catch {}
    return "";
  });

  useEffect(() => {
    const syncUser = () => {
      const session = getSession();
      setUser(session);
      let img = session?.avatar_url || "";
      if (!img) {
        try {
          const stored = localStorage.getItem("financaspro_profile");
          if (stored) img = JSON.parse(stored).avatarUrl || "";
        } catch {}
      }
      setAvatarUrl(img);
    };

    syncUser();
    window.addEventListener("user_profile_updated", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("user_profile_updated", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const username = user?.name ?? "Usuário";
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "US";
>>>>>>> 8aaefac (New UI:UX etc..)

  return (
    <Sidebar
      collapsible="icon"
<<<<<<< HEAD
      className="border-r-0 transition-[width,background-color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #111114 0%, #0e0e11 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
        borderRight: isDark ? "none" : "1px solid #e5e7eb"
      }}
    >
      {/* ── HEADER ── */}
      <SidebarHeader className="px-5 pt-6 pb-5 group-data-[state=collapsed]:px-3 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
        <div className="flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-3 shrink-0">
            {/* Logo mark */}
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-transform duration-500"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                boxShadow: isDark ? "0 0 16px rgba(16,185,129,0.35)" : "0 4px 12px rgba(16,185,129,0.2)",
              }}
            >
              <Wallet className="h-4 w-4 text-white" />
            </div>

            {/* Name */}
            {!isCollapsed && (
              <span
                className={cn(
                  "text-[17px] font-bold tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-500",
                  isDark ? "text-white" : "text-slate-900"
                )}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Cash<span className="text-emerald-500 italic">Flow</span>
              </span>
            )}
          </div>

          {/* Minimize button inside sidebar */}
          {!isCollapsed && (
            <SidebarTrigger className={cn(
              "h-8 w-8 transition-all duration-500 rounded-lg shrink-0 opacity-100 scale-100",
              isDark ? "text-white/40 hover:text-white hover:bg-white/10" : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
            )} />
          )}
        </div>
        {isCollapsed && (
          <div className="flex justify-center mt-2 animate-in fade-in zoom-in duration-500">
            <SidebarTrigger className={cn(
              "h-8 w-8 transition-all duration-500 rounded-lg",
              isDark ? "text-white/40 hover:text-white hover:bg-white/10" : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
            )} />
=======
      className="border-r border-[#1c1d22] bg-[#040406] text-[#e2e3e9] transition-[width] duration-300"
    >
      {/* ── HEADER ── */}
      <SidebarHeader className="px-5 py-5 border-b border-[#1c1d22]/50 group-data-[state=collapsed]:px-3">
        <div className="flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-[#ffffff] flex items-center justify-center text-[#000000] font-bold text-lg select-none shadow-sm">
              /
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-serif-display font-medium tracking-tight text-lg text-[#ffffff] leading-none">
                  Cashflow<span className="text-[#cc9166]">.</span>
                </span>
                <span className="text-[10px] font-mono text-[#9194a1] tracking-widest uppercase mt-0.5">
                  Vault Core
                </span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <SidebarTrigger className="h-7 w-7 text-[#9194a1] hover:text-[#ffffff] hover:bg-[#121317] rounded-md transition-colors" />
          )}
        </div>
        {isCollapsed && (
          <div className="flex justify-center mt-2">
            <SidebarTrigger className="h-7 w-7 text-[#9194a1] hover:text-[#ffffff] hover:bg-[#121317] rounded-md transition-colors" />
>>>>>>> 8aaefac (New UI:UX etc..)
          </div>
        )}
      </SidebarHeader>

      {/* ── NAV ── */}
<<<<<<< HEAD
      <SidebarContent className="px-3 group-data-[state=collapsed]:px-1.5 transition-all duration-500 pt-1">
=======
      <SidebarContent className="px-3 py-3 group-data-[state=collapsed]:px-1.5">
>>>>>>> 8aaefac (New UI:UX etc..)
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => {
                const isActive =
                  item.url === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
<<<<<<< HEAD
                        "relative h-11 rounded-xl px-4 transition-all duration-500 group/item border-0 outline-none ring-0 overflow-hidden",
                        isActive
                          ? (isDark ? "text-white" : "text-emerald-600")
                          : (isDark ? "text-white/50 hover:text-white/80 hover:bg-white/[0.05]" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100")
                      )}
                      style={
                        isActive
                          ? {
                            background: isDark
                              ? "linear-gradient(90deg, rgba(255,255,255,0.07) 0%, rgba(139,92,246,0.18) 85%, rgba(168,85,247,0.55) 100%)"
                              : "linear-gradient(90deg, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0.1) 85%, rgba(16,185,129,0.2) 100%)",
                            borderRight: isDark
                              ? "3px solid rgba(168,85,247,0.9)"
                              : "3px solid #10b981",
                          }
                          : undefined
                      }
=======
                        "relative h-9 rounded-lg px-3 transition-all group/item border outline-none ring-0",
                        isActive
                          ? "bg-[#121317] border-[#2e3038] text-[#ffffff]"
                          : "border-transparent text-[#9194a1] hover:text-[#e2e3e9] hover:bg-[#121317]/50"
                      )}
>>>>>>> 8aaefac (New UI:UX etc..)
                    >
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
<<<<<<< HEAD
                        className="flex items-center gap-3.5 w-full whitespace-nowrap"
                      >
                        <item.icon
                          className={cn(
                            "h-[18px] w-[18px] shrink-0 transition-transform duration-500 group-hover/item:scale-110",
                            isActive
                              ? (isDark ? "text-white" : "text-emerald-600")
                              : (isDark ? "text-white/45 group-hover/item:text-white/75" : "text-slate-400 group-hover/item:text-slate-600")
                          )}
                          strokeWidth={isActive ? 2.2 : 1.8}
                        />
                        <span
                          className={cn(
                            "font-medium text-sm transition-all duration-500 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:translate-x-4",
                            isActive
                              ? (isDark ? "text-white" : "text-emerald-700")
                              : (isDark ? "text-white/55" : "text-slate-600")
                          )}
                        >
=======
                        className="flex items-center gap-3 w-full whitespace-nowrap"
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            isActive ? "text-[#cc9166]" : "text-[#9194a1] group-hover/item:text-[#e2e3e9]"
                          )}
                          strokeWidth={isActive ? 2 : 1.75}
                        />
                        <span className="text-xs font-medium tracking-tight group-data-[state=collapsed]:hidden">
>>>>>>> 8aaefac (New UI:UX etc..)
                          {item.title}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── FOOTER ── */}
<<<<<<< HEAD
      <SidebarFooter className="p-4 group-data-[state=collapsed]:p-2 transition-all duration-500 space-y-3 overflow-hidden">
        {/* Upgrade hint card */}
        <div
          className={cn(
            "p-4 rounded-2xl relative overflow-hidden transition-all duration-500",
            isCollapsed ? "opacity-0 translate-y-4 pointer-events-none h-0 p-0" : "opacity-100 translate-y-0 h-auto"
          )}
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(16,185,129,0.08) 100%)"
              : "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(59,130,246,0.05) 100%)",
            border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(16,185,129,0.1)",
          }}
        >
          <Sparkles className={cn(
            "absolute -right-1 -top-1 h-12 w-12 rotate-12 transition-transform duration-700",
            isDark ? "text-violet-400/10" : "text-emerald-400/10"
          )} />
          <p className={cn("text-[11px] font-bold mb-1", isDark ? "text-white/80" : "text-slate-900")}>
            Dica Premium
          </p>
          <p className={cn("text-[10px] mb-3 leading-relaxed", isDark ? "text-white/40" : "text-slate-500")}>
            Organize suas contas e economize até 20% ao mês.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-7 text-[10px] w-full font-bold outline-none",
                  isDark ? "text-white/70 bg-white/06 border-white/10" : "text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-200"
                )}
                style={{
                  border: "1px solid transparent",
                  ...(isDark ? { background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)" } : {})
                }}
              >
                Saiba Mais
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none bg-transparent shadow-2xl">
              <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[80px]" />
                <DialogHeader className="space-y-3 mb-6 relative z-10">
                  <div className="p-3 w-fit rounded-2xl gradient-primary rotate-3">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <DialogTitle className="text-2xl font-black tracking-tight">
                    CashFlow{" "}
                    <span className="text-primary italic">Premium</span>
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground">
                    Desbloqueie o potencial máximo das suas finanças com
                    ferramentas exclusivas.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mb-8 relative z-10 text-foreground">
                  {[
                    "Sincronização bancária automática",
                    "Relatórios avançados e exportação em PDF",
                    "Categorias personalizadas infinitas",
                    "Suporte prioritário 24/7",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className="w-full h-14 gradient-primary rounded-xl font-bold text-lg hover:scale-105 transition-transform active:scale-95 border-0 text-white"
                >
                  <Link to="/planos">Fazer Upgrade Agora</Link>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => navigate("/?new=1")}
          className="w-full h-11 gap-3 border-0 text-white font-semibold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 rounded-xl text-sm"
          style={{
            background:
              "linear-gradient(90deg, #10b981 0%, #059669 100%)",
            boxShadow: isDark ? "0 4px 20px rgba(16,185,129,0.25)" : "0 4px 15px rgba(16,185,129,0.3)",
          }}
        >
          <Plus className="h-4 w-4 shrink-0" />
          {!isCollapsed && (
            <span className="animate-in fade-in slide-in-from-left-2 duration-500">
              Novo Lançamento
            </span>
          )}
=======
      <SidebarFooter className="p-3 border-t border-[#1c1d22]/50 group-data-[state=collapsed]:p-2 space-y-2">
        {/* User Card in Sidebar */}
        <Link
          to="/perfil"
          className={cn(
            "flex items-center gap-2.5 p-2 rounded-xl bg-[#08080a] border border-[#1c1d22] hover:border-[#2e3038] hover:bg-[#0f1015] transition-all group",
            isCollapsed && "justify-center p-1.5"
          )}
          title="Ver perfil"
        >
          <Avatar className="h-8 w-8 rounded-lg border border-[#2e3038] shrink-0 bg-[#121317]">
            <AvatarImage src={avatarUrl} alt={username} className="object-cover" />
            <AvatarFallback className="bg-[#121317] text-[#cc9166] text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-medium text-white truncate group-hover:text-[#cc9166] transition-colors">
                {username}
              </span>
              <span className="text-[10px] text-[#9194a1] truncate">
                Perfil & Segurança
              </span>
            </div>
          )}
        </Link>

        <Button
          onClick={() => navigate("/?new=1")}
          className="w-full h-9 gap-2 bg-[#ffffff] hover:bg-[#ffffff]/90 text-[#000000] font-semibold text-xs rounded-lg transition-all active:scale-[0.98] border-0"
        >
          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          {!isCollapsed && <span>Novo Registro</span>}
>>>>>>> 8aaefac (New UI:UX etc..)
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
