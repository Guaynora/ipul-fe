'use client';

import { use } from 'react';
import Link from 'next/link';
import { useParishioner } from '@application/parishioners/use-parishioner.hook';
import { Badge, Spinner, Button } from '@presentation/atoms';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ParishionerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { parishioner, loading } = useParishioner(id);

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>;
  if (!parishioner) return (
    <div className="text-center py-16">
      <p className="text-gray-500 mb-4">Feligrés no encontrado.</p>
      <Link href="/dashboard/parishioners"><Button variant="secondary">Volver</Button></Link>
    </div>
  );

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/parishioners" className="text-sm text-gray-500 hover:text-gray-700">← Feligreses</Link>
      </div>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h1 className="text-xl font-bold text-gray-900">{parishioner.name}</h1>
          <Badge variant={parishioner.baptized ? 'green' : 'gray'}>
            {parishioner.baptized ? 'Bautizado' : 'No bautizado'}
          </Badge>
        </div>
        {[
          { label: 'Email', value: parishioner.email },
          { label: 'Teléfono', value: parishioner.phone },
          { label: 'Dirección', value: parishioner.address },
          { label: 'Registrado', value: format(new Date(parishioner.createdAt as string), 'dd/MM/yyyy', { locale: es }) },
        ].map(({ label, value }) => value ? (
          <div key={label}>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
            <p className="text-sm text-gray-900 mt-0.5">{value}</p>
          </div>
        ) : null)}
      </div>
    </div>
  );
}
