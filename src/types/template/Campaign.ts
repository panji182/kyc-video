import { Dayjs } from 'dayjs';

export interface CampaignInput {
  name: string;
  type: string;
  dateStart: Dayjs | undefined;
  dateEnd: Dayjs | undefined;
  timeStart: Dayjs | undefined;
  timeEnd: Dayjs | undefined;
}
