import { defHttp } from '@/utils/http/axios';
import { CantonModel, CantonParams } from '@/api/sys/model/cantonModel';
import { ServiceEnum } from '@/enums/serviceEnum';

enum Api {
  GetCantonList = ServiceEnum.TICKET_GATEWAY + '/canton/cantons',
}

export const getCantonList = (params: CantonParams) =>
  defHttp.get<CantonModel[]>({ url: Api.GetCantonList, params });
