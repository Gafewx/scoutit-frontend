'use client';

import { Form, Input, Button, Alert, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const { Title, Text } = Typography;

interface LoginFormProps {
  /** When provided (modal context): called on success instead of redirecting. */
  onSuccess?: () => void;
  /** Optional: link shown below the form. Useful to dismiss modal before navigating. */
  onNavigateToRegister?: () => void;
}

interface LoginValues {
  email: string;
  password: string;
}

export default function LoginForm({ onSuccess, onNavigateToRegister }: LoginFormProps) {
  const [form] = Form.useForm<LoginValues>();
  const { login, isLoading, error } = useAuth();

  async function onFinish(values: LoginValues) {
    await login(
      { email: values.email.trim(), password: values.password },
      { onSuccess }
    );
  }

  return (
    <div>
      {/* Heading */}
      <Title level={3} style={{ marginBottom: 4, color: '#0f172a', fontWeight: 700 }}>
        Sign in
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
        Welcome to ScoutIT
      </Text>

      {/* API error banner */}
      {error && (
        <Alert
          type="error"
          title={error}
          showIcon
          style={{ marginBottom: 20, borderRadius: 10 }}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="large"
        requiredMark={false}
      >
        <Form.Item
          name="email"
          label="Email"
          style={{ marginBottom: 12 }}
          rules={[
            { required: true, message: 'Email is required.' },
            { type: 'email', message: 'Enter a valid email address.' },
          ]}
        >
          <Input
            id="login-email"
            prefix={<MailOutlined style={{ color: '#94a3b8' }} />}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Password is required.' }]}
          style={{ marginBottom: 24 }}
        >
          <Input.Password
            id="login-password"
            prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 16 }}>
          <Button
            id="login-submit"
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            style={{ height: 44, fontWeight: 600, fontSize: 15 }}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>

      <Text
        type="secondary"
        style={{ display: 'block', textAlign: 'center', fontSize: 14 }}
      >
        No account?{' '}
        {onNavigateToRegister ? (
          <button
            type="button"
            onClick={onNavigateToRegister}
            className="text-blue-600 hover:text-blue-500 font-medium transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            Create
          </button>
        ) : (
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
          >
            Create
          </Link>
        )}
      </Text>
    </div>
  );
}
