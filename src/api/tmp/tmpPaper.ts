import { defHttp } from '/@/utils/http/axios';
import {
  TmpPaperItem,
  TmpPaperListGetResultModel,
  TmpPaperPageParams,
} from './model/tmpPaperModel';
import { ServiceEnum } from '@/enums/serviceEnum';

enum Api {
  TmpPaperPage = ServiceEnum.TICKET + '/tmp_paper/page',
  FindOne = ServiceEnum.TICKET + '/tmp_paper/{id}/detail',
  CreateTmpPaper = ServiceEnum.TICKET + '/tmp_paper/save',
  UpdateTmpPaper = ServiceEnum.TICKET + '/tmp_paper/modify',
  DeleteTmpPaper = ServiceEnum.TICKET + '/tmp_paper/{id}/remove',
  BathDeleteTmpPaper = ServiceEnum.TICKET + '/tmp_paper/batch_del',
}

export const getTmpPaperListByPage = (params: TmpPaperPageParams) =>
  defHttp.get<TmpPaperListGetResultModel>({ url: Api.TmpPaperPage, params });

export const findOne = (id) => defHttp.get<TmpPaperItem>({ url: Api.FindOne.replace('{id}', id) });

export const createTmpPaper = (params?: TmpPaperItem) =>
  defHttp.post({ url: Api.CreateTmpPaper, params });

export const updateTmpPaper = (params?: TmpPaperItem) =>
  defHttp.put({ url: Api.UpdateTmpPaper, params });

export const deleteTmpPaper = (id: string) =>
  defHttp.delete({ url: Api.DeleteTmpPaper.replace('{id}', id) });

export const batchDeleteTmpPaper = (ids: string[]) =>
  defHttp.delete({ url: Api.BathDeleteTmpPaper, params: { ids } });
