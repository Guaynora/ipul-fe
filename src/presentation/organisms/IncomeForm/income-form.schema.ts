import { z } from 'zod';

export const incomeSchema = z.object({
  type: z.enum(['OFFERING', 'TITHE', 'SALE_OTHER']),
  amount: z.string().min(1, 'Monto requerido'),
  date: z.string().min(1, 'Fecha requerida'),
  description: z.string().optional(),
  parishionerId: z.string().optional(),
}).refine(data => data.type !== 'TITHE' || !!data.parishionerId, {
  message: 'El feligrés es requerido para diezmos',
  path: ['parishionerId'],
});

export type IncomeFormValues = z.infer<typeof incomeSchema>;
