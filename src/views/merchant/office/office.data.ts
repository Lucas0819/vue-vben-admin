import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

const placeholderText = t('common.fuzzySearchText');

export const columns: BasicColumn[] = [
  {
    title: 'id',
    dataIndex: 'id',
    defaultHidden: true,
  },
  {
    title: '二维码',
    dataIndex: 'zipCode',
    width: 60,
  },
  {
    title: '商户号',
    dataIndex: 'code',
    width: 80,
  },
  {
    title: '商户名称',
    dataIndex: 'name',
    width: 200,
    sorter: true,
  },
  {
    title: '上级商户',
    dataIndex: 'parent',
    width: 150,
    // customRender: ({ record }) => {
    //   return record.parent.name;
    // },
  },
  {
    title: '结算比例',
    dataIndex: 'settlementRatio',
    width: 90,
  },
  {
    title: '收款账户(真实姓名)',
    dataIndex: 'accName',
    width: 150,
  },
  {
    title: '卡券电话',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '修改时间',
    dataIndex: 'updateDate',
    width: 180,
    sorter: true,
    defaultHidden: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    width: 180,
    sorter: true,
    defaultSortOrder: 'descend',
  },
  {
    title: '支付账户状态',
    dataIndex: 'settleAccountStatus',
    width: 120,
    sorter: true,
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    sorter: true,
  },
  {
    title: '汇付账户ID',
    dataIndex: 'adaMemberId',
    sorter: true,
    defaultHidden: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '商户名称',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'settlementRatio',
    label: '结算比例',
    component: 'Select',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '全部', value: 'all' },
        { label: '0.6%', value: '1' },
        { label: '0.7%', value: '2' },
        { label: '1%', value: '3' },
        { label: '2.6%', value: '4' },
        { label: '2.7%', value: '5' },
      ],
    },
  },
  {
    field: 'remark',
    label: '商户备注',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'parentId',
    label: '上级商户',
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
    field: 'code',
    label: '商户号',
    defaultValue: '110946',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '商户名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '必填信息，长度上限为12汉字',
      maxLength: 12,
    },
  },
  {
    field: 'status',
    label: '商户状态',
    required: false,
    component: 'Select',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '2' },
      ],
    },
  },
  {
    field: 'area',
    label: '归属区域',
    required: false,
    component: 'Select',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '中国', value: '1' },
        { label: '辽宁省', value: '2' },
        { label: '大连市', value: '3' },
        { label: '沈阳市', value: '4' },
        { label: '抚顺市', value: '5' },
      ],
    },
  },
  {
    field: 'isClassicShop',
    label: '店铺风格',
    required: false,
    component: 'Select',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '默认', value: '0' },
        { label: '经典', value: '1' },
      ],
    },
  },
  {
    field: 'zipCode',
    label: '商户logo',
    required: false,
    component: 'Input',
  },
  {
    field: 'phone',
    label: '客服电话',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '必填信息',
    },
  },
  {
    field: 'email',
    label: '商户简介',
    required: false,
    component: 'InputTextArea',
  },
  {
    field: 'accOpenid',
    label: '汇付账户',
    required: false,
    component: 'Input',
  },
  {
    field: 'accName',
    label: '收款账户(真实姓名)',
    required: false,
    component: 'Input',
  },
  {
    field: 'remarks',
    label: '备注',
    required: false,
    component: 'InputTextArea',
  },
];
