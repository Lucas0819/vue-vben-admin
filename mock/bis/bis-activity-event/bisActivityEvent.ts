import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const bisActivityEventItem = {
  id: '@id()',
  remarks: '@remarks()',
  createBy: '@createBy()',
  createDate: '@createDate()',
  updateDate: '@updateDate()',
  bisActivityId: '@bisActivityId()',
  bisActivityEventStateId: '@bisActivityEventStateId()',
  name: '@name()',
  showStart: '@showStart()',
  showEnd: '@showEnd()',
  sellStart: '@sellStart()',
  sellEnd: '@sellEnd()',
  checkStart: '@checkStart()',
  checkEnd: '@checkEnd()',
  isLong: '@isLong()',
  isOpen: '@isOpen()',
  isSplit: '@isSplit()',
  bisChartPhotourl: '@bisChartPhotourl()',
  createSeatState: '@createSeatState()',
  isAutoOffline: '@isAutoOffline()',
  sendMessageStatus: '@sendMessageStatus()',
  isHide: '@isHide()',
  seq: '@seq()',
  wpiaoProjectName: '@wpiaoProjectName()',
  wpiaoProjectId: '@wpiaoProjectId()',
  wpiaoEventName: '@wpiaoEventName()',
  wpiaoEventId: '@wpiaoEventId()',
  wpiaoProjectMsg: '@wpiaoProjectMsg()',
  sourceShowStart: '@sourceShowStart()',
  sourceShowEnd: '@sourceShowEnd()',
  beforeShowStart: '@beforeShowStart()',
  beforeShowEnd: '@beforeShowEnd()',
  isChangeDate: '@isChangeDate()',
  updateId: '@updateId()',
  updateName: '@updateName()',
  isOverdue: '@isOverdue()',
  isAdvanceSale: '@isAdvanceSale()',
  colorValue: '@colorValue()',
  bisActivity: '@bisActivity()',
  cgiCard: '@cgiCard()',
  bisEventPriceList: '@bisEventPriceList()',
  bisChartSplitList: '@bisChartSplitList()',
};

const bisActivityEventList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(bisActivityEventItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/bisActivityEvent/getBisActivityEventPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, bisActivityEventList);
    },
  },
  {
    url: '/basic-api/bisActivityEvent/getAllBisActivityEventList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(bisActivityEventList);
    },
  },
  {
    url: '/basic-api/bisActivityEvent/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(bisActivityEventItem);
    },
  },
  {
    url: '/basic-api/bisActivityEvent/createBisActivityEvent',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/bisActivityEvent/updateBisActivityEvent',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/bisActivityEvent/deleteBisActivityEvent/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
