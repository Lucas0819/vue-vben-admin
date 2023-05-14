import { defHttp } from '/@/utils/http/axios';
import {
  TmpPaperItem,
  TmpPaperListGetResultModel,
  TmpPaperPageParams,
} from './model/tmpPaperModel';
import { useGlobSetting } from '@/hooks/setting';

enum Api {
  TmpPaperPage = '/tmp_paper/page',
  FindOne = '/tmp_paper/{id}/detail',
  CreateTmpPaper = '/tmp_paper/save',
  UpdateTmpPaper = '/tmp_paper/modify',
  DeleteTmpPaper = '/tmp_paper/{id}/remove',
  BathDeleteTmpPaper = '/tmp_paper/batch_del',
}

const globSetting = useGlobSetting();
const urlPrefix = globSetting.ticketUrlPrefix;

export const getTmpPaperListByPage = (params: TmpPaperPageParams) =>
  defHttp.get<TmpPaperListGetResultModel>({ url: Api.TmpPaperPage, params }, { urlPrefix });

export const findOne = (id) =>
  defHttp.get<TmpPaperItem>({ url: Api.FindOne.replace('{id}', id) }, { urlPrefix });

export const createTmpPaper = (params?: TmpPaperItem) =>
  defHttp.post({ url: Api.CreateTmpPaper, params }, { urlPrefix });

export const updateTmpPaper = (params?: TmpPaperItem) =>
  defHttp.put({ url: Api.UpdateTmpPaper, params }, { urlPrefix });

export const deleteTmpPaper = (id: string) =>
  defHttp.delete({ url: Api.DeleteTmpPaper.replace('{id}', id) }, { urlPrefix });

export const batchDeleteTmpPaper = (ids: string[]) =>
  defHttp.delete({ url: Api.BathDeleteTmpPaper, params: { ids } }, { urlPrefix });
