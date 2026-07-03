'use client';

import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * AntD Modal wrapping the LoginForm.
 * On successful login:  closes the modal and refreshes server data.
 * "Create one" link:   closes the modal, then navigates to /register.
 */
export default function LoginModal({ open, onClose }: LoginModalProps) {
  const router = useRouter();

  function handleSuccess() {
    onClose();
    // Notify useUser hook in Navbar (and anywhere else) that auth state changed
    window.dispatchEvent(new Event('auth-change'));
    router.refresh();
  }

  function handleNavigateToRegister() {
    onClose();
    router.push('/register');
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={440}
      centered
      destroyOnHidden
      styles={{
        body: { borderRadius: 16, padding: '36px 36px 28px' },
        mask: { backdropFilter: 'blur(4px)' },
      }}
    >
      {/* ScoutIT wordmark inside modal */}
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.3px' }}>
          Scout<span style={{ color: '#2563eb' }}>IT</span>
        </span>
      </div>

      <LoginForm
        onSuccess={handleSuccess}
        onNavigateToRegister={handleNavigateToRegister}
      />
    </Modal>
  );
}
