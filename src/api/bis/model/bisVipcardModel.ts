import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export type BisVipcardParams = {
  id?: string;
  remarks?: string;
  // createBy?: User;
  createDate?: Date;
  updateDate?: Date;
  name?: string;
  limitTime?: number;
  runLevel?: number;
  isAdmin?: number;
  isAgent?: number;
  seq?: number;
  type?: string;
  discount?: number;
  ctBuo?: number;
  ctBva?: number;
};

export type BisVipcardPageParams = BasicPageParams & BisVipcardParams;

export interface BisVipcardItem {
  id: string;
  remarks: string;
  // createBy: User;
  createDate: Date;
  updateDate: Date;
  name: string;
  limitTime: number;
  runLevel: number;
  isAdmin: number;
  isAgent: number;
  seq: number;
  type: string;
  discount: number;
  ctBuo: number;
  ctBva: number;
}

export type BisVipcardListGetResultModel = BasicFetchResult<BisVipcardItem>;
