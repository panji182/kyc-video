import { toEm, toRem } from '@/helpers/globalFunctions';

const styles = {
  innerWrapper: {
    paddingLeft: toRem(16),
    paddingRight: toRem(16),
    paddingBottom: toRem(32),
  },
  deviceWrapper: {
    border: '1px solid #BBB',
    padding: toRem(16),
  },
  title: {
    fontSize: toEm(20),
    fontStyle: 'normal',
    fontWeight: 600,
    color: '#384F66',
    borderBottom: '1px solid #000',
    padding: toRem(16),
  },
  subTitle: {
    fontSize: toEm(15),
    fontStyle: 'normal',
    fontWeight: 600,
    mt: toRem(16),
    mb: toRem(8),
  },
  textLabel: {
    position: 'relative',
    width: '130px',
    fontSize: toEm(14),
    fontStyle: 'normal',
    fontWeight: 400,
    '&:after': {
      position: 'absolute',
      content: '":"',
      top: 0,
      right: 0,
    },
  },
  textRow: {
    mb: toRem(16),
  },
  text: {
    width: '150px',
    fontSize: toEm(14),
    fontStyle: 'normal',
    fontWeight: 400,
    paddingLeft: toRem(8),
  },
};

export default styles;
