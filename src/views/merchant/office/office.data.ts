import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { h } from 'vue';

const { t } = useI18n();

const placeholderText = t('common.fuzzySearchText');

export const columns: BasicColumn[] = [
  {
    title: 'id',
    dataIndex: 'id',
    defaultHidden: true,
  },
  {
    title: '二维码',
    dataIndex: 'zipCode',
    width: 60,
  },
  {
    title: '商户号',
    dataIndex: 'code',
    width: 80,
  },
  {
    title: '商户名称',
    dataIndex: 'name',
    width: 200,
    sorter: true,
  },
  {
    title: '上级商户',
    dataIndex: 'parent',
    width: 150,
    customRender: ({ record }) => {
      return record.parent.name;
    },
  },
  {
    title: '结算比例',
    dataIndex: 'settlementRatio',
    width: 90,
  },
  {
    title: '收款账户(真实姓名)',
    dataIndex: 'accName',
    width: 150,
  },
  {
    title: '卡券电话',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '修改时间',
    dataIndex: 'updateDate',
    width: 180,
    sorter: true,
    defaultHidden: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    width: 180,
    sorter: true,
    defaultSortOrder: 'descend',
  },
  {
    title: '支付账户状态',
    dataIndex: 'settleAccountStatus',
    width: 120,
    sorter: true,
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    sorter: true,
  },
  {
    title: '汇付账户ID',
    dataIndex: 'adaMemberId',
    sorter: true,
    defaultHidden: true,
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
    field: 'settlementRatio',
    label: '结算比例',
    component: 'Select',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '全部', value: 'all' },
        { label: '0.6%', value: '1' },
        { label: '0.7%', value: '2' },
        { label: '1%', value: '3' },
        { label: '2.6%', value: '4' },
        { label: '2.7%', value: '5' },
      ],
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
    field: 'parentId',
    label: '上级商户',
    required: true,
    component: 'Select',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '票票龙2', value: '1' },
        { label: '票票龙2', value: '2' },
        { label: '票票龙3', value: '3' },
        { label: '票票龙4', value: '4' },
        { label: '票票龙5', value: '5' },
      ],
    },
  },
  {
    field: 'code',
    label: '商户号',
    defaultValue: '110946',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '商户名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '必填信息，长度上限为12汉字',
      maxLength: 12,
    },
  },
  {
    field: 'area',
    label: '归属区域',
    required: false,
    component: 'Select',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '中国', value: '1' },
        { label: '辽宁省', value: '2' },
        { label: '大连市', value: '3' },
        { label: '沈阳市', value: '4' },
        { label: '抚顺市', value: '5' },
      ],
    },
  },
  {
    field: 'isClassicShop',
    label: '店铺风格',
    required: false,
    component: 'Select',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '默认', value: '0' },
        { label: '经典', value: '1' },
      ],
    },
  },
  {
    field: 'zipCode',
    label: '商户logo',
    required: false,
    component: 'Input',
  },
  {
    field: 'phone',
    label: '客服电话',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '必填信息',
    },
  },
  {
    field: 'email',
    label: '商户简介',
    required: false,
    component: 'InputTextArea',
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
    field: 'remarks',
    label: '备注',
    required: false,
    component: 'InputTextArea',
  },
];

export const formSchema1: FormSchema[] = [
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
    itemProps: {
      extra: h('div', [
        h('span', '登录网址: '),
        h(
          'a',
          {
            onClick: () => {
              window.open('http://op.o2o.wepiao.com/index.php?r=default/index');
            },
          },
          'http://op.o2o.wepiao.com/index.php?r=default/index',
        ),
      ]),
    },
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
