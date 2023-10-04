'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Button = dynamic(() => import('@/components/atoms/Button'));

type Props = {
  open: boolean;
  title: string;
  description: string;
  onOk: () => void;
  onCancel: () => void;
  onClose: () => void;
  sx?: any;
};

const DialogComp = ({
  open,
  title,
  description,
  onOk,
  onCancel,
  onClose,
  ...props
}: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setOpenDialog(open);
  }, [open]);

  const handleClose = () => {
    setOpenDialog(false);
    onClose();
  };

  return (
    <Dialog open={openDialog} onClose={handleClose} {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          label="Cancel"
          variant="outlined"
          onClick={() => {
            handleClose();
            onCancel();
          }}
        />
        <Button
          label="OK"
          variant="contained"
          color="error"
          onClick={() => {
            handleClose();
            onOk();
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogComp;
