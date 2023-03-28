import { MockMethod } from 'vite-plugin-mock';
import { getRequestToken, requestParams, resultError, resultSuccess } from '../_util';

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'vben',
      realName: 'Vben Admin',
      avatar: '',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'test user',
      avatar: '',
      desc: 'tester',
      token: 'fakeToken2',
      homePath: '/dashboard/workbench',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ];
}

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
};
export default [
  // mock user login
  {
    url: '/basic-api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password,
      );
      if (!checkUser) {
        return resultError('Incorrect account or password！');
      }
      const { userId, username: _username, token, realName, desc, roles } = checkUser;
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
        desc,
      });
    },
  },
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/basic-api/upms/common/user/info',
    method: 'get',
    response: () => {
      return resultSuccess({
        sysUser: {
          id: '92',
          username: '18600000001',
          gender: '1',
          avatar: 'riten-64d0251a9e2d40d29d3d8023e2bac3de.jpg',
          name: '云盾01',
          phone: '18600000001',
          email: '2643336540@qq.com',
          userRole: '管理者',
          orgName: '大连星海假日酒店',
          companyName: null,
        },
        defaultTenantId: '1561887679644176385',
        defaultTenantType: '15030',
        defaultTenantName: '大连星海假日酒店',
        permissions: [
          {
            id: '10000',
            parentId: '-1',
            children: [
              {
                id: '10001',
                parentId: '10000',
                children: [
                  {
                    id: '10002',
                    parentId: '10001',
                    children: [],
                    code: 'fire_handle_look',
                    name: '火警处置台查看',
                    type: '15910',
                    description: null,
                  },
                  {
                    id: '10003',
                    parentId: '10001',
                    children: [],
                    code: 'fire_handle_execute',
                    name: '火警处置台处置',
                    type: '15910',
                    description: null,
                  },
                ],
                code: 'fire_handle_manage',
                name: '火警处置',
                type: '15910',
                description: null,
              },
              {
                id: '10020',
                parentId: '10000',
                children: [
                  {
                    id: '10021',
                    parentId: '10020',
                    children: [],
                    code: 'fire_today_data_look',
                    name: '今日数据查看',
                    type: '15910',
                    description: null,
                  },
                ],
                code: 'fire_today_data',
                name: '今日数据',
                type: '15910',
                description: null,
              },
            ],
          },
        ],
        roles: ['1561887679841308674'],
        tenants: [
          {
            id: '1559459975997165570',
            name: 'Jason测试租户1',
            shortName: '云盾',
            visualAddress: null,
            longitude: '121.608891',
            latitude: '38.906414',
            logo: 'riten-a0ba7bff2c534ee09a4fe1d987fbed27.jpeg',
          },
          {
            id: '1561887679644176385',
            name: '大连星海假日酒店',
            shortName: '星海假日',
            visualAddress: 'https://www.thingjs.com/pp/237e30be704edf5d364d6661',
            longitude: '114.144001',
            latitude: '22.2005',
            logo: null,
          },
          {
            id: '1561888005197664257',
            name: '辽宁省图书馆',
            shortName: null,
            visualAddress: null,
            longitude: '',
            latitude: '',
            logo: null,
          },
          {
            id: '1561888157857746945',
            name: '北京大学医学部',
            shortName: null,
            visualAddress: 'https://www.thingjs.com/pp/5b9ca3c9b96512edb7de07cb',
            longitude: '',
            latitude: '',
            logo: null,
          },
          {
            id: '1561888359289196546',
            name: '中国科学院大学能源学院',
            shortName: null,
            visualAddress: null,
            longitude: '',
            latitude: '',
            logo: null,
          },
          {
            id: '1561897465748131841',
            name: '辽宁省博物馆',
            shortName: null,
            visualAddress: null,
            longitude: '121.514252',
            latitude: '38.846706',
            logo: null,
          },
          {
            id: '1564126415706656770',
            name: '云盾物联网实验室',
            shortName: '556',
            visualAddress: '6666',
            longitude: '121.592988',
            latitude: '38.918634',
            logo: null,
          },
        ],
      });
    },
  },
  {
    url: '/basic-api/getPermCode',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      const codeList = fakeCodeList[checkUser.userId];

      return resultSuccess(codeList);
    },
  },
  {
    url: '/basic-api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' });
    },
  },
  {
    url: '/basic-api/testRetry',
    statusCode: 405,
    method: 'get',
    response: () => {
      return resultError('Error!');
    },
  },
] as MockMethod[];
