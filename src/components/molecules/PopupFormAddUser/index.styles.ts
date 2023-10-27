import { toEm, toRem } from '@/helpers/globalFunctions';

const styles = {
  bottomSpace: { mb: toRem(8) },
  textError: {
    marginBottom: toRem(8),
    marginLeft: toRem(8),
    color: '#FF1D1D',
    fontSize: toEm(18),
  },
};

export default styles;
