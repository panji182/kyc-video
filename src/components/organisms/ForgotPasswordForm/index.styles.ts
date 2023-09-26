import { toEm, toRem } from '@/helpers/globalFunctions';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const LoginButton = styled(Button)({
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
  marginTop: toRem(48),
  '&:hover': {
    backgroundColor: '#4EABDF',
    borderColor: '#0063cc',
    boxShadow: 'none',
  },
});

const styles = {
  fontWhite: { color: '#fff' },
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
