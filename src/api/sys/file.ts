import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { AxiosProgressEvent } from 'axios';
import { ServiceEnum } from '@/enums/serviceEnum';

enum Api {
  UploadFile = ServiceEnum.UPMS + '/file/upload',
  DownloadFile = ServiceEnum.UPMS + '/file/download/{fileName}',
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
  );
}

export const uploadFileUrl = (): string => defHttp.getUrl({ url: Api.UploadFile });

export const downloadFileUrl = (fileName: string): string =>
  defHttp.getUrl({ url: Api.DownloadFile.replace('{fileName}', fileName) });
