import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';
import { TmpPaperElTypeEnum } from '@/enums/tmp/tmpPaperEnum';

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
  id?: string;
  remarks: string;
  // createBy: User;
  createDate?: Date;
  updateDate?: Date;
  ticketFaceData: string;
  ticketFaceDataParse?: TmpPaperFaceDataItem;
  ticketFaceWidth: number;
  ticketFaceHeight: number;
  bgImg: string;
}

/**
 * 票纸内元素
 */
export interface TmpPaperElItem {
  _id?: string;
  _key?: string;
  elmTop: number;
  elmLef: number;
  elmWidth: number;
  elmHeight: number;
  fontBold: boolean;
  fontHeight: number;
  fontName: string;
  caption: string;
  title?: string;
  elementType: TmpPaperElTypeEnum;
  // 暂未处理字段
  fontHorizonal?: number;
  fontVertical?: number;
  fontReverse?: boolean;
  fontItalic?: boolean;
  fontUnderline?: boolean;
  diagonalLeft?: boolean;
  diagonalRight?: boolean;
  nonDefault?: string;
  oldId?: any;
  pattern?: string;
  borderDown?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
  borderUp?: boolean;
}

/**
 * 票纸面
 */
export interface TmpPaperFaceItem {
  backPic?: string;
  createTime?: Date;
  createUser?: number;
  newId?: number;
  oldId?: number;
  primaryKey?: number;
  printOrder?: number;
  printerDisplay?: string;
  printerName?: string;
  recordStatus?: boolean;
  showId?: number;
  sortNum?: number;
  subAtleft?: boolean;
  subQuantity?: number;
  subWidth?: number;
  ticketFaceShowId?: number;
  ticketHeight?: number;
  ticketSytle?: string;
  ticketWidth?: number;
  updateTime?: Date;
  updateUser?: number;
}

/**
 * 票纸Json总数据
 */
export interface TmpPaperFaceDataItem {
  orderDetailId?: string;
  orderId?: string;
  orderIdList?: any[];
  printNum?: number;
  seatInfo?: string;
  ticketFace: TmpPaperFaceItem;
  ticketElementList?: TmpPaperElItem[];
  remarks?: string;
}

export type TmpPaperListGetResultModel = BasicFetchResult<TmpPaperItem>;
