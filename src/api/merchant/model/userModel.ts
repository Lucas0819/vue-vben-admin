import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export type UserParams = {
  // company?: Office;
  // office?: Office;
  loginName?: string;
  password?: string;
  no?: string;
  name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  userType?: string;
  loginIp?: string;
  loginDate?: Date;
  loginFlag?: string;
  photo?: string;
  oldLoginName?: string;
  newPassword?: string;
  oldLoginIp?: string;
  oldLoginDate?: Date;
  // role?: Role;
  salespersonUrl?: string;
};

export type UserPageParams = BasicPageParams & UserParams;

export interface UserItem {
  id: string;
  // company: Office;
  // office: Office;
  loginName: string;
  password: string;
  no: string;
  name: string;
  email: string;
  phone: string;
  mobile: string;
  userType: string;
  loginIp: string;
  loginDate: Date;
  loginFlag: string;
  photo: string;
  oldLoginName: string;
  newPassword: string;
  oldLoginIp: string;
  oldLoginDate: Date;
  // role: Role;
  salespersonUrl: string;
}

export type UserListGetResultModel = BasicFetchResult<UserItem>;
