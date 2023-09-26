import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { toRem } from '@/helpers/globalFunctions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import styles, { ModalStyle } from './index.styles';

dayjs.locale('en');
dayjs.Ls.en.weekStart = 1;

const Button = dynamic(() => import('@/components/atoms/Button'));

type Props = {
  value?: any;
  minDate: Dayjs | undefined;
  maxDate: Dayjs | undefined;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any[]) => void;
  sx?: any;
};

const ServerDay = (
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Box sx={isSelected ? styles.isHoliday : {}}>
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Box>
  );
};

const HolidayPicker = ({
  value,
  minDate,
  maxDate,
  // onChange,
  ...props
}: Props) => {
  const [enterValue, setEnterValue] = useState<Dayjs | null>(null);
  const [holidayInfos, setHolidayInfos] = useState<any>({});
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const dateUsed = useMemo(
    () =>
      enterValue
        ? {
            fullDate: enterValue.format('YYYY-MM-DD'),
            date: +enterValue.format('DD'),
          }
        : {
            fullDate: 'default',
            date: 'default',
          },
    [enterValue]
  );
  const [subPopup, setSubPopup] = useState<boolean>(false);

  useEffect(() => {
    setEnterValue(value);
  }, [value]);

  useEffect(() => {
    dateUsed.fullDate !== 'default' &&
      setHolidayInfos((prevState: any) => {
        const added = prevState[dateUsed.fullDate]
          ? {}
          : { [dateUsed.fullDate]: '' };
        return {
          ...prevState,
          ...added,
        };
      });
    setHighlightedDays((prevState: any) => {
      if (prevState.indexOf(dateUsed.date) === -1) {
        return [...prevState, dateUsed.date];
      } else {
        return [...prevState];
      }
    });
  }, [dateUsed.fullDate]);

  const handleMonthChange = (date: Dayjs) => {
    setHighlightedDays([]);
    console.log(30, date);
  };

  const handleChange = (value: Dayjs | null) => {
    setEnterValue(value);
    setSubPopup(true);
    // onChange(value);
  };

  const handleHoliday = (val: React.ChangeEvent<HTMLInputElement>) => {
    setHolidayInfos((prevState: any) => {
      return {
        ...prevState,
        [dateUsed.fullDate]: val.target.value,
      };
    });
  };

  const handleCancelHoliday = () => {
    setHolidayInfos((prevState: any) => {
      const temp = { ...prevState };
      if (temp[dateUsed.fullDate] !== undefined) {
        delete temp[dateUsed.fullDate];
      }
      return temp;
    });
    setHighlightedDays((prevState: any) => {
      const temp = [...prevState];
      temp.splice(temp.indexOf(dateUsed.date), 1);
      return temp;
    });
    setSubPopup(false);
  };

  const handleAddHoliday = () => {
    const temp = { ...holidayInfos };
    delete temp.default;
    console.log(137, temp);
    setSubPopup(false);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={styles.dateCalendar}>
          <DateCalendar
            minDate={minDate}
            maxDate={maxDate}
            onMonthChange={handleMonthChange}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              } as any,
            }}
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onChange={handleChange}
            calendarStartDay={0}
            {...props}
          />
        </Box>
      </LocalizationProvider>
      <ModalStyle
        open={subPopup}
        aria-labelledby="sub-modal-title"
        aria-describedby="sub-modal-description"
        onClose={() => setSubPopup(false)}
      >
        <Box sx={styles.innerBoxStyle}>
          <TextField
            fullWidth
            placeholder="Name Holiday"
            value={holidayInfos[dateUsed.fullDate] ?? ''}
            variant="standard"
            onChange={handleHoliday}
            sx={{
              mt: toRem(32),
              mb: toRem(48),
              '& .MuiInput-root:before': {
                borderBottom: '1px solid #000',
              },
              '& .MuiInput-root:after': {
                borderBottom: 'none',
              },
            }}
          />
          <Stack direction="row" justifyContent={'flex-end'} gap={2}>
            <Button
              label="Delete"
              color="error"
              variant="contained"
              onClick={handleCancelHoliday}
              sx={{ marginLeft: toRem(8) }}
            />
            <Button
              label="Save"
              variant="contained"
              onClick={handleAddHoliday}
            />
          </Stack>
        </Box>
      </ModalStyle>
    </>
  );
};

export default HolidayPicker;
