export interface UserList {
  id: string;
  fullname: string;
  username: string;
  extid: string;
  roles: string[];
}

export interface GetUserListResponse {
  pageNo: string;
  rows: number;
  users: UserList[];
}
