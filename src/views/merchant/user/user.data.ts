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
    title: '登录名',
    dataIndex: 'loginName',
    width: 120,
    sorter: true,
  },
  {
    title: '商户名称',
    dataIndex: 'name',
    width: 120,
    sorter: true,
  },
  {
    title: '用户类型',
    dataIndex: 'userType',
    width: 120,
    sorter: true,
  },
  {
    title: '用户角色',
    dataIndex: 'roleNames',
    width: 120,
  },
  {
    title: '修改时间',
    dataIndex: 'updateDate',
    width: 180,
    sorter: true,
  },
  {
    title: '上次登陆日期',
    dataIndex: 'oldLoginDate',
    width: 120,
    defaultSortOrder: 'descend',
  },
  {
    title: '活动分配',
    dataIndex: 'salespersonUrl',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'loginName',
    label: '登录名称',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'name',
    label: '商户名称',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '商户名称',
    required: true,
    component: 'Select',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '票票龙2', value: '1' },
        { label: '票票龙2', value: '2' },
        { label: '票票龙3', value: '3' },
        { label: '票票龙4', value: '4' },
        { label: '票票龙5', value: '5' },
      ],
    },
  },
  {
    field: 'loginName',
    label: '登录名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'password',
    label: '密码',
    required: true,
    component: 'Input',
  },
  {
    field: 'newPassword',
    label: '确认密码',
    required: true,
    component: 'Input',
  },
  {
    field: 'isPhone',
    component: 'CheckboxGroup',
    label: '手机号登录',
    componentProps: {
      options: [
        {
          label: '是',
          value: '1',
        },
      ],
    },
    rules: [{ required: false }],
  },
  {
    field: 'mobile',
    label: '手机号码',
    required: false,
    component: 'Input',
  },
  {
    field: 'userType',
    label: '用户类型',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: '管理员',
          value: '1',
        },
        {
          label: '检票员',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'roleNames',
    component: 'CheckboxGroup',
    label: '用户角色',
    componentProps: {
      options: [
        {
          label: '储值角色',
          value: '1',
        },
        {
          label: '仅订单管理和用户',
          value: '11',
        },
        {
          label: '票票龙客服',
          value: '12',
        },
        {
          label: '主办方',
          value: '13',
        },
      ],
    },
    rules: [{ required: false }],
  },
  {
    field: 'remarks',
    label: '备注',
    required: false,
    component: 'InputTextArea',
  },
];
