import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import styles from './index.styles';

interface ActivityLog {
  time: string;
  activity: string;
  processBy: string;
}

type Props = {
  activityData: ActivityLog[];
};

const PopupRecordingLog = ({ activityData }: Props) => {
  console.log(18, activityData);
  return (
    <>
      <Typography component="p" sx={styles.title}>
        Recording Log
      </Typography>
      <Box sx={styles.wrapper}>
        <Stack direction="row" sx={styles.subTitle}>
          <Typography sx={{ ...styles.text, ...styles.textField1 }}>
            Time
          </Typography>
          <Typography sx={{ ...styles.text, ...styles.textField2 }}>
            Activity
          </Typography>
          <Typography sx={{ ...styles.text, ...styles.textField1 }}>
            Process by
          </Typography>
        </Stack>
        <Box sx={styles.innerWrapper}>
          <Stack direction="row">
            <Typography sx={{ ...styles.text, ...styles.textField1 }}>
              08:21
            </Typography>
            <Typography
              sx={{
                ...styles.text,
                ...styles.textField2,
                ...styles.textEnterRoom,
              }}
            >
              Enter Room
            </Typography>
            <Typography sx={{ ...styles.text, ...styles.textField1 }}>
              Customer
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ ...styles.text, ...styles.textField1 }}>
              08:23
            </Typography>
            <Typography
              sx={{
                ...styles.text,
                ...styles.textField2,
                ...styles.textEnterRoom,
              }}
            >
              Enter Room
            </Typography>
            <Typography sx={{ ...styles.text, ...styles.textField1 }}>
              Agent
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography sx={{ ...styles.text, ...styles.textField1 }}>
              08:30
            </Typography>
            <Typography
              sx={{
                ...styles.text,
                ...styles.textField2,
                ...styles.textLeave,
              }}
            >
              Leave
            </Typography>
            <Typography sx={{ ...styles.text, ...styles.textField1 }}>
              Customer
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default PopupRecordingLog;
