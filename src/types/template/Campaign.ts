import { Dayjs } from 'dayjs';

export interface CampaignInput {
  name: string;
  dateStart: Dayjs | null;
  dateEnd: Dayjs | null;
  workHour: any;
  holiday: any;
}
