interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ size = 'md' }: SpinnerProps) {
  const sizes = { sm: 'h-3 w-3', md: 'h-5 w-5', lg: 'h-8 w-8' };
  return (
    <span
      data-testid="spinner"
      className={`animate-spin rounded-full border-2 border-current border-t-transparent ${sizes[size]}`}
    />
  );
}
