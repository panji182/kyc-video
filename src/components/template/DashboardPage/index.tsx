'use client';

import { useState, useMemo, useCallback, useContext, memo } from 'react';
import dynamic from 'next/dynamic';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { adminLayoutContext } from '@/components/template/Layouts/AdminLayout';
import { RealTimeMonitorDashboard } from '@/consts';
import styles from './index.styles';

const CardStatistic = dynamic(
  () => import('@/components/atoms/Dashboard/CardStatistic')
);
const CardRealtimeMonitoring = dynamic(
  () => import('@/components/atoms/Dashboard/CardRealtimeMonitoring')
);
const PopupContent = dynamic(
  () => import('@/components/atoms/Dashboard/PopupContent')
);
const Modal = dynamic(() => import('@/components/atoms/Modal'));
const FilterButton = dynamic(
  () => import('@/components/atoms/Dashboard/FilterButton')
);
const VirtualScroll = dynamic(
  () => import('@/components/atoms/Dashboard/VirtualScroll')
);

import { toRem } from '@/helpers/globalFunctions';
import { FilterDropdown, sortType } from '@/types/atoms/filterButton';

interface StatisticProps {
  title: string;
  value: string;
  colour: number;
}

const dummyStatistic: StatisticProps[] = [
  {
    title: 'Avg. Handling Time :',
    value: '02:00:00',
    colour: 1,
  },
  {
    title: 'Total Accept Call :',
    value: '9.000',
    colour: 2,
  },
  {
    title: 'Total Incoming Call :',
    value: '10.000',
    colour: 3,
  },
  {
    title: 'Service Level :',
    value: '60%',
    colour: 4,
  },
  {
    title: 'Abandon Rate :',
    value: '10%',
    colour: 5,
  },
];

interface RealtimeProps {
  id: string;
  title: string;
  bitRate: string;
  jitter: string;
  frameRate: string;
  colour: 'success' | 'error' | 'warning';
  icon: 'android' | 'desktop' | 'devices' | 'ios';
}

const dummyRealtime: RealtimeProps[] = [
  {
    id: '1',
    title: 'ME445',
    bitRate: '600Kbps',
    jitter: '80 ms',
    frameRate: '46 fps',
    colour: 'warning',
    icon: 'devices',
  },
  {
    id: '2',
    title: 'MP768',
    bitRate: '3Mbps',
    jitter: '25 ms',
    frameRate: '55 fps',
    colour: 'success',
    icon: 'devices',
  },
  {
    id: '3',
    title: 'MS156',
    bitRate: '300Kbps',
    jitter: '120 ms',
    frameRate: '60 fps',
    colour: 'error',
    icon: 'devices',
  },
  {
    id: '4',
    title: 'MY648',
    bitRate: '3Mbps',
    jitter: '25 ms',
    frameRate: '55 fps',
    colour: 'success',
    icon: 'android',
  },
  {
    id: '5',
    title: 'ME545',
    bitRate: '300Kbps',
    jitter: '120 ms',
    frameRate: '60 fps',
    colour: 'error',
    icon: 'android',
  },
  {
    id: '5',
    title: 'ME545',
    bitRate: '300Kbps',
    jitter: '120 ms',
    frameRate: '60 fps',
    colour: 'error',
    icon: 'android',
  },
  {
    id: '5',
    title: 'ME545',
    bitRate: '300Kbps',
    jitter: '120 ms',
    frameRate: '60 fps',
    colour: 'error',
    icon: 'android',
  },
  {
    id: '1',
    title: 'ME445',
    bitRate: '600Kbps',
    jitter: '80 ms',
    frameRate: '46 fps',
    colour: 'warning',
    icon: 'devices',
  },
  {
    id: '2',
    title: 'MP768',
    bitRate: '3Mbps',
    jitter: '25 ms',
    frameRate: '55 fps',
    colour: 'success',
    icon: 'devices',
  },
  {
    id: '3',
    title: 'MS156',
    bitRate: '300Kbps',
    jitter: '120 ms',
    frameRate: '60 fps',
    colour: 'error',
    icon: 'devices',
  },
  {
    id: '4',
    title: 'MY648',
    bitRate: '3Mbps',
    jitter: '25 ms',
    frameRate: '55 fps',
    colour: 'success',
    icon: 'android',
  },
  {
    id: '5',
    title: 'ME545',
    bitRate: '300Kbps',
    jitter: '120 ms',
    frameRate: '60 fps',
    colour: 'error',
    icon: 'android',
  },
  {
    id: '5',
    title: 'ME545',
    bitRate: '300Kbps',
    jitter: '120 ms',
    frameRate: '60 fps',
    colour: 'error',
    icon: 'android',
  },
  {
    id: '5',
    title: 'ME545',
    bitRate: '300Kbps',
    jitter: '120 ms',
    frameRate: '60 fps',
    colour: 'error',
    icon: 'android',
  },
  {
    id: '1',
    title: 'ME445',
    bitRate: '600Kbps',
    jitter: '80 ms',
    frameRate: '46 fps',
    colour: 'warning',
    icon: 'devices',
  },
  {
    id: '2',
    title: 'MP768',
    bitRate: '3Mbps',
    jitter: '25 ms',
    frameRate: '55 fps',
    colour: 'success',
    icon: 'devices',
  },
  {
    id: '3',
    title: 'MS156',
    bitRate: '300Kbps',
    jitter: '120 ms',
    frameRate: '60 fps',
    colour: 'error',
    icon: 'devices',
  },
  {
    id: '4',
    title: 'MY648',
    bitRate: '3Mbps',
    jitter: '25 ms',
    frameRate: '55 fps',
    colour: 'success',
    icon: 'android',
  },
];

// const dummyRealtime = Array.from(Array(200), (d, index) => ({
//   id: '1',
//   title: `ME445ab${index}`,
//   bitRate: '600Kbps',
//   jitter: '80 ms',
//   frameRate: '46 fps',
//   colour: 'success',
//   icon: 'devices',
// }));

const filterDropdown: FilterDropdown[] = [
  {
    label: 'Default',
    value: 'default',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Yellow',
    value: 'yellow',
  },
  {
    label: 'Red',
    value: 'red',
  },
];

type VScrollItemProps = {
  index: number;
  // eslint-disable-next-line no-unused-vars
  onClickDetail: (id: string) => void;
  datas: any[];
  showDataPerRow: number;
};

const VScrollItem = memo(
  ({ index, onClickDetail, datas, showDataPerRow }: VScrollItemProps) => {
    const { sidebarOpened } = useContext(adminLayoutContext);
    const realtimeBreakPoint = useMemo(
      () => (sidebarOpened ? 3 : 2),
      [sidebarOpened]
    );
    const dataPerRowStartOffset = index * showDataPerRow;
    const dataPerRowEndOffset = dataPerRowStartOffset + showDataPerRow;
    const rowData = datas.slice(dataPerRowStartOffset, dataPerRowEndOffset);
    return (
      <>
        {rowData.map((d, rowIdx) => (
          <Grid
            key={`realtime${rowIdx}`}
            item
            xs={12}
            sm={6}
            md={realtimeBreakPoint}
            xl={realtimeBreakPoint}
          >
            <CardRealtimeMonitoring
              id={d.id}
              title={d.title}
              bitRate={d.bitRate}
              jitter={d.jitter}
              frameRate={d.frameRate}
              colour={d.colour}
              icon={d.icon}
              onClick={onClickDetail}
            />
          </Grid>
        ))}
      </>
    );
  }
);

VScrollItem.displayName = 'VScrollItem';

const DashboardPage = () => {
  const theme = useTheme();
  const isMediumLayout = useMediaQuery(theme.breakpoints.only('md'));
  const isSmallLayout = useMediaQuery(theme.breakpoints.only('sm'));
  const isExtraSmallLayout = useMediaQuery(theme.breakpoints.only('xs'));
  const { sidebarOpened } = useContext(adminLayoutContext);
  const breakPointSettings = useMemo(() => {
    if (isMediumLayout || isSmallLayout) {
      return {
        scrollHeight: 773,
        showDataPerRow: RealTimeMonitorDashboard.dataPerRowSmOpened,
      };
    } else if (isExtraSmallLayout) {
      return {
        scrollHeight: 600,
        showDataPerRow: RealTimeMonitorDashboard.dataPerRowXsOpened,
      };
    } else {
      return {
        scrollHeight: 350,
        showDataPerRow: sidebarOpened
          ? RealTimeMonitorDashboard.dataPerRowOpened
          : RealTimeMonitorDashboard.dataPerRowClosed,
      };
    }
  }, [sidebarOpened, isMediumLayout, isSmallLayout, isExtraSmallLayout]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');
  console.log(120, selectedId);
  const calcDivide = (
    dummyRealtime.length / breakPointSettings.showDataPerRow
  ).toString();
  const calcRemain = (
    dummyRealtime.length % breakPointSettings.showDataPerRow
  ).toString();
  const remainCount = parseInt(calcRemain);
  const itemCount = parseInt(calcDivide) + (remainCount > 0 ? 1 : 0);
  const statisticBreakPoint = useMemo(
    () => (sidebarOpened ? 3 : 2),
    [sidebarOpened]
  );
  const handleClick = useCallback((id: string) => {
    setSelectedId(id);
    setOpen(true);
  }, []);
  const handleClickFilter = (data: FilterDropdown) => {
    console.log(99, data);
  };

  const handleClickSort = (sorted: sortType) => {
    console.log(103, sorted);
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{ ...styles.title, ...styles.titleStatistic }}
        gutterBottom
      >
        Today Statistic
      </Typography>
      <Grid
        container
        spacing={2}
        sx={theme => ({
          [theme.breakpoints.up('lg')]: {
            ...styles.widthChangeStatisticXl,
          },
        })}
      >
        {dummyStatistic.map((d: StatisticProps, index) => (
          <Grid
            key={`statistic${index}`}
            item
            xs={12}
            sm={6}
            md={statisticBreakPoint}
            xl={statisticBreakPoint}
            sx={styles.gridItem}
          >
            <CardStatistic title={d.title} value={d.value} colour={d.colour} />
          </Grid>
        ))}
      </Grid>
      <Stack
        direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}
        sx={{
          marginTop: toRem(16),
          marginBottom: toRem(16),
        }}
      >
        <Typography
          variant="h5"
          sx={theme => ({
            ...styles.title,
            ...styles.titleRealtime,
            [theme.breakpoints.only('xs')]: {
              marginBottom: toRem(8),
            },
          })}
          gutterBottom
        >
          Realtime Monitoring
        </Typography>
        <FilterButton
          filterDropdown={filterDropdown}
          variant="contained"
          onClickFilter={handleClickFilter}
          onClickSort={handleClickSort}
        />
      </Stack>
      <VirtualScroll
        itemCount={itemCount}
        height={breakPointSettings.scrollHeight}
        heightRowVirtual={RealTimeMonitorDashboard.cardRealtimeHeight}
        Item={VScrollItem}
        renderAhead={5}
        onClickDetail={handleClick}
        datas={dummyRealtime}
        showDataPerRow={breakPointSettings.showDataPerRow}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '&.MuiModal-root>.MuiBox-root': {
            width: '80vw',
            background: '#EEF1FF',
          },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} xl={6} sx={styles.pt1rem}>
            <PopupContent
              role={'Customer'}
              audioBitrate={'3Mbps'}
              audioChartData={[1, 4, 2, 5, 7, 1, 4, 9]}
              videoBitrate={'2Mbps'}
              videoChartData={[1, 4, 2, 5, 7, 4, 4, 9]}
              roleName="Ahmad"
              deviceName="Android"
              ipAddress="192.168.1.1"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6} sx={styles.pt1rem}>
            <PopupContent
              role={'Agent'}
              audioBitrate={'3Mbps'}
              audioChartData={[1, 4, 2, 5, 7, 1, 4, 9]}
              videoBitrate={'2Mbps'}
              videoChartData={[1, 4, 2, 5, 7, 4, 4, 9]}
              roleName="Yuni"
              deviceName="Ios"
              ipAddress="192.168.1.3"
            />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default DashboardPage;
