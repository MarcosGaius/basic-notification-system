export interface IUserData {
  _id: string;
  name: string;
  subscribed_topics: string[];
  access_token: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserCreateData {
  name: string;
  email: string;
  password: string;
}
