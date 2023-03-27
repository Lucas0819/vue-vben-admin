import { defHttp } from '/@/utils/http/axios';
import {
  OfficeItem,
  OfficeListGetResultModel,
  OfficePageParams,
  OfficeParams,
} from './model/officeModel';

enum Api {
  OfficePage = '/office/getOfficePage',
  GetAllOfficeList = '/office/getAllOfficeList',
  CreateOffice = '/office/createOffice',
  UpdateOffice = '/office/updateOffice',
  DeleteOffice = '/office/deleteOffice/{officeId}',
}

export const getOfficeListByPage = (params: OfficePageParams) =>
  defHttp.get<OfficeListGetResultModel>({ url: Api.OfficePage, params });

export const getAllOfficeList = (params?: OfficeParams) =>
  defHttp.get<OfficeItem[]>({ url: Api.GetAllOfficeList, params });

export const createOffice = (params?: OfficeItem) =>
  defHttp.post({ url: Api.CreateOffice, params });

export const updateOffice = (params?: OfficeItem) => defHttp.put({ url: Api.UpdateOffice, params });

export const deleteOffice = (officeId: string) =>
  defHttp.delete({ url: Api.DeleteOffice.replace('{officeId}', officeId) });
