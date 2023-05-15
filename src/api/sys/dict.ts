import { defHttp } from '/@/utils/http/axios';
import { getDictModel } from '/@/api/sys/model/dictModel';
import { ServiceProxyEnum } from '@/enums/httpEnum';

enum Api {
  GetAllDictList = ServiceProxyEnum.UPMS + '/dict_enum/all',
}

/**
 * @description: Get user menu based on id
 */

export const getAllDictList = () => {
  return defHttp.get<getDictModel>({ url: Api.GetAllDictList });
};
