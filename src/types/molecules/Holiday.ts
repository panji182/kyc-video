import { Dayjs } from 'dayjs';

export interface HolidayInput {
  name: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}
