import { toEm, toRem } from '@/helpers/globalFunctions';

const styles = {
  title: {
    fontFamily: 'myArimoRegularFont',
    fontWeight: 600,
    color: '#3150A0',
  },
  titleStatistic: {
    fontSize: toEm(30),
    mb: 0,
  },
  titleRealtime: {
    fontSize: toEm(30),
    mt: toRem(16),
    mb: 0,
  },
};

export default styles;
