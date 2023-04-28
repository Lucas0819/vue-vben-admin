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
  TMP_TMP_CHART_FORM = '/tmp/tmp-chart/form',
  TMP_TMP_CHART_SPLIT_SEAT = '/tmp/tmp-chart/split-seat',
  TMP_TMP_PAPER_FORM = '/tmp/tmp-paper/form',
  TMP_TMP_PLACE_FORM = '/tmp/tmp-place/form',

  BIS_BIS_BANNER_FORM = '/bis/bis-banner/form',
  BIS_BIS_ACTIVITY_FORM = '/bis/bis-activity/form',
  BIS_BIS_ACTIVITY_EVENT_FORM = '/bis/bis-activity-event/form',
  BIS_BIS_VIPCARD_FORM = '/bis/bis-vipcard/form',

  /**
   * 保利
   */
  BAOLI_BAOLI_PRICE_FORM = '/baoli/baoli-price/form',
  BAOLI_BAOLI_RESULT_FORM = '/baoli/baoli-result/form',
  BAOLI_BAOLI_SEAT_FORM = '/baoli/baoli-seat/form',
}
