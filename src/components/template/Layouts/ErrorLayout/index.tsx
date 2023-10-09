import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import Typography from '@mui/material/Typography';

import { toRem } from '@/helpers/globalFunctions';

const ErrorCode = styled(Typography)(({ theme }) => ({
  color: '#fff',
  textAlign: 'center',

  [theme.breakpoints.down('md')]: {
    fontSize: toRem(76.8),
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: toRem(48),
  },
}));

const ErrorDescription = styled(Typography)(({ theme }) => ({
  color: '#fff',
  textAlign: 'center',

  [theme.breakpoints.down('md')]: {
    fontSize: toRem(38.4),
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: toRem(24),
  },
}));

type Props = {
  errorCode: string;
  errorDescription: string;
};

const ErrorLayout = ({ errorCode, errorDescription }: Props) => {
  return (
    <>
      <GlobalStyles
        styles={{
          'html, body': { margin: 0, height: '100%' },
          '& body > div': {
            height: '100%',
          },
        }}
      />
      <Stack
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '100%',
          background:
            'linear-gradient(188.34deg, #263544 0%, #405A73 37.81%, #5585B5 71.15%, #79A9D9 100%)',
        }}
      >
        <Box>
          <ErrorCode variant="h1">{errorCode}</ErrorCode>
          <ErrorDescription variant="h3">{errorDescription}</ErrorDescription>
        </Box>
      </Stack>
    </>
  );
};

export default ErrorLayout;
