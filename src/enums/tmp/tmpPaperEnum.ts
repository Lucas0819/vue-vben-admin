export enum TmpPaperElTypeEnum {
  // 票纸元素类型-二维码
  ET_QRCod = 'TEQRCod',
  // 票纸元素类型-文字
  ET_Text = 'TEText',
}

/**
 * 票纸内模板字符串
 */
export enum TmpPaperElTemplateEnum {
  '${customMsg}' = '自定义',
  '${activityName}' = '活动名称',
  '${eventTime}' = '场次时间',
  '${buyTime}' = '购买时间',
  '${showAddress}' = '演出场馆',
  '${entrance}' = '入口',
  '${zone}' = '区域名',
  '${seatNo}' = '座位号',
  '${zoneAndSeatNo}' = '区域名+座位号',
  '${pricePrice}' = '票价价格',
  '${printRemarks}' = '打印备注',
  '${giveTicket}' = '赠票',
}
