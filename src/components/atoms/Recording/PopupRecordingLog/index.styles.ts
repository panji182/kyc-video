import { toEm, toRem } from '@/helpers/globalFunctions';

const styles = {
  wrapper: {
    background: '#878787',
  },
  innerWrapper: {
    paddingLeft: toRem(16),
    paddingRight: toRem(16),
    paddingTop: toRem(16),
    paddingBottom: toRem(32),
  },
  title: {
    fontSize: toEm(20),
    fontStyle: 'normal',
    fontWeight: 600,
    color: '#000',
    paddingBottom: toRem(8),
  },
  subTitle: {
    fontSize: toEm(18),
    fontFamily: 'mySarpanchRegularFont, sans-serif',
    fontStyle: 'normal',
    borderBottom: '1px dashed #fff',
    padding: toRem(16),
  },
  text: {
    fontSize: toEm(18),
    color: '#fff',
    fontFamily: 'mySarpanchRegularFont, sans-serif',
    fontStyle: 'normal',
  },
  textField1: {
    width: '150px',
  },
  textField2: {
    width: '300px',
  },
  textEnterRoom: {
    color: '#49DF31',
  },
  textLeave: {
    color: '#EB3636',
  },
};

export default styles;
