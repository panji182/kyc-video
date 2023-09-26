import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import FormControl from '@mui/material/FormControl';
// import { styled } from '@mui/material/styles';
import { toRem } from '@/helpers/globalFunctions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import styles from './index.styles';

const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
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

    // onChange(value);
  };

  const handleHoliday = (val: any) => {
    setHolidayInfos((prevState: any) => {
      return {
        ...prevState,
        [dateUsed.fullDate]: val,
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
  };

  const handleAddHoliday = () => {
    const temp = { ...holidayInfos };
    delete temp.default;
    console.log(127, temp);
    // setHolidayInfos(temp);
  };

  return (
    <FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row">
          <Box
            sx={{
              '& .MuiDateCalendar-root': {
                border: '2px solid #D1D5D8',
                borderRadius: '7px',
                width: toRem(275),
              },
              '& .MuiYearCalendar-root': {
                width: toRem(275),
              },
            }}
          >
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
              {...props}
            />
          </Box>
          <Box>
            <TextInput
              placeholder="Holiday Info"
              value={holidayInfos[dateUsed.fullDate] ?? ''}
              variant="outlined"
              onChange={handleHoliday}
            />
            <Button
              label="Set Holidays"
              variant="contained"
              onClick={handleAddHoliday}
              sx={{ marginLeft: toRem(8), mb: toRem(8) }}
            />
            <Button
              label="Cancel"
              color="error"
              variant="contained"
              onClick={handleCancelHoliday}
              sx={{ marginLeft: toRem(8) }}
            />
          </Box>
        </Stack>
      </LocalizationProvider>
    </FormControl>
  );
};

export default HolidayPicker;
