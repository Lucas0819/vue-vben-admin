import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const officeItem = {
  id: '@id()',
  remarks: 'Z-2023.3.24-原商户名称：中环辰星，改为：中环小剧场',
  createBy: '@createBy()',
  createDate: '2023-03-26 14:36:33',
  updateDate: '@updateDate()',
  parent: {
    id: '@id()',
    name: '@name()',
  },
  parentIds: '@parentIds()',
  name: '@name()',
  area: '@area()',
  code: '110953',
  type: '@type()',
  grade: '@grade()',
  address: '@address()',
  zipCode:
    'https://wx.pplon.cn/userfiles/logo/10d76d17c38b461f82f87118f4bcd7e4.png?v=1680057932911',
  master: '@master()',
  phone: '15121096118',
  fax: '@fax()',
  email: '@email()',
  useable: '@useable()',
  damaiUserName: '@damaiUserName()',
  zhiyoubaoUserName: '@zhiyoubaoUserName()',
  zhiyoubaoCorpCode: '@zhiyoubaoCorpCode()',
  zhiyoubaoPrivateKey: '@zhiyoubaoPrivateKey()',
  piaofutongUserName: '@piaofutongUserName()',
  piaofutongPassword: '@piaofutongPassword()',
  weipiaoUserName: '@weipiaoUserName()',
  weipiaoPassword: '@weipiaoPassword()',
  maizuoUserName: '@maizuoUserName()',
  maizuoPassword: '@maizuoPassword()',
  baoliUserName: '@baoliUserName()',
  baoliPassword: '@baoliPassword()',
  zhongyanUserName: '@zhongyanUserName()',
  zhongyanPassword: '@zhongyanPassword()',
  jqiclubSupplierIdentity: '@jqiclubSupplierIdentity()',
  jqiclubSignkey: '@jqiclubSignkey()',
  wpiaoUserName: '@wpiaoUserName()',
  pftmxUserName: '@pftmxUserName()',
  pftmxKey: '@pftmxKey()',
  maoyanUserName: '@maoyanUserName()',
  accOpenid: '@accOpenid()',
  accName: '@accName()',
  sysWxConfigId: '@sysWxConfigId()',
  maizuoNewLockType: '@maizuoNewLockType()',
  businessUserId: '@businessUserId()',
  businessAgentId: '@businessAgentId()',
  isClassicShop: '@isClassicShop()',
  merchantType: '@merchantType()',
  companyName: '@companyName()',
  provCode: '@provCode()',
  areaCode: '@areaCode()',
  socialCreditCode: '@socialCreditCode()',
  socialCreditCodeExpires: '@socialCreditCodeExpires()',
  businessScope: '@businessScope()',
  legalPerson: '@legalPerson()',
  legalCertId: '@legalCertId()',
  legalCertIdExpires: '@legalCertIdExpires()',
  legalMp: '@legalMp()',
  companyAddress: '@companyAddress()',
  bankCode: '@bankCode()',
  cardNo: '@cardNo()',
  cardName: '@cardName()',
  certId: '@certId()',
  telNo: '@telNo()',
  settleAccountId: '@settleAccountId()',
  settleAccountStatus: '0',
  adaMsg: '@adaMsg()',
  payFile: '@payFile()',
  adaMemberId: '@adaMemberId()',
  adaInfoId: '@adaInfoId()',
  settlementRatio: '0.994',
};

const officeList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(officeItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/office/getOfficePage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, officeList);
    },
  },
  {
    url: '/basic-api/office/getAllOfficeList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(officeList);
    },
  },
  {
    url: '/basic-api/office/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(officeItem);
    },
  },
  {
    url: '/basic-api/office/createOffice',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/office/updateOffice',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/office/deleteOffice/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
