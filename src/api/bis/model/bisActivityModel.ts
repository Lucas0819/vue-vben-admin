import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export type BisActivityParams = {
  id?: string;
  remarks?: string;
  // createBy?: User;
  createDate?: Date;
  updateDate?: Date;
  bisActivityTypeId?: string;
  tmpPlaceId?: string;
  name?: string;
  nameAlias?: string;
  photoVer?: string;
  photoPoster?: string;
  photoHor?: string;
  photoSmall?: string;
  describe?: string;
  isSale?: number;
  isSeat?: number;
  isTest?: number;
  isCheckDelay?: number;
  checkDelayMinute?: number;
  isAppendCheckDelayMsg?: number;
  appendCheckDelayMsg?: string;
  isOfficialNoCheckDelay?: number;
  isNoAgent?: number;
  isNotwxcard?: number;
  seq?: number;
  qyTotag?: string;
  promptOne?: string;
  promptTwo?: string;
  promptThree?: string;
  videoUrl?: string;
  attention?: string;
  bisActivityStateId?: string;
  fatherId?: string;
  // businessDiscount?: BigDecimal;
  // businessFixed?: BigDecimal;
  ext?: string;
  extSystem?: string;
  groupId?: string;
  pftName?: string;
  pftIds?: string;
  tmpPaperId?: string;
  isSnapup?: number;
  isRedisActivity?: number;
  childId?: string;
  isHide?: number;
  sysOfficeId?: string;
  bisUserId?: string;
  // tmpPlace?: TmpPlace;
  // bisActivityType?: Dict;
  // viewPrice?: ViewPrice;
  extInfo?: string;
  checkDelayMsg?: string;
  nameCorrect?: string;
  // bisActivityEventList?: List<BisActivityEvent>;
  // bisClassicPlateAct?: BisClassicPlateAct;
};

export type BisActivityPageParams = BasicPageParams & BisActivityParams;

export interface BisActivityItem {
  id: string;
  remarks: string;
  // createBy: User;
  createDate: Date;
  updateDate: Date;
  bisActivityTypeId: string;
  tmpPlaceId: string;
  name: string;
  nameAlias: string;
  photoVer: string;
  photoPoster: string;
  photoHor: string;
  photoSmall: string;
  describe: string;
  isSale: number;
  isSeat: number;
  isTest: number;
  isCheckDelay: number;
  checkDelayMinute: number;
  isAppendCheckDelayMsg: number;
  appendCheckDelayMsg: string;
  isOfficialNoCheckDelay: number;
  isNoAgent: number;
  isNotwxcard: number;
  seq: number;
  qyTotag: string;
  promptOne: string;
  promptTwo: string;
  promptThree: string;
  videoUrl: string;
  attention: string;
  bisActivityStateId: string;
  fatherId: string;
  // businessDiscount: BigDecimal;
  // businessFixed: BigDecimal;
  ext: string;
  extSystem: string;
  groupId: string;
  pftName: string;
  pftIds: string;
  tmpPaperId: string;
  isSnapup: number;
  isRedisActivity: number;
  childId: string;
  isHide: number;
  sysOfficeId: string;
  bisUserId: string;
  // tmpPlace: TmpPlace;
  // bisActivityType: Dict;
  // viewPrice: ViewPrice;
  extInfo: string;
  checkDelayMsg: string;
  nameCorrect: string;
  // bisActivityEventList: List<BisActivityEvent>;
  // bisClassicPlateAct: BisClassicPlateAct;
}

export type BisActivityListGetResultModel = BasicFetchResult<BisActivityItem>;
