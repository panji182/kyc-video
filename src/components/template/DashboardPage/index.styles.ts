import { toEm, toRem } from '@/helpers/globalFunctions';

const styles = {
  title: {
    fontFamily: 'myArimoRegularFont',
    fontWeight: 600,
    color: '#3150A0',
    mb: toRem(16),
  },
  titleStatistic: {
    fontSize: toEm(25),
    mt: toRem(16),
  },
  titleRealtime: {
    fontSize: toEm(30),
  },
};

export default styles;
