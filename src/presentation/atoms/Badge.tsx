import { clsx } from 'clsx';

type BadgeVariant = 'green' | 'gray' | 'red' | 'blue' | 'orange';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-600',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
    orange: 'bg-orange-100 text-orange-700',
  };
  return (
    <span className={clsx('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium', variants[variant])}>
      {children}
    </span>
  );
}
