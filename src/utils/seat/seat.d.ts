import { StyleValue } from '@/utils/types';

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

export interface TmpShapeItem extends ShapeItem {
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
