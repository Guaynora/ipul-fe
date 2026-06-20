import { z } from 'zod';

export const parishionerSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  baptized: z.boolean(),
});

export type ParishionerFormValues = z.infer<typeof parishionerSchema>;
