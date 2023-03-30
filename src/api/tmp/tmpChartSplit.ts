import { defHttp } from '/@/utils/http/axios';
import {
  TmpChartSplitItem,
  TmpChartSplitListGetResultModel,
  TmpChartSplitPageParams,
  TmpChartSplitParams,
} from './model/tmpChartSplitModel';

enum Api {
  TmpChartSplitPage = '/tmpChartSplit/getTmpChartSplitPage',
  GetAllTmpChartSplitList = '/tmpChartSplit/getAllTmpChartSplitList',
  FindOne = '/tmpChartSplit/findOne/{id}',
  CreateTmpChartSplit = '/tmpChartSplit/createTmpChartSplit',
  UpdateTmpChartSplit = '/tmpChartSplit/updateTmpChartSplit',
  DeleteTmpChartSplit = '/tmpChartSplit/deleteTmpChartSplit/{id}',
}

export const getTmpChartSplitListByPage = (params: TmpChartSplitPageParams) =>
  defHttp.get<TmpChartSplitListGetResultModel>({ url: Api.TmpChartSplitPage, params });

export const getAllTmpChartSplitList = (params?: TmpChartSplitParams) =>
  defHttp.get<TmpChartSplitItem[]>({ url: Api.GetAllTmpChartSplitList, params });

export const findOne = (id) =>
  defHttp.get<TmpChartSplitItem>({ url: Api.FindOne.replace('{id}', id) });

export const createTmpChartSplit = (params?: TmpChartSplitItem) =>
  defHttp.post({ url: Api.CreateTmpChartSplit, params });

export const updateTmpChartSplit = (params?: TmpChartSplitItem) =>
  defHttp.put({ url: Api.UpdateTmpChartSplit, params });

export const deleteTmpChartSplit = (id: string) =>
  defHttp.delete({ url: Api.DeleteTmpChartSplit.replace('{id}', id) });
