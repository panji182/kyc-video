import { toRem } from '@/helpers/globalFunctions';

const styles = {
  isHoliday: {
    '& button:before': {
      position: 'absolute',
      content: '""',
      width: toRem(18),
      height: toRem(18),
      borderBottom: '2px solid red',
    },
  },
};

export default styles;
