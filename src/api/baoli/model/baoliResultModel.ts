import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export type BaoliResultParams = {
  id?: string;
  remarks?: string;
  // createBy?: User;
  createDate?: Date;
  updateDate?: Date;
  msg?: string;
  status?: string;
  // result?: BaoliSeatsInfo;
};

export type BaoliResultPageParams = BasicPageParams & BaoliResultParams;

export interface BaoliResultItem {
  id: string;
  remarks: string;
  // createBy: User;
  createDate: Date;
  updateDate: Date;
  msg: string;
  status: string;
  // result: BaoliSeatsInfo;
}

export type BaoliResultListGetResultModel = BasicFetchResult<BaoliResultItem>;
