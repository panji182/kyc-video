import React from 'react';
import dynamic from 'next/dynamic';
import { Users } from '@/types/organisms/login';
import { secretKeyPromise } from '@/app/helpers/globalFunctions';

const AuthLayout = dynamic(
  () => import('@/components/template/Layouts/AuthLayout')
);
const LoginForm = dynamic(() => import('@/components/organisms/LoginForm'));

const Login = async () => {
  const usersPromise = new Promise<Users[]>(myResolve => {
    myResolve([
      {
        username: 'admin',
        password: 'admin123',
        role: 'Administrator',
      },
      {
        username: 'operator',
        password: 'operator123',
        role: 'Operation',
      },
      {
        username: 'reporter',
        password: 'reporter123',
        role: 'Reporting',
      },
    ]);
  });
  const usersLogin: Users[] = await usersPromise;
  const secretKey = await secretKeyPromise;

  return (
    <AuthLayout>
      <LoginForm users={usersLogin} secretKey={secretKey} />
    </AuthLayout>
  );
};

export default Login;
