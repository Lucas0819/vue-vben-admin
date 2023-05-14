import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { AxiosProgressEvent } from 'axios';

enum Api {
  UploadFile = '/file/upload',
  DownloadFile = '/file/download/{fileName}',
}

const globSetting = useGlobSetting();
const urlPrefix = globSetting.upmsUrlPrefix;

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
    { urlPrefix },
  );
}

export const uploadFileUrl = (): string => defHttp.getUrl({ url: Api.UploadFile }, { urlPrefix });

export const downloadFileUrl = (fileName: string): string =>
  defHttp.getUrl({ url: Api.DownloadFile.replace('{fileName}', fileName) }, { urlPrefix });
