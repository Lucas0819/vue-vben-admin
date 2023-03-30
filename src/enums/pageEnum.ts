export enum PageEnum {
  // basic login path
  BASE_LOGIN = '/login',
  // basic home path
  BASE_HOME = '/dashboard',
  // error page path
  ERROR_PAGE = '/exception',
  // error log page path
  ERROR_LOG_PAGE = '/error-log/list',

  /**
   * 商户管理
   */
  MERCHANT_OFFICE_MANAGEMENT = '/merchant/office',
  MERCHANT_OFFICE_FORM = '/merchant/office/form',
  MERCHANT_USER_MANAGEMENT = '/merchant/user',
  MERCHANT_USER_FORM = '/merchant/user/form',

  /**
   * 活动管理
   */
  TMP_CHART_MANAGEMENT = '/tmp/tmp-chart',
  TMP_CHART_FORM = '/tmp/tmp-chart/form',
  TMP_CHART_SPLIT_SEAT = '/tmp/tmp-chart-split-structure',
}
