import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { toRem } from '@/helpers/globalFunctions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const FormControlStyle = styled(FormControl)(({ theme }) => ({
  maxWidth: toRem(200),

  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: 'none',
  },
}));

type Props = {
  label?: string;
  value: any;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: Dayjs | null) => void;
  sx?: any;
};

const DateTimePickerComp = ({ label, value, onChange, ...props }: Props) => {
  const [enterValue, setEnterValue] = useState<Dayjs | null>(null);
  const usedLabel = label ? { label } : {};

  useEffect(() => {
    setEnterValue(value);
  }, [value]);

  const handleChange = (value: Dayjs | null) => {
    setEnterValue(value);
    onChange(value);
  };

  return (
    <FormControlStyle>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          {...usedLabel}
          value={enterValue}
          onChange={handleChange}
          {...props}
        />
      </LocalizationProvider>
    </FormControlStyle>
  );
};

export default DateTimePickerComp;
