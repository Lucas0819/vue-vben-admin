import { defHttp } from '/@/utils/http/axios';
import {
  BaoliSeatItem,
  BaoliSeatListGetResultModel,
  BaoliSeatPageParams,
  BaoliSeatParams,
} from './model/baoliSeatModel';

enum Api {
  BaoliSeatPage = '/baoliSeat/getBaoliSeatPage',
  GetAllBaoliSeatList = '/baoliSeat/getAllBaoliSeatList',
  FindOne = '/baoliSeat/findOne/{id}',
  CreateBaoliSeat = '/baoliSeat/createBaoliSeat',
  UpdateBaoliSeat = '/baoliSeat/updateBaoliSeat',
  DeleteBaoliSeat = '/baoliSeat/deleteBaoliSeat/{id}',
}

export const getBaoliSeatListByPage = (params: BaoliSeatPageParams) =>
  defHttp.get<BaoliSeatListGetResultModel>({ url: Api.BaoliSeatPage, params });

export const getAllBaoliSeatList = (params?: BaoliSeatParams) =>
  defHttp.get<BaoliSeatItem[]>({ url: Api.GetAllBaoliSeatList, params });

export const findOne = (id) => defHttp.get<BaoliSeatItem>({ url: Api.FindOne.replace('{id}', id) });

export const createBaoliSeat = (params?: BaoliSeatItem) =>
  defHttp.post({ url: Api.CreateBaoliSeat, params });

export const updateBaoliSeat = (params?: BaoliSeatItem) =>
  defHttp.put({ url: Api.UpdateBaoliSeat, params });

export const deleteBaoliSeat = (id: string) =>
  defHttp.delete({ url: Api.DeleteBaoliSeat.replace('{id}', id) });
