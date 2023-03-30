import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export type BaoliPriceParams = {
  id?: string;
  remarks?: string;
  // createBy?: User;
  createDate?: Date;
  updateDate?: Date;
  price?: string;
  priceGrade?: string;
  priceGradeShow?: string;
  ticketPriceColor?: string;
  ticketPriceId?: string;
  // showPrice?: Boolean;
};

export type BaoliPricePageParams = BasicPageParams & BaoliPriceParams;

export interface BaoliPriceItem {
  id: string;
  remarks: string;
  // createBy: User;
  createDate: Date;
  updateDate: Date;
  price: string;
  priceGrade: string;
  priceGradeShow: string;
  ticketPriceColor: string;
  ticketPriceId: string;
  // showPrice: Boolean;
}

export type BaoliPriceListGetResultModel = BasicFetchResult<BaoliPriceItem>;
