import { useState, useEffect } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import styles, { FormControlStyle } from './index.styles';

dayjs.locale('en');
dayjs.Ls.en.weekStart = 1;

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
    <>
      <GlobalStyles
        styles={{
          body: styles.dateCalendarHeader,
        }}
      />
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
    </>
  );
};

export default DateTimePickerComp;
