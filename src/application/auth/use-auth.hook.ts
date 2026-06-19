'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginRequest, logoutRequest } from '@infrastructure/auth/auth.client';
import { useAuthContext } from './auth.context';

export function useAuth() {
  const router = useRouter();
  const { setUserEmail } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      await loginRequest(email, password);
      setUserEmail(email);
      router.push('/dashboard');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await logoutRequest();
    setUserEmail(null);
    router.push('/login');
  }

  return { login, logout, loading, error };
}
