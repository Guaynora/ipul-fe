'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@presentation/atoms';
import { titheDiscountSchema, type TitheDiscountFormValues } from './tithe-discount-form.schema';

interface TitheDiscountFormProps {
  defaultValues?: Partial<TitheDiscountFormValues>;
  onSubmit: (values: TitheDiscountFormValues) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function TitheDiscountForm({
  defaultValues,
  onSubmit,
  onCancel,
  loading,
}: TitheDiscountFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TitheDiscountFormValues>({
    resolver: zodResolver(titheDiscountSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Vigente desde *"
        type="date"
        error={errors.effectiveFrom?.message}
        {...register('effectiveFrom')}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Reglas *</label>
        <textarea
          {...register('rules')}
          rows={5}
          placeholder="Describe las reglas de descuento de diezmo..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
        {errors.rules && <p className="text-red-500 text-xs">{errors.rules.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>Guardar</Button>
      </div>
    </form>
  );
}
