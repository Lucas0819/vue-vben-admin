import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { getAllOfficeList } from '/@/api/merchant/office';
import { getCantonList } from '@/api/sys/canton';
import { CantonLevelEnum } from '@/enums/cantonLevelEnum';

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
    dataIndex: 'qrCodeUrl',
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
    dataIndex: 'parentName',
    width: 150,
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
    dataIndex: 'tel',
    width: 120,
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    width: 180,
    sorter: true,
    defaultHidden: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
    sorter: true,
    defaultSortOrder: 'descend',
  },
  {
    title: '支付账户状态',
    dataIndex: 'payState',
    width: 120,
    sorter: true,
  },
  {
    title: '备注',
    dataIndex: 'remark',
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
    defaultValue: '0.994',
    componentProps: {
      options: [
        { label: '全部', value: 'all' },
        { label: '0.6%', value: '0.994' },
        { label: '0.7%', value: '0.993' },
        { label: '1%', value: '0.99' },
        { label: '2.6%', value: '0.974' },
        { label: '2.7%', value: '0.973' },
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
    component: 'ApiSelect',
    componentProps: {
      api: getAllOfficeList,
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'code',
    label: '商户号',
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
        { label: '停用', value: '0' },
      ],
    },
  },
  {
    field: 'cityId',
    label: '归属区域',
    required: false,
    component: 'ApiCascader',
    componentProps: {
      api: getCantonList,
      initFetchParams: {
        areaLevel: CantonLevelEnum.LEVEL_1,
      },
      labelField: 'areaName',
      valueField: 'areaId',
      levelField: 'areaLevel',
      showSearch: true,
      isLeaf: (record) => {
        return record.areaLevel === CantonLevelEnum.LEVEL_3;
      },
    },
  },
  {
    field: 'shopStyle',
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
    field: 'qrCodeUrl',
    label: '商户logo',
    required: false,
    component: 'Input',
  },
  {
    field: 'tel',
    label: '客服电话',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '必填信息',
    },
  },
  {
    field: 'describe',
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
    field: 'remark',
    label: '备注',
    required: false,
    component: 'InputTextArea',
  },
];
