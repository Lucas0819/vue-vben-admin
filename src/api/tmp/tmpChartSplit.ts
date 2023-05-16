import { defHttp } from '/@/utils/http/axios';
import {
  TmpChartSplitItem,
  TmpChartSplitListGetResultModel,
  TmpChartSplitPageParams,
  TmpChartSplitParams,
} from './model/tmpChartSplitModel';
import { ServiceEnum } from '@/enums/serviceEnum';

enum Api {
  TmpChartSplitPage = ServiceEnum.TICKET + '/tmp_chart_split/page',
  GetAllTmpChartSplitList = ServiceEnum.TICKET + '/tmp_chart_split/getAllTmpChartSplitList',
  FindOne = ServiceEnum.TICKET + '/tmp_chart_split/{id}/detail',
  CreateTmpChartSplit = ServiceEnum.TICKET + '/tmp_chart_split/save',
  UpdateTmpChartSplit = ServiceEnum.TICKET + '/tmp_chart_split/modify',
  DeleteTmpChartSplit = ServiceEnum.TICKET + '/tmp_chart_split/{id}/remove',
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
