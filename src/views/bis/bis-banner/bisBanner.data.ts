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
    title: '文字描述',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '用户代理ID',
    dataIndex: 'bisUserAgentId',
    width: 120,
  },
  {
    title: '图片地址',
    dataIndex: 'imageSrc',
    width: 120,
  },
  {
    title: '活动主表ID',
    dataIndex: 'bisActivityId',
    width: 120,
  },
  {
    title: '跳转地址',
    dataIndex: 'link',
    width: 120,
  },
  {
    title: '排序',
    dataIndex: 'seq',
    width: 120,
  },
  {
    title: '主办方',
    dataIndex: 'sysOfficeId',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '文字描述',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'bisUserAgentId',
    label: '用户代理ID',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'imageSrc',
    label: '图片地址',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'bisActivityId',
    label: '活动主表ID',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'link',
    label: '跳转地址',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'seq',
    label: '排序',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'sysOfficeId',
    label: '主办方',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '文字描述',
    required: false,
    component: 'Input',
  },
  {
    field: 'bisUserAgentId',
    label: '用户代理ID',
    required: false,
    component: 'Input',
  },
  {
    field: 'imageSrc',
    label: '图片地址',
    required: false,
    component: 'Input',
  },
  {
    field: 'bisActivityId',
    label: '活动主表ID',
    required: false,
    component: 'Input',
  },
  {
    field: 'link',
    label: '跳转地址',
    required: false,
    component: 'Input',
  },
  {
    field: 'seq',
    label: '排序',
    required: false,
    component: 'Input',
  },
  {
    field: 'sysOfficeId',
    label: '主办方',
    required: false,
    component: 'Input',
  },
];
