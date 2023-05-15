import { defHttp } from '@/utils/http/axios';
import { ServiceProxyEnum } from '@/enums/httpEnum';
import { CantonModel, CantonParams } from '@/api/sys/model/cantonModel';

enum Api {
  GetCantonList = ServiceProxyEnum.TICKET_GATEWAY + '/canton/cantons',
}

export const getCantonList = (params: CantonParams) =>
  defHttp.get<CantonModel[]>({ url: Api.GetCantonList, params });
