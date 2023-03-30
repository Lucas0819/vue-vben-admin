import { defHttp } from '/@/utils/http/axios';
import {
  BaoliResultItem,
  BaoliResultListGetResultModel,
  BaoliResultPageParams,
  BaoliResultParams,
} from './model/baoliResultModel';

enum Api {
  BaoliResultPage = '/baoliResult/getBaoliResultPage',
  GetAllBaoliResultList = '/baoliResult/getAllBaoliResultList',
  FindOne = '/baoliResult/findOne/{id}',
  CreateBaoliResult = '/baoliResult/createBaoliResult',
  UpdateBaoliResult = '/baoliResult/updateBaoliResult',
  DeleteBaoliResult = '/baoliResult/deleteBaoliResult/{id}',
}

export const getBaoliResultListByPage = (params: BaoliResultPageParams) =>
  defHttp.get<BaoliResultListGetResultModel>({ url: Api.BaoliResultPage, params });

export const getAllBaoliResultList = (params?: BaoliResultParams) =>
  defHttp.get<BaoliResultItem[]>({ url: Api.GetAllBaoliResultList, params });

export const findOne = (id) =>
  defHttp.get<BaoliResultItem>({ url: Api.FindOne.replace('{id}', id) });

export const createBaoliResult = (params?: BaoliResultItem) =>
  defHttp.post({ url: Api.CreateBaoliResult, params });

export const updateBaoliResult = (params?: BaoliResultItem) =>
  defHttp.put({ url: Api.UpdateBaoliResult, params });

export const deleteBaoliResult = (id: string) =>
  defHttp.delete({ url: Api.DeleteBaoliResult.replace('{id}', id) });
