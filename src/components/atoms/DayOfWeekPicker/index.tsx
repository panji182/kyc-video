import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { toRem } from '@/helpers/globalFunctions';
import styles, { Day } from './index.styles';

type Props = {
  lang: 'ind' | 'en';
  // eslint-disable-next-line no-unused-vars
  onSelectDays: (e: boolean[]) => void;
  sx?: any;
};

const langDayNames = {
  ind: ['M', 'S', 'S', 'R', 'K', 'J', 'S'],
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

const DayOfWeekPicker = ({ lang, onSelectDays }: Props) => {
  const [selectedDays, setSelectedDays] = useState<boolean[]>([]);

  useEffect(() => {
    setSelectedDays(() => langDayNames[lang].map(() => false));
  }, []);

  const handleSelectDay = (index: number) => {
    setSelectedDays(prevState => {
      const days = [...prevState];
      days[index] = !days[index];
      onSelectDays(days);
      return days;
    });
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        mt: toRem(16),
        mb: toRem(16),
        ml: toRem(8),
        mr: toRem(8),
      }}
    >
      {langDayNames[lang].map((val, index) => (
        <Day
          key={index}
          sx={selectedDays[index] ? styles.selected : {}}
          onClick={() => handleSelectDay(index)}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <Box>{val}</Box>
          </Stack>
        </Day>
      ))}
    </Stack>
  );
};

export default DayOfWeekPicker;
