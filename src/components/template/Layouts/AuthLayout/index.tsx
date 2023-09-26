'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';

const AuthImageContainer = dynamic(
  () => import('@/components/atoms/AuthImageContainer')
);

import styles, { AuthFormContainer } from './index.styles';

type Props = {
  children: JSX.Element;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
      justifyContent={'center'}
      alignItems={'center'}
      sx={styles.container}
    >
      <AuthImageContainer />
      <AuthFormContainer>{children}</AuthFormContainer>
    </Stack>
  );
};

export default AuthLayout;
