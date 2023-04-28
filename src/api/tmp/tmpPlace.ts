import { defHttp } from '/@/utils/http/axios';
import {
  TmpPlaceItem,
  TmpPlaceListGetResultModel,
  TmpPlacePageParams,
  TmpPlaceParams,
} from './model/tmpPlaceModel';

enum Api {
  TmpPlacePage = '/tmpPlace/getTmpPlacePage',
  GetAllTmpPlaceList = '/tmpPlace/getAllTmpPlaceList',
  FindOne = '/tmpPlace/findOne/{id}',
  CreateTmpPlace = '/tmpPlace/createTmpPlace',
  UpdateTmpPlace = '/tmpPlace/updateTmpPlace',
  DeleteTmpPlace = '/tmpPlace/deleteTmpPlace/{id}',
}

export const getTmpPlaceListByPage = (params: TmpPlacePageParams) =>
  defHttp.get<TmpPlaceListGetResultModel>({ url: Api.TmpPlacePage, params });

export const getAllTmpPlaceList = (params?: TmpPlaceParams) =>
  defHttp.get<TmpPlaceItem[]>({ url: Api.GetAllTmpPlaceList, params });

export const findOne = (id) => defHttp.get<TmpPlaceItem>({ url: Api.FindOne.replace('{id}', id) });

export const createTmpPlace = (params?: TmpPlaceItem) =>
  defHttp.post({ url: Api.CreateTmpPlace, params });

export const updateTmpPlace = (params?: TmpPlaceItem) =>
  defHttp.put({ url: Api.UpdateTmpPlace, params });

export const deleteTmpPlace = (id: string) =>
  defHttp.delete({ url: Api.DeleteTmpPlace.replace('{id}', id) });
