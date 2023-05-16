import { defHttp } from '/@/utils/http/axios';
import {
  TmpPlaceItem,
  TmpPlaceListGetResultModel,
  TmpPlacePageParams,
  TmpPlaceParams,
} from './model/tmpPlaceModel';
import { ServiceEnum } from '@/enums/serviceEnum';

enum Api {
  TmpPlacePage = ServiceEnum.TICKET + '/tmp_place/type/{type}/page',
  GetAllTmpPlaceList = ServiceEnum.TICKET + '/tmp_place/getAllTmpPlaceList',
  FindOne = ServiceEnum.TICKET + '/tmp_place/{id}/detail',
  CreateTmpPlace = ServiceEnum.TICKET + '/tmp_place/save',
  UpdateTmpPlace = ServiceEnum.TICKET + '/tmp_place/modify',
  DeleteTmpPlace = ServiceEnum.TICKET + '/tmp_place/{id}/remove',
  BatchDeleteTmpPlace = ServiceEnum.TICKET + '/tmp_place/batch_remove',
}

export const getTmpPlaceListByPage = (params: TmpPlacePageParams) =>
  defHttp.get<TmpPlaceListGetResultModel>({ url: Api.TmpPlacePage.replace('{type}', '1'), params });

export const getAllTmpPlaceList = (params?: TmpPlaceParams) =>
  defHttp.get<TmpPlaceItem[]>({ url: Api.GetAllTmpPlaceList, params });

export const findOne = (id) => defHttp.get<TmpPlaceItem>({ url: Api.FindOne.replace('{id}', id) });

export const createTmpPlace = (params?: TmpPlaceItem) =>
  defHttp.post({ url: Api.CreateTmpPlace, params });

export const updateTmpPlace = (params?: TmpPlaceItem) =>
  defHttp.put({ url: Api.UpdateTmpPlace, params });

export const deleteTmpPlace = (id: string) =>
  defHttp.delete({ url: Api.DeleteTmpPlace.replace('{id}', id) });

export const batchDeleteTmpPlace = (ids: string[]) =>
  defHttp.delete({ url: Api.BatchDeleteTmpPlace, params: { ids } });
