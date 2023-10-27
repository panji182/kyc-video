import { toEm, toRem } from '@/helpers/globalFunctions';

const styles = {
  bottomSpace: { mb: toRem(8) },
  wrapBottomSpace: { mb: toRem(16) },
  fontBold: { fontWeight: 'bold' },
  fullWidth: {
    width: '100%',
  },
  textError: {
    marginTop: toRem(8),
    marginBottom: toRem(8),
    color: '#FF1D1D',
    fontSize: toEm(18),
  },
};

export default styles;
