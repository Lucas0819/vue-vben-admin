import { defHttp } from '/@/utils/http/axios';
import {
  BisActivityItem,
  BisActivityListGetResultModel,
  BisActivityPageParams,
  BisActivityParams,
} from './model/bisActivityModel';

enum Api {
  BisActivityPage = '/bisActivity/getBisActivityPage',
  GetAllBisActivityList = '/bisActivity/getAllBisActivityList',
  FindOne = '/bisActivity/findOne/{id}',
  CreateBisActivity = '/bisActivity/createBisActivity',
  UpdateBisActivity = '/bisActivity/updateBisActivity',
  DeleteBisActivity = '/bisActivity/deleteBisActivity/{id}',
}

export const getBisActivityListByPage = (params: BisActivityPageParams) =>
  defHttp.get<BisActivityListGetResultModel>({ url: Api.BisActivityPage, params });

export const getAllBisActivityList = (params?: BisActivityParams) =>
  defHttp.get<BisActivityItem[]>({ url: Api.GetAllBisActivityList, params });

export const findOne = (id) =>
  defHttp.get<BisActivityItem>({ url: Api.FindOne.replace('{id}', id) });

export const createBisActivity = (params?: BisActivityItem) =>
  defHttp.post({ url: Api.CreateBisActivity, params });

export const updateBisActivity = (params?: BisActivityItem) =>
  defHttp.put({ url: Api.UpdateBisActivity, params });

export const deleteBisActivity = (id: string) =>
  defHttp.delete({ url: Api.DeleteBisActivity.replace('{id}', id) });
