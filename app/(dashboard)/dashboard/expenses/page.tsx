'use client';

import { useState } from 'react';
import { useExpenses } from '@application/expenses/use-expenses.hook';
import { useCreateExpense } from '@application/expenses/use-create-expense.hook';
import { Button, Spinner } from '@presentation/atoms';
import { Modal } from '@presentation/molecules/Modal';
import { EmptyState } from '@presentation/molecules/EmptyState';
import { ExpenseForm } from '@presentation/organisms/ExpenseForm/ExpenseForm';
import type { ExpenseFormValues } from '@presentation/organisms/ExpenseForm/expense-form.schema';

const FUND_LABELS: Record<string, string> = {
  TITHE: 'Fondo Diezmo',
  NON_TITHE: 'Fondo General',
};

export default function ExpensesPage() {
  const { expenses, loading } = useExpenses();
  const { createExpense, loading: creating } = useCreateExpense();

  const [modalOpen, setModalOpen] = useState(false);

  async function handleSubmit(values: ExpenseFormValues) {
    await createExpense(
      {
        description: values.description,
        amount: values.amount,
        date: values.date,
        category: values.category,
        fundSource: values.fundSource,
      },
      'admin',
    );
    setModalOpen(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Egresos</h1>
        <Button onClick={() => setModalOpen(true)}>+ Registrar egreso</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : expenses.length === 0 ? (
        <EmptyState
          title="Sin egresos"
          description="Registra el primer egreso para comenzar."
          action={<Button onClick={() => setModalOpen(true)}>+ Registrar egreso</Button>}
        />
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Descripción', 'Monto', 'Fecha', 'Categoría', 'Fondo', 'Creado por'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {expenses.map(expense => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{expense.description}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {Number(expense.amount).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(expense.date as string).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{expense.category}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {FUND_LABELS[expense.fundSource] ?? expense.fundSource}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{expense.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modalOpen}
        title="Registrar egreso"
        onClose={() => setModalOpen(false)}
      >
        <ExpenseForm
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={creating}
          submitLabel="Registrar"
        />
      </Modal>
    </div>
  );
}
