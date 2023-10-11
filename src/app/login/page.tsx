import React from 'react';
import dynamic from 'next/dynamic';
import { Users } from '@/types/organisms/login';
import { secretKeyPromise } from '@/app/helpers/globalFunctions';

import { Roles } from '@/consts';

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
        role: Roles.admin,
      },
      {
        username: 'operator',
        password: 'operator123',
        role: Roles.operator,
      },
      {
        username: 'reporter',
        password: 'reporter123',
        role: Roles.reporter,
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
