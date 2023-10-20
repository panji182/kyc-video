export interface ServerConfigurationList {
  section: string;
  optionname: string;
  optionvalue: string;
}

export interface GetServerConfigurationListResponse {
  pageNo: string;
  rows: number;
  config: ServerConfigurationList[];
}
