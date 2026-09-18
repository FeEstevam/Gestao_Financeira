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
  Sparkles,
  Command,
  HelpCircle,
  ChevronRight,
  Plus,
} from "lucide-react";
import { getSession, logout } from "@/client/lib/auth";
import { useIsMobile } from "@/client/hooks/use-mobile";
import { usePrivacy } from "@/client/hooks/use-privacy";
import { Button } from "@/components/ui/button";

export function AppLayout() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { isPrivate, togglePrivacy } = usePrivacy();
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
  }, []);

  const username = user?.name ?? "Usuário";
  const email = user?.email ?? "";

  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "US";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <SidebarProvider>
      <div className="min-h-[100dvh] flex w-full bg-[#08080a] text-[#e2e3e9] font-sans antialiased selection:bg-[#cc9166]/20 selection:text-[#ffffff]">
        {/* Sidebar on desktop */}
        {!isMobile && <AppSidebar />}
        <div className="flex-1 flex flex-col min-w-0 bg-[#08080a]">
          <header
            className={cn(
              "h-16 flex items-center justify-between border-b border-[#1c1d22] bg-[#08080a]/90 backdrop-blur-md z-50 px-6",
              isMobile ? "fixed top-0 left-0 right-0" : "sticky top-0"
            )}
          >
            <div className="flex items-center gap-4">
              {isMobile && (
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-md bg-[#ffffff] flex items-center justify-center text-[#000000] font-bold text-base select-none">
                    /
                  </div>
                  <span className="font-serif-display font-medium tracking-tight text-lg text-white">
                    Cashflow<span className="text-[#cc9166]">.</span>
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Privacy Toggle */}
              <button
                onClick={togglePrivacy}
                className="p-2 rounded-lg hover:bg-[#121317] border border-transparent hover:border-[#1c1d22] text-[#9194a1] hover:text-white transition-all outline-none"
                title={isPrivate ? "Mostrar valores" : "Ocultar valores"}
              >
                {isPrivate ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>

              {/* Create Button - Desktop only */}
              {!isMobile && (
                <Button
                  onClick={() => navigate("/?new=1")}
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
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-60 p-2 rounded-xl shadow-2xl border border-[#1c1d22] bg-[#040406] text-[#e2e3e9] animate-in zoom-in-95 duration-150"
                >
                  {/* User Profile Header */}
                  <div className="px-3 py-2.5 mb-1 bg-[#121317]/50 rounded-lg border border-[#1c1d22]/50">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8 border border-[#2e3038]">
                        <AvatarImage src={avatarUrl} alt={username} />
                        <AvatarFallback className="bg-[#08080a] text-[#cc9166] text-xs font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <p className="text-xs font-medium text-white truncate">{username}</p>
                        <p className="text-[10px] text-[#9194a1] truncate mt-0.5">
                          {email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Main Links */}
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
                      </Link>
                    </DropdownMenuItem>
                  </div>

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
