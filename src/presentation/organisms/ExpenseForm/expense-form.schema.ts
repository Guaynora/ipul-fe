import { z } from 'zod';

export const expenseSchema = z.object({
  description: z.string().min(1, 'Descripción requerida'),
  amount: z.string().min(1, 'Monto requerido'),
  date: z.string().min(1, 'Fecha requerida'),
  category: z.string().min(1, 'Categoría requerida'),
  fundSource: z.enum(['TITHE', 'NON_TITHE']),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
