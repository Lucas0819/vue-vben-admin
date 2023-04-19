import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const tmpPaperItem = {
  id: '@id()',
  remarks: '@remarks()',
  createBy: '@createBy()',
  createDate: '@createDate()',
  updateDate: '@updateDate()',
  ticketFaceData: '@ticketFaceData()',
  ticketFaceWidth: '@ticketFaceWidth()',
  ticketFaceHeight: '@ticketFaceHeight()',
  bgImg: '@bgImg()',
};

const tmpPaperList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(tmpPaperItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/tmpPaper/getTmpPaperPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, tmpPaperList);
    },
  },
  {
    url: '/basic-api/tmpPaper/getAllTmpPaperList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(tmpPaperList);
    },
  },
  {
    url: '/basic-api/tmpPaper/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(tmpPaperItem);
    },
  },
  {
    url: '/basic-api/tmpPaper/createTmpPaper',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/tmpPaper/updateTmpPaper',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/tmpPaper/deleteTmpPaper/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
