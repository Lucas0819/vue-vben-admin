import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export type TmpPlaceParams = {
  id?: string;
  remarks?: string;
  // createBy?: User;
  createDate?: Date;
  updateDate?: Date;
  name?: string;
  areaId?: string;
  tmpChartId?: string;
  tmpPoiId?: string;
  address?: string;
  isRelease?: number;
  longitude?: number;
  latitude?: number;
  // tmpChart?: TmpChart;
  areaName?: string;
  isSeat?: number;
  tmpPlaceBisId?: string;
  tmpPlaceBisIsRelease?: number;
  cnt?: number;
};

export type TmpPlacePageParams = BasicPageParams & TmpPlaceParams;

export interface TmpPlaceItem {
  id: string;
  remarks: string;
  // createBy: User;
  createDate: Date;
  updateDate: Date;
  name: string;
  areaId: string;
  tmpChartId: string;
  tmpPoiId: string;
  address: string;
  isRelease: number;
  longitude: number;
  latitude: number;
  // tmpChart: TmpChart;
  areaName: string;
  isSeat: number;
  tmpPlaceBisId: string;
  tmpPlaceBisIsRelease: number;
  cnt: number;
}

export type TmpPlaceListGetResultModel = BasicFetchResult<TmpPlaceItem>;
