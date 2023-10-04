import { toRem } from '@/helpers/globalFunctions';

const styles = {
  tableCell: {
    position: 'relative',
    paddingLeft: toRem(32),
  },
  collapsedButton: {
    position: 'absolute',
    borderRadius: '50%',
    top: '27%',
    left: 0,
    '&:hover': {
      background: 'rgba(25, 118, 210, 0.12)',
    },
  },
};

export default styles;
