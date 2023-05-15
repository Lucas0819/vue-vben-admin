import { defHttp } from '/@/utils/http/axios';
import { GetUserInfoModel, LoginParams, LoginResultModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { ServiceProxyEnum } from '@/enums/httpEnum';

enum Api {
  Login = ServiceProxyEnum.AUTH + '/oauth/token',
  Logout = '/logout',
  GetUserInfo = ServiceProxyEnum.UPMS + '/common/user/info',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, headers: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
      headers,
    },
    {
      joinParamsToUrl: true,
      isTransformResponse: false,
      withToken: false,
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
