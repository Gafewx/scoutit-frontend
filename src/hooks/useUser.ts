'use client';

import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth.service';
import type { User } from '@/types/user.types';

/**
 * Fetches the current user from the API using the stored access_token.
 * Listens for the custom `auth-change` event so the Navbar updates
 * immediately after login or logout — without needing a page reload.
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await authService.me();
      setUser(res.data);
    } catch {
      // Token is invalid or expired — clear it silently
      authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    window.addEventListener('auth-change', fetchUser);
    return () => window.removeEventListener('auth-change', fetchUser);
  }, [fetchUser]);

  function logout() {
    authService.logout();
    setUser(null);
    // Notify all components listening for auth-change (e.g. Navbar)
    window.dispatchEvent(new Event('auth-change'));
  }

  return { user, loading, logout };
}
