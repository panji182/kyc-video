import { toRem } from '@/helpers/globalFunctions';

const styles = {
  frame: {
    position: 'relative',
    height: '138px',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0px 4px 4px #00000040',
    padding: toRem(10),
    cursor: 'pointer',
  },

  frameWarning: {
    backgroundColor: '#ffcc30',
  },

  frameSuccess: {
    backgroundColor: '#4CED54',
  },

  frameError: {
    backgroundColor: '#FF7770',
  },

  ellipse: {
    position: 'absolute',
    width: '123px',
    height: '123px',
    top: '-30px',
    right: '-14px',
    backgroundColor: '#ffffff8a',
    borderRadius: '61.5px',
    mixBlendMode: 'soft-light',
  },

  ellipse2: {
    position: 'absolute',
    width: '123px',
    height: '123px',
    top: '40px',
    left: '-17px',
    borderRadius: '61.5px',
    mixBlendMode: 'soft-light',
  },

  ellipse2Warning: {
    backgroundColor: 'rgba(246, 201, 14, 0.73)',
  },

  ellipse2Success: {
    backgroundColor: 'rgba(0, 0, 0, 0.40);',
  },

  ellipse2Error: {
    backgroundColor: 'rgba(255, 0, 0, 0.38)',
  },

  textWrapper: {
    textAlign: 'center',
    fontFamily: 'myArimoBoldFont, Helvetica',
    fontWeight: 700,
    color: '#013a90',
    fontSize: '18px',
    letterSpacing: 0,
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
  },

  textWrapper2: {
    textAlign: 'center',
    fontFamily: '"Segoe UI Regular", Helvetica',
    fontWeight: 400,
    color: '#060606',
    fontSize: '15px',
    letterSpacing: 0,
    lineHeight: 'normal',
  },

  textTitle: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'myArimoBoldFont, Helvetica',
    fontWeight: 700,
    color: '#060606',
    fontSize: '18px',
    letterSpacing: 0,
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    marginBottom: toRem(40),
  },

  vaadinMobile: {
    position: 'absolute',
    width: '24px',
    height: '24px',
    top: '7%',
    left: '3%',
  },
};

export default styles;
