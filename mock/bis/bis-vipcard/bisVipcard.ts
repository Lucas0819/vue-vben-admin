import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const bisVipcardItem = {
  id: '@id()',
  remarks: '@remarks()',
  createBy: '@createBy()',
  createDate: '@createDate()',
  updateDate: '@updateDate()',
  name: '@name()',
  limitTime: '@limitTime()',
  runLevel: '@runLevel()',
  isAdmin: '@isAdmin()',
  isAgent: '@isAgent()',
  seq: '@seq()',
  type: '@type()',
  discount: '@discount()',
  ctBuo: '@ctBuo()',
  ctBva: '@ctBva()',
};

const bisVipcardList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(bisVipcardItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/bisVipcard/getBisVipcardPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, bisVipcardList);
    },
  },
  {
    url: '/basic-api/bisVipcard/getAllBisVipcardList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(bisVipcardList);
    },
  },
  {
    url: '/basic-api/bisVipcard/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(bisVipcardItem);
    },
  },
  {
    url: '/basic-api/bisVipcard/createBisVipcard',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/bisVipcard/updateBisVipcard',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/bisVipcard/deleteBisVipcard/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
