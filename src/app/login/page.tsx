import React from 'react';
import dynamic from 'next/dynamic';

const AuthLayout = dynamic(
  () => import('@/components/template/Layouts/AuthLayout')
);
const LoginForm = dynamic(() => import('@/components/organisms/LoginForm'));

const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
