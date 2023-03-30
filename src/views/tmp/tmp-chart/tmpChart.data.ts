import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

const placeholderText = t('common.fuzzySearchText');

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
  {
    title: 'areaName',
    dataIndex: 'areaName',
    width: 120,
  },
  {
    title: 'cnt',
    dataIndex: 'cnt',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '模板名称',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'areaId',
    label: '区域',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'isSplit',
    label: '多结构',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'photourl',
    label: '多结构预览图',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'isRelease',
    label: '是否发布',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'areaName',
    label: 'areaName',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'cnt',
    label: 'cnt',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '模板名称',
    required: false,
    component: 'Input',
  },
  {
    field: 'areaId',
    label: '区域',
    required: false,
    component: 'Input',
  },
  {
    field: 'isSplit',
    label: '多结构',
    required: false,
    component: 'Input',
  },
  {
    field: 'photourl',
    label: '多结构预览图',
    required: false,
    component: 'Input',
  },
  {
    field: 'isRelease',
    label: '是否发布',
    required: false,
    component: 'Input',
  },
  {
    field: 'areaName',
    label: 'areaName',
    required: false,
    component: 'Input',
  },
  {
    field: 'cnt',
    label: 'cnt',
    required: false,
    component: 'Input',
  },
];
