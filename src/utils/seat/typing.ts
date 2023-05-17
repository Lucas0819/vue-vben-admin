import { StyleValue } from '@/utils/types';
import { CustomCanvasRenderingContext2D } from '@/utils/seat/seatUtil';

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
  // 画布句柄
  seatCtx?: CustomCanvasRenderingContext2D;
  // 画布DOM
  seatCvs?: any;
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
  openStructNoModal?: () => void;
  // 提示文字
  setTips?: (tips: string, delay: number) => void;
  // 显示/隐藏规则框
  setRuleVisible?: (visible: boolean) => void;
  // 按钮是否禁用
  setBtnAvailable?: (visible: boolean) => void;
}

export interface ShapeItem {
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

export interface TmpShapeItem extends Omit<ShapeItem, 'index' | 'lineWidth'> {
  index?: number;
  _x: number;
  _y: number;
  lineWidth?: number; //border
}

export interface SeatNoItem {
  x?: number;
  y?: number;
  text?: string;
  font?: string;
  color?: string;
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
