import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { AxiosProgressEvent } from 'axios';
import { ServiceProxyEnum } from '@/enums/httpEnum';

enum Api {
  UploadFile = '/file/upload',
  DownloadFile = '/file/download/{fileName}',
}

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.UploadFile,
      onUploadProgress,
    },
    params,
    { serviceProxy: ServiceProxyEnum.UPMS },
  );
}

export const uploadFileUrl = (): string =>
  defHttp.getUrl({ url: Api.UploadFile }, { serviceProxy: ServiceProxyEnum.UPMS });

export const downloadFileUrl = (fileName: string): string =>
  defHttp.getUrl(
    { url: Api.DownloadFile.replace('{fileName}', fileName) },
    { serviceProxy: ServiceProxyEnum.UPMS },
  );
