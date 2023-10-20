export interface VideoJingleList {
  id: string;
  jinglename: string;
  jingletype: string;
  urlvideo: string;
  urlaudio: string;
  urlimage: string;
}

export interface GetVideoJingleListResponse {
  pageNo: string;
  rows: number;
  jingles: VideoJingleList[];
}
