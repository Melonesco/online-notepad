export interface IAuthMe {
  _id: string;
  email: string;
  fullName: string;
  group: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export interface IAuthData {
  data: IAuthMe | null;
  status: string;
}
