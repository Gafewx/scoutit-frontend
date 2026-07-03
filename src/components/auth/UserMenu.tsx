'use client';

import type { MenuProps } from 'antd';
import { Avatar, Dropdown } from 'antd';
import {
  CaretDownOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import type { User } from '@/types/user.types';

interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

/**
 * Profile avatar + dropdown menu shown in the Navbar after login.
 * Renders user initials in a blue avatar, with a dropdown containing
 * user info, My Orders, and Sign out.
 */
export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const router = useRouter();

  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();
  const fullName = `${user.firstName} ${user.lastName}`;

  const items: MenuProps['items'] = [
    {
      key: 'user-info',
      label: (
        <div style={{ padding: '4px 0', lineHeight: 1.45, minWidth: 172 }}>
          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 14 }}>
            {fullName}
          </div>
          <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>
            {user.email}
          </div>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'orders',
      icon: <ShoppingOutlined />,
      label: 'My Orders',
      onClick: () => router.push('/orders'),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign out',
      danger: true,
      onClick: () => {
        onLogout();
        router.push('/');
        router.refresh();
      },
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
    >
      <button
        id="user-menu-trigger"
        aria-label={`User menu for ${fullName}`}
        aria-haspopup="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          cursor: 'pointer',
          background: 'none',
          border: '1px solid #e2e8f0',
          borderRadius: 8,
          padding: '4px 10px 4px 5px',
          transition: 'border-color 0.18s, box-shadow 0.18s',
          outline: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#2563eb';
          e.currentTarget.style.boxShadow = '0 0 0 2px rgba(37,99,235,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Initials avatar */}
        <Avatar
          size={28}
          style={{
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.5px',
            flexShrink: 0,
            userSelect: 'none',
          }}
        >
          {initials}
        </Avatar>

        {/* First name */}
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#0f172a',
            lineHeight: 1,
            maxWidth: 80,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {user.firstName}
        </span>

        {/* Chevron */}
        <CaretDownOutlined style={{ fontSize: 10, color: '#94a3b8' }} />
      </button>
    </Dropdown>
  );
}
