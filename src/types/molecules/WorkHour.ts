import { Dayjs } from 'dayjs';

export interface WorkHourInput {
  name: string;
  mondayFrom: Dayjs | null;
  mondayTo: Dayjs | null;
  tuesdayFrom: Dayjs | null;
  tuesdayTo: Dayjs | null;
  wednesdayFrom: Dayjs | null;
  wednesdayTo: Dayjs | null;
  thursdayFrom: Dayjs | null;
  thursdayTo: Dayjs | null;
  fridayFrom: Dayjs | null;
  fridayTo: Dayjs | null;
  saturdayFrom: Dayjs | null;
  saturdayTo: Dayjs | null;
  sundayFrom: Dayjs | null;
  sundayTo: Dayjs | null;
}
