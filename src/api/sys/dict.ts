import { defHttp } from '/@/utils/http/axios';
import { getDictModel } from '/@/api/sys/model/dictModel';

enum Api {
  GetAllDictList = '/upms/dict_enum/all',
}

/**
 * @description: Get user menu based on id
 */

export const getAllDictList = () => {
  return defHttp.get<getDictModel>({ url: Api.GetAllDictList });
};
