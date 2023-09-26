import { toRem } from '@/helpers/globalFunctions';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

export const ModalStyle = styled(Modal)(({ theme }) => ({
  '&.MuiModal-root>.MuiBox-root': {
    width: toRem(262),
    padding: toRem(16),
    overflowY: 'auto',
    maxHeight: '75vh',
  },
  [theme.breakpoints.down('md')]: {
    '&.MuiModal-root>.MuiBox-root': {
      marginTop: toRem(16),
    },
  },
}));

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
  dateCalendar: {
    '& .MuiDateCalendar-root': {
      border: '2px solid #D1D5D8',
      borderRadius: '12px',
    },
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
  innerBoxStyle: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #dedede',
    boxShadow: 24,
    borderRadius: '10px',
    padding: toRem(32),
  },
};

export default styles;
