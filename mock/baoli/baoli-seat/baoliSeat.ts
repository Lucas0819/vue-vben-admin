import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const baoliSeatItem = {
  id: '@id()',
  remarks: '@remarks()',
  createBy: '@createBy()',
  createDate: '@createDate()',
  updateDate: '@updateDate()',
  x: '@x()',
  y: '@y()',
  pid: '@pid()',
  site: '@site()',
  sf: '@sf()',
  sid: '@sid()',
  sst: '@sst()',
  kid: '@kid()',
  secid: '@secid()',
  reservedCount: '@reservedCount()',
};

const baoliSeatList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(baoliSeatItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/baoliSeat/getBaoliSeatPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, baoliSeatList);
    },
  },
  {
    url: '/basic-api/baoliSeat/getAllBaoliSeatList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(baoliSeatList);
    },
  },
  {
    url: '/basic-api/baoliSeat/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(baoliSeatItem);
    },
  },
  {
    url: '/basic-api/baoliSeat/createBaoliSeat',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/baoliSeat/updateBaoliSeat',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/baoliSeat/deleteBaoliSeat/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
