import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const baoliResultItem = {
  id: '@id()',
  remarks: '@remarks()',
  createBy: '@createBy()',
  createDate: '@createDate()',
  updateDate: '@updateDate()',
  msg: '@msg()',
  status: '@status()',
  result: '@result()',
};

const baoliResultList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(baoliResultItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/baoliResult/getBaoliResultPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, baoliResultList);
    },
  },
  {
    url: '/basic-api/baoliResult/getAllBaoliResultList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(baoliResultList);
    },
  },
  {
    url: '/basic-api/baoliResult/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(baoliResultItem);
    },
  },
  {
    url: '/basic-api/baoliResult/createBaoliResult',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/baoliResult/updateBaoliResult',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/baoliResult/deleteBaoliResult/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
