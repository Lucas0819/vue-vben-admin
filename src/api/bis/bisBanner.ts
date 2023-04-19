import { defHttp } from '/@/utils/http/axios';
import {
  BisBannerItem,
  BisBannerListGetResultModel,
  BisBannerPageParams,
  BisBannerParams,
} from './model/bisBannerModel';

enum Api {
  BisBannerPage = '/bisBanner/getBisBannerPage',
  GetAllBisBannerList = '/bisBanner/getAllBisBannerList',
  FindOne = '/bisBanner/findOne/{id}',
  CreateBisBanner = '/bisBanner/createBisBanner',
  UpdateBisBanner = '/bisBanner/updateBisBanner',
  DeleteBisBanner = '/bisBanner/deleteBisBanner/{id}',
}

export const getBisBannerListByPage = (params: BisBannerPageParams) =>
  defHttp.get<BisBannerListGetResultModel>({ url: Api.BisBannerPage, params });

export const getAllBisBannerList = (params?: BisBannerParams) =>
  defHttp.get<BisBannerItem[]>({ url: Api.GetAllBisBannerList, params });

export const findOne = (id) => defHttp.get<BisBannerItem>({ url: Api.FindOne.replace('{id}', id) });

export const createBisBanner = (params?: BisBannerItem) =>
  defHttp.post({ url: Api.CreateBisBanner, params });

export const updateBisBanner = (params?: BisBannerItem) =>
  defHttp.put({ url: Api.UpdateBisBanner, params });

export const deleteBisBanner = (id: string) =>
  defHttp.delete({ url: Api.DeleteBisBanner.replace('{id}', id) });
