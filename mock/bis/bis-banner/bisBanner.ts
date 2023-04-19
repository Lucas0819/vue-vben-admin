import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const bisBannerItem = {
  id: '@id()',
  remarks: '@remarks()',
  createBy: '@createBy()',
  createDate: '@createDate()',
  updateDate: '@updateDate()',
  name: '@name()',
  bisUserAgentId: '@bisUserAgentId()',
  imageSrc: '@imageSrc()',
  bisActivityId: '@bisActivityId()',
  link: '@link()',
  seq: '@seq()',
  sysOfficeId: '@sysOfficeId()',
};

const bisBannerList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(bisBannerItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/bisBanner/getBisBannerPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, bisBannerList);
    },
  },
  {
    url: '/basic-api/bisBanner/getAllBisBannerList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(bisBannerList);
    },
  },
  {
    url: '/basic-api/bisBanner/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(bisBannerItem);
    },
  },
  {
    url: '/basic-api/bisBanner/createBisBanner',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/bisBanner/updateBisBanner',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/bisBanner/deleteBisBanner/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
