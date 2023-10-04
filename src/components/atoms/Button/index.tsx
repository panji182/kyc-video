import React from 'react';
import Button from '@mui/material/Button';

type Props = {
  label: string;
  variant: 'text' | 'outlined' | 'contained';
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

const ButtonComp = ({ label, variant, color, startIcon, ...props }: Props) => {
  return (
    <Button variant={variant} startIcon={startIcon} color={color} {...props}>
      {label}
    </Button>
  );
};

export default ButtonComp;
