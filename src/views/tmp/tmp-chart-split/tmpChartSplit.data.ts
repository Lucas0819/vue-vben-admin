import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 200,
    defaultHidden: true,
  },
  {
    title: '结构名称',
    dataIndex: 'name',
  },
  {
    title: '所含区域',
    dataIndex: 'remarks',
    width: 120,
  },
  {
    title: '行X列',
    dataIndex: 'initRow',
    width: 120,
    customRender: ({ record }) => {
      return `${record.initRow ?? 0}X${record.initColumn ?? 0}`;
    },
  },
  {
    title: '结构定位',
    dataIndex: 'splitCss',
  },
];

export const searchFormSchema: FormSchema[] = [];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '结构名称',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入结构名称',
    },
  },
  {
    field: 'initRow',
    label: '排数',
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
  {
    field: 'originRow',
    label: '原始行数',
    component: 'Input',
    show: false,
  },
  {
    field: 'originColumn',
    label: '原始列数',
    component: 'Input',
    show: false,
  },
];
