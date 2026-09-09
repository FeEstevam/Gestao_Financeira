import {
  LayoutDashboard,
  Target,
  CreditCard,
  FileBarChart,
  Wallet,
  Plus,
  LifeBuoy,
  Sparkles,
  Tags,
  Sliders,
  CandlestickChart,
  HelpCircle,
  FileText,
  User as UserIcon,
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
  { title: "Suporte", url: "/suporte", icon: LifeBuoy },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
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

  return (
    <Sidebar
      collapsible="icon"
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
          </div>
        )}
      </SidebarHeader>

      {/* ── NAV ── */}
      <SidebarContent className="px-3 py-3 group-data-[state=collapsed]:px-1.5">
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
                        "relative h-9 rounded-lg px-3 transition-all group/item border outline-none ring-0",
                        isActive
                          ? "bg-[#121317] border-[#2e3038] text-[#ffffff]"
                          : "border-transparent text-[#9194a1] hover:text-[#e2e3e9] hover:bg-[#121317]/50"
                      )}
                    >
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
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
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
