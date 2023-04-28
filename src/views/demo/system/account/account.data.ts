import { h } from 'vue';
import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { translateDictData } from '/@/utils/dict';

export const columns: BasicColumn[] = [
  {
    title: '员工姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '所属组织',
    dataIndex: 'orgName',
    width: 120,
  },
  {
    title: '员工角色',
    dataIndex: 'roleName',
    width: 180,
  },
  {
    title: '员工状态',
    dataIndex: 'status',
    width: 200,
    customRender: ({ record }) => {
      return h('span', translateDictData('tenant_staff_status', record.status));
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'queryParam',
    label: '员工姓名',
    component: 'Input',
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            isAccountExist(value)
              .then(() => resolve())
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    field: 'pwd',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    label: '角色',
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    required: true,
  },
  {
    field: 'dept',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
