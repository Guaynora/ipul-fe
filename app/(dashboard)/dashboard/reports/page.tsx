'use client';

import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button, Spinner } from '@presentation/atoms';
import { useIncomeReport } from '@application/reports/use-income-report.hook';
import { useExpenseReport } from '@application/reports/use-expense-report.hook';
import { useBalanceReport } from '@application/reports/use-balance-report.hook';
import type { ReportFilter } from '@domain/report.entity';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

const INCOME_TYPE_LABELS: Record<string, string> = {
  OFFERING: 'Ofrenda',
  TITHE: 'Diezmo',
  SALE_OTHER: 'Venta',
};

const FUND_LABELS: Record<string, string> = {
  TITHE: 'Fondo Diezmo',
  NON_TITHE: 'Fondo General',
};

const fmt = (n: string | number) =>
  Number(n).toLocaleString('es-ES', { style: 'currency', currency: 'USD' });

export default function ReportsPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [filter, setFilter] = useState<ReportFilter | undefined>(undefined);

  const { report: incomeReport, loading: loadingIncome } = useIncomeReport(filter);
  const { report: expenseReport, loading: loadingExpense } = useExpenseReport(filter);
  const { report: balanceReport, loading: loadingBalance } = useBalanceReport(filter);

  const isLoading = loadingIncome || loadingExpense || loadingBalance;

  function handleFilter() {
    const nextFilter: ReportFilter = {};
    if (from) nextFilter.from = from;
    if (to) nextFilter.to = to;
    setFilter(Object.keys(nextFilter).length > 0 ? nextFilter : undefined);
  }

  const pieData =
    incomeReport?.byType.map((item) => ({
      name: INCOME_TYPE_LABELS[item.type] ?? item.type,
      value: Number(item.total),
    })) ?? [];

  const barCategoryData =
    expenseReport?.byCategory.map((item) => ({
      category: item.category,
      total: Number(item.total),
    })) ?? [];

  const balanceFundData =
    balanceReport?.byFund.map((item) => ({
      fund: FUND_LABELS[item.fund] ?? item.fund,
      totalIncome: Number(item.totalIncome),
      totalExpense: Number(item.totalExpense),
      net: Number(item.net),
    })) ?? [];

  const netBalance = Number(balanceReport?.netBalance ?? 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>

      {/* Date filter */}
      <div className="flex flex-wrap items-end gap-4 rounded-lg bg-white p-4 shadow">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="from">
            Desde
          </label>
          <input
            id="from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="to">
            Hasta
          </label>
          <input
            id="to"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <Button onClick={handleFilter}>Filtrar</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Section 1 — Ingresos */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Ingresos</h2>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-3xl font-bold text-indigo-600">
                {fmt(incomeReport?.grandTotal ?? 0)}
              </p>
            </div>
            {pieData.length > 0 && (
              <div className="rounded-lg bg-white p-4 shadow">
                <p className="mb-2 text-sm font-medium text-gray-700">Por tipo</p>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ name, percent }: { name?: string; percent?: number }) =>
                        `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`
                      }
                    >
                      {pieData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => (value != null ? fmt(value as string | number) : '')} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>

          {/* Section 2 — Egresos */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Egresos</h2>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-3xl font-bold text-red-600">
                {fmt(expenseReport?.grandTotal ?? 0)}
              </p>
            </div>
            {/* By fund stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {expenseReport?.byFund.map((item) => (
                <div key={item.fundSource} className="rounded-lg bg-white p-4 shadow">
                  <p className="text-sm text-gray-500">
                    {FUND_LABELS[item.fundSource] ?? item.fundSource}
                  </p>
                  <p className="text-2xl font-bold text-gray-800">{fmt(item.total)}</p>
                </div>
              ))}
            </div>
            {/* Bar chart by category */}
            {barCategoryData.length > 0 && (
              <div className="rounded-lg bg-white p-4 shadow">
                <p className="mb-2 text-sm font-medium text-gray-700">Por categoría</p>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barCategoryData}>
                    <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => (value != null ? fmt(value as string | number) : '')} />
                    <Bar dataKey="total" name="Total" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>

          {/* Section 3 — Balance */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Balance</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-white p-4 shadow">
                <p className="text-sm text-gray-500">Total Ingresos</p>
                <p className="text-2xl font-bold text-green-600">
                  {fmt(balanceReport?.totalIncome ?? 0)}
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <p className="text-sm text-gray-500">Total Egresos</p>
                <p className="text-2xl font-bold text-red-600">
                  {fmt(balanceReport?.totalExpense ?? 0)}
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <p className="text-sm text-gray-500">Balance Neto</p>
                <p
                  className={`text-2xl font-bold ${
                    netBalance >= 0 ? 'text-blue-600' : 'text-red-600'
                  }`}
                >
                  {fmt(balanceReport?.netBalance ?? 0)}
                </p>
              </div>
            </div>

            {/* By fund table */}
            {balanceFundData.length > 0 && (
              <div className="overflow-x-auto rounded-lg bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Fondo', 'Ingresos', 'Egresos', 'Neto'].map((col) => (
                        <th
                          key={col}
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {balanceFundData.map((row) => (
                      <tr key={row.fund}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {row.fund}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-green-600">
                          {fmt(row.totalIncome)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-red-600">
                          {fmt(row.totalExpense)}
                        </td>
                        <td
                          className={`whitespace-nowrap px-6 py-4 text-sm font-semibold ${
                            row.net >= 0 ? 'text-blue-600' : 'text-red-600'
                          }`}
                        >
                          {fmt(row.net)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
