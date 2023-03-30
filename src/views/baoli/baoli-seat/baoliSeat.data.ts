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
    title: '坐标x',
    dataIndex: 'x',
    width: 120,
  },
  {
    title: '坐标y',
    dataIndex: 'y',
    width: 120,
  },
  {
    title: '?',
    dataIndex: 'pid',
    width: 120,
  },
  {
    title: '座位号',
    dataIndex: 'site',
    width: 120,
  },
  {
    title: '区域名',
    dataIndex: 'sf',
    width: 120,
  },
  {
    title: '?',
    dataIndex: 'sid',
    width: 120,
  },
  {
    title: '状态中文,暂不处理',
    dataIndex: 'sst',
    width: 120,
  },
  {
    title: '?',
    dataIndex: 'kid',
    width: 120,
  },
  {
    title: '?',
    dataIndex: 'secid',
    width: 120,
  },
  {
    title: '?',
    dataIndex: 'reservedCount',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'x',
    label: '坐标x',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'y',
    label: '坐标y',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'pid',
    label: '?',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'site',
    label: '座位号',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'sf',
    label: '区域名',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'sid',
    label: '?',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'sst',
    label: '状态中文,暂不处理',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'kid',
    label: '?',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'secid',
    label: '?',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'reservedCount',
    label: '?',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'x',
    label: '坐标x',
    required: false,
    component: 'Input',
  },
  {
    field: 'y',
    label: '坐标y',
    required: false,
    component: 'Input',
  },
  {
    field: 'pid',
    label: '?',
    required: false,
    component: 'Input',
  },
  {
    field: 'site',
    label: '座位号',
    required: false,
    component: 'Input',
  },
  {
    field: 'sf',
    label: '区域名',
    required: false,
    component: 'Input',
  },
  {
    field: 'sid',
    label: '?',
    required: false,
    component: 'Input',
  },
  {
    field: 'sst',
    label: '状态中文,暂不处理',
    required: false,
    component: 'Input',
  },
  {
    field: 'kid',
    label: '?',
    required: false,
    component: 'Input',
  },
  {
    field: 'secid',
    label: '?',
    required: false,
    component: 'Input',
  },
  {
    field: 'reservedCount',
    label: '?',
    required: false,
    component: 'Input',
  },
];
