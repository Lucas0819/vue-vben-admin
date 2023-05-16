export enum SelectTypeEnum {
  SQUARE = 'square',
  TRAJECTORY = 'trajectory',
}

export interface SeatAddProps {
  // 提示文字
  setTips: (tips: string, delay: number) => void;
  // 显示/隐藏规则框
  setRuleVisible: (visible: boolean) => void;
  // 按钮是否禁用
  setBtnAvailable: (visible: boolean) => void;
}
