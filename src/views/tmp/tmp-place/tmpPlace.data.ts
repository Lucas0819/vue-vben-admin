import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { h } from 'vue';
import { Button } from 'ant-design-vue';
import { getCantonList } from '@/api/sys/canton';
import { CantonLevelEnum } from '@/enums/cantonLevelEnum';
import { getAllTmpChartList } from '@/api/tmp/tmpChart';

const { t } = useI18n();

const placeholderText = t('common.fuzzySearchText');

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    defaultHidden: true,
  },
  {
    title: '地址名称',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: '票图名称',
    dataIndex: 'tmpChartName', // .name
  },
  {
    title: '使用次数',
    dataIndex: 'activeNum',
    width: 120,
  },
  {
    title: '所属区域',
    dataIndex: 'areaId',
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
    dataIndex: 'updateTime',
    width: 160,
    sorter: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 160,
    sorter: true,
    defaultSortOrder: 'descend',
  },
  {
    title: '创建人',
    dataIndex: 'creator',
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
      api: getCantonList,
      // initFetchParams: {
      //   areaLevel: CantonLevelEnum.LEVEL_1,
      // },
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
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getAllTmpChartList,
      labelField: 'name,remarks',
      valueField: 'id',
    },
    itemProps: {
      extra: '提示：票图模板保存后不可修改',
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
    field: 'locatorAction',
    component: 'Input',
    label: ' ',
    slot: 'locatorAction',
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
    required: true,
    component: 'Input',
  },
  {
    field: 'latitude',
    label: '地图纬度',
    required: true,
    component: 'Input',
  },
  {
    field: 'remarks',
    label: '备注',
    required: false,
    component: 'Input',
  },
];
