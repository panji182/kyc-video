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
  onClick?: (e: any) => void;
};

export const ButtonComp = ({
  label,
  variant,
  color,
  startIcon,
  ...props
}: Props) => {
  return (
    <Button variant={variant} startIcon={startIcon} color={color} {...props}>
      {label}
    </Button>
  );
};
