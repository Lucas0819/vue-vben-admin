import { defHttp } from '/@/utils/http/axios';
import {
  TmpChartItem,
  TmpChartListGetResultModel,
  TmpChartPageParams,
  TmpChartParams,
} from './model/tmpChartModel';

enum Api {
  TmpChartPage = '/tmpChart/getTmpChartPage',
  GetAllTmpChartList = '/tmpChart/getAllTmpChartList',
  CreateTmpChart = '/tmpChart/createTmpChart',
  UpdateTmpChart = '/tmpChart/updateTmpChart',
  DeleteTmpChart = '/tmpChart/deleteTmpChart/{tmpChartId}',
}

export const getTmpChartListByPage = (params: TmpChartPageParams) =>
  defHttp.get<TmpChartListGetResultModel>({ url: Api.TmpChartPage, params });

export const getAllTmpChartList = (params?: TmpChartParams) =>
  defHttp.get<TmpChartItem[]>({ url: Api.GetAllTmpChartList, params });

export const createTmpChart = (params?: TmpChartItem) =>
  defHttp.post({ url: Api.CreateTmpChart, params });

export const updateTmpChart = (params?: TmpChartItem) =>
  defHttp.put({ url: Api.UpdateTmpChart, params });

export const deleteTmpChart = (tmpChartId: string) =>
  defHttp.delete({ url: Api.DeleteTmpChart.replace('{tmpChartId}', tmpChartId) });
