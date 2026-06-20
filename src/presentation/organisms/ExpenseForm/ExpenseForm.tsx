'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@presentation/atoms';
import { expenseSchema, type ExpenseFormValues } from './expense-form.schema';

interface ExpenseFormProps {
  defaultValues?: Partial<ExpenseFormValues>;
  onSubmit: (values: ExpenseFormValues) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  submitLabel?: string;
}

const FUND_LABELS: Record<string, string> = {
  TITHE: 'Fondo Diezmo',
  NON_TITHE: 'Fondo General',
};

export function ExpenseForm({
  defaultValues,
  onSubmit,
  onCancel,
  loading,
  submitLabel = 'Guardar',
}: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { fundSource: 'NON_TITHE', ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Descripción *"
        error={errors.description?.message}
        {...register('description')}
      />

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
        label="Categoría *"
        error={errors.category?.message}
        {...register('category')}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Fondo *</label>
        <select
          {...register('fundSource')}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(FUND_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.fundSource && <p className="text-red-500 text-xs">{errors.fundSource.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>{submitLabel}</Button>
      </div>
    </form>
  );
}
