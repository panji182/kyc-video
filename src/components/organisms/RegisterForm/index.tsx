'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { toEm, toRem } from '@/helpers/globalFunctions';

import { registerForm } from '@/types/organisms/register';

import styles, { LoginButton } from './index.styles';

const initRegisterForm: registerForm = {
  fullName: '',
  username: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const [registerForm, setRegisterForm] =
    useState<registerForm>(initRegisterForm);

  const handleInputForm = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    setRegisterForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateAccount = () => {
    alert('Account created !');
  };

  return (
    <Stack justifyContent={'center'} sx={{ height: '100vh' }}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            color: '#fff',
            marginTop: toRem(32),
            marginBottom: toRem(48),
            fontWeight: 600,
            fontSize: toEm(40),
          }}
        >
          Register to KYC
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            marginBottom: toRem(16),
          }}
        >
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <FormControl
              sx={{
                width: '100%',
              }}
            >
              <FormLabel sx={styles.label}>Full Name</FormLabel>
              <TextField
                fullWidth
                name={'fullname'}
                value={registerForm.fullName}
                onChange={e => handleInputForm(e)}
                sx={styles.textInput}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <FormControl
              sx={{
                width: '100%',
              }}
            >
              <FormLabel sx={styles.label}>Username</FormLabel>
              <TextField
                fullWidth
                name={'username'}
                value={registerForm.username}
                onChange={e => handleInputForm(e)}
                sx={styles.textInput}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl
          sx={{
            width: '100%',
            marginBottom: toRem(16),
          }}
        >
          <FormLabel sx={styles.label}>Email</FormLabel>
          <TextField
            fullWidth
            name={'email'}
            value={registerForm.email}
            onChange={e => handleInputForm(e)}
            sx={styles.textInput}
          />
        </FormControl>
        <FormControl
          sx={{
            width: '100%',
          }}
        >
          <FormLabel sx={styles.label}>Password</FormLabel>
          <TextField
            type="password"
            fullWidth
            name={'password'}
            value={registerForm.password}
            onChange={e => handleInputForm(e)}
            sx={styles.textInput}
          />
        </FormControl>
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          <LoginButton
            variant="contained"
            onClick={handleCreateAccount}
            disableRipple
          >
            Create Account
          </LoginButton>
        </Box>
      </Box>
    </Stack>
  );
};

export default RegisterForm;
