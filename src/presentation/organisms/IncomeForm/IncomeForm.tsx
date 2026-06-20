'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@presentation/atoms';
import { incomeSchema, type IncomeFormValues } from './income-form.schema';

interface Parishioner {
  id: string;
  name: string;
}

interface IncomeFormProps {
  defaultValues?: Partial<IncomeFormValues>;
  onSubmit: (values: IncomeFormValues) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  submitLabel?: string;
  parishioners: Parishioner[];
}

const TYPE_LABELS: Record<string, string> = {
  OFFERING: 'Ofrenda',
  TITHE: 'Diezmo',
  SALE_OTHER: 'Venta',
};

export function IncomeForm({
  defaultValues,
  onSubmit,
  onCancel,
  loading,
  submitLabel = 'Guardar',
  parishioners,
}: IncomeFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeSchema),
    defaultValues: { type: 'OFFERING', ...defaultValues },
  });

  const selectedType = useWatch({ control, name: 'type' });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Tipo *</label>
        <select
          {...register('type')}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.type && <p className="text-red-500 text-xs">{errors.type.message}</p>}
      </div>

      {selectedType === 'TITHE' && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Feligrés *</label>
          <select
            {...register('parishionerId')}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar feligrés...</option>
            {parishioners.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          {errors.parishionerId && (
            <p className="text-red-500 text-xs">{errors.parishionerId.message}</p>
          )}
        </div>
      )}

      <Input
        label="Monto *"
        type="number"
        step="0.01"
        min="0"
        error={errors.amount?.message}
        {...register('amount')}
      />

      <Input
        label="Fecha *"
        type="date"
        error={errors.date?.message}
        {...register('date')}
      />

      <Input
        label="Descripción"
        error={errors.description?.message}
        {...register('description')}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>{submitLabel}</Button>
      </div>
    </form>
  );
}
