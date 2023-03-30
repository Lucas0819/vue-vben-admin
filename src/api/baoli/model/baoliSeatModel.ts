import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export type BaoliSeatParams = {
  id?: string;
  remarks?: string;
  // createBy?: User;
  createDate?: Date;
  updateDate?: Date;
  // x?: int;
  // y?: int;
  // pid?: int;
  site?: string;
  sf?: string;
  // sid?: int;
  sst?: string;
  // kid?: int;
  secid?: string;
  reservedCount?: string;
};

export type BaoliSeatPageParams = BasicPageParams & BaoliSeatParams;

export interface BaoliSeatItem {
  id: string;
  remarks: string;
  // createBy: User;
  createDate: Date;
  updateDate: Date;
  // x: int;
  // y: int;
  // pid: int;
  site: string;
  sf: string;
  // sid: int;
  sst: string;
  // kid: int;
  secid: string;
  reservedCount: string;
}

export type BaoliSeatListGetResultModel = BasicFetchResult<BaoliSeatItem>;
