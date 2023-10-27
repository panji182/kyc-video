import { toRem } from '@/helpers/globalFunctions';

const styles = {
  selectedSelect: { display: 'flex', flexWrap: 'wrap', gap: 0.5 },
  textLabel: {
    color: 'rgba(0, 0, 0, 0.6) !important',
  },
  bottomSpace: { pb: toRem(16) },
};

export default styles;
