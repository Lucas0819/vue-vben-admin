import { defHttp } from '/@/utils/http/axios';
import {
  OfficeItem,
  OfficeListGetResultModel,
  OfficePageParams,
  OfficeParams,
} from './model/officeModel';
import { ServiceEnum } from '@/enums/serviceEnum';

enum Api {
  OfficePage = ServiceEnum.TICKET_GATEWAY + '/tenant/page',
  GetAllOfficeList = ServiceEnum.TICKET_GATEWAY + '/tenant/list',
  FindOne = ServiceEnum.TICKET_GATEWAY + '/tenant/{id}/detail',
  CreateOffice = ServiceEnum.TICKET_GATEWAY + '/tenant',
  UpdateOffice = ServiceEnum.TICKET_GATEWAY + '/tenant',
  DeleteOffice = ServiceEnum.TICKET_GATEWAY + '/tenant/{id}',
}

export const getOfficeListByPage = (params: OfficePageParams) =>
  defHttp.get<OfficeListGetResultModel>({ url: Api.OfficePage, params });

export const getAllOfficeList = (params?: OfficeParams) =>
  defHttp.get<OfficeItem[]>({ url: Api.GetAllOfficeList, params });

export const findOne = (id) => defHttp.get<OfficeItem>({ url: Api.FindOne.replace('{id}', id) });

export const createOffice = (params?: OfficeItem) =>
  defHttp.post({ url: Api.CreateOffice, params });

export const updateOffice = (params?: OfficeItem) => defHttp.put({ url: Api.UpdateOffice, params });

export const deleteOffice = (id: string) =>
  defHttp.delete({ url: Api.DeleteOffice.replace('{id}', id) });
