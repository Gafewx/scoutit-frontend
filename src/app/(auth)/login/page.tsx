import { redirect } from 'next/navigation';

/**
 * Login is now a modal triggered from the Navbar.
 * Direct navigation to /login redirects to home.
 */
export default function LoginPage() {
  redirect('/');
}
