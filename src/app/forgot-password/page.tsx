import React from 'react';
import dynamic from 'next/dynamic';
const AuthLayout = dynamic(
  () => import('@/components/template/Layouts/AuthLayout')
);
const ForgotPasswordForm = dynamic(
  () => import('@/components/organisms/ForgotPasswordForm')
);

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
