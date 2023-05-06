import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 120,
    defaultHidden: true,
  },
  {
    title: 'id',
    dataIndex: 'tempChartId',
    width: 120,
    defaultHidden: true,
  },
  {
    title: '结构名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '行数',
    dataIndex: 'initRow',
    width: 120,
  },
  {
    title: '列数',
    dataIndex: 'initColumn',
    width: 120,
  },
  {
    title: '所含区域',
    dataIndex: 'stagePosition',
    width: 120,
  },
  {
    title: '多结构CSS',
    dataIndex: 'splitCss',
    width: 120,
  },
  {
    title: '明细JSON',
    dataIndex: 'desJson',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [];

export const formSchema: FormSchema[] = [
  {
    field: 'tempChartId',
    label: 'temp_chart_id',
    required: false,
    component: 'Input',
  },
  {
    field: 'name',
    label: '楼层',
    required: false,
    component: 'Input',
  },
  {
    field: 'initRow',
    label: '行数',
    required: false,
    component: 'Input',
  },
  {
    field: 'initColumn',
    label: '列数',
    required: false,
    component: 'Input',
  },
  {
    field: 'stagePosition',
    label: '舞台位置,-1为没有舞台,其他数字为所在列的后面,此处列数从1开始',
    required: false,
    component: 'Input',
  },
  {
    field: 'splitCss',
    label: '多结构CSS',
    required: false,
    component: 'Input',
  },
  {
    field: 'desJson',
    label: '明细JSON',
    required: false,
    component: 'Input',
  },
  {
    field: 'tmpChartName',
    label: 'tmpChartName',
    required: false,
    component: 'Input',
  },
];
