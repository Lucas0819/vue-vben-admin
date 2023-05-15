import { defHttp } from '/@/utils/http/axios';
import {
  TmpPaperItem,
  TmpPaperListGetResultModel,
  TmpPaperPageParams,
} from './model/tmpPaperModel';
import { ServiceProxyEnum } from '@/enums/httpEnum';

enum Api {
  TmpPaperPage = '/tmp_paper/page',
  FindOne = '/tmp_paper/{id}/detail',
  CreateTmpPaper = '/tmp_paper/save',
  UpdateTmpPaper = '/tmp_paper/modify',
  DeleteTmpPaper = '/tmp_paper/{id}/remove',
  BathDeleteTmpPaper = '/tmp_paper/batch_del',
}

export const getTmpPaperListByPage = (params: TmpPaperPageParams) =>
  defHttp.get<TmpPaperListGetResultModel>({ url: Api.TmpPaperPage, params });

export const findOne = (id) =>
  defHttp.get<TmpPaperItem>(
    { url: Api.FindOne.replace('{id}', id) },
    { serviceProxy: ServiceProxyEnum.TICKET },
  );

export const createTmpPaper = (params?: TmpPaperItem) =>
  defHttp.post({ url: Api.CreateTmpPaper, params });

export const updateTmpPaper = (params?: TmpPaperItem) =>
  defHttp.put({ url: Api.UpdateTmpPaper, params });

export const deleteTmpPaper = (id: string) =>
  defHttp.delete({ url: Api.DeleteTmpPaper.replace('{id}', id) });

export const batchDeleteTmpPaper = (ids: string[]) =>
  defHttp.delete({ url: Api.BathDeleteTmpPaper, params: { ids } });
