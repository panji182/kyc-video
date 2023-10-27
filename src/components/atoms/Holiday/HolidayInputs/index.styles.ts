import { toEm, toRem } from '@/helpers/globalFunctions';

const styles = {
  buttonDeleteRowBox: {
    position: 'absolute',
    right: '-38px',
    top: '49%',
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
