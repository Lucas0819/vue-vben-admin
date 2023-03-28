import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 120,
    defaultHidden: true,
  },
  {
    title: 'temp_chart_id',
    dataIndex: 'tempChartId',
    width: 120,
  },
  {
    title: '楼层',
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
    title: '舞台位置,-1为没有舞台,其他数字为所在列的后面,此处列数从1开始',
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

export const searchFormSchema: FormSchema[] = [
  {
    field: 'tempChartId',
    label: 'temp_chart_id',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'name',
    label: '楼层',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'initRow',
    label: '行数',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'initColumn',
    label: '列数',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'stagePosition',
    label: '舞台位置,-1为没有舞台,其他数字为所在列的后面,此处列数从1开始',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'splitCss',
    label: '多结构CSS',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'desJson',
    label: '明细JSON',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'tempChartId',
    label: 'temp_chart_id',
    required: true,
    component: 'Input',
  },
  {
    field: 'name',
    label: '楼层',
    required: true,
    component: 'Input',
  },
  {
    field: 'initRow',
    label: '行数',
    required: true,
    component: 'Input',
  },
  {
    field: 'initColumn',
    label: '列数',
    required: true,
    component: 'Input',
  },
  {
    field: 'stagePosition',
    label: '舞台位置,-1为没有舞台,其他数字为所在列的后面,此处列数从1开始',
    required: true,
    component: 'Input',
  },
  {
    field: 'splitCss',
    label: '多结构CSS',
    required: true,
    component: 'Input',
  },
  {
    field: 'desJson',
    label: '明细JSON',
    required: true,
    component: 'Input',
  },
];
