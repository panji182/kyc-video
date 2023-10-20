import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  open: boolean;
  message: string;
  autoHideDuration?: number;
  severity: 'success' | 'info' | 'warning' | 'error';
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  onClose: () => void;
};

const CustomSnackbar = ({
  open,
  message,
  autoHideDuration = 5000,
  severity,
  vertical,
  horizontal,
  onClose,
  ...props
}: Props) => {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  React.useEffect(() => {
    setOpenSnackBar(open);
  }, [open]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={openSnackBar}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      {...props}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
