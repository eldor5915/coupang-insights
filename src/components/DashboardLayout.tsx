import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Settings, Sun, Moon, ChevronLeft } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "대시보드", icon: LayoutDashboard, path: "/dashboard" },
  { label: "상품 추가", icon: PlusCircle, path: "/dashboard/add" },
  { label: "설정", icon: Settings, path: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const location = useLocation();
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-border bg-card hidden md:flex flex-col">
        <div className="h-16 flex items-center px-5 border-b border-border">
          <Link to="/" className="text-lg font-bold tracking-tight">
            <span className="text-primary">Coupang</span>Spy
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => {
            const active = item.path === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <button onClick={toggle} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors w-full">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {isDark ? "라이트 모드" : "다크 모드"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <header className="h-14 border-b border-border flex items-center px-4 md:hidden justify-between">
          <Link to="/" className="text-lg font-bold">
            <span className="text-primary">C</span>Spy
          </Link>
          <div className="flex items-center gap-2">
            {navItems.map(item => {
              const active = item.path === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname.startsWith(item.path);
              return (
                <Link key={item.path} to={item.path} className={cn("p-2 rounded-md", active ? "bg-primary/10 text-primary" : "text-muted-foreground")}>
                  <item.icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </header>
        <div className="p-4 md:p-8 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
