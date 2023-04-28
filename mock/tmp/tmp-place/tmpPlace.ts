import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const tmpPlaceItem = {
  id: '@id()',
  remarks: '@remarks()',
  createBy: '@createBy()',
  createDate: '@createDate()',
  updateDate: '@updateDate()',
  name: '@name()',
  areaId: '@areaId()',
  tmpChartId: '@tmpChartId()',
  tmpPoiId: '@tmpPoiId()',
  address: '@address()',
  isRelease: '@isRelease()',
  longitude: '@longitude()',
  latitude: '@latitude()',
  tmpChart: '@tmpChart()',
  areaName: '@areaName()',
  isSeat: '@isSeat()',
  tmpPlaceBisId: '@tmpPlaceBisId()',
  tmpPlaceBisIsRelease: '@tmpPlaceBisIsRelease()',
  cnt: '@cnt()',
};

const tmpPlaceList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(tmpPlaceItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/tmpPlace/getTmpPlacePage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, tmpPlaceList);
    },
  },
  {
    url: '/basic-api/tmpPlace/getAllTmpPlaceList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(tmpPlaceList);
    },
  },
  {
    url: '/basic-api/tmpPlace/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(tmpPlaceItem);
    },
  },
  {
    url: '/basic-api/tmpPlace/createTmpPlace',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/tmpPlace/updateTmpPlace',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/tmpPlace/deleteTmpPlace/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
