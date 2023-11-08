import { useState, useEffect } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { toRem } from '@/helpers/globalFunctions';
import styles, { FormControlStyle } from './index.styles';

dayjs.locale('en');
dayjs.Ls.en.weekStart = 1;

type Props = {
  label?: string;
  value: any;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: Dayjs | null) => void;
  slotProps?: any;
  sx?: any;
};

const DatePickerComp = ({ label, value, onChange, ...props }: Props) => {
  const [enterValue, setEnterValue] = useState<Dayjs | null>(null);

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
        {label && <FormLabel sx={{ mb: toRem(16) }}>{label}</FormLabel>}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={enterValue}
            onChange={handleChange}
            sx={{
              '& .MuiDateCalendar-root': {
                border: '2px solid #D1D5D8',
                borderRadius: '12px',
              },
            }}
            {...props}
          />
        </LocalizationProvider>
      </FormControlStyle>
    </>
  );
};

export default DatePickerComp;
