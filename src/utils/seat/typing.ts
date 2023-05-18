import { StyleValue } from '@/utils/types';

/**
 * 选择模式 矩形/轨迹
 */
export enum SelectTypeEnum {
  SQUARE = 'square',
  TRAJECTORY = 'trajectory',
}

export interface SeatProps {
  // 初始行
  rowsNum?: number;
  // 初始列
  colsNum?: number;
  // 初始舞台位置
  stagePosition?: number;
  // 座位信息
  seatDetail?: string[];
  // 是否展示舞台
  stageShow?: boolean;
  // 设置座位信息并重绘
  setSeatData?: (shapes: ShapeItem[]) => void;
  // 座位号绘制信息
  setStructNo?: (
    rowsNo: SeatNoItem[],
    colsNo: SeatNoItem[],
    viewType: StructNoViewTypeEnum,
  ) => void;
  // 打开设置座位号弹窗
  openSeatNoSettingModal?: () => void;
  // 提示文字
  setTips?: (tips: string, delay: number) => void;
}

/**
 * 用于绘制的基类
 * 包括座位、舞台等
 */
interface BasePathItem {
  x: number;
  y: number;
  type?: string;
  width?: number;
  height?: number;
  lineWidth?: number;
  borderColor?: string;
  fillColor?: string;
  r?: number | number[];
  inter?: number;
}
/**
 * 图形
 */
export interface ShapeItem extends BasePathItem {
  index: number;
  type: string;
  x: number;
  y: number;
  _x?: number;
  _y?: number;
  width: number;
  height: number;
  lineWidth: number; //border
  borderColor?: string; //border color
  fillColor: string; //fill color
  fillColorName?: string; //fill color name
  detail?: string; // 座位信息，'10|1|1|0|10|0|0'
  isSeat?: boolean; //是否被设定为座位
  r?: number | number[];
  inter?: number;
}

export interface TmpShapeItem extends BasePathItem {
  index?: number;
  _x: number;
  _y: number;
  width: number;
  height: number;
  lineWidth?: number; //border
}

/**
 * 座位号
 */
export interface SeatNoItem extends BasePathItem {
  x: number;
  y: number;
  text?: string;
  font?: string;
  color?: string;
}

/**
 * 舞台位置
 */
export interface StageShapeItem extends BasePathItem {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  r: number;
  fillColor: string;
}

/**
 * 舞台中心线
 */
export interface StageShapeLineItem extends BasePathItem {
  type: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  lineWidth: number;
  borderColor: string;
  inter: number;
  linePosition: number;
}

/**
 * 舞台文字
 */
export interface StageShapeTextItem extends BasePathItem {
  x: number;
  y: number;
  text: string;
  font: string;
  color: string;
}

/**
 * 操作历史栈对象
 */
export interface HistoryItem {
  shapes: ShapeItem[];
  selectRects: ShapeItem[];
  stageShape?: StageShapeItem;
  stageShapeText?: StageShapeTextItem;
  stageShapeMiddleLine?: StageShapeLineItem;
  rowsNo?: SeatNoItem;
  colsNo?: SeatNoItem;
}

export interface LabelText {
  x: number;
  y: number;
  text: string;
  font: string;
  color: string;
}

export interface RuleStyle {
  style?: StyleValue;
  html?: string;
  visible: boolean;
}

// 2.座位号-显示模式
export const enum StructNoViewTypeEnum {
  ALL = 'all',
  ONLY_ROWS = 'rows',
  ONLY_COLS = 'cols',
}

// 2.座位号-全局设置数据格式
export interface GlobalNoSettingItem {
  rowNoGlobal?: number; // 排号起始
  rowNoTypeGlobal?: string; // 排号延续方式
  rowNoIntervalGlobal?: number; // 间隔
  setTypeGlobal?: string; // 设置模式
  colNoGlobal?: number; // 列号起始
  colNoTypeGlobal?: string; // 延续方式
  colNoOrientationGlobal?: string; // 排布方向
  colNoIntervalGlobal?: number; // 间隔
  colNoLeftGlobal?: number; // 列号起始
  colNoLeftTypeGlobal?: string; // 列号延续方式
  colNoLeftOrientationGlobal?: string; // 排布方向
  colNoLeftIntervalGlobal?: number; // 列号间隔
  colNoRightGlobal?: number; // 列号起始
  colNoRightTypeGlobal?: string; // 延续方式
  colNoRightOrientationGlobal?: string; // 排布方向
  colNoRightIntervalGlobal?: number; // 间隔
}
