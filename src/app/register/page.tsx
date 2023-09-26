import React from 'react';
import dynamic from 'next/dynamic';

const AuthLayout = dynamic(
  () => import('@/components/template/Layouts/AuthLayout')
);
const RegisterForm = dynamic(
  () => import('@/components/organisms/RegisterForm')
);

const Register = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
