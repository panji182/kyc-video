'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { toEm, toRem } from '@/helpers/globalFunctions';

import styles, { LoginButton } from './index.styles';

const ForgotPasswordForm = () => {
  const [username, setUsername] = useState<string>('');

  const handleInputForm = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = ev.target;
    setUsername(value);
  };

  const handleCreateAccount = () => {
    alert('Forgot password has been sent !');
  };

  return (
    <Stack justifyContent={'center'} sx={{ height: '100vh' }}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            color: '#fff',
            marginTop: toRem(32),
            marginBottom: toRem(16),
            fontWeight: 600,
            fontSize: toEm(40),
          }}
        >
          Forgot Password
        </Typography>
        <Typography
          sx={{
            color: '#fff',
            marginBottom: toRem(16),
            fontSize: toEm(18),
          }}
        >
          Please enter your email address.
          <br />
          You will receive an email message with
          <br />
          instructions on how to reset your password.
        </Typography>
        <FormControl
          sx={{
            width: '100%',
            marginBottom: toRem(16),
          }}
        >
          <FormLabel sx={styles.label}>Username / Email</FormLabel>
          <TextField
            fullWidth
            name={'username'}
            value={username}
            onChange={e => handleInputForm(e)}
            sx={styles.textInput}
          />
        </FormControl>
        <Box
          sx={{
            width: '100%',
            textAlign: 'right',
          }}
        >
          <LoginButton
            variant="contained"
            onClick={handleCreateAccount}
            disableRipple
          >
            Send
          </LoginButton>
        </Box>
      </Box>
    </Stack>
  );
};

export default ForgotPasswordForm;
