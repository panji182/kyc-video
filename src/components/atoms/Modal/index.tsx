import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

import { toRem } from '@/helpers/globalFunctions';
import { colors } from '@/consts';
import styles from './index.styles';

const ModalStyle = styled(Modal)(({ theme }) => ({
  '&.MuiModal-root>.MuiBox-root': {
    width: '33.5vw',
    overflowY: 'auto',
    maxHeight: '95vh',
    outline: 'none',
    padding: `${toRem(8)} ${toRem(16)}`,
  },
  [theme.breakpoints.down('md')]: {
    '&.MuiModal-root>.MuiBox-root': {
      width: '90vw !important',
      marginTop: toRem(16),
    },
  },
}));

const IconButtonCustom = styled(IconButton)({
  color: colors.dark,
});

type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  sx?: any;
  children: JSX.Element;
};

const ModalComp = ({ open, title, onClose, children, ...props }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
    onClose();
  };

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return (
    <ModalStyle
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...props}
    >
      <Box sx={styles.style}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={1}
          sx={{ mb: toRem(16) }}
        >
          <Typography
            id="modal-title"
            variant="h5"
            component="h2"
            sx={{ mb: toRem(8) }}
          >
            {title}
          </Typography>
          <IconButtonCustom
            aria-label="edit"
            color="secondary"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButtonCustom>
        </Stack>
        {children}
      </Box>
    </ModalStyle>
  );
};

export default ModalComp;
