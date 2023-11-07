import dynamic from 'next/dynamic';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { toRem } from '@/helpers/globalFunctions';

const Modal = dynamic(() => import('@/components/atoms/Modal'));

const BoxStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'center',

  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}));

const BoxImageStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '400px',
  marginBottom: toRem(16),
  '& img': {
    position: 'static !important',
    objectFit: 'contain',
  },

  [theme.breakpoints.down('md')]: {
    width: 'auto',
    marginRight: 0,
  },
}));

type Props = {
  open: boolean;
  title: string;
  imageSrc: string;
  audioSrc?: string;
  audioType?: string;
  onClosePopup: () => void;
};

const ImageAudioPlayer = ({
  open,
  title,
  imageSrc,
  audioSrc,
  audioType,
  onClosePopup,
}: Props) => {
  return (
    <Modal
      open={open}
      title={title}
      onClose={() => onClosePopup()}
      sx={(theme: any) => ({
        '&.MuiModal-root>.MuiBox-root': {
          width: '60%',
          overflowY: 'auto',
          maxHeight: '92vh',
        },
        [theme.breakpoints.down('md')]: {
          '&.MuiModal-root>.MuiBox-root': {
            width: '90%',
          },
        },
      })}
    >
      <BoxStyled>
        <BoxImageStyled>
          <Image unoptimized fill src={imageSrc} alt={title} />
        </BoxImageStyled>
        {audioSrc && (
          <audio
            autoPlay
            loop
            controls
            controlsList="nodownload"
            onContextMenu={e => e.preventDefault()}
          >
            <source src={audioSrc} type={audioType} />
          </audio>
        )}
      </BoxStyled>
    </Modal>
  );
};

export default ImageAudioPlayer;
