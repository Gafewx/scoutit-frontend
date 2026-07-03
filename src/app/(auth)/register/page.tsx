import type { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a ScoutIT account to start shopping for IT equipment and accessories.',
};

/**
 * Register page — server component.
 * Delegates all form logic to the client RegisterForm component.
 */
export default function RegisterPage() {
  return <RegisterForm />;
}
