'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useGetAuthLoginMutation } from '@/services/Login';

import { toEm, toRem, encrypt, encryptSHA256 } from '@/helpers/globalFunctions';

import { Login } from '@/types/organisms/login';
import styles, { LoginButton, BpIcon, BpCheckedIcon } from './index.styles';
import { paths, Roles } from '@/consts';

const validationSchema = yup.object({
  password: yup.string().required('Password is required'),
});

const LoginForm = ({ users, secretKey }: Login) => {
  const router = useRouter();
  const [authLogin] = useGetAuthLoginMutation();
  const isValidUserName = (uname: string) => {
    const isEmail = (str: string) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str);
    const isUserName = (str: string) => !/[^A-Z0-9]/i.test(str);
    return isEmail(uname) || isUserName(uname);
  };
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate: values => {
      const errors = {
        username: '',
      };
      if (!isValidUserName(values.username)) {
        errors.username = 'Invalid Username format';
      }
      if (!values.username) {
        errors.username = 'Username is required';
      }

      return errors.username !== '' ? errors : {};
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      setShowLoader(true);
      const enteredUser = users.find(d => d.username === values.username);
      const encPassword = encryptSHA256(values.password);
      if (enteredUser && enteredUser.password === encPassword) {
        const authInfos = {
          username: enteredUser.username,
          isVerified: 'verified',
          role: enteredUser.role,
        };
        const encAuthInfo = encrypt(authInfos, secretKey);
        setCookie('auth', encAuthInfo);
        try {
          const resp: any = await authLogin({
            username: values.username,
            password: encPassword,
          }).unwrap();
          setCookie('token', resp.token);
        } catch (err: any) {}
        setShowLoader(false);
        switch (enteredUser.role) {
          case Roles.admin:
            router.push(paths.dashboard.href);
            break;
          case Roles.operator:
            router.push(paths.channel.href);
            break;
          default:
            router.push(paths.recording.href);
        }
      } else {
        setShowLoader(false);
        setShowError(true);
      }
    },
  });
  const [remember, setRemember] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(event.target.checked);
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
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          sx={{
            width: '100%',
            marginBottom: toRem(32),
          }}
        >
          <FormLabel sx={styles.label}>Username / Email</FormLabel>
          <TextField
            fullWidth
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            sx={styles.textInput}
          />
          {formik.errors.username && formik.touched.username ? (
            <Typography sx={styles.textError}>
              {formik.errors.username}
            </Typography>
          ) : null}
        </FormControl>
        <FormControl
          sx={{
            width: '100%',
          }}
        >
          <FormLabel sx={styles.label}>Password</FormLabel>
          <TextField
            fullWidth
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            sx={styles.textInput}
          />
          {formik.errors.password && formik.touched.password ? (
            <Typography sx={styles.textError}>
              {formik.errors.password}
            </Typography>
          ) : null}
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
        </Stack>
        <Stack direction="row" justifyContent={'center'}>
          <LoginButton type="submit" variant="contained" disableRipple>
            {showLoader && (
              <CircularProgress size={30} sx={{ mr: toRem(16) }} />
            )}
            Login
          </LoginButton>
        </Stack>
      </form>
    </>
  );
};

export default LoginForm;
