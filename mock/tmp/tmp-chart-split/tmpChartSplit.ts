import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const tmpChartSplitList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: '@id()',
      remarks: '@remarks()',
      createBy: '@createBy()',
      createDate: '@createDate()',
      updateDate: '@updateDate()',
      tempChartId: '@tempChartId()',
      name: '@name()',
      initRow: '@initRow()',
      initColumn: '@initColumn()',
      stagePosition: '@stagePosition()',
      splitCss: '@splitCss()',
      desJson: '@desJson()',
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/tmpChartSplit/getTmpChartSplitPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, tmpChartSplitList);
    },
  },
  {
    url: '/basic-api/tmpChartSplit/getAllTmpChartSplitList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(tmpChartSplitList);
    },
  },
  {
    url: '/basic-api/tmpChartSplit/createTmpChartSplit',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/tmpChartSplit/updateTmpChartSplit',
    timeout: 100,
    method: 'put',
    response: ({ item }) => {
      const { id } = item;
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/tmpChartSplit/deleteTmpChartSplit',
    timeout: 100,
    method: 'delete',
    response: ({ item }) => {
      const { id } = item;
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
