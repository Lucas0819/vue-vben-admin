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
    title: 'msg',
    dataIndex: 'msg',
    width: 120,
  },
  {
    title: 'status',
    dataIndex: 'status',
    width: 120,
  },
  {
    title: 'result',
    dataIndex: 'result',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'msg',
    label: 'msg',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'status',
    label: 'status',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'result',
    label: 'result',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'msg',
    label: 'msg',
    required: false,
    component: 'Input',
  },
  {
    field: 'status',
    label: 'status',
    required: false,
    component: 'Input',
  },
  {
    field: 'result',
    label: 'result',
    required: false,
    component: 'Input',
  },
];
