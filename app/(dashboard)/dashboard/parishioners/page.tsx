'use client';

import { useState, useMemo } from 'react';
import { useParishioners } from '@application/parishioners/use-parishioners.hook';
import { useCreateParishioner } from '@application/parishioners/use-create-parishioner.hook';
import { useUpdateParishioner } from '@application/parishioners/use-update-parishioner.hook';
import { useDeleteParishioner } from '@application/parishioners/use-delete-parishioner.hook';
import { Button, Badge, Spinner } from '@presentation/atoms';
import { Modal } from '@presentation/molecules/Modal';
import { ConfirmDialog } from '@presentation/molecules/ConfirmDialog';
import { EmptyState } from '@presentation/molecules/EmptyState';
import { ParishionerForm } from '@presentation/organisms/ParishionerForm/ParishionerForm';
import type { ParishionerFormValues } from '@presentation/organisms/ParishionerForm/parishioner-form.schema';

type ModalMode = { type: 'create' } | { type: 'edit'; id: string };

export default function ParishionersPage() {
  const { parishioners, loading } = useParishioners();
  const { createParishioner, loading: creating } = useCreateParishioner();
  const { updateParishioner, loading: updating } = useUpdateParishioner();
  const { deleteParishioner, loading: deleting } = useDeleteParishioner();

  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<ModalMode | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(
    () => parishioners.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [parishioners, search],
  );

  const editTarget = modal?.type === 'edit'
    ? parishioners.find(p => p.id === modal.id)
    : undefined;

  async function handleSubmit(values: ParishionerFormValues) {
    const input = {
      name: values.name,
      baptized: values.baptized,
      email: values.email || undefined,
      phone: values.phone || undefined,
      address: values.address || undefined,
    };
    if (modal?.type === 'create') {
      await createParishioner(input);
    } else if (modal?.type === 'edit') {
      await updateParishioner(modal.id, input);
    }
    setModal(null);
  }

  async function handleDelete() {
    if (!deleteId) return;
    await deleteParishioner(deleteId);
    setDeleteId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Feligreses</h1>
        <Button onClick={() => setModal({ type: 'create' })}>+ Nuevo feligrés</Button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title={search ? 'Sin resultados' : 'Sin feligreses'}
          description={search ? 'No hay feligreses que coincidan con la búsqueda.' : 'Agrega el primer feligrés para comenzar.'}
          action={!search && <Button onClick={() => setModal({ type: 'create' })}>+ Nuevo feligrés</Button>}
        />
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Nombre', 'Email', 'Teléfono', 'Bautizado', 'Acciones'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                  <td className="px-4 py-3 text-gray-500">{p.email ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{p.phone ?? '—'}</td>
                  <td className="px-4 py-3">
                    <Badge variant={p.baptized ? 'green' : 'gray'}>
                      {p.baptized ? 'Sí' : 'No'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setModal({ type: 'edit', id: p.id })}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modal !== null}
        title={modal?.type === 'create' ? 'Nuevo feligrés' : 'Editar feligrés'}
        onClose={() => setModal(null)}
      >
        <ParishionerForm
          defaultValues={editTarget ? {
            name: editTarget.name,
            email: editTarget.email ?? '',
            phone: editTarget.phone ?? '',
            address: editTarget.address ?? '',
            baptized: editTarget.baptized,
          } : undefined}
          onSubmit={handleSubmit}
          onCancel={() => setModal(null)}
          loading={creating || updating}
          submitLabel={modal?.type === 'create' ? 'Crear' : 'Actualizar'}
        />
      </Modal>

      <ConfirmDialog
        open={deleteId !== null}
        title="¿Eliminar feligrés?"
        description="Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
