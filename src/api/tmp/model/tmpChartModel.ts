import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export type TmpChartParams = {
  id?: string;
  remarks?: string;
  // createBy?: User;
  createDate?: Date;
  updateDate?: Date;
  name?: string;
  areaId?: string;
  isSplit?: string;
  photourl?: string;
  isRelease?: number;
  areaName?: string;
  cnt?: number;
};

export type TmpChartPageParams = BasicPageParams & TmpChartParams;

export interface TmpChartItem {
  id: string;
  remarks: string;
  // createBy: User;
  createDate: Date;
  updateDate: Date;
  name: string;
  areaId: string;
  isSplit: string;
  photourl: string;
  isRelease: number;
  areaName: string;
  cnt: number;
}

export type TmpChartListGetResultModel = BasicFetchResult<TmpChartItem>;
