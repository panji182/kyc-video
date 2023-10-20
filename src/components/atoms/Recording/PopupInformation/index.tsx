import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import styles from './index.styles';

type Props = {
  role: string;
  roleName: string;
  deviceName: string;
  ipAddress: string;
};

const PopupInformation = ({ role, roleName, deviceName, ipAddress }: Props) => {
  return (
    <Paper variant="elevation" elevation={3}>
      <Typography component="p" sx={styles.title}>
        {role} Information
      </Typography>
      <Box sx={styles.innerWrapper}>
        <Typography sx={styles.subTitle}>{role} Detail</Typography>
        <Paper variant="outlined" sx={styles.deviceWrapper}>
          <Stack direction="row" sx={styles.textRow}>
            <Typography sx={styles.textLabel}>{role} Name</Typography>
            <Typography sx={styles.text}>{roleName}</Typography>
          </Stack>
          <Stack direction="row" sx={styles.textRow}>
            <Typography sx={styles.textLabel}>Device Name</Typography>
            <Typography sx={styles.text}>{deviceName}</Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={styles.textLabel}>IP Address</Typography>
            <Typography sx={styles.text}>{ipAddress}</Typography>
          </Stack>
        </Paper>
      </Box>
    </Paper>
  );
};

export default PopupInformation;
