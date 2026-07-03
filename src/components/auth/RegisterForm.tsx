'use client';

import { Form, Input, Button, Alert, Typography } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const { Title, Text } = Typography;

interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const [form] = Form.useForm<RegisterValues>();
  const { register, isLoading, error } = useAuth();

  async function onFinish(values: RegisterValues) {
    await register({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password,
    });
  }

  return (
    <div>
      {/* Heading */}
      <Title level={2} style={{ marginBottom: 4, color: '#0f172a', fontWeight: 700 }}>
        Create account
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Join ScoutIT and start shopping
      </Text>

      {/* API error banner */}
      {error && (
        <Alert
          type="error"
          message={error}
          showIcon
          style={{ marginBottom: 24, borderRadius: 10 }}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="large"
        requiredMark={false}
      >
        {/* First name + Last name — side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <Form.Item
            name="firstName"
            label="First name"
            rules={[{ required: true, message: 'Required.' }]}
          >
            <Input
              id="register-first-name"
              prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
              placeholder="John"
              autoComplete="given-name"
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last name"
            rules={[{ required: true, message: 'Required.' }]}
          >
            <Input
              id="register-last-name"
              prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
              placeholder="Doe"
              autoComplete="family-name"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Email is required.' },
            { type: 'email', message: 'Enter a valid email address.' },
          ]}
        >
          <Input
            id="register-email"
            prefix={<MailOutlined style={{ color: '#94a3b8' }} />}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Password is required.' },
            { min: 8, message: 'Password must be at least 8 characters.' },
          ]}
        >
          <Input.Password
            id="register-password"
            prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm password"
          dependencies={['password']}
          style={{ marginBottom: 28 }}
          rules={[
            { required: true, message: 'Please confirm your password.' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match.'));
              },
            }),
          ]}
        >
          <Input.Password
            id="register-confirm-password"
            prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
            placeholder="Repeat your password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 16 }}>
          <Button
            id="register-submit"
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            style={{ height: 44, fontWeight: 600, fontSize: 15 }}
          >
            Create account
          </Button>
        </Form.Item>
      </Form>

      <Text
        type="secondary"
        style={{ display: 'block', textAlign: 'center', fontSize: 14 }}
      >
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
        >
          Sign in
        </Link>
      </Text>
    </div>
  );
}
