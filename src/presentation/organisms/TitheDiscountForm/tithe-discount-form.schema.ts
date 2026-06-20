import { z } from 'zod';

export const titheDiscountSchema = z.object({
  effectiveFrom: z.string().min(1, 'Fecha requerida'),
  rules: z.string().min(1, 'Las reglas son requeridas'),
});

export type TitheDiscountFormValues = z.infer<typeof titheDiscountSchema>;
