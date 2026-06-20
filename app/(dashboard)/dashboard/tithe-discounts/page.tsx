'use client';

import { useState } from 'react';
import { useTitheDiscounts } from '@application/tithe-discounts/use-tithe-discounts.hook';
import { useCreateTitheDiscount } from '@application/tithe-discounts/use-create-tithe-discount.hook';
import { useActivateTitheDiscount } from '@application/tithe-discounts/use-activate-tithe-discount.hook';
import { Button, Badge, Spinner } from '@presentation/atoms';
import { Modal } from '@presentation/molecules/Modal';
import { EmptyState } from '@presentation/molecules/EmptyState';
import { TitheDiscountForm } from '@presentation/organisms/TitheDiscountForm/TitheDiscountForm';
import type { TitheDiscountFormValues } from '@presentation/organisms/TitheDiscountForm/tithe-discount-form.schema';
import type { DiscountStatus } from '@domain/tithe-discount.entity';

const STATUS_LABELS: Record<DiscountStatus, string> = {
  ACTIVE: 'Activo',
  DRAFT: 'Borrador',
  RETIRED: 'Retirado',
};

const STATUS_BADGE: Record<DiscountStatus, 'green' | 'gray'> = {
  ACTIVE: 'green',
  DRAFT: 'gray',
  RETIRED: 'gray',
};

export default function TitheDiscountsPage() {
  const { titheDiscounts, loading } = useTitheDiscounts();
  const { createTitheDiscount, loading: creating } = useCreateTitheDiscount();
  const { activateTitheDiscount, loading: activating } = useActivateTitheDiscount();

  const [modalOpen, setModalOpen] = useState(false);

  async function handleSubmit(values: TitheDiscountFormValues) {
    await createTitheDiscount(
      {
        effectiveFrom: values.effectiveFrom,
        rules: values.rules,
      },
      'admin',
    );
    setModalOpen(false);
  }

  async function handleActivate(id: string) {
    await activateTitheDiscount(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Descuentos de Diezmo</h1>
        <Button onClick={() => setModalOpen(true)}>+ Nueva versión</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : titheDiscounts.length === 0 ? (
        <EmptyState
          title="Sin versiones"
          description="Crea la primera versión de descuentos de diezmo."
          action={<Button onClick={() => setModalOpen(true)}>+ Nueva versión</Button>}
        />
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Versión', 'Estado', 'Vigente desde', 'Reglas', 'Creado por', 'Creado el', 'Acciones'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {titheDiscounts.map(td => (
                <tr key={td.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">v{td.version}</td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_BADGE[td.status]}>
                      {STATUS_LABELS[td.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(td.effectiveFrom as string).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate" title={td.rules}>
                    {td.rules}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{td.createdBy}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(td.createdAt as string).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3">
                    {td.status === 'DRAFT' && (
                      <button
                        onClick={() => handleActivate(td.id)}
                        disabled={activating}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium disabled:opacity-50"
                      >
                        Activar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modalOpen}
        title="Nueva versión de descuento"
        onClose={() => setModalOpen(false)}
      >
        <TitheDiscountForm
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={creating}
        />
      </Modal>
    </div>
  );
}
