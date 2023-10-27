import { toEm, toRem } from '@/helpers/globalFunctions';

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
  textError: {
    marginBottom: toRem(8),
    marginLeft: toRem(8),
    color: '#FF1D1D',
    fontSize: toEm(18),
  },
};

export default styles;
