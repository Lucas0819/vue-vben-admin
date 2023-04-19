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
    title: '会员卡名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '每个活动限购数量',
    dataIndex: 'limitTime',
    width: 120,
  },
  {
    title: '每单最少购票数量',
    dataIndex: 'runLevel',
    width: 120,
  },
  {
    title: '赠票权限',
    dataIndex: 'isAdmin',
    width: 120,
  },
  {
    title: '是否代理，0会员1代理',
    dataIndex: 'isAgent',
    width: 120,
  },
  {
    title: '排序',
    dataIndex: 'seq',
    width: 120,
  },
  {
    title: '使用类型',
    dataIndex: 'type',
    width: 120,
  },
  {
    title: '默认折扣',
    dataIndex: 'discount',
    width: 120,
  },
  {
    title: '用户数量',
    dataIndex: 'ctBuo',
    width: 120,
  },
  {
    title: '活动数量',
    dataIndex: 'ctBva',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '会员卡名称',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'limitTime',
    label: '每个活动限购数量',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'runLevel',
    label: '每单最少购票数量',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'isAdmin',
    label: '赠票权限',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'isAgent',
    label: '是否代理，0会员1代理',
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
    field: 'type',
    label: '使用类型',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'discount',
    label: '默认折扣',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'ctBuo',
    label: '用户数量',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'ctBva',
    label: '活动数量',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '会员卡名称',
    required: false,
    component: 'Input',
  },
  {
    field: 'limitTime',
    label: '每个活动限购数量',
    required: false,
    component: 'Input',
  },
  {
    field: 'runLevel',
    label: '每单最少购票数量',
    required: false,
    component: 'Input',
  },
  {
    field: 'isAdmin',
    label: '赠票权限',
    required: false,
    component: 'Input',
  },
  {
    field: 'isAgent',
    label: '是否代理，0会员1代理',
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
    field: 'type',
    label: '使用类型',
    required: false,
    component: 'Input',
  },
  {
    field: 'discount',
    label: '默认折扣',
    required: false,
    component: 'Input',
  },
  {
    field: 'ctBuo',
    label: '用户数量',
    required: false,
    component: 'Input',
  },
  {
    field: 'ctBva',
    label: '活动数量',
    required: false,
    component: 'Input',
  },
];
