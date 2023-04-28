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
    title: '备注',
    dataIndex: 'remarks',
    width: 120,
    defaultHidden: true,
  },
  {
    title: '创建者',
    dataIndex: 'createBy',
    width: 120,
    defaultHidden: true,
  },
  {
    title: '创建日期',
    dataIndex: 'createDate',
    width: 120,
    defaultHidden: true,
  },
  {
    title: '更新日期',
    dataIndex: 'updateDate',
    width: 120,
    defaultHidden: true,
  },
  {
    title: '场所名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '区域ID',
    dataIndex: 'areaId',
    width: 120,
  },
  {
    title: '票图模板ID',
    dataIndex: 'tmpChartId',
    width: 120,
  },
  {
    title: '微信门店ID',
    dataIndex: 'tmpPoiId',
    width: 120,
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    width: 120,
  },
  {
    title: '是否发布',
    dataIndex: 'isRelease',
    width: 120,
  },
  {
    title: 'longitude',
    dataIndex: 'longitude',
    width: 120,
  },
  {
    title: '扩展',
    dataIndex: 'latitude',
    width: 120,
  },
  {
    title: 'tmpChart',
    dataIndex: 'tmpChart',
    width: 120,
  },
  {
    title: 'areaName',
    dataIndex: 'areaName',
    width: 120,
  },
  {
    title: '是否选座',
    dataIndex: 'isSeat',
    width: 120,
  },
  {
    title: 'tmpPlaceBisId',
    dataIndex: 'tmpPlaceBisId',
    width: 120,
  },
  {
    title: 'tmpPlaceBisIsRelease',
    dataIndex: 'tmpPlaceBisIsRelease',
    width: 120,
  },
  {
    title: 'cnt',
    dataIndex: 'cnt',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '场所名称',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'areaId',
    label: '区域ID',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'tmpChartId',
    label: '票图模板ID',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'tmpPoiId',
    label: '微信门店ID',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'address',
    label: '详细地址',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'isRelease',
    label: '是否发布',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'longitude',
    label: 'longitude',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'latitude',
    label: '扩展',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'tmpChart',
    label: 'tmpChart',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'areaName',
    label: 'areaName',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'isSeat',
    label: '是否选座',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'tmpPlaceBisId',
    label: 'tmpPlaceBisId',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'tmpPlaceBisIsRelease',
    label: 'tmpPlaceBisIsRelease',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'cnt',
    label: 'cnt',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '场所名称',
    required: false,
    component: 'Input',
  },
  {
    field: 'areaId',
    label: '区域ID',
    required: false,
    component: 'Input',
  },
  {
    field: 'tmpChartId',
    label: '票图模板ID',
    required: false,
    component: 'Input',
  },
  {
    field: 'tmpPoiId',
    label: '微信门店ID',
    required: false,
    component: 'Input',
  },
  {
    field: 'address',
    label: '详细地址',
    required: false,
    component: 'Input',
  },
  {
    field: 'isRelease',
    label: '是否发布',
    required: false,
    component: 'Input',
  },
  {
    field: 'longitude',
    label: 'longitude',
    required: false,
    component: 'Input',
  },
  {
    field: 'latitude',
    label: '扩展',
    required: false,
    component: 'Input',
  },
  {
    field: 'tmpChart',
    label: 'tmpChart',
    required: false,
    component: 'Input',
  },
  {
    field: 'areaName',
    label: 'areaName',
    required: false,
    component: 'Input',
  },
  {
    field: 'isSeat',
    label: '是否选座',
    required: false,
    component: 'Input',
  },
  {
    field: 'tmpPlaceBisId',
    label: 'tmpPlaceBisId',
    required: false,
    component: 'Input',
  },
  {
    field: 'tmpPlaceBisIsRelease',
    label: 'tmpPlaceBisIsRelease',
    required: false,
    component: 'Input',
  },
  {
    field: 'cnt',
    label: 'cnt',
    required: false,
    component: 'Input',
  },
];
