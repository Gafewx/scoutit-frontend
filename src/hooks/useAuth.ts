'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import type { LoginPayload, RegisterPayload } from '@/types/user.types';

interface LoginOptions {
  /** Called after a successful login instead of redirecting to '/'. */
  onSuccess?: () => void;
}

/**
 * Encapsulates auth API calls, loading state, and error state.
 *
 * login() accepts an optional `onSuccess` callback:
 *  - When provided (modal context) → calls it on success, no page redirect.
 *  - When omitted (standalone page)  → redirects to '/'.
 */
export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(payload: LoginPayload, options?: LoginOptions): Promise<boolean> {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login(payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', res.data.accessToken);
      }
      if (options?.onSuccess) {
        options.onSuccess();
      } else {
        router.push('/');
      }
      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Sign in failed. Please check your credentials and try again.'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function register(payload: RegisterPayload): Promise<boolean> {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register(payload);
      // Redirect to home — user will sign in via the Navbar modal
      router.push('/');
      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Registration failed. Please try again.'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  return { login, register, isLoading, error, clearError };
}
