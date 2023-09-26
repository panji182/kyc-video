import { toEm, toRem } from '@/helpers/globalFunctions';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const LoginButton = styled(Button)(({ theme }) => ({
  width: '198px',
  height: '58px',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: toEm(24),
  fontWeight: 700,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#4EABDF',
  borderColor: '#0063cc',
  color: '#fff',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#4EABDF',
    borderColor: '#0063cc',
    boxShadow: 'none',
  },

  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}));

export const RegisterButton = styled(Button)(({ theme }) => ({
  width: '198px',
  height: '58px',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: toEm(24),
  fontWeight: 400,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#fff',
  borderColor: '#4EABDF',
  color: '#4EABDF',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#fff',
    borderColor: '#4EABDF',
    boxShadow: 'none',
  },

  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}));

export const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 5,
  width: 20,
  height: 20,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark'
        ? 'rgba(57,75,89,.5)'
        : 'rgba(206,217,224,.5)',
  },
}));

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

const styles = {
  fontWhite: { color: '#fff' },
  logoPanel: {
    width: '118px',
    height: '118px',
    backgroundColor: '#D9D9D9',
    margin: `0 auto ${toRem(64)}`,
  },
  label: {
    color: '#fff',
    fontWeight: '700',
    fontSize: toEm(20),
    marginBottom: toRem(8),
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: '5px',
  },
  forgotPassword: {
    color: '#fff',
    padding: toRem(9),
    fontSize: toEm(18),
    textDecoration: 'none',
  },
  textError: {
    marginTop: toRem(8),
    marginBottom: toRem(8),
    color: '#FF1D1D',
    fontSize: toEm(18),
  },
};

export default styles;
