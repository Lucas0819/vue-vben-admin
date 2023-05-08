import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { areaRecord } from '@/api/demo/cascader';

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
    title: '票图名称',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: '预览图',
    dataIndex: 'photourl',
    width: 120,
    defaultHidden: true,
  },
  {
    title: '所属区域',
    dataIndex: 'areaName',
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
    label: '票图名称',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'remarks',
    label: '票图描述',
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
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '票图名称',
    required: false,
    component: 'Input',
  },
  {
    field: 'remarks',
    label: '票图描述',
    required: false,
    component: 'Input',
  },
  {
    field: 'isPhotoUrl',
    component: 'CheckboxGroup',
    label: '特殊选项',
    componentProps: {
      options: [
        {
          label: '是否有预览图',
          value: '1',
        },
      ],
    },
    rules: [{ required: false }],
  },
  {
    field: 'photourl',
    label: '预览图',
    required: false,
    component: 'Input',
  },
];
