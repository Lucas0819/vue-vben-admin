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
    title: 'price',
    dataIndex: 'price',
    width: 120,
  },
  {
    title: 'priceGrade',
    dataIndex: 'priceGrade',
    width: 120,
  },
  {
    title: 'priceGradeShow',
    dataIndex: 'priceGradeShow',
    width: 120,
  },
  {
    title: 'ticketPriceColor',
    dataIndex: 'ticketPriceColor',
    width: 120,
  },
  {
    title: 'ticketPriceId',
    dataIndex: 'ticketPriceId',
    width: 120,
  },
  {
    title: 'showPrice',
    dataIndex: 'showPrice',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'price',
    label: 'price',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'priceGrade',
    label: 'priceGrade',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'priceGradeShow',
    label: 'priceGradeShow',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'ticketPriceColor',
    label: 'ticketPriceColor',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'ticketPriceId',
    label: 'ticketPriceId',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
  {
    field: 'showPrice',
    label: 'showPrice',
    component: 'Input',
    componentProps: { placeholder: placeholderText },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'price',
    label: 'price',
    required: false,
    component: 'Input',
  },
  {
    field: 'priceGrade',
    label: 'priceGrade',
    required: false,
    component: 'Input',
  },
  {
    field: 'priceGradeShow',
    label: 'priceGradeShow',
    required: false,
    component: 'Input',
  },
  {
    field: 'ticketPriceColor',
    label: 'ticketPriceColor',
    required: false,
    component: 'Input',
  },
  {
    field: 'ticketPriceId',
    label: 'ticketPriceId',
    required: false,
    component: 'Input',
  },
  {
    field: 'showPrice',
    label: 'showPrice',
    required: false,
    component: 'Input',
  },
];
