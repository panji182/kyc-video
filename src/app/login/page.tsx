import React from 'react';
import dynamic from 'next/dynamic';
import { Users } from '@/types/organisms/login';

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
        password:
          '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', //admin123
        role: Roles.admin,
      },
      {
        username: 'operator',
        password:
          'ec6e1c25258002eb1c67d15c7f45da7945fa4c58778fd7d88faa5e53e3b4698d', //operator123
        role: Roles.operator,
      },
      {
        username: 'reporter',
        password:
          '5425d6707b807e1b4775d67b8a95391407feccccf7d8fb670486c269119a5114', //reporter123
        role: Roles.reporter,
      },
    ]);
  });
  const usersLogin: Users[] = await usersPromise;

  return (
    <AuthLayout>
      <LoginForm users={usersLogin} secretKey={process.env.SECRET_KEY || ''} />
    </AuthLayout>
  );
};

export default Login;
