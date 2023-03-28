import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 120,
    defaultHidden: true,
  },
  {
    title: '模板名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '区域',
    dataIndex: 'areaId',
    width: 120,
  },
  {
    title: '多结构',
    dataIndex: 'isSplit',
    width: 120,
  },
  {
    title: '多结构预览图',
    dataIndex: 'photourl',
    width: 120,
  },
  {
    title: '是否发布',
    dataIndex: 'isRelease',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '模板名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'areaId',
    label: '区域',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'isSplit',
    label: '多结构',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'photourl',
    label: '多结构预览图',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'isRelease',
    label: '是否发布',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '模板名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'areaId',
    label: '区域',
    required: true,
    component: 'Input',
  },
  {
    field: 'isSplit',
    label: '多结构',
    required: true,
    component: 'Input',
  },
  {
    field: 'photourl',
    label: '多结构预览图',
    required: true,
    component: 'Input',
  },
  {
    field: 'isRelease',
    label: '是否发布',
    required: true,
    component: 'Input',
  },
];
