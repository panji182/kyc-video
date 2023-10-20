import { Dayjs } from 'dayjs';

export interface WorkHourList {
  id: string;
  workhourname: string;
  monstart: string | Dayjs | null;
  monend: string | Dayjs | null;
  tuestart: string | Dayjs | null;
  tueend: string | Dayjs | null;
  wedstart: string | Dayjs | null;
  wedend: string | Dayjs | null;
  thustart: string | Dayjs | null;
  thuend: string | Dayjs | null;
  fristart: string | Dayjs | null;
  friend: string | Dayjs | null;
  satstart: string | Dayjs | null;
  satend: string | Dayjs | null;
  sunstart: string | Dayjs | null;
  sunend: string | Dayjs | null;
}

export interface GetWorkHourListResponse {
  pageNo: string;
  rows: number;
  workinghours: WorkHourList[];
}
