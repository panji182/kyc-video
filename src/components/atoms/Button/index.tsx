import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

type Props = {
  label?: string;
  buttonIcon?: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  startIcon?: React.ReactNode;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: any) => void;
  sx?: any;
};

const ButtonComp = ({
  label,
  buttonIcon,
  variant,
  color,
  startIcon,
  ...props
}: Props) => {
  return label ? (
    <Button variant={variant} startIcon={startIcon} color={color} {...props}>
      {label}
    </Button>
  ) : (
    <IconButton {...props}>{buttonIcon}</IconButton>
  );
};

export default ButtonComp;
