import { defHttp } from '/@/utils/http/axios';
import {
  BaoliPriceItem,
  BaoliPriceListGetResultModel,
  BaoliPricePageParams,
  BaoliPriceParams,
} from './model/baoliPriceModel';

enum Api {
  BaoliPricePage = '/baoliPrice/getBaoliPricePage',
  GetAllBaoliPriceList = '/baoliPrice/getAllBaoliPriceList',
  FindOne = '/baoliPrice/findOne/{id}',
  CreateBaoliPrice = '/baoliPrice/createBaoliPrice',
  UpdateBaoliPrice = '/baoliPrice/updateBaoliPrice',
  DeleteBaoliPrice = '/baoliPrice/deleteBaoliPrice/{id}',
}

export const getBaoliPriceListByPage = (params: BaoliPricePageParams) =>
  defHttp.get<BaoliPriceListGetResultModel>({ url: Api.BaoliPricePage, params });

export const getAllBaoliPriceList = (params?: BaoliPriceParams) =>
  defHttp.get<BaoliPriceItem[]>({ url: Api.GetAllBaoliPriceList, params });

export const findOne = (id) =>
  defHttp.get<BaoliPriceItem>({ url: Api.FindOne.replace('{id}', id) });

export const createBaoliPrice = (params?: BaoliPriceItem) =>
  defHttp.post({ url: Api.CreateBaoliPrice, params });

export const updateBaoliPrice = (params?: BaoliPriceItem) =>
  defHttp.put({ url: Api.UpdateBaoliPrice, params });

export const deleteBaoliPrice = (id: string) =>
  defHttp.delete({ url: Api.DeleteBaoliPrice.replace('{id}', id) });
