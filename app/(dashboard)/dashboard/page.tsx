'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Scale, Users } from 'lucide-react';
import { Spinner } from '@presentation/atoms';
import { useIncomes } from '@application/incomes/use-incomes.hook';
import { useExpenses } from '@application/expenses/use-expenses.hook';
import { useParishioners } from '@application/parishioners/use-parishioners.hook';
import { useBalanceReport } from '@application/reports/use-balance-report.hook';

const fmt = (n: string | number) =>
  Number(n).toLocaleString('es-ES', { style: 'currency', currency: 'USD' });

const FUND_LABELS: Record<string, string> = {
  TITHE: 'Fondo Diezmo',
  NON_TITHE: 'Fondo General',
};

export default function DashboardPage() {
  const { incomes, loading: loadingIncomes } = useIncomes();
  const { expenses, loading: loadingExpenses } = useExpenses();
  const { parishioners, loading: loadingParishioners } = useParishioners();
  const { report: balanceReport, loading: loadingBalance } = useBalanceReport();

  const isLoading =
    loadingIncomes || loadingExpenses || loadingParishioners || loadingBalance;

  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const netBalance = totalIncome - totalExpense;

  const chartData =
    balanceReport?.byFund.map((item) => ({
      fund: FUND_LABELS[item.fund] ?? item.fund,
      totalIncome: Number(item.totalIncome),
      totalExpense: Number(item.totalExpense),
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Widgets */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* Total Ingresos */}
        <div className="flex flex-col gap-2 rounded-lg bg-white p-5 shadow">
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium text-gray-500">Total Ingresos</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{fmt(totalIncome)}</p>
        </div>

        {/* Total Egresos */}
        <div className="flex flex-col gap-2 rounded-lg bg-white p-5 shadow">
          <div className="flex items-center gap-2 text-red-600">
            <TrendingDown className="h-5 w-5" />
            <span className="text-sm font-medium text-gray-500">Total Egresos</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{fmt(totalExpense)}</p>
        </div>

        {/* Balance Neto */}
        <div className="flex flex-col gap-2 rounded-lg bg-white p-5 shadow">
          <div className={`flex items-center gap-2 ${netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            <Scale className="h-5 w-5" />
            <span className="text-sm font-medium text-gray-500">Balance Neto</span>
          </div>
          <p
            className={`text-2xl font-bold ${
              netBalance >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}
          >
            {fmt(netBalance)}
          </p>
        </div>

        {/* Feligreses */}
        <div className="flex flex-col gap-2 rounded-lg bg-white p-5 shadow">
          <div className="flex items-center gap-2 text-indigo-600">
            <Users className="h-5 w-5" />
            <span className="text-sm font-medium text-gray-500">Feligreses</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{parishioners.length}</p>
        </div>
      </div>

      {/* Balance by fund chart */}
      {chartData.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Ingresos vs. Egresos por fondo
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="fund" tick={{ fontSize: 13 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => (value != null ? fmt(value as string | number) : '')} />
              <Legend />
              <Bar dataKey="totalIncome" name="Ingresos" fill="#10b981" />
              <Bar dataKey="totalExpense" name="Egresos" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
