import { defHttp } from '/@/utils/http/axios';
import {
  TmpChartItem,
  TmpChartListGetResultModel,
  TmpChartPageParams,
  TmpChartParams,
} from './model/tmpChartModel';
import { ServiceEnum } from '@/enums/serviceEnum';

enum Api {
  TmpChartPage = ServiceEnum.TICKET + '/tmp_chart/page',
  GetAllTmpChartList = ServiceEnum.TICKET + '/tmp_chart/list',
  FindOne = ServiceEnum.TICKET + '/tmp_chart/{id}/detail',
  CreateTmpChart = ServiceEnum.TICKET + '/tmp_chart/save',
  UpdateTmpChart = ServiceEnum.TICKET + '/tmp_chart/modify',
  DeleteTmpChart = ServiceEnum.TICKET + '/tmp_chart/{id}/remove',
  BatchDeleteTmpChart = ServiceEnum.TICKET + '/tmp_chart/remove',
}

export const getTmpChartListByPage = (params: TmpChartPageParams) =>
  defHttp.get<TmpChartListGetResultModel>({ url: Api.TmpChartPage, params });

export const getAllTmpChartList = (params?: TmpChartParams) =>
  defHttp.get<TmpChartItem[]>({ url: Api.GetAllTmpChartList, params });

export const findOne = (id) => defHttp.get<TmpChartItem>({ url: Api.FindOne.replace('{id}', id) });

export const createTmpChart = (params?: TmpChartItem) =>
  defHttp.post({ url: Api.CreateTmpChart, params });

export const updateTmpChart = (params?: TmpChartItem) =>
  defHttp.put({ url: Api.UpdateTmpChart, params });

export const deleteTmpChart = (id: string) =>
  defHttp.delete({ url: Api.DeleteTmpChart.replace('{id}', id) });

export const batchDeleteTmpChart = (id: string[]) =>
  defHttp.delete({ url: Api.BatchDeleteTmpChart, params: { id } });
