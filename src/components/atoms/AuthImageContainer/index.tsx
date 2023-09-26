'use client';

import Image from 'next/image';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { toRem } from '@/helpers/globalFunctions';

const BoxStyled = styled(Box)(({ theme }) => ({
  width: '480px',
  height: '400px',
  marginRight: toRem(48),
  '& img': {
    position: 'static !important',
  },

  [theme.breakpoints.down('md')]: {
    width: 'auto',
    marginRight: 0,
  },
}));

const AuthImageContainer = () => {
  return (
    <BoxStyled>
      <Image fill src="/assets/images/login-image.png" alt="login image" />
    </BoxStyled>
  );
};

export default AuthImageContainer;
