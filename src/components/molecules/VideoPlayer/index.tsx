import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Modal = dynamic(() => import('@/components/atoms/Modal'));

const BoxStyled = styled(Box)(({ theme }) => ({
  width: '100%',

  '& video': {
    width: '100%',
    height: '400px',
    borderRadius: '5px',
  },

  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}));

type Props = {
  open: boolean;
  title: string;
  src: string;
  videoType: string;
  onClosePopup: () => void;
  muted?: boolean;
};

const VideoPlayer = ({
  open,
  title,
  src,
  videoType,
  onClosePopup,
  muted = true,
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
        <video
          autoPlay
          loop
          muted={muted}
          controls
          controlsList="nodownload"
          onContextMenu={e => e.preventDefault()}
        >
          <source src={src} type={videoType} />
        </video>
      </BoxStyled>
    </Modal>
  );
};

export default VideoPlayer;
