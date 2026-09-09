import {
  LayoutDashboard,
  Target,
  CreditCard,
  FileBarChart,
<<<<<<< HEAD
  Settings,
=======
>>>>>>> 8aaefac (New UI:UX etc..)
  Plus,
} from "lucide-react";
import { NavLink as RouterNavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/client/lib/utils";

const navItems = [
  { title: "Painel", url: "/", icon: LayoutDashboard },
  { title: "Metas", url: "/metas", icon: Target },
  { title: "Contas", url: "/contas", icon: CreditCard },
  { title: "Relatórios", url: "/relatorios", icon: FileBarChart },
];

export function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-1">
=======
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#040406]/95 backdrop-blur-lg border-t border-[#1c1d22] md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
>>>>>>> 8aaefac (New UI:UX etc..)
        {navItems.slice(0, 2).map((item) => {
          const isActive =
            item.url === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.url);
          return (
            <RouterNavLink
              key={item.url}
              to={item.url}
              className={cn(
<<<<<<< HEAD
                "flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-muted-foreground transition-colors",
                isActive && "text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.title}</span>
=======
                "flex flex-col items-center justify-center gap-1 flex-1 h-full text-[#9194a1] transition-colors",
                isActive && "text-[#ffffff]"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-[#cc9166]" : "text-[#9194a1]")} />
              <span className="text-[10px] font-medium tracking-tight">{item.title}</span>
>>>>>>> 8aaefac (New UI:UX etc..)
            </RouterNavLink>
          );
        })}

        {/* Center FAB */}
        <div className="flex flex-col items-center justify-center flex-1">
          <button
            onClick={() => navigate("/?new=1")}
<<<<<<< HEAD
            className="flex items-center justify-center w-12 h-12 -mt-5 rounded-full gradient-primary text-primary-foreground shadow-lg"
          >
            <Plus className="h-6 w-6" />
=======
            className="flex items-center justify-center w-11 h-11 -mt-4 rounded-full bg-[#ffffff] text-[#000000] shadow-lg shadow-black/50 active:scale-95 transition-transform"
          >
            <Plus className="h-5 w-5 stroke-[2.5]" />
>>>>>>> 8aaefac (New UI:UX etc..)
          </button>
        </div>

        {navItems.slice(2).map((item) => {
          const isActive = location.pathname.startsWith(item.url);
          return (
            <RouterNavLink
              key={item.url}
              to={item.url}
              className={cn(
<<<<<<< HEAD
                "flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-muted-foreground transition-colors",
                isActive && "text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.title}</span>
=======
                "flex flex-col items-center justify-center gap-1 flex-1 h-full text-[#9194a1] transition-colors",
                isActive && "text-[#ffffff]"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-[#cc9166]" : "text-[#9194a1]")} />
              <span className="text-[10px] font-medium tracking-tight">{item.title}</span>
>>>>>>> 8aaefac (New UI:UX etc..)
            </RouterNavLink>
          );
        })}
      </div>
    </nav>
  );
}
