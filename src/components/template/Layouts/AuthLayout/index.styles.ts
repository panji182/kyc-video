import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { toRem } from '@/helpers/globalFunctions';

export const AuthFormContainer = styled(Box)(({ theme }) => ({
  width: '575px',
  minHeight: '720px',
  backgroundColor: '#0F3D67',
  boxShadow: '-5px 5px 4px 1px #0000004D',
  borderRadius: '20px',
  padding: toRem(40),
  marginTop: toRem(16),
  marginBottom: toRem(16),

  [theme.breakpoints.down('md')]: {
    width: 'auto',
    margin: toRem(16),
    padding: toRem(16),
  },
}));

const styles = {
  container: {
    background:
      'linear-gradient(188.34deg, #263544 0%, #405A73 37.81%, #5585B5 71.15%, #79A9D9 100%)',
  },
  containerWithMinHeight: {
    minHeight: '751px',
  },
};

export default styles;
