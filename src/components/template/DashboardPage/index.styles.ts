import { toEm, toRem } from '@/helpers/globalFunctions';

const styles = {
  title: {
    fontFamily: 'myArimoRegularFont',
    fontWeight: 600,
    color: '#3150A0',
    lineHeight: '30px',
  },
  titleStatistic: {
    fontSize: toEm(30),
  },
  titleRealtime: {
    fontSize: toEm(30),
    mb: 0,
  },
  widthChangeStatisticXl: {
    '& .MuiGrid-grid-xl-3': {
      flexBasis: '16%',
      maxWidth: '16%',
    },
    '& .MuiGrid-grid-xl-2': {
      flexBasis: '12%',
      maxWidth: '12%',
    },
  },
  widthChangeRealtimeXl: {
    '& .MuiGrid-grid-xl-3': {
      flexBasis: '16%',
      maxWidth: '16%',
    },
    '& .MuiGrid-grid-xl-2': {
      flexBasis: '14%',
      maxWidth: '14%',
    },
  },
  gridItem: {
    paddingTop: toRem(13) + ' !important',
    paddingLeft: toRem(13) + ' !important',
  },
};

export default styles;
