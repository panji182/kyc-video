import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

import { toRem } from '@/helpers/globalFunctions';

export const FormControlStyle = styled(FormControl)(({ theme }) => ({
  maxWidth: toRem(200),

  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: 'none',
  },
}));

const styles = {
  dateCalendarHeader: {
    '& .MuiDayCalendar-header': {
      '& span': {
        color: '#333',
        fontWeight: '700',
      },
      '& .MuiDayCalendar-weekDayLabel:nth-child(1):after': {
        content: '"o"',
      },
      '& .MuiDayCalendar-weekDayLabel:nth-child(2):after': {
        content: '"u"',
      },
      '& .MuiDayCalendar-weekDayLabel:nth-child(3):after': {
        content: '"e"',
      },
      '& .MuiDayCalendar-weekDayLabel:nth-child(4):after': {
        content: '"h"',
      },
      '& .MuiDayCalendar-weekDayLabel:nth-child(5):after': {
        content: '"r"',
      },
      '& .MuiDayCalendar-weekDayLabel:nth-child(6):after': {
        content: '"a"',
      },
      '& .MuiDayCalendar-weekDayLabel:nth-child(7):after': {
        content: '"u"',
      },
    },
  },
};

export default styles;
