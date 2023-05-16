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
    field: 'tmpChartName',
    label: '结构名称',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入结构名称',
    },
  },
  {
    field: 'initRow',
    label: '行数',
    required: false,
    component: 'InputNumber',
    defaultValue: 10,
    componentProps: {
      placeholder: '正整数,默认为:10',
    },
  },
  {
    field: 'initColumn',
    label: '列数',
    required: false,
    component: 'InputNumber',
    defaultValue: 10,
    componentProps: {
      placeholder: '正整数,默认为:10',
    },
  },
];
