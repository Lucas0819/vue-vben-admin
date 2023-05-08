import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { areaRecord } from '@/api/demo/cascader';
import { h } from 'vue';
import { Button } from 'ant-design-vue';

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
    title: '地址名称',
    dataIndex: 'name',
    width: 120,
    sorter: true,
  },
  {
    title: '票图名称',
    dataIndex: 'tmpChart', // .name
    width: 120,
  },
  {
    title: '使用次数',
    dataIndex: 'cnt',
    width: 120,
  },
  {
    title: '所属区域',
    dataIndex: 'areaName',
    width: 120,
  },
  {
    title: '所属机构',
    dataIndex: 'createBy', // .company.name
    width: 120,
    defaultHidden: true,
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    width: 120,
    sorter: true,
  },
  {
    title: 'longitude',
    dataIndex: 'longitude',
    width: 120,
    defaultHidden: true,
  },
  {
    title: 'latitude',
    dataIndex: 'latitude',
    width: 120,
    defaultHidden: true,
  },
  {
    title: '修改时间',
    dataIndex: 'updateDate',
    width: 120,
    sorter: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    width: 120,
    sorter: true,
    defaultSortOrder: 'descend',
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '地址名称',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'remarks',
    label: '地址备注',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'areaId',
    label: '所属区域',
    component: 'ApiCascader',
    componentProps: {
      api: areaRecord,
      apiParamKey: 'parentCode',
      dataField: 'data',
      labelField: 'name',
      valueField: 'code',
      showSearch: true,
      isLeaf: (record) => {
        return !(record.levelType < 3);
      },
    },
  },
  {
    field: 'address',
    label: '详细地址',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'tmpChartId',
    label: '票图模板',
    required: false,
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
    field: 'name',
    label: '地址名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'areaId',
    label: '所属区域',
    required: false,
    component: 'Input',
  },
  {
    field: 'field1',
    component: 'Input',
    label: ' ',
    render: () => {
      return h(
        Button,
        {
          type: 'primary',
        },
        '选择位置',
      );
    },
  },
  {
    field: 'address',
    label: '详细地址',
    required: true,
    component: 'Input',
  },
  {
    field: 'longitude',
    label: '地图经度',
    required: false,
    component: 'Input',
  },
  {
    field: 'latitude',
    label: '地图纬度',
    required: false,
    component: 'Input',
  },
  {
    field: 'remarks',
    label: '备注',
    required: false,
    component: 'Input',
  },
];
