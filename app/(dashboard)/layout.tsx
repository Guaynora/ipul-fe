'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  TrendingDown,
  Percent,
  BarChart,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@application/auth/use-auth.hook';
import { useAuthContext } from '@application/auth/auth.context';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/parishioners', label: 'Feligreses', icon: Users },
  { href: '/dashboard/incomes', label: 'Ingresos', icon: TrendingUp },
  { href: '/dashboard/expenses', label: 'Egresos', icon: TrendingDown },
  { href: '/dashboard/tithe-discounts', label: 'Descuentos', icon: Percent },
  { href: '/dashboard/reports', label: 'Reportes', icon: BarChart },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { userEmail } = useAuthContext();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-sm flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">IPUL</h1>
          <p className="text-xs text-gray-500 mt-1">Administración</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== '/dashboard' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          {userEmail && (
            <p className="text-xs text-gray-500 mb-3 truncate">{userEmail}</p>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors w-full"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
