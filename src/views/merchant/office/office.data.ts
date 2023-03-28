import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

const placeholderText = t('common.fuzzySearchText');

export const columns: BasicColumn[] = [
  {
    title: '二维码',
    dataIndex: 'zipCode',
    width: 120,
  },
  {
    title: '商户号',
    dataIndex: 'code',
    width: 120,
  },
  {
    title: '商户名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '上级商户',
    dataIndex: 'parent',
    width: 120,
    customRender: ({ record }) => {
      return record.parent;
    },
  },
  {
    title: '结算比例',
    dataIndex: 'parent',
    width: 120,
    customRender: ({ record }) => {
      return record.parent;
    },
  },
  {
    title: '收款账户(真实姓名)',
    dataIndex: 'accName',
    width: 120,
  },
  {
    title: '卡券电话',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'parent',
    width: 120,
    customRender: ({ record }) => {
      return record.parent;
    },
  },
  {
    title: '支付账户状态',
    dataIndex: 'accName',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'phone',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '商户名称',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'area',
    label: '结算比例',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
  {
    field: 'remark',
    label: '商户备注',
    component: 'Input',
    componentProps: {
      placeholder: placeholderText,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'parent',
    label: '父级编号',
    required: false,
    component: 'Input',
  },
  {
    field: 'parentIds',
    label: '所有父级编号',
    required: false,
    component: 'Input',
  },
  {
    field: 'name',
    label: '商户名称',
    required: false,
    component: 'Input',
  },
  {
    field: 'area',
    label: '归属区域',
    required: false,
    component: 'Input',
  },
  {
    field: 'code',
    label: '机构编码',
    required: false,
    component: 'Input',
  },
  {
    field: 'type',
    label: '机构类型（1：公司；2：部门；3：小组）',
    required: false,
    component: 'Input',
  },
  {
    field: 'grade',
    label: '机构等级（1：一级；2：二级；3：三级；4：四级）',
    required: false,
    component: 'Input',
  },
  {
    field: 'address',
    label: '联系地址',
    required: false,
    component: 'Input',
  },
  {
    field: 'zipCode',
    label: '合成logo+店铺二维码',
    required: false,
    component: 'Input',
  },
  {
    field: 'master',
    label: 'logo',
    required: false,
    component: 'Input',
  },
  {
    field: 'phone',
    label: '卡券电话',
    required: false,
    component: 'Input',
  },
  {
    field: 'fax',
    label: '店铺短域名',
    required: false,
    component: 'Input',
  },
  {
    field: 'email',
    label: '主办方介绍',
    required: false,
    component: 'Input',
  },
  {
    field: 'useable',
    label: '是否可用',
    required: false,
    component: 'Input',
  },
  {
    field: 'damaiUserName',
    label: '新版大麦用户名',
    required: false,
    component: 'Input',
  },
  {
    field: 'zhiyoubaoUserName',
    label: '智游宝用户名',
    required: false,
    component: 'Input',
  },
  {
    field: 'zhiyoubaoCorpCode',
    label: '智游宝企业码',
    required: false,
    component: 'Input',
  },
  {
    field: 'zhiyoubaoPrivateKey',
    label: '智游宝企业私钥',
    required: false,
    component: 'Input',
  },
  {
    field: 'piaofutongUserName',
    label: '票付通用户名',
    required: false,
    component: 'Input',
  },
  {
    field: 'piaofutongPassword',
    label: '票付通密码',
    required: false,
    component: 'Input',
  },
  {
    field: 'weipiaoUserName',
    label: '微票用户名',
    required: false,
    component: 'Input',
  },
  {
    field: 'weipiaoPassword',
    label: '微票密码',
    required: false,
    component: 'Input',
  },
  {
    field: 'maizuoUserName',
    label: '麦座用户名',
    required: false,
    component: 'Input',
  },
  {
    field: 'maizuoPassword',
    label: '麦座密码',
    required: false,
    component: 'Input',
  },
  {
    field: 'baoliUserName',
    label: '保利用户名',
    required: false,
    component: 'Input',
  },
  {
    field: 'baoliPassword',
    label: '保利密码',
    required: false,
    component: 'Input',
  },
  {
    field: 'zhongyanUserName',
    label: '中演用户名',
    required: false,
    component: 'Input',
  },
  {
    field: 'zhongyanPassword',
    label: '中演密码',
    required: false,
    component: 'Input',
  },
  {
    field: 'jqiclubSupplierIdentity',
    label: '旅游资源聚合平台供应商通信标识',
    required: false,
    component: 'Input',
  },
  {
    field: 'jqiclubSignkey',
    label: '旅游资源聚合平台签名验证KEY',
    required: false,
    component: 'Input',
  },
  {
    field: 'wpiaoUserName',
    label: '微票云用户名',
    required: false,
    component: 'Input',
  },
  {
    field: 'pftmxUserName',
    label: '票付通接口用户名',
    required: false,
    component: 'Input',
  },
  {
    field: 'pftmxKey',
    label: '票付通接口秘钥',
    required: false,
    component: 'Input',
  },
  {
    field: 'maoyanUserName',
    label: '猫眼演出用户名',
    required: false,
    component: 'Input',
  },
  {
    field: 'accOpenid',
    label: '结算用户',
    required: false,
    component: 'Input',
  },
  {
    field: 'accName',
    label: '收款账户(真实姓名)',
    required: false,
    component: 'Input',
  },
  {
    field: 'sysWxConfigId',
    label: '收款公众号',
    required: false,
    component: 'Input',
  },
  {
    field: 'maizuoNewLockType',
    label: '麦座新版锁定类型',
    required: false,
    component: 'Input',
  },
  {
    field: 'businessUserId',
    label: '商户代理商户中间人用户ID',
    required: false,
    component: 'Input',
  },
  {
    field: 'businessAgentId',
    label: '商户代理商户中间人代理ID',
    required: false,
    component: 'Input',
  },
  {
    field: 'isClassicShop',
    label: '店铺风格,0:默认 1:经典',
    required: false,
    component: 'Input',
  },
  {
    field: 'merchantType',
    label: '商户类型0个人1企业',
    required: false,
    component: 'Input',
  },
  {
    field: 'companyName',
    label: '企业名称',
    required: false,
    component: 'Input',
  },
  {
    field: 'provCode',
    label: '省份编码 （省市编码）',
    required: false,
    component: 'Input',
  },
  {
    field: 'areaCode',
    label: '地区编码 （省市编码）',
    required: false,
    component: 'Input',
  },
  {
    field: 'socialCreditCode',
    label: '统一社会信用码',
    required: false,
    component: 'Input',
  },
  {
    field: 'socialCreditCodeExpires',
    label: '统一社会信用证有效期',
    required: false,
    component: 'Input',
  },
  {
    field: 'businessScope',
    label: '经营范围',
    required: false,
    component: 'Input',
  },
  {
    field: 'legalPerson',
    label: '法人姓名',
    required: false,
    component: 'Input',
  },
  {
    field: 'legalCertId',
    label: '法人身份证号码',
    required: false,
    component: 'Input',
  },
  {
    field: 'legalCertIdExpires',
    label: '法人身份证有效期',
    required: false,
    component: 'Input',
  },
  {
    field: 'legalMp',
    label: '法人手机号',
    required: false,
    component: 'Input',
  },
  {
    field: 'companyAddress',
    label: '企业地址',
    required: false,
    component: 'Input',
  },
  {
    field: 'bankCode',
    label: '银行代码，如果需要自动开结算账户，本字段必填（详见附录 银行代码）',
    required: false,
    component: 'Input',
  },
  {
    field: 'cardNo',
    label: '银行卡号，如果需要自动开结算账户，本字段必填',
    required: false,
    component: 'Input',
  },
  {
    field: 'cardName',
    label:
      '银行卡对应的户名，如果需要自动开结算账户，本字段必填；若银行账户类型是对公，必须与企业名称一致',
    required: false,
    component: 'Input',
  },
  {
    field: 'certId',
    label: '证件号，银行账户类型为对私时，必填',
    required: false,
    component: 'Input',
  },
  {
    field: 'telNo',
    label: '手机号',
    required: false,
    component: 'Input',
  },
  {
    field: 'settleAccountId',
    label: '结算账户ID 汇付创建结算账户时返回',
    required: false,
    component: 'Input',
  },
  {
    field: 'settleAccountStatus',
    label: '企业用户创建结算账户的审核状态',
    required: false,
    component: 'Input',
  },
  {
    field: 'adaMsg',
    label: '汇付返回信息',
    required: false,
    component: 'Input',
  },
  {
    field: 'payFile',
    label: '上传文件路径',
    required: false,
    component: 'Input',
  },
  {
    field: 'adaMemberId',
    label: '汇付member_id',
    required: false,
    component: 'Input',
  },
  {
    field: 'adaInfoId',
    label: '汇付信息id',
    required: false,
    component: 'Input',
  },
];
