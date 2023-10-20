import { toRem } from '@/helpers/globalFunctions';

const styles = {
  bottomSpace: { mb: toRem(8) },
  containerButtonDeleteRow: {
    position: 'relative',
  },
  buttonDeleteRowBox: {
    position: 'absolute',
    right: '-32px',
    top: '40%',
  },
  buttonDeleteRowBoxResponsive: {
    position: 'absolute',
    right: '-22px',
    top: '40%',
  },
};

export default styles;
