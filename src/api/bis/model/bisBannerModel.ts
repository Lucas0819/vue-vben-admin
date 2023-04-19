import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export type BisBannerParams = {
  id?: string;
  remarks?: string;
  // createBy?: User;
  createDate?: Date;
  updateDate?: Date;
  name?: string;
  bisUserAgentId?: string;
  imageSrc?: string;
  bisActivityId?: string;
  link?: string;
  seq?: number;
  sysOfficeId?: string;
};

export type BisBannerPageParams = BasicPageParams & BisBannerParams;

export interface BisBannerItem {
  id: string;
  remarks: string;
  // createBy: User;
  createDate: Date;
  updateDate: Date;
  name: string;
  bisUserAgentId: string;
  imageSrc: string;
  bisActivityId: string;
  link: string;
  seq: number;
  sysOfficeId: string;
}

export type BisBannerListGetResultModel = BasicFetchResult<BisBannerItem>;
