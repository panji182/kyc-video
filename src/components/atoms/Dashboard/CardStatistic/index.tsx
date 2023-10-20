import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import styles from './index.styles';

type Props = {
  title: string;
  value: string;
  colour: number;
};

const CardStatistic = ({ title, value, colour }: Props) => {
  const colourUsed = useMemo(() => {
    switch (colour) {
      case 1:
        return { ...styles.card01 };
      case 2:
        return { ...styles.card02 };
      case 3:
        return { ...styles.card03 };
      case 4:
        return { ...styles.card04 };
      default:
        return { ...styles.card05 };
    }
  }, [colour]);

  return (
    <Box sx={{ ...styles.cardStatistic, ...colourUsed }}>
      <Stack
        sx={{
          height: '100%',
        }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography component="p" sx={styles.title}>
          {title}
        </Typography>
        <Typography component="p" sx={styles.value}>
          {value}
        </Typography>
      </Stack>
    </Box>
  );
};

export default CardStatistic;
