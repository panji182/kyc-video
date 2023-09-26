import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import { toRem } from '@/helpers/globalFunctions';

import styles from './index.styles';

const FormControlStyle = styled(FormControl)(({ theme }) => ({
  margin: toRem(8),
  maxWidth: toRem(200),

  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: 'none',
  },
}));

type Props = {
  id?: string;
  label?: string;
  formInput?: boolean;
  value: any;
  variant: 'outlined' | 'standard' | 'filled';
  type?: string;
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void;
  sx?: any;
};

const TextInput = ({
  id,
  label,
  value,
  formInput = false,
  variant,
  type,
  placeholder,
  onChange,
  ...props
}: Props) => {
  const [enterValue, setEnterValue] = useState<string>('');
  const usedId = id ? { id } : {};
  const usedLabel = label ? { label } : {};
  const usedType = type ? { type } : {};
  const usedPlaceholder = placeholder ? { placeholder } : {};

  useEffect(() => {
    setEnterValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnterValue(event.target.value as string);
    onChange(event.target.value as string);
  };

  return !formInput ? (
    <FormControlStyle>
      <TextField
        {...usedId}
        {...usedType}
        {...usedLabel}
        {...usedPlaceholder}
        value={enterValue}
        variant={variant}
        onChange={handleChange}
        {...props}
      />
    </FormControlStyle>
  ) : (
    <FormControlStyle>
      {label && (
        <FormLabel {...usedId} sx={styles.bottomSpace}>
          {label}
        </FormLabel>
      )}
      <TextField
        {...usedId}
        {...usedType}
        {...usedPlaceholder}
        value={enterValue}
        variant={variant}
        onChange={handleChange}
        {...props}
      />
    </FormControlStyle>
  );
};

export default TextInput;
