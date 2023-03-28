import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const userList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: '@id()',
      remarks: '@remarks()',
      createBy: '@createBy()',
      createDate: '@createDate()',
      updateDate: '@updateDate()',
      company: '@company()',
      office: '@office()',
      loginName: '@loginName()',
      password: '@password()',
      no: '@no()',
      name: '@name()',
      email: '@email()',
      phone: '@phone()',
      mobile: '@mobile()',
      userType: '@userType()',
      loginIp: '@loginIp()',
      loginDate: '@loginDate()',
      loginFlag: '@loginFlag()',
      photo: '@photo()',
      oldLoginName: '@oldLoginName()',
      newPassword: '@newPassword()',
      oldLoginIp: '@oldLoginIp()',
      oldLoginDate: '@oldLoginDate()',
      role: '@role()',
      salespersonUrl: '@salespersonUrl()',
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/user/getUserPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, userList);
    },
  },
  {
    url: '/basic-api/user/getAllUserList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(userList);
    },
  },
  {
    url: '/basic-api/user/createUser',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/user/updateUser',
    timeout: 100,
    method: 'put',
    response: ({ item }) => {
      const { id } = item;
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/user/deleteUser',
    timeout: 100,
    method: 'delete',
    response: ({ item }) => {
      const { id } = item;
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
