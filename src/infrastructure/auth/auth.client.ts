export async function loginRequest(
  email: string,
  password: string,
): Promise<void> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error((error as { message?: string }).message ?? 'Credenciales incorrectas');
  }
}

export async function logoutRequest(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' });
}
