import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const bisActivityItem = {
  id: '@id()',
  remarks: '@remarks()',
  createBy: '@createBy()',
  createDate: '@createDate()',
  updateDate: '@updateDate()',
  bisActivityTypeId: '@bisActivityTypeId()',
  tmpPlaceId: '@tmpPlaceId()',
  name: '@name()',
  nameAlias: '@nameAlias()',
  photoVer: '@photoVer()',
  photoPoster: '@photoPoster()',
  photoHor: '@photoHor()',
  photoSmall: '@photoSmall()',
  describe: '@describe()',
  isSale: '@isSale()',
  isSeat: '@isSeat()',
  isTest: '@isTest()',
  isCheckDelay: '@isCheckDelay()',
  checkDelayMinute: '@checkDelayMinute()',
  isAppendCheckDelayMsg: '@isAppendCheckDelayMsg()',
  appendCheckDelayMsg: '@appendCheckDelayMsg()',
  isOfficialNoCheckDelay: '@isOfficialNoCheckDelay()',
  isNoAgent: '@isNoAgent()',
  isNotwxcard: '@isNotwxcard()',
  seq: '@seq()',
  qyTotag: '@qyTotag()',
  promptOne: '@promptOne()',
  promptTwo: '@promptTwo()',
  promptThree: '@promptThree()',
  videoUrl: '@videoUrl()',
  attention: '@attention()',
  bisActivityStateId: '@bisActivityStateId()',
  fatherId: '@fatherId()',
  businessDiscount: '@businessDiscount()',
  businessFixed: '@businessFixed()',
  ext: '@ext()',
  extSystem: '@extSystem()',
  groupId: '@groupId()',
  pftName: '@pftName()',
  pftIds: '@pftIds()',
  tmpPaperId: '@tmpPaperId()',
  isSnapup: '@isSnapup()',
  isRedisActivity: '@isRedisActivity()',
  childId: '@childId()',
  isHide: '@isHide()',
  sysOfficeId: '@sysOfficeId()',
  bisUserId: '@bisUserId()',
  tmpPlace: '@tmpPlace()',
  bisActivityType: '@bisActivityType()',
  viewPrice: '@viewPrice()',
  extInfo: '@extInfo()',
  checkDelayMsg: '@checkDelayMsg()',
  nameCorrect: '@nameCorrect()',
  bisActivityEventList: '@bisActivityEventList()',
  bisClassicPlateAct: '@bisClassicPlateAct()',
};

const bisActivityList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(bisActivityItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/bisActivity/getBisActivityPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, bisActivityList);
    },
  },
  {
    url: '/basic-api/bisActivity/getAllBisActivityList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(bisActivityList);
    },
  },
  {
    url: '/basic-api/bisActivity/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(bisActivityItem);
    },
  },
  {
    url: '/basic-api/bisActivity/createBisActivity',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/bisActivity/updateBisActivity',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/bisActivity/deleteBisActivity/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
