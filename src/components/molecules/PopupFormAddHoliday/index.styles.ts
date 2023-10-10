import { toRem } from '@/helpers/globalFunctions';

const styles = {
  bottomSpace: { mb: toRem(8) },
  containerButtonDeleteRow: {
    position: 'relative',
  },
  buttonDeleteRowBox: {
    position: 'absolute',
    right: '-32px',
    top: '33%',
  },
  buttonDeleteRowBoxResponsive: {
    position: 'absolute',
    right: '-22px',
    top: '33%',
  },
};

export default styles;
