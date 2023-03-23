import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'name',
    align: 'left',
  },
  // {
  //   title: '部门类型',
  //   dataIndex: 'type',
  //   align: 'left',
  // },
];

export const searchFormSchema: FormSchema[] = [
  // {
  //   field: 'deptName',
  //   label: '部门名称',
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       { label: '启用', value: '0' },
  //       { label: '停用', value: '1' },
  //     ],
  //   },
  //   colProps: { span: 8 },
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '部门名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级部门',
    component: 'TreeSelect',

    componentProps: {
      fieldNames: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
    show: (renderCallbackParams) => {
      return renderCallbackParams?.values?.parentId !== '-1';
    },
  },
];
