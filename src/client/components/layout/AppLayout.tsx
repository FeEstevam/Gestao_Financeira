import { useState, useEffect } from "react";
import { cn } from "@/client/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Settings,
  LogOut,
  Eye,
  EyeOff,
<<<<<<< HEAD
  Wallet,
  SunMoon,
=======
>>>>>>> 8aaefac (New UI:UX etc..)
  Sparkles,
  Command,
  HelpCircle,
  ChevronRight,
  Plus,
<<<<<<< HEAD
  CheckCircle2
=======
>>>>>>> 8aaefac (New UI:UX etc..)
} from "lucide-react";
import { getSession, logout } from "@/client/lib/auth";
import { useIsMobile } from "@/client/hooks/use-mobile";
import { usePrivacy } from "@/client/hooks/use-privacy";
<<<<<<< HEAD
import { ModeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
=======
import { Button } from "@/components/ui/button";
>>>>>>> 8aaefac (New UI:UX etc..)

export function AppLayout() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { isPrivate, togglePrivacy } = usePrivacy();
<<<<<<< HEAD
  const { theme } = useTheme();
  const [user, setUser] = useState(() => getSession());

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Keep user state in sync (e.g. after register/login)
  useEffect(() => {
    setUser(getSession());
=======
  const [user, setUser] = useState(() => getSession());
  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    const session = getSession();
    if (session?.avatar_url) return session.avatar_url;
    try {
      const stored = localStorage.getItem("financaspro_profile");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.avatarUrl || "";
      }
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
          if (stored) {
            const parsed = JSON.parse(stored);
            img = parsed.avatarUrl || "";
          }
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
>>>>>>> 8aaefac (New UI:UX etc..)
  }, []);

  const username = user?.name ?? "Usuário";
  const email = user?.email ?? "";
<<<<<<< HEAD
  const avatarUrl = localStorage.getItem("avatarUrl") || user?.avatar_url || "";
=======
>>>>>>> 8aaefac (New UI:UX etc..)

  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
<<<<<<< HEAD
    .slice(0, 2);
=======
    .slice(0, 2) || "US";
>>>>>>> 8aaefac (New UI:UX etc..)

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <SidebarProvider>
<<<<<<< HEAD
      <div className="min-h-[100dvh] flex w-full bg-background transition-colors duration-300">
        {/* Sidebar only on desktop */}
        {!isMobile && <AppSidebar />}
        <div className="flex-1 flex flex-col min-w-0">
          <header
            className={cn(
              "h-16 flex items-center justify-between border-b bg-card/80 backdrop-blur-xl z-50 px-6",
=======
      <div className="min-h-[100dvh] flex w-full bg-[#08080a] text-[#e2e3e9] font-sans antialiased selection:bg-[#cc9166]/20 selection:text-[#ffffff]">
        {/* Sidebar on desktop */}
        {!isMobile && <AppSidebar />}
        <div className="flex-1 flex flex-col min-w-0 bg-[#08080a]">
          <header
            className={cn(
              "h-16 flex items-center justify-between border-b border-[#1c1d22] bg-[#08080a]/90 backdrop-blur-md z-50 px-6",
>>>>>>> 8aaefac (New UI:UX etc..)
              isMobile ? "fixed top-0 left-0 right-0" : "sticky top-0"
            )}
          >
            <div className="flex items-center gap-4">
              {isMobile && (
                <div className="flex items-center gap-2.5">
<<<<<<< HEAD
                  <div className="p-1.5 rounded-lg gradient-primary rotate-3 shadow-md shadow-primary/20">
                    <Wallet className="h-4.5 w-4.5 text-primary-foreground" />
                  </div>
                  <span className="font-bold tracking-tight text-lg">
                    CashTeste<span className="text-primary italic">Flow</span>
=======
                  <div className="h-7 w-7 rounded-md bg-[#ffffff] flex items-center justify-center text-[#000000] font-bold text-base select-none">
                    /
                  </div>
                  <span className="font-serif-display font-medium tracking-tight text-lg text-white">
                    Cashflow<span className="text-[#cc9166]">.</span>
>>>>>>> 8aaefac (New UI:UX etc..)
                  </span>
                </div>
              )}
            </div>

<<<<<<< HEAD
            <div className="flex items-center gap-4">
=======
            <div className="flex items-center gap-3">
              {/* Privacy Toggle */}
              <button
                onClick={togglePrivacy}
                className="p-2 rounded-lg hover:bg-[#121317] border border-transparent hover:border-[#1c1d22] text-[#9194a1] hover:text-white transition-all outline-none"
                title={isPrivate ? "Mostrar valores" : "Ocultar valores"}
              >
                {isPrivate ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>

>>>>>>> 8aaefac (New UI:UX etc..)
              {/* Create Button - Desktop only */}
              {!isMobile && (
                <Button
                  onClick={() => navigate("/?new=1")}
<<<<<<< HEAD
                  className="rounded-full px-5 h-10 border-border/50 bg-background hover:bg-muted text-foreground font-semibold shadow-sm flex items-center gap-2 transition-all active:scale-95"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create</span>
                </Button>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={togglePrivacy}
                  className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all outline-none"
                  title={isPrivate ? "Mostrar valores" : "Esconder valores"}
                >
                  {isPrivate ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>

                <ModeToggle />
              </div>

              <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 hover:opacity-90 transition-all outline-none group">
                    <Avatar className="h-9 w-9 border-2 border-primary/20 ring-offset-2 ring-offset-background group-hover:ring-2 ring-primary/20 transition-all">
                      <AvatarImage src={avatarUrl} alt={username} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
=======
                  className="rounded-full px-4 h-8 bg-white hover:bg-white/90 text-black font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-all active:scale-95 border-0"
                >
                  <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                  <span>Novo Lançamento</span>
                </Button>
              )}

              <div className="h-4 w-px bg-[#1c1d22] mx-1 hidden sm:block" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 hover:opacity-90 transition-all outline-none group">
                    <Avatar className="h-8 w-8 border border-[#2e3038] ring-offset-0 transition-all">
                      <AvatarImage src={avatarUrl} alt={username} />
                      <AvatarFallback className="bg-[#121317] text-[#cc9166] text-xs font-semibold">
>>>>>>> 8aaefac (New UI:UX etc..)
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
<<<<<<< HEAD
                  className={cn(
                    "w-64 p-2 rounded-[22px] shadow-2xl border-border/50 animate-in zoom-in-95 duration-200",
                    isDark ? "bg-[#0f0f12] text-white" : "bg-white text-slate-900"
                  )}
                >
                  {/* User Profile Header */}
                  <div className="px-3 py-3 mb-1">
                    <div className="flex items-center gap-3">
                      <Avatar className={cn("h-10 w-10 border", isDark ? "border-white/10 shadow-inner" : "border-slate-200 shadow-sm")}>
                        <AvatarImage src={avatarUrl} alt={username} />
                        <AvatarFallback className={cn("bg-muted text-muted-foreground text-xs font-bold", isDark && "bg-white/5 text-white/70")}>
=======
                  className="w-60 p-2 rounded-xl shadow-2xl border border-[#1c1d22] bg-[#040406] text-[#e2e3e9] animate-in zoom-in-95 duration-150"
                >
                  {/* User Profile Header */}
                  <div className="px-3 py-2.5 mb-1 bg-[#121317]/50 rounded-lg border border-[#1c1d22]/50">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8 border border-[#2e3038]">
                        <AvatarImage src={avatarUrl} alt={username} />
                        <AvatarFallback className="bg-[#08080a] text-[#cc9166] text-xs font-semibold">
>>>>>>> 8aaefac (New UI:UX etc..)
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
<<<<<<< HEAD
                        <p className="text-[14px] font-bold truncate tracking-tight">{username}</p>
                        <p className={cn("text-[11px] truncate tracking-tight leading-none mt-0.5", isDark ? "text-white/40" : "text-slate-500")}>
=======
                        <p className="text-xs font-medium text-white truncate">{username}</p>
                        <p className="text-[10px] text-[#9194a1] truncate mt-0.5">
>>>>>>> 8aaefac (New UI:UX etc..)
                          {email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Main Links */}
<<<<<<< HEAD
                  <div className="space-y-0.5 mt-1 px-1">
                    <DropdownMenuItem asChild className="rounded-[12px] h-10 px-3 focus:bg-accent cursor-pointer outline-none">
                      <Link to="/perfil" className="flex items-center gap-3 group/item">
                        <User className="h-[18px] w-[18px] opacity-60 group-hover/item:opacity-100 transition-opacity" />
                        <span className="text-[13px] font-medium tracking-tight">Profile</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="rounded-[12px] h-10 px-3 focus:bg-accent cursor-pointer outline-none">
                      <Link to="/configuracoes" className="flex items-center gap-3 group/item">
                        <Settings className="h-[18px] w-[18px] opacity-60 group-hover/item:opacity-100 transition-opacity" />
                        <span className="text-[13px] font-medium tracking-tight">Settings</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-[12px] h-10 px-3 focus:bg-accent cursor-pointer flex items-center justify-between group/item outline-none"
                      onClick={() => navigate("/configuracoes?tab=theme")}
                    >
                      <div className="flex items-center gap-3">
                        <SunMoon className="h-[18px] w-[18px] opacity-60 group-hover/item:opacity-100 transition-opacity" />
                        <span className="text-[13px] font-medium tracking-tight">Theme</span>
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-20" />
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="rounded-[12px] h-10 px-3 focus:bg-accent cursor-pointer outline-none">
                      <Link to="/planos" className="flex items-center gap-3 group/item">
                        <Sparkles className="h-[18px] w-[18px] opacity-60 group-hover/item:opacity-100 transition-opacity" />
                        <span className="text-[13px] font-medium tracking-tight">Fazer Upgrade</span>
=======
                  <div className="space-y-0.5 mt-1">
                    <DropdownMenuItem asChild className="rounded-lg h-9 px-2.5 focus:bg-[#121317] focus:text-white cursor-pointer outline-none">
                      <Link to="/perfil" className="flex items-center gap-2.5">
                        <User className="h-4 w-4 text-[#9194a1]" />
                        <span className="text-xs font-medium">Perfil da Conta</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="rounded-lg h-9 px-2.5 focus:bg-[#121317] focus:text-white cursor-pointer outline-none">
                      <Link to="/configuracoes" className="flex items-center gap-2.5">
                        <Settings className="h-4 w-4 text-[#9194a1]" />
                        <span className="text-xs font-medium">Configurações</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="rounded-lg h-9 px-2.5 focus:bg-[#121317] focus:text-white cursor-pointer outline-none">
                      <Link to="/planos" className="flex items-center gap-2.5 text-[#cc9166]">
                        <Sparkles className="h-4 w-4 text-[#cc9166]" />
                        <span className="text-xs font-medium">Plano Vault Pro</span>
>>>>>>> 8aaefac (New UI:UX etc..)
                      </Link>
                    </DropdownMenuItem>
                  </div>

<<<<<<< HEAD
                  <DropdownMenuSeparator className="my-1.5 mx-2" />

                  {/* Secondary Links */}
                  <div className="space-y-0.5 px-1">
                    <DropdownMenuItem className="rounded-[12px] h-10 px-3 focus:bg-accent cursor-pointer flex items-center gap-3 group/item outline-none">
                      <Command className="h-[18px] w-[18px] opacity-60 group-hover/item:opacity-100 transition-opacity" />
                      <span className="text-[13px] font-medium tracking-tight">Keyboard shortcuts</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="rounded-[12px] h-10 px-3 focus:bg-accent cursor-pointer flex items-center gap-3 group/item outline-none">
                      <HelpCircle className="h-[18px] w-[18px] opacity-60 group-hover/item:opacity-100 transition-opacity" />
                      <span className="text-[13px] font-medium tracking-tight">Help center</span>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="my-1.5 mx-2" />

                  {/* Logout */}
                  <div className="px-1">
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="rounded-[12px] h-10 px-3 focus:bg-red-500/10 cursor-pointer flex items-center gap-3 group/logout mb-0.5 text-red-500 focus:text-red-500 outline-none"
                    >
                      <LogOut className="h-[18px] w-[18px] transition-colors" />
                      <span className="text-[13px] font-bold tracking-tight">Log out</span>
=======
                  <DropdownMenuSeparator className="my-1.5 bg-[#1c1d22]" />

                  {/* Secondary Links */}
                  <div className="space-y-0.5">
                    <DropdownMenuItem asChild className="rounded-lg h-9 px-2.5 focus:bg-[#121317] focus:text-white cursor-pointer outline-none">
                      <Link to="/documentacao" className="flex items-center gap-2.5">
                        <HelpCircle className="h-4 w-4 text-[#9194a1]" />
                        <span className="text-xs font-medium">Documentação</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="my-1.5 bg-[#1c1d22]" />

                  {/* Logout */}
                  <div>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="rounded-lg h-9 px-2.5 focus:bg-rose-950/30 cursor-pointer flex items-center gap-2.5 text-rose-400 focus:text-rose-300 outline-none"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-xs font-semibold">Encerrar Sessão</span>
>>>>>>> 8aaefac (New UI:UX etc..)
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className={cn("flex-1", isMobile && "pb-20 pt-16")}>
            <Outlet />
          </main>
        </div>
        {/* Bottom nav only on mobile */}
        {isMobile && <MobileBottomNav />}
      </div>
    </SidebarProvider>
  );
}
