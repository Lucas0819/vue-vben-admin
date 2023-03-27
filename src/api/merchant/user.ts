import { defHttp } from '/@/utils/http/axios';
import { UserItem, UserListGetResultModel, UserPageParams, UserParams } from './model/userModel';

enum Api {
  UserPage = '/user/getUserPage',
  GetAllUserList = '/user/getAllUserList',
  CreateUser = '/user/createUser',
  UpdateUser = '/user/updateUser',
  DeleteUser = '/user/deleteUser/{userId}',
}

export const getUserListByPage = (params: UserPageParams) =>
  defHttp.get<UserListGetResultModel>({ url: Api.UserPage, params });

export const getAllUserList = (params?: UserParams) =>
  defHttp.get<UserItem[]>({ url: Api.GetAllUserList, params });

export const createUser = (params?: UserItem) => defHttp.post({ url: Api.CreateUser, params });

export const updateUser = (params?: UserItem) => defHttp.put({ url: Api.UpdateUser, params });

export const deleteUser = (userId: string) =>
  defHttp.delete({ url: Api.DeleteUser.replace('{userId}', userId) });
