import { defHttp } from '/@/utils/http/axios';
import {
  BisVipcardItem,
  BisVipcardListGetResultModel,
  BisVipcardPageParams,
  BisVipcardParams,
} from './model/bisVipcardModel';

enum Api {
  BisVipcardPage = '/bisVipcard/getBisVipcardPage',
  GetAllBisVipcardList = '/bisVipcard/getAllBisVipcardList',
  FindOne = '/bisVipcard/findOne/{id}',
  CreateBisVipcard = '/bisVipcard/createBisVipcard',
  UpdateBisVipcard = '/bisVipcard/updateBisVipcard',
  DeleteBisVipcard = '/bisVipcard/deleteBisVipcard/{id}',
}

export const getBisVipcardListByPage = (params: BisVipcardPageParams) =>
  defHttp.get<BisVipcardListGetResultModel>({ url: Api.BisVipcardPage, params });

export const getAllBisVipcardList = (params?: BisVipcardParams) =>
  defHttp.get<BisVipcardItem[]>({ url: Api.GetAllBisVipcardList, params });

export const findOne = (id) =>
  defHttp.get<BisVipcardItem>({ url: Api.FindOne.replace('{id}', id) });

export const createBisVipcard = (params?: BisVipcardItem) =>
  defHttp.post({ url: Api.CreateBisVipcard, params });

export const updateBisVipcard = (params?: BisVipcardItem) =>
  defHttp.put({ url: Api.UpdateBisVipcard, params });

export const deleteBisVipcard = (id: string) =>
  defHttp.delete({ url: Api.DeleteBisVipcard.replace('{id}', id) });
