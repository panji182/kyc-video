import { toEm, toRem } from '@/helpers/globalFunctions';

const styles = {
  cardStatistic: {
    height: '107px',
    borderRadius: '15px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  },
  innerWrap: {
    height: '100%',
    mt: toRem(8),
  },
  card01: {
    background: 'linear-gradient(180deg, #04DACD 0%, #82A4FC 100%)',
  },
  card02: {
    background: 'linear-gradient(181deg, #9D9BFE 0.62%, #A02ED6 99.39%)',
  },
  card03: {
    background: 'linear-gradient(177deg, #FFD12E 2.06%, #D67300 97.34%)',
  },
  card04: {
    background:
      'linear-gradient(180deg, rgba(208, 229, 79, 0.63) 0%, rgba(101, 210, 160, 0.66) 44.96%, rgba(11, 54, 206, 0.69) 100%)',
  },
  card05: {
    background:
      'linear-gradient(0deg, #5AB5F8 0%, #4CD1C9 50.42%, #39E69D 100%)',
  },
  title: {
    color: '#10021B',
    fontWeight: 600,
    fontSize: toEm(17),
  },
  value: {
    color: '#fff',
    fontWeight: 700,
    fontSize: toEm(30),
    marginTop: '0 !important',
  },
};

export default styles;
