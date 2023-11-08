import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import IconDashboardAndroid from '@/components/atoms/Icons/IconDashboardAndroid';
import IconDashboardDesktop from '@/components/atoms/Icons/IconDashboardDesktop';
import IconDashboardDevices from '@/components/atoms/Icons/IconDashboardDevices';
import IconDashboardIos from '@/components/atoms/Icons/IconDashboardIos';

import styles from './index.styles';

interface ValueTypes {
  value: string;
}

interface TitleTypes {
  title: string;
}

const TextValue: React.FC<ValueTypes> = ({ value }: ValueTypes) => {
  return (
    <Box
      sx={(theme: any) => ({
        ...styles.textWrapper,
        [theme.breakpoints.down('md')]: {
          ...styles.textWrapperSm,
        },
      })}
    >
      {value}
    </Box>
  );
};

const TextTitle: React.FC<TitleTypes> = ({ title }: TitleTypes) => {
  return (
    <Box
      sx={(theme: any) => ({
        ...styles.textWrapper2,
        [theme.breakpoints.down('md')]: {
          ...styles.textWrapper2Sm,
        },
      })}
    >
      {title}
    </Box>
  );
};

type Props = {
  id: string;
  title: string;
  bitRate: string;
  jitter: string;
  frameRate: string;
  colour: 'success' | 'error' | 'warning';
  icon: 'android' | 'desktop' | 'devices' | 'ios';
  // eslint-disable-next-line no-unused-vars
  onClick: (id: string) => void;
};

interface IconsType {
  android: React.ReactNode;
  desktop: React.ReactNode;
  devices: React.ReactNode;
  ios: React.ReactNode;
}

const Icons: IconsType = {
  android: <IconDashboardAndroid />,
  desktop: <IconDashboardDesktop />,
  devices: <IconDashboardDevices />,
  ios: <IconDashboardIos />,
};

const CardRealtimeMonitoring = ({
  id,
  title,
  bitRate,
  jitter,
  frameRate,
  colour,
  icon,
  onClick,
}: Props) => {
  const colourBG = useMemo(() => {
    switch (colour) {
      case 'success':
        return { ...styles.frameSuccess };
      case 'error':
        return { ...styles.frameError };
      default:
        return { ...styles.frameWarning };
    }
  }, [colour]);
  const colourEllipse2 = useMemo(() => {
    switch (colour) {
      case 'success':
        return { ...styles.ellipse2Success };
      case 'error':
        return { ...styles.ellipse2Error };
      default:
        return { ...styles.ellipse2Warning };
    }
  }, [colour]);

  const handleClick = () => {
    onClick(id);
  };

  return (
    <Box sx={{ ...styles.frame, ...colourBG }} onClick={handleClick}>
      <Typography component="p" sx={styles.textTitle}>
        {title}
      </Typography>
      <Box sx={styles.ellipse}></Box>
      <Box sx={{ ...styles.ellipse2, ...colourEllipse2 }}></Box>
      <Stack direction="row" justifyContent="space-around">
        <Box>
          <TextValue value={bitRate} />
          <TextTitle title="Bit rate" />
        </Box>
        <Box>
          <TextValue value={jitter} />
          <TextTitle title="Jitter" />
        </Box>
        <Box>
          <TextValue value={frameRate} />
          <TextTitle title="Frame rate" />
        </Box>
      </Stack>
      <Box sx={styles.vaadinMobile}>{Icons[icon as keyof IconsType]}</Box>
    </Box>
  );
};

export default CardRealtimeMonitoring;
