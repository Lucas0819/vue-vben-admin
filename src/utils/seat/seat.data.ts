import { SeatNoItem, ShapeItem } from '@/utils/seat/typing';
import { CustomCanvasRenderingContext2D } from '@/utils/seat/seatUtil';

/**
 * 全局维护的唯一数据
 */
export const globalSeatData: {
  seatCtx?: CustomCanvasRenderingContext2D;
  seatCvs?: any;
  shapes: ShapeItem[]; //所有票图图形
  selectRects: ShapeItem[]; //选中状态的图形
  rowsNum: number; //排数
  colsNum: number; //列数
  rowsNo: (SeatNoItem | null)[]; //排号
  colsNo: (SeatNoItem | null)[]; //列号
} = {
  shapes: [], //所有票图图形
  selectRects: [], //选中状态的图形
  rowsNum: 10, //排数
  colsNum: 10, //列数
  rowsNo: [], //排号
  colsNo: [], //列号
};

/**
 * 全局配置类变量
 */
export const seatColor = '#EEEEEE'; //非座位默认颜色
export const seatSetColor = '#AAAAAA'; //设定的座位默认颜色
export const seatBorderColor = '#CCCCCC'; //座位默认边框颜色
export const seatBorderSelectedColor = '#FF0000'; //座位选中后边框颜色
export const seatSizeWidth = 2; //座位宽
export const seatSizeHeight = 2; //座位高
export const seatInterval = 2; //座位间距
export const seatMarginTop = 10.5; //座位上边距(否则上方label无法显示)
export const seatMarginLeft = 10.5; //座位边距(否则左侧label无法显示)
export const scaleInterval = 0.1; //每次缩放间距
export const seatRatioOfScreenX = 0.25; //屏幕横向至少保持1/4的座位,无法移出画布
export const seatRatioOfScreenY = 0.44; //屏幕纵向至少保持1/4的座位,无法移出画布
