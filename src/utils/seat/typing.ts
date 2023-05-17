import { StyleValue } from '@/utils/types';
import { CustomCanvasRenderingContext2D } from '@/utils/seat/seatUtil';

export enum SelectTypeEnum {
  SQUARE = 'square',
  TRAJECTORY = 'trajectory',
}

export interface SeatAddProps {
  // 初始行
  rowsNum?: number;
  // 初始列
  colsNum?: number;
  // 初始舞台位置
  stagePosition?: number;
  seatCtx?: CustomCanvasRenderingContext2D;
  seatCvs?: any;
  setSeatData?: (shapes: ShapeItem[]) => void;
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
