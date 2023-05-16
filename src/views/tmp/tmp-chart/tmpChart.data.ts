import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { getCantonList } from '@/api/sys/canton';
import { CantonLevelEnum } from '@/enums/cantonLevelEnum';
import { uploadApi } from '@/api/sys/file';

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
      api: getCantonList,
      initFetchParams: {
        areaLevel: CantonLevelEnum.LEVEL_1,
      },
      labelField: 'areaName',
      valueField: 'areaId',
      levelField: 'areaLevel',
      isLeaf: (record) => {
        return record.areaLevel === CantonLevelEnum.LEVEL_3;
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
    field: 'isSplit',
    component: 'Checkbox',
    label: '是否有预览图',
    defaultValue: false,
  },
  {
    field: 'photoUrl',
    label: '预览图',
    required: false,
    component: 'Upload',
    componentProps: {
      api: uploadApi,
      maxNumber: 1,
    },
  },
];
