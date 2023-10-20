import { Dayjs } from 'dayjs';

export interface HolidayList {
  id: string;
  holidayname: string;
}

export interface GetHolidayListResponse {
  pageNo: string;
  rows: number;
  holidays: HolidayList[];
}

export interface DetailHolidayList {
  id: string;
  name: string;
  date: string | Dayjs | null;
}

export interface GetDetailHolidayListResponse {
  holidayid: string;
  holidays: DetailHolidayList[];
}

export interface EditedHolidays {
  holiday: HolidayList;
  detailHolidays: DetailHolidayList[];
}
