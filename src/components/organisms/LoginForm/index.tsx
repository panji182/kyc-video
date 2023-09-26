'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';

import { paths } from '@/consts';
import { toEm, toRem } from '@/helpers/globalFunctions';

import styles, {
  LoginButton,
  RegisterButton,
  BpIcon,
  BpCheckedIcon,
} from './index.styles';

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(event.target.checked);
  };

  const handleLogin = () => {
    setShowError(true);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={styles.logoPanel}></Box>
      </Box>
      <Typography
        variant="h4"
        sx={{
          color: '#fff',
          marginBottom: toRem(16),
          fontWeight: 600,
          fontSize: toEm(40),
        }}
      >
        Welcome Back!
      </Typography>
      <Typography
        sx={{
          color: '#fff',
          marginBottom: toRem(32),
          fontSize: toEm(20),
        }}
      >
        Log in to Continue
      </Typography>
      <FormControl
        sx={{
          width: '100%',
          marginBottom: toRem(32),
        }}
      >
        <FormLabel sx={styles.label}>Username / Email</FormLabel>
        <TextField
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
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
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={styles.textInput}
        />
        {showError && (
          <Typography sx={styles.textError}>
            Your Username / Email or Password are incorrect.
            <br />
            Please try again!
          </Typography>
        )}
      </FormControl>
      <Stack
        direction="row"
        justifyContent={'space-between'}
        sx={{
          marginBottom: toRem(16),
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={remember}
              onChange={handleCheckBox}
              checkedIcon={<BpCheckedIcon />}
              icon={<BpIcon />}
            />
          }
          label="Remember me"
          sx={{
            '& .MuiFormControlLabel-label': {
              color: '#fff',
              fontSize: toEm(18),
            },
          }}
        />
        <Link href={paths.forgotPassword.href} sx={styles.forgotPassword}>
          Forgot Password?
        </Link>
      </Stack>
      <Stack direction="row" justifyContent={'space-between'}>
        <LoginButton variant="contained" onClick={handleLogin} disableRipple>
          Login
        </LoginButton>
        <RegisterButton
          variant="contained"
          disableRipple
          onClick={() => router.push(paths.register.href)}
        >
          Register
        </RegisterButton>
      </Stack>
    </>
  );
};

export default LoginForm;
