import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

import styles from './index.styles';

type Props = {
  role: string;
  audioBitrate: string;
  audioChartData: number[];
  videoBitrate: string;
  videoChartData: number[];
  roleName: string;
  deviceName: string;
  ipAddress: string;
};

const PopupContent = ({
  role,
  audioBitrate,
  audioChartData,
  videoBitrate,
  videoChartData,
  roleName,
  deviceName,
  ipAddress,
}: Props) => {
  return (
    <Paper variant="elevation" elevation={3}>
      <Typography component="p" sx={styles.title}>
        {role} Statistic
      </Typography>
      <Box sx={styles.innerWrapper}>
        <Typography sx={styles.subTitle}>Audio</Typography>
        <Box sx={styles.chartContainer}>
          <Box sx={styles.valueInfo}>
            <Stack
              direction="row"
              gap={1}
              justifyContent="center"
              alignItems="center"
            >
              <Box sx={{ ...styles.legend, ...styles.legendAudio }}></Box>
              <Typography sx={styles.textLabelInfo}>bit rate</Typography>
              <Typography sx={styles.textValueInfo}>{audioBitrate}</Typography>
            </Stack>
          </Box>
          <SparkLineChart
            data={audioChartData}
            height={100}
            colors={['#00FF29']}
            sx={styles.lineWidth}
          />
        </Box>
        <Typography sx={styles.subTitle}>Video</Typography>
        <Box sx={styles.chartContainer}>
          <Box sx={styles.valueInfo}>
            <Stack
              direction="row"
              gap={1}
              justifyContent="center"
              alignItems="center"
            >
              <Box sx={{ ...styles.legend, ...styles.legendVideo }}></Box>
              <Typography sx={styles.textLabelInfo}>bit rate</Typography>
              <Typography sx={styles.textValueInfo}>{videoBitrate}</Typography>
            </Stack>
          </Box>
          <SparkLineChart
            data={videoChartData}
            height={100}
            colors={['#001AFF']}
            sx={styles.lineWidth}
          />
        </Box>
        <Typography sx={styles.subTitle}>{role} Device</Typography>
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

export default PopupContent;
