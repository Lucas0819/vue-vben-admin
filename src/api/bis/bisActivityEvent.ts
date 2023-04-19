import { defHttp } from '/@/utils/http/axios';
import {
  BisActivityEventItem,
  BisActivityEventListGetResultModel,
  BisActivityEventPageParams,
  BisActivityEventParams,
} from './model/bisActivityEventModel';

enum Api {
  BisActivityEventPage = '/bisActivityEvent/getBisActivityEventPage',
  GetAllBisActivityEventList = '/bisActivityEvent/getAllBisActivityEventList',
  FindOne = '/bisActivityEvent/findOne/{id}',
  CreateBisActivityEvent = '/bisActivityEvent/createBisActivityEvent',
  UpdateBisActivityEvent = '/bisActivityEvent/updateBisActivityEvent',
  DeleteBisActivityEvent = '/bisActivityEvent/deleteBisActivityEvent/{id}',
}

export const getBisActivityEventListByPage = (params: BisActivityEventPageParams) =>
  defHttp.get<BisActivityEventListGetResultModel>({ url: Api.BisActivityEventPage, params });

export const getAllBisActivityEventList = (params?: BisActivityEventParams) =>
  defHttp.get<BisActivityEventItem[]>({ url: Api.GetAllBisActivityEventList, params });

export const findOne = (id) =>
  defHttp.get<BisActivityEventItem>({ url: Api.FindOne.replace('{id}', id) });

export const createBisActivityEvent = (params?: BisActivityEventItem) =>
  defHttp.post({ url: Api.CreateBisActivityEvent, params });

export const updateBisActivityEvent = (params?: BisActivityEventItem) =>
  defHttp.put({ url: Api.UpdateBisActivityEvent, params });

export const deleteBisActivityEvent = (id: string) =>
  defHttp.delete({ url: Api.DeleteBisActivityEvent.replace('{id}', id) });
