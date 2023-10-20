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
  chartContainer: {
    position: 'relative',
    width: '100%',
    height: '99px',
    borderRadius: '5px',
    background: 'rgba(0, 0, 0, 0.36)',
  },
  lineWidth: {
    '& path': {
      strokeWidth: 1,
    },
  },
  valueInfo: {
    position: 'absolute',
    left: 0,
    top: 0,
    background: 'rgba(0, 0, 0, 0.30)',
    borderRadius: '5px 0 0 0',
    padding: toRem(4),
  },
  legend: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  legendAudio: {
    background: '#00FF29',
  },
  legendVideo: {
    background: '#0019FF',
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
  textLabelInfo: {
    fontSize: toEm(12),
    fontStyle: 'normal',
    color: '#fff',
    fontWeight: 400,
  },
  textValueInfo: {
    fontSize: toEm(12),
    fontStyle: 'normal',
    color: '#fff',
    fontWeight: 600,
  },
};

export default styles;
