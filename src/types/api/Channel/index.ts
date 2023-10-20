export interface ChannelList {
  id: string;
  channel: string;
  name: string;
}

export interface GetChannelListResponse {
  pageNo: string;
  rows: number;
  channels: ChannelList[];
}
