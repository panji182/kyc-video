import { Dayjs } from 'dayjs';

interface Holidays {
  name: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}
export interface HolidayInput {
  name: string;
  holidays: Holidays[];
}
