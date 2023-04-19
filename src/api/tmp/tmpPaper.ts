import { defHttp } from '/@/utils/http/axios';
import {
  TmpPaperItem,
  TmpPaperListGetResultModel,
  TmpPaperPageParams,
  TmpPaperParams,
} from './model/tmpPaperModel';

enum Api {
  TmpPaperPage = '/tmpPaper/getTmpPaperPage',
  GetAllTmpPaperList = '/tmpPaper/getAllTmpPaperList',
  FindOne = '/tmpPaper/findOne/{id}',
  CreateTmpPaper = '/tmpPaper/createTmpPaper',
  UpdateTmpPaper = '/tmpPaper/updateTmpPaper',
  DeleteTmpPaper = '/tmpPaper/deleteTmpPaper/{id}',
}

export const getTmpPaperListByPage = (params: TmpPaperPageParams) =>
  defHttp.get<TmpPaperListGetResultModel>({ url: Api.TmpPaperPage, params });

export const getAllTmpPaperList = (params?: TmpPaperParams) =>
  defHttp.get<TmpPaperItem[]>({ url: Api.GetAllTmpPaperList, params });

export const findOne = (id) => defHttp.get<TmpPaperItem>({ url: Api.FindOne.replace('{id}', id) });

export const createTmpPaper = (params?: TmpPaperItem) =>
  defHttp.post({ url: Api.CreateTmpPaper, params });

export const updateTmpPaper = (params?: TmpPaperItem) =>
  defHttp.put({ url: Api.UpdateTmpPaper, params });

export const deleteTmpPaper = (id: string) =>
  defHttp.delete({ url: Api.DeleteTmpPaper.replace('{id}', id) });
