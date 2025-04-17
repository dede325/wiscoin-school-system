
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  CreditCard,
  Users,
  BarChart4,
  User,
  GraduationCap,
  Library,
  ChefHat,
  Building,
  Coins,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  UserCog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/providers/theme-provider";
import { useAuth } from "@/contexts/AuthContext";

type SidebarItem = {
  title: string;
  icon: React.ElementType;
  href: string;
  requiredRoles?: string[];
  items?: { title: string; href: string; requiredRoles?: string[] }[];
};

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: BarChart4,
    href: "/dashboard",
  },
  {
    title: "Acadêmico",
    icon: GraduationCap,
    href: "/academic",
    requiredRoles: ['admin', 'teacher', 'staff'],
    items: [
      { title: "Alunos", href: "/academic/students", requiredRoles: ['admin', 'teacher', 'staff'] },
      { title: "Professores", href: "/academic/teachers", requiredRoles: ['admin', 'staff'] },
      { title: "Turmas", href: "/academic/classes", requiredRoles: ['admin', 'teacher', 'staff'] },
      { title: "Disciplinas", href: "/academic/subjects", requiredRoles: ['admin', 'teacher', 'staff'] },
      { title: "Notas", href: "/academic/grades", requiredRoles: ['admin', 'teacher', 'staff', 'student', 'guardian'] },
    ],
  },
  {
    title: "Pagamentos",
    icon: CreditCard,
    href: "/payments",
    requiredRoles: ['admin', 'staff', 'guardian'],
    items: [
      { title: "Propinas", href: "/payments/tuition", requiredRoles: ['admin', 'staff', 'guardian'] },
      { title: "Recibos", href: "/payments/receipts", requiredRoles: ['admin', 'staff', 'guardian'] },
      { title: "Relatórios", href: "/payments/reports", requiredRoles: ['admin', 'staff'] },
    ],
  },
  {
    title: "Contabilidade",
    icon: BarChart4,
    href: "/accounting",
    requiredRoles: ['admin', 'staff'],
    items: [
      { title: "Plano de Contas", href: "/accounting/chart", requiredRoles: ['admin', 'staff'] },
      { title: "Diário", href: "/accounting/journal", requiredRoles: ['admin', 'staff'] },
      { title: "SAF-T", href: "/accounting/saft", requiredRoles: ['admin', 'staff'] },
      { title: "Relatórios", href: "/accounting/reports", requiredRoles: ['admin', 'staff'] },
    ],
  },
  {
    title: "Wiscoin",
    icon: Coins,
    href: "/wiscoin",
    items: [
      { title: "Carteira", href: "/wiscoin/wallet" },
      { title: "Transações", href: "/wiscoin/transactions" },
      { title: "Relatórios", href: "/wiscoin/reports", requiredRoles: ['admin', 'staff'] },
    ],
  },
  {
    title: "Recursos Humanos",
    icon: Users,
    href: "/hr",
    requiredRoles: ['admin', 'staff'],
    items: [
      { title: "Funcionários", href: "/hr/employees", requiredRoles: ['admin', 'staff'] },
      { title: "Contratos", href: "/hr/contracts", requiredRoles: ['admin', 'staff'] },
      { title: "Salários", href: "/hr/payroll", requiredRoles: ['admin', 'staff'] },
      { title: "Férias", href: "/hr/vacations", requiredRoles: ['admin', 'staff'] },
    ],
  },
  {
    title: "Cozinha",
    icon: ChefHat,
    href: "/kitchen",
    requiredRoles: ['admin', 'staff'],
    items: [
      { title: "Ementas", href: "/kitchen/menus", requiredRoles: ['admin', 'staff'] },
      { title: "Stock", href: "/kitchen/inventory", requiredRoles: ['admin', 'staff'] },
      { title: "Custos", href: "/kitchen/costs", requiredRoles: ['admin', 'staff'] },
    ],
  },
  {
    title: "Biblioteca",
    icon: Library,
    href: "/library",
    items: [
      { title: "Catálogo", href: "/library/catalog" },
      { title: "Empréstimos", href: "/library/loans", requiredRoles: ['admin', 'staff', 'teacher', 'student'] },
      { title: "Reservas", href: "/library/reservations", requiredRoles: ['admin', 'staff', 'teacher', 'student'] },
    ],
  },
  {
    title: "Multi-instituição",
    icon: Building,
    href: "/institutions",
    requiredRoles: ['admin', 'super_admin'],
  },
  {
    title: "Utilizadores",
    icon: UserCog,
    href: "/users",
    requiredRoles: ['admin', 'super_admin'],
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const { hasAnyRole, signOut, user, roles } = useAuth();

  const toggleSubmenu = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Filtra os itens do menu com base nas funções do usuário
  const filteredItems = sidebarItems.filter(item => {
    if (!item.requiredRoles) return true;
    return hasAnyRole(item.requiredRoles as any[]);
  });

  return (
    <>
      {isMobile && (
        <div className="fixed top-4 left-4 z-30">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            className="rounded-full shadow-md"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-20 flex h-full flex-col border-r bg-sidebar transition-all duration-300",
          isMobile ? (sidebarOpen ? "w-72" : "w-0") : "w-72",
          className
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 py-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <BookOpen size={28} className="text-primary" />
            <span className="text-lg font-semibold">WiSchool</span>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>

        <Separator />

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="grid gap-1 px-2">
            {filteredItems.map((item) => (
              <div key={item.title}>
                {item.items ? (
                  <div className="flex flex-col gap-1">
                    <Button
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      className={cn(
                        "mb-1 justify-start",
                        isActive(item.href) && "font-medium"
                      )}
                      onClick={() => toggleSubmenu(item.title)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Button>

                    {openItems[item.title] && (
                      <div className="ml-6 grid gap-1">
                        {item.items
                          .filter(subItem => !subItem.requiredRoles || hasAnyRole(subItem.requiredRoles as any[]))
                          .map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.href}
                              className={cn(
                                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                                isActive(subItem.href)
                                  ? "bg-accent text-accent-foreground"
                                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                              )}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 transition-colors",
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        <Separator />

        <div className="p-4">
          {user && (
            <>
              <div className="mb-3 flex flex-col gap-1">
                <div className="text-sm font-semibold">
                  {user.user_metadata.first_name || user.email}
                </div>
                <div className="text-xs text-muted-foreground">
                  {roles.length > 0 ? roles.join(', ') : 'Sem funções atribuídas'}
                </div>
              </div>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </Button>
            </>
          )}
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
