import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export type ViewPriceParams = {
  id?: string;
  remarks?: string;
  // createBy?: User;
  createDate?: Date;
  updateDate?: Date;
  minPrice?: number;
  maxPrice?: number;
  maxChannel?: number;
  minChannel?: number;
  agentDiscount?: number;
  minShowStart?: Date;
  maxShowStart?: Date;
  minShowEnd?: Date;
  maxShowEnd?: Date;
  maxSellStart?: Date;
  showPrice?: string;
  showChannel?: string;
  showStart?: string;
  isAdvanceSale?: number;
  minPriceChannel?: number;
  maxPriceChannel?: number;
  showPriceChannel?: string;
  bisUserOfficeId?: string;
  isApply?: string;
};

export type ViewPricePageParams = BasicPageParams & ViewPriceParams;

export interface ViewPriceItem {
  id: string;
  remarks: string;
  // createBy: User;
  createDate: Date;
  updateDate: Date;
  minPrice: number;
  maxPrice: number;
  maxChannel: number;
  minChannel: number;
  agentDiscount: number;
  minShowStart: Date;
  maxShowStart: Date;
  minShowEnd: Date;
  maxShowEnd: Date;
  maxSellStart: Date;
  showPrice: string;
  showChannel: string;
  showStart: string;
  isAdvanceSale: number;
  minPriceChannel: number;
  maxPriceChannel: number;
  showPriceChannel: string;
  bisUserOfficeId: string;
  isApply: string;
}

export type ViewPriceListGetResultModel = BasicFetchResult<ViewPriceItem>;
