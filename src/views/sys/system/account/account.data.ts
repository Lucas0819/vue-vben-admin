import { h } from 'vue';
import { getAllRoleList } from '/@/api/sys/system';
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
    field: 'username',
    label: '用户名',
    component: 'Input',
    // helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('请输入手机号');
          }
          const phoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
          if (!phoneReg.test(value)) {
            return Promise.reject('请输入正确的手机号');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
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
    field: 'roleIds',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'name',
      valueField: 'id',
    },
    required: true,
  },
  {
    field: 'orgId',
    label: '所属部门',
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
  },
  {
    field: 'name',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('请输入手机号');
          }
          const emailReg =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!emailReg.test(value)) {
            return Promise.reject('请输入正确的手机号');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
