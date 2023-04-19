import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const viewPriceItem = {
  id: '@id()',
  remarks: '@remarks()',
  createBy: '@createBy()',
  createDate: '@createDate()',
  updateDate: '@updateDate()',
  minPrice: '@minPrice()',
  maxPrice: '@maxPrice()',
  maxChannel: '@maxChannel()',
  minChannel: '@minChannel()',
  agentDiscount: '@agentDiscount()',
  minShowStart: '@minShowStart()',
  maxShowStart: '@maxShowStart()',
  minShowEnd: '@minShowEnd()',
  maxShowEnd: '@maxShowEnd()',
  maxSellStart: '@maxSellStart()',
  showPrice: '@showPrice()',
  showChannel: '@showChannel()',
  showStart: '@showStart()',
  isAdvanceSale: '@isAdvanceSale()',
  minPriceChannel: '@minPriceChannel()',
  maxPriceChannel: '@maxPriceChannel()',
  showPriceChannel: '@showPriceChannel()',
  bisUserOfficeId: '@bisUserOfficeId()',
  isApply: '@isApply()',
};

const viewPriceList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(viewPriceItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/viewPrice/getViewPricePage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, viewPriceList);
    },
  },
  {
    url: '/basic-api/viewPrice/getAllViewPriceList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(viewPriceList);
    },
  },
  {
    url: '/basic-api/viewPrice/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(viewPriceItem);
    },
  },
  {
    url: '/basic-api/viewPrice/createViewPrice',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/viewPrice/updateViewPrice',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/viewPrice/deleteViewPrice/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
