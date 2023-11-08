import { toEm, toRem } from '@/helpers/globalFunctions';

const styles = {
  buttonDeleteRowBox: {
    position: 'absolute',
    right: '-8px',
    top: '50%',
  },
  buttonDeleteRowBoxResponsive: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textError: {
    marginBottom: toRem(8),
    marginLeft: toRem(8),
    color: '#FF1D1D',
    fontSize: toEm(18),
  },
};

export default styles;
