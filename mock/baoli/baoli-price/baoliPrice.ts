import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const baoliPriceItem = {
  id: '@id()',
  remarks: '@remarks()',
  createBy: '@createBy()',
  createDate: '@createDate()',
  updateDate: '@updateDate()',
  price: '@price()',
  priceGrade: '@priceGrade()',
  priceGradeShow: '@priceGradeShow()',
  ticketPriceColor: '@ticketPriceColor()',
  ticketPriceId: '@ticketPriceId()',
  showPrice: '@showPrice()',
};

const baoliPriceList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(baoliPriceItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/baoliPrice/getBaoliPricePage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, baoliPriceList);
    },
  },
  {
    url: '/basic-api/baoliPrice/getAllBaoliPriceList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(baoliPriceList);
    },
  },
  {
    url: '/basic-api/baoliPrice/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(baoliPriceItem);
    },
  },
  {
    url: '/basic-api/baoliPrice/createBaoliPrice',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/baoliPrice/updateBaoliPrice',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/baoliPrice/deleteBaoliPrice/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
