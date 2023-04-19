import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export type TmpPaperParams = {
  id?: string;
  remarks?: string;
  // createBy?: User;
  createDate?: Date;
  updateDate?: Date;
  ticketFaceData?: string;
  ticketFaceWidth?: string;
  ticketFaceHeight?: string;
  bgImg?: string;
};

export type TmpPaperPageParams = BasicPageParams & TmpPaperParams;

export interface TmpPaperItem {
  id: string;
  remarks: string;
  // createBy: User;
  createDate: Date;
  updateDate: Date;
  ticketFaceData: string;
  ticketFaceWidth: string;
  ticketFaceHeight: string;
  bgImg: string;
}

export type TmpPaperListGetResultModel = BasicFetchResult<TmpPaperItem>;
