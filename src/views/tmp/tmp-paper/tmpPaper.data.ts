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
    title: '描述',
    dataIndex: 'ticketFaceData',
    sorter: true,
  },
  {
    title: '票面宽度',
    dataIndex: 'ticketFaceWidth',
    width: 120,
  },
  {
    title: '票面高度',
    dataIndex: 'ticketFaceHeight',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    width: 180,
    sorter: true,
    defaultSortOrder: 'descend',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'ticketFaceData',
    label: '票纸描述',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'ticketFaceData',
    label: 'ticketFaceData',
    required: false,
    component: 'Input',
  },
  {
    field: 'ticketFaceWidth',
    label: 'ticketFaceWidth',
    required: false,
    component: 'Input',
  },
  {
    field: 'ticketFaceHeight',
    label: 'ticketFaceHeight',
    required: false,
    component: 'Input',
  },
  {
    field: 'bgImg',
    label: 'bgImg',
    required: false,
    component: 'Input',
  },
];
