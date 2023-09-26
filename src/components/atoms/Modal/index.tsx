import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { toRem } from '@/helpers/globalFunctions';
import styles from './index.styles';

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: JSX.Element;
};

export const ModalComp = ({ open, title, onClose, children }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
    onClose();
  };

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.style}>
        <Typography
          id="modal-title"
          variant="h5"
          component="h2"
          sx={{ mb: toRem(16) }}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};
