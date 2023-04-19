import { defHttp } from '/@/utils/http/axios';
import {
  ViewPriceItem,
  ViewPriceListGetResultModel,
  ViewPricePageParams,
  ViewPriceParams,
} from './model/viewPriceModel';

enum Api {
  ViewPricePage = '/viewPrice/getViewPricePage',
  GetAllViewPriceList = '/viewPrice/getAllViewPriceList',
  FindOne = '/viewPrice/findOne/{id}',
  CreateViewPrice = '/viewPrice/createViewPrice',
  UpdateViewPrice = '/viewPrice/updateViewPrice',
  DeleteViewPrice = '/viewPrice/deleteViewPrice/{id}',
}

export const getViewPriceListByPage = (params: ViewPricePageParams) =>
  defHttp.get<ViewPriceListGetResultModel>({ url: Api.ViewPricePage, params });

export const getAllViewPriceList = (params?: ViewPriceParams) =>
  defHttp.get<ViewPriceItem[]>({ url: Api.GetAllViewPriceList, params });

export const findOne = (id) => defHttp.get<ViewPriceItem>({ url: Api.FindOne.replace('{id}', id) });

export const createViewPrice = (params?: ViewPriceItem) =>
  defHttp.post({ url: Api.CreateViewPrice, params });

export const updateViewPrice = (params?: ViewPriceItem) =>
  defHttp.put({ url: Api.UpdateViewPrice, params });

export const deleteViewPrice = (id: string) =>
  defHttp.delete({ url: Api.DeleteViewPrice.replace('{id}', id) });
