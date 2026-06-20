'use client';

import { useState } from 'react';
import { useIncomes } from '@application/incomes/use-incomes.hook';
import { useCreateIncome } from '@application/incomes/use-create-income.hook';
import { useParishioners } from '@application/parishioners/use-parishioners.hook';
import { Button, Spinner } from '@presentation/atoms';
import { Modal } from '@presentation/molecules/Modal';
import { EmptyState } from '@presentation/molecules/EmptyState';
import { IncomeForm } from '@presentation/organisms/IncomeForm/IncomeForm';
import type { IncomeFormValues } from '@presentation/organisms/IncomeForm/income-form.schema';

const TYPE_LABELS: Record<string, string> = {
  OFFERING: 'Ofrenda',
  TITHE: 'Diezmo',
  SALE_OTHER: 'Venta',
};

export default function IncomesPage() {
  const { incomes, loading } = useIncomes();
  const { createIncome, loading: creating } = useCreateIncome();
  const { parishioners } = useParishioners();

  const [modalOpen, setModalOpen] = useState(false);

  async function handleSubmit(values: IncomeFormValues) {
    await createIncome(
      {
        type: values.type,
        amount: values.amount,
        date: values.date,
        description: values.description || undefined,
        parishionerId: values.parishionerId || undefined,
      },
      'admin',
    );
    setModalOpen(false);
  }

  const parishionerMap = Object.fromEntries(parishioners.map(p => [p.id, p.name]));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ingresos</h1>
        <Button onClick={() => setModalOpen(true)}>+ Registrar ingreso</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : incomes.length === 0 ? (
        <EmptyState
          title="Sin ingresos"
          description="Registra el primer ingreso para comenzar."
          action={<Button onClick={() => setModalOpen(true)}>+ Registrar ingreso</Button>}
        />
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Tipo', 'Monto', 'Fecha', 'Descripción', 'Feligrés', 'Creado por'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {incomes.map(income => (
                <tr key={income.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {TYPE_LABELS[income.type] ?? income.type}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {Number(income.amount).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(income.date as string).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{income.description ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {income.parishionerId ? (parishionerMap[income.parishionerId] ?? income.parishionerId) : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{income.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modalOpen}
        title="Registrar ingreso"
        onClose={() => setModalOpen(false)}
      >
        <IncomeForm
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={creating}
          submitLabel="Registrar"
          parishioners={parishioners.map(p => ({ id: p.id, name: p.name }))}
        />
      </Modal>
    </div>
  );
}
