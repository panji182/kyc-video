import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Day = styled(Box)({
  width: '36px',
  height: '36px',
  cursor: 'pointer',
  borderRadius: '50%',
  border: '1px solid #1976d2',
  color: '#1976d2',

  '&:hover': {
    color: '#1565c0',
    fontWeight: 'bold',
  },
});

const styles = {
  selected: {
    color: '#fff',
    backgroundColor: '#1976d2',

    '&:hover': {
      color: '#fff',
      fontWeight: 'normal',
    },
  },
};

export default styles;
