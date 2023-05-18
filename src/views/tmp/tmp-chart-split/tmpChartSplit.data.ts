import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 200,
    defaultHidden: true,
  },
  {
    title: '结构名称',
    dataIndex: 'name',
  },
  {
    title: '所含区域',
    dataIndex: 'remarks',
    width: 120,
  },
  {
    title: '行X列',
    dataIndex: 'initRow',
    width: 120,
    customRender: ({ record }) => {
      return `${record.initRow ?? 0}X${record.initColumn ?? 0}`;
    },
  },
  {
    title: '结构定位',
    dataIndex: 'splitCss',
  },
];

export const searchFormSchema: FormSchema[] = [];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '结构名称',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入结构名称',
    },
  },
  {
    field: 'initRow',
    label: '排数',
    required: false,
    component: 'InputNumber',
    defaultValue: 10,
    componentProps: {
      placeholder: '正整数,默认为:10',
    },
  },
  {
    field: 'initColumn',
    label: '列数',
    required: false,
    component: 'InputNumber',
    defaultValue: 10,
    componentProps: {
      placeholder: '正整数,默认为:10',
    },
  },
  {
    field: 'originRow',
    label: '原始行数',
    component: 'Input',
    show: false,
  },
  {
    field: 'originColumn',
    label: '原始列数',
    component: 'Input',
    show: false,
  },
];

// 全局设置-排号设置
export const globalNoRowsSettingFormSchema: FormSchema[] = [
  {
    field: 'rowNoGlobal',
    label: '排号起始',
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      placeholder: '正整数',
    },
  },
  {
    field: 'rowNoTypeGlobal',
    label: '延续方式',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: '正序',
          value: '1',
        },
        {
          label: '倒序',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'rowNoIntervalGlobal',
    label: '间隔',
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      placeholder: '正整数',
    },
  },
];

// 全局设置-列号设置-普通
export const globalNoColsSettingFormSchema: FormSchema[] = [
  {
    field: 'setTypeGlobal',
    label: '设置模式',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: '按舞台位置',
          value: '1',
        },
        {
          label: '普通模式',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'colNoGlobal',
    label: '列号起始',
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      placeholder: '正整数',
    },
  },
  {
    field: 'colNoTypeGlobal',
    label: '延续方式',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: '正序',
          value: '1',
        },
        {
          label: '倒序',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'colNoOrientationGlobal',
    label: '排布方向',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: '从左到右(|→)',
          value: '1',
        },
        {
          label: '从右到左(←|)',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'colNoIntervalGlobal',
    label: '间隔',
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      placeholder: '正整数',
    },
  },
];

// 全局设置-列号设置-舞台左侧
export const globalNoColsStageLeftSettingFormSchema: FormSchema[] = [
  {
    field: 'colNoLeftGlobal',
    label: '列号起始',
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      placeholder: '正整数',
    },
  },
  {
    field: 'colNoLeftTypeGlobal',
    label: '延续方式',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: '正序',
          value: '1',
        },
        {
          label: '倒序',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'colNoLeftOrientationGlobal',
    label: '排布方向',
    component: 'RadioGroup',
    defaultValue: '2',
    componentProps: {
      options: [
        {
          label: '从左到右(|→)',
          value: '1',
        },
        {
          label: '从右到左(←|)',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'colNoLeftIntervalGlobal',
    label: '间隔',
    component: 'InputNumber',
    defaultValue: 2,
    componentProps: {
      placeholder: '正整数',
    },
  },
];

// 全局设置-列号设置-舞台右侧
export const globalNoColsStageRightSettingFormSchema: FormSchema[] = [
  {
    field: 'colNoRightGlobal',
    label: '列号起始',
    component: 'InputNumber',
    defaultValue: 2,
    componentProps: {
      placeholder: '正整数',
    },
  },
  {
    field: 'colNoRightTypeGlobal',
    label: '延续方式',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: '正序',
          value: '1',
        },
        {
          label: '倒序',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'colNoRightOrientationGlobal',
    label: '排布方向',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: '从左到右(|→)',
          value: '1',
        },
        {
          label: '从右到左(←|)',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'colNoRightIntervalGlobal',
    label: '间隔',
    component: 'InputNumber',
    defaultValue: 2,
    componentProps: {
      placeholder: '正整数',
    },
  },
];
