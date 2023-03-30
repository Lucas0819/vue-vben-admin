import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const tmpChartItem = {
  id: '@id()',
  remarks: '@remarks()',
  createBy: '@createBy()',
  createDate: '@createDate()',
  updateDate: '@updateDate()',
  name: '@name()',
  areaId: '@areaId()',
  isSplit: '@isSplit()',
  photourl: '@photourl()',
  isRelease: '@isRelease()',
  areaName: '@areaName()',
  cnt: '@cnt()',
};

const tmpChartList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(tmpChartItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/tmpChart/getTmpChartPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, tmpChartList);
    },
  },
  {
    url: '/basic-api/tmpChart/getAllTmpChartList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(tmpChartList);
    },
  },
  {
    url: '/basic-api/tmpChart/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(tmpChartItem);
    },
  },
  {
    url: '/basic-api/tmpChart/createTmpChart',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/tmpChart/updateTmpChart',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/tmpChart/deleteTmpChart/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
