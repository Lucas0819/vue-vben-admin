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
    title: 'ticketFaceData',
    dataIndex: 'ticketFaceData',
    width: 120,
  },
  {
    title: 'ticketFaceWidth',
    dataIndex: 'ticketFaceWidth',
    width: 120,
  },
  {
    title: 'ticketFaceHeight',
    dataIndex: 'ticketFaceHeight',
    width: 120,
  },
  {
    title: 'bgImg',
    dataIndex: 'bgImg',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'ticketFaceData',
    label: 'ticketFaceData',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'ticketFaceWidth',
    label: 'ticketFaceWidth',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'ticketFaceHeight',
    label: 'ticketFaceHeight',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'bgImg',
    label: 'bgImg',
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
