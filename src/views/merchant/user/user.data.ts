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
    title: '归属公司',
    dataIndex: 'company',
    width: 120,
  },
  {
    title: '归属部门',
    dataIndex: 'office',
    width: 120,
  },
  {
    title: '登录名',
    dataIndex: 'loginName',
    width: 120,
  },
  {
    title: '密码',
    dataIndex: 'password',
    width: 120,
  },
  {
    title: '工号',
    dataIndex: 'no',
    width: 120,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '手机',
    dataIndex: 'mobile',
    width: 120,
  },
  {
    title: '用户类型',
    dataIndex: 'userType',
    width: 120,
  },
  {
    title: '最后登陆IP',
    dataIndex: 'loginIp',
    width: 120,
  },
  {
    title: '最后登陆日期',
    dataIndex: 'loginDate',
    width: 120,
  },
  {
    title: '是否允许登陆',
    dataIndex: 'loginFlag',
    width: 120,
  },
  {
    title: '头像',
    dataIndex: 'photo',
    width: 120,
  },
  {
    title: '原登录名',
    dataIndex: 'oldLoginName',
    width: 120,
  },
  {
    title: '新密码',
    dataIndex: 'newPassword',
    width: 120,
  },
  {
    title: '上次登陆IP',
    dataIndex: 'oldLoginIp',
    width: 120,
  },
  {
    title: '上次登陆日期',
    dataIndex: 'oldLoginDate',
    width: 120,
  },
  {
    title: '根据角色查询用户条件',
    dataIndex: 'role',
    width: 120,
  },
  {
    title: '销售员邀请链接',
    dataIndex: 'salespersonUrl',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'company',
    label: '归属公司',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'office',
    label: '归属部门',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'loginName',
    label: '登录名',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'password',
    label: '密码',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'no',
    label: '工号',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'phone',
    label: '电话',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'mobile',
    label: '手机',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'userType',
    label: '用户类型',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'loginIp',
    label: '最后登陆IP',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'loginDate',
    label: '最后登陆日期',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'loginFlag',
    label: '是否允许登陆',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'photo',
    label: '头像',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'oldLoginName',
    label: '原登录名',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'newPassword',
    label: '新密码',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'oldLoginIp',
    label: '上次登陆IP',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'oldLoginDate',
    label: '上次登陆日期',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'role',
    label: '根据角色查询用户条件',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'salespersonUrl',
    label: '销售员邀请链接',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'company',
    label: '归属公司',
    required: false,
    component: 'Input',
  },
  {
    field: 'office',
    label: '归属部门',
    required: false,
    component: 'Input',
  },
  {
    field: 'loginName',
    label: '登录名',
    required: false,
    component: 'Input',
  },
  {
    field: 'password',
    label: '密码',
    required: false,
    component: 'Input',
  },
  {
    field: 'no',
    label: '工号',
    required: false,
    component: 'Input',
  },
  {
    field: 'name',
    label: '姓名',
    required: false,
    component: 'Input',
  },
  {
    field: 'email',
    label: '邮箱',
    required: false,
    component: 'Input',
  },
  {
    field: 'phone',
    label: '电话',
    required: false,
    component: 'Input',
  },
  {
    field: 'mobile',
    label: '手机',
    required: false,
    component: 'Input',
  },
  {
    field: 'userType',
    label: '用户类型',
    required: false,
    component: 'Input',
  },
  {
    field: 'loginIp',
    label: '最后登陆IP',
    required: false,
    component: 'Input',
  },
  {
    field: 'loginDate',
    label: '最后登陆日期',
    required: false,
    component: 'Input',
  },
  {
    field: 'loginFlag',
    label: '是否允许登陆',
    required: false,
    component: 'Input',
  },
  {
    field: 'photo',
    label: '头像',
    required: false,
    component: 'Input',
  },
  {
    field: 'oldLoginName',
    label: '原登录名',
    required: false,
    component: 'Input',
  },
  {
    field: 'newPassword',
    label: '新密码',
    required: false,
    component: 'Input',
  },
  {
    field: 'oldLoginIp',
    label: '上次登陆IP',
    required: false,
    component: 'Input',
  },
  {
    field: 'oldLoginDate',
    label: '上次登陆日期',
    required: false,
    component: 'Input',
  },
  {
    field: 'role',
    label: '根据角色查询用户条件',
    required: false,
    component: 'Input',
  },
  {
    field: 'salespersonUrl',
    label: '销售员邀请链接',
    required: false,
    component: 'Input',
  },
];
