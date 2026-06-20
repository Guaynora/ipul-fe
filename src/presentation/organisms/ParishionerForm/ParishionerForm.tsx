'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@presentation/atoms';
import { parishionerSchema, type ParishionerFormValues } from './parishioner-form.schema';

interface ParishionerFormProps {
  defaultValues?: Partial<ParishionerFormValues>;
  onSubmit: (values: ParishionerFormValues) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  submitLabel?: string;
}

export function ParishionerForm({ defaultValues, onSubmit, onCancel, loading, submitLabel = 'Guardar' }: ParishionerFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ParishionerFormValues>({
    resolver: zodResolver(parishionerSchema),
    defaultValues: { baptized: false, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nombre *"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Teléfono"
        {...register('phone')}
      />
      <Input
        label="Dirección"
        {...register('address')}
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="baptized"
          className="h-4 w-4 rounded border-gray-300 text-blue-600"
          {...register('baptized')}
        />
        <label htmlFor="baptized" className="text-sm font-medium text-gray-700">Bautizado</label>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>Cancelar</Button>
        <Button type="submit" loading={loading}>{submitLabel}</Button>
      </div>
    </form>
  );
}
