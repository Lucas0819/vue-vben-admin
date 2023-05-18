import { ref } from 'vue';
import { buildPath, getSeatActionDisable, seatNumToString, windowToCanvas } from './seatUtil';
import { isDef, isEmpty, isNotEmpty, isNullOrUnDef, isNumber } from '/@/utils/is';
import {
  RuleStyle,
  SeatNoItem,
  SeatProps,
  ShapeItem,
  StructNoViewTypeEnum,
  TmpShapeItem,
} from '@/utils/seat/typing';
import { drawSeat, setStructNo } from '@/utils/seat/seatInit';
import {
  globalSeatData,
  seatBorderColor,
  seatBorderSelectedColor,
  seatColor,
  seatInterval,
  seatMarginLeft,
  seatMarginTop,
  seatSetColor,
  seatSizeHeight,
  seatSizeWidth,
} from '@/utils/seat/seat.data';

/**
 * 改写自：seat-no12121.js
 *
 * @Author: Lucas
 * @Date: 2023-05-17
 */
// 完整座位数据
let seatDetail: string[] = [];
// 座位号数据
let seatDetailIndexList: string[] = [];

//可配置变量
//初始行列数
let structNoViewType = StructNoViewTypeEnum.ALL; // 座位号显示模式

let setTips;

//不可配置变量
let mousePointLastX, mousePointLastY; //鼠标上次移动点坐标
// let currWidth, currHeight; //浏览器可视区域当前宽高-边距
let selectInitStatus = false; //下次选择时是否清空之前已选状态(与批量选择状态互斥)
let selectBatchStatus = false; //按ctrl批量选择状态
// let seatWidthTotal; //已有座位总长度
// let seatHeightTotal; //已有座位总宽度
// let shapes: ShapeItem[] = []; //所有票图图形
const rowsNo: (SeatNoItem | null)[] = [];
const colsNo: (SeatNoItem | null)[] = [];
// let leftLabelBg; //左方坐标标尺背景图形
// const leftLabelsText: LabelText[] = []; //左方坐标标尺文字
// let topLabelBg; //上方坐标标尺背景图形
// const topLabelsText: LabelText[] = []; //上方坐标标尺文字
// let selectRects: ShapeItem[] = []; //选中状态的图形
let _selectRects: ShapeItem[] = []; //本次选中状态的图形
let _lastSelectRects: ShapeItem[] = []; //本次选中状态的图形
// let _lineTrajectory: ShapeItem[] = []; //上次滑动轨迹
// let stageShape; //舞台方向图形
// let stageShapeText; //舞台方向文字
// let stageShapeMiddleLine; //舞台中心线
// const moveStageStatus = false; //移动舞台状态
// const stageShowStatus = true; //显示舞台状态

// let tid; //窗口改变时事件延迟句柄
// let msgTid; //提示信息事件延迟句柄

export const selectRule = ref<RuleStyle>(); // 选择内容提示

//初始化座位
export function initSeatDataByNo() {
  globalSeatData.shapes = []; //所有票图图形
  for (let i = 0; i < globalSeatData.rowsNum; i++) {
    for (let j = 0; j < globalSeatData.colsNum; j++) {
      const index = j + globalSeatData.colsNum * i;
      const indexStr = seatNumToString(index);
      const seatIndex = seatDetailIndexList.indexOf(indexStr);
      let _seatDetail: string[] = [];
      if (seatIndex >= 0) {
        _seatDetail = seatDetail[seatIndex].split('|'); //index|座位行|座位列|颜色|预留|预留|预留
      }
      //座位形状初始化
      globalSeatData.shapes.push({
        index: index,
        type: 'rect',
        x: j * (seatSizeWidth + seatInterval) + seatMarginLeft,
        y: i * (seatSizeHeight + seatInterval) + seatMarginTop,
        width: seatSizeWidth,
        height: seatSizeHeight,
        lineWidth: 0.4, //border
        borderColor: seatBorderColor, //border color
        fillColor:
          seatIndex >= 0
            ? _seatDetail[3] && _seatDetail[3] == '0'
              ? seatSetColor
              : eval(_seatDetail[3])
            : seatColor, //fill color
        fillColorName: seatIndex >= 0 ? (_seatDetail[3] ? _seatDetail[3] : '0') : '0', //fill color
        isSeat: seatIndex >= 0, //是否被设定为座位
        detail: seatDetail[seatIndex],
      });
      if (seatIndex >= 0) {
        rowsNo.push({
          x: j * (seatSizeWidth + seatInterval) + seatMarginLeft + seatSizeWidth * 0.25,
          y: i * (seatSizeHeight + seatInterval) + seatMarginTop + seatSizeHeight * 0.4,
          text: !isNumber(seatDetailIndexList[1])
            ? seatDetailIndexList[1]
            : seatDetailIndexList[1] < 10
            ? '0' + parseInt(seatDetailIndexList[1])
            : seatDetailIndexList[1],
          font: seatSizeWidth * 0.5 + 'px italic arial,sans-serif',
          color: '#ffffff',
        });
        colsNo.push({
          x: j * (seatSizeWidth + seatInterval) + seatMarginLeft + seatSizeWidth * 0.25,
          y: i * (seatSizeHeight + seatInterval) + seatMarginTop + seatSizeHeight * 0.9,
          text: !isNumber(seatDetailIndexList[2])
            ? seatDetailIndexList[2]
            : seatDetailIndexList[2] < 10
            ? '0' + parseInt(seatDetailIndexList[2])
            : seatDetailIndexList[2],
          font: seatSizeWidth * 0.5 + 'px italic arial,sans-serif',
          color: '#ffffff',
        });
      } else {
        rowsNo.push(null);
        colsNo.push(null);
      }
    }
  }
}

//点的位置是否在图形上,返回行列信息,不在返回null
function isPointInPath(point) {
  if (!isNotEmpty(globalSeatData.seatCtx)) return null;
  //根据点击坐标按缩放比例取得真实坐标
  const cvsRealPoint = globalSeatData.seatCtx.transformedPoint(point.x, point.y);
  //行列位置:(真实坐标-边距)/(座位大小+间距),范围:0 < 结果的小数位 < 座位大小/(座位大小+间距),根据此公式,即可不用循环判断,提升效率
  const selectCol = (cvsRealPoint.x - seatMarginLeft) / (seatSizeWidth + seatInterval);
  const selectRow = (cvsRealPoint.y - seatMarginTop) / (seatSizeHeight + seatInterval);
  if (
    selectCol - parseInt(selectCol) <= seatSizeWidth / (seatSizeWidth + seatInterval) &&
    selectRow - parseInt(selectRow) <= seatSizeHeight / (seatSizeHeight + seatInterval) &&
    parseInt(selectCol) < globalSeatData.colsNum &&
    parseInt(selectRow) < globalSeatData.rowsNum &&
    parseInt(selectCol) >= 0 &&
    parseInt(selectRow) >= 0 &&
    selectRow >= 0 &&
    selectCol >= 0
  ) {
    return { col: parseInt(selectCol), row: parseInt(selectRow) };
  }
  return null;
}

//初始化票图画板事件
function onKeydown({ ctrlKey }) {
  //按住ctrl批量选择开始
  if (ctrlKey) {
    selectBatchStatus = true;
  }
}

function onKeyup({ ctrlKey }) {
  //按住ctrl批量选择结束
  if (!ctrlKey) {
    selectBatchStatus = false;
    if (globalSeatData.selectRects.length > 0) {
      //设置座位号
      setSeatNoFunc();
    }
  }
}

/**
 * 框选座位-鼠标按下事件
 * @param e
 */
function selectMousedownEvent(e) {
  mousePointLastX = e.clientX;
  mousePointLastY = e.clientY;
  //0左键,2右键
  if (e.button == 0) {
    //滑选,点击
    selectInitStatus = !selectBatchStatus;
    // 判断是否可以进行拖拽
    if (!getSeatActionDisable(globalSeatData.seatCvs)) {
      changeMsg('按住Ctrl键批量选择', 10);
      select();
    }
  }
}

/**
 * 框选座位-鼠标移动事件
 * @param e
 */
function selectMousemoveEvent(e) {
  if (!isNotEmpty(globalSeatData.seatCtx)) return;
  //下次选择时是否清空之前已选状态
  if (selectInitStatus) {
    globalSeatData.selectRects.forEach((item) => {
      const shape = getShapeItem(globalSeatData.shapes, item);
      if (isDef(shape)) {
        shape.borderColor = seatBorderColor;
      }
    });
    globalSeatData.selectRects = [];
    selectInitStatus = false;
  }
  _selectRects = [];
  // 重绘所有
  drawSeat();
  //获取到画板矩阵
  const seatTransform = globalSeatData.seatCtx.getTransform();
  const _trueSelectPoint = windowToCanvas(globalSeatData.seatCvs, mousePointLastX, mousePointLastY);
  const trueSelectPoint = globalSeatData.seatCtx.transformedPoint(
    _trueSelectPoint.x,
    _trueSelectPoint.y,
  );
  const _trueSelectPoint2 = windowToCanvas(globalSeatData.seatCvs, e.clientX, e.clientY);
  const trueSelectPoint2 = globalSeatData.seatCtx.transformedPoint(
    _trueSelectPoint2.x,
    _trueSelectPoint2.y,
  );
  //矩形选择
  //鼠标滑选时显示的矩形框
  const selectRect: TmpShapeItem = {
    type: 'corner',
    //实际坐标
    x: trueSelectPoint.x < trueSelectPoint2.x ? trueSelectPoint.x : trueSelectPoint2.x,
    y: trueSelectPoint.y < trueSelectPoint2.y ? trueSelectPoint.y : trueSelectPoint2.y,
    //此处因为判断点是否包含方法需要的是窗口坐标点
    _x: trueSelectPoint.x < trueSelectPoint2.x ? _trueSelectPoint.x : _trueSelectPoint2.x,
    _y: trueSelectPoint.y < trueSelectPoint2.y ? _trueSelectPoint.y : _trueSelectPoint2.y,
    width: Math.abs(trueSelectPoint.x - trueSelectPoint2.x),
    height: Math.abs(trueSelectPoint.y - trueSelectPoint2.y),
    r: seatSizeWidth, //圆角
    fillColor: 'rgba(66,79,99,0.3)',
  };
  buildPath(selectRect);
  //TODO 性能待优化=> 寻找离起点最近的座位,按照最近的座位遍历座位至矩形边缘停止?
  //遍历被选的矩形中存在的座位==> 从起点开始,按座位的大小*0.8的间隔遍历矩形中的点,判断此点是否在座位中..效率low到爆炸
  for (
    let i = selectRect._x;
    i <= selectRect._x + selectRect.width * seatTransform.a;
    i += seatSizeWidth * seatTransform.a * 0.5
  ) {
    for (
      let j = selectRect._y;
      j <= selectRect._y + selectRect.height * seatTransform.a;
      j += seatSizeHeight * seatTransform.a * 0.5
    ) {
      const constantSeat = isPointInPath({ x: i, y: j });
      if (constantSeat) {
        const selectedShape =
          globalSeatData.shapes[constantSeat.row * globalSeatData.colsNum + constantSeat.col];
        if (!hasShapeItem(_selectRects, selectedShape)) {
          //设置为选择状态
          selectedShape.borderColor = seatBorderSelectedColor;
          //已经选择的图形
          _selectRects.push(selectedShape);
        }
      }
    }
  }
  if (_selectRects.length > 0) {
    let _selectMinRow = globalSeatData.rowsNum;
    let _selectMaxRow = 0;
    let _selectMixCol = globalSeatData.colsNum;
    let _selectMaxCol = 0;
    let _selectSeatTotalCount = 0;
    _selectRects.forEach((item) => {
      if (item.isSeat) {
        _selectSeatTotalCount++;
      }
      const _row = Math.floor(item.index / globalSeatData.colsNum);
      const _col = item.index % globalSeatData.colsNum;
      _selectMinRow = Math.min(_row, _selectMinRow);
      _selectMaxRow = Math.max(_row, _selectMaxRow);
      _selectMixCol = Math.min(_col, _selectMixCol);
      _selectMaxCol = Math.max(_col, _selectMaxCol);
    });

    selectRule.value = {
      style: {
        top: mousePointLastY - 25 + 'px',
        left: mousePointLastX + 'px',
      },
      html:
        _selectMaxRow -
        _selectMinRow +
        1 +
        ' × ' +
        (_selectMaxCol - _selectMixCol + 1) +
        '&emsp;&emsp;共: ' +
        _selectSeatTotalCount +
        '/' +
        _selectRects.length +
        ' 座',
      visible: true,
    };
  } else {
    selectRule.value = {
      style: {
        top: mousePointLastY - 25 + 'px',
        left: mousePointLastX + 'px',
      },
      html: '0 × 0',
      visible: true,
    };
  }
  //上次选择的图形本次选择的图形作对比,将取消选择的图形重置
  _lastSelectRects.forEach((item) => {
    if (!hasShapeItem(_selectRects, item)) {
      item.borderColor = seatBorderColor;
    }
  });
  //记录本次选择数组
  _lastSelectRects = _selectRects;
}

/**
 * 框选座位-鼠标抬起事件
 */
function selectMouseupEvent(e) {
  globalSeatData.seatCvs.removeEventListener('mousemove', selectMousemoveEvent);
  globalSeatData.selectRects.push(
    ..._selectRects.filter((item) => !hasShapeItem(globalSeatData.selectRects, item)),
  );
  // 重绘所有
  drawSeat();
  if (e.button == 0 && !selectBatchStatus && globalSeatData.selectRects.length > 0) {
    //设置座位号
    setSeatNoFunc();
  }
  if (isNotEmpty(selectRule.value)) {
    selectRule.value.visible = false;
  }
}

function seatCvsEventInit() {
  seatCvsEventDestroy();
  // 按键监听
  document.addEventListener('keydown', onKeydown);
  // 按键抬起监听
  document.addEventListener('keyup', onKeyup);

  //鼠标按下,记录最后点击坐标,同事根据ctrl是否按下状态,判断是否批量选择,批量时,不改变"选择前是否初始化状态"
  globalSeatData.seatCvs.addEventListener('mousedown', selectMousedownEvent);

  //鼠标移开事件
  globalSeatData.seatCvs.addEventListener('mouseup', selectMouseupEvent);
}

function seatCvsEventDestroy() {
  document.removeEventListener('keydown', onKeydown);
  document.removeEventListener('keyup', onKeyup);
  globalSeatData.seatCvs.removeEventListener('mousedown', selectMousedownEvent);
  globalSeatData.seatCvs.removeEventListener('mousemove', selectMousemoveEvent);
  globalSeatData.seatCvs.removeEventListener('mouseup', selectMouseupEvent);
}

/**
 * 判断座位是否已经在集合内
 * @param shapeItem
 * @param shapes
 */
function hasShapeItem(shapes: ShapeItem[], shapeItem: ShapeItem): boolean {
  if (isNullOrUnDef(shapes) || isEmpty(shapes as ShapeItem[])) return false;
  return shapes.some((item) => item.index === shapeItem.index);
}

function getShapeItem(shapes: ShapeItem[], shapeItem: ShapeItem): ShapeItem | undefined {
  if (isNullOrUnDef(shapes) || isEmpty(shapes as ShapeItem[])) return undefined;
  return shapes.find((item) => item.index === shapeItem.index);
}

//票图鼠标点击选择以及滑选实现
function select() {
  //浏览器窗口点击坐标转换成canvas坐标,并判断是否在某个座位中
  const clickSeat = isPointInPath(
    windowToCanvas(globalSeatData.seatCvs, mousePointLastX, mousePointLastY),
  );
  if (clickSeat) {
    //判断是否是按ctrl批量选择状态
    if (!selectBatchStatus) {
      globalSeatData.selectRects.forEach((item) => {
        const shape = getShapeItem(globalSeatData.shapes, item);
        if (isDef(shape)) {
          shape.borderColor = seatBorderColor;
          console.error('reset: ', shape);
        }
      });
      globalSeatData.selectRects = [];
    }
    //转换选择的座位的边框颜色
    const selectedShape =
      globalSeatData.shapes[clickSeat.row * globalSeatData.colsNum + clickSeat.col];
    selectedShape.borderColor = seatBorderSelectedColor;
    //放入到选中状态的图形数组中
    globalSeatData.selectRects.push(selectedShape);
    console.error('add rect: ', selectedShape);
    // 重绘所有
    drawSeat();
  }
  _lastSelectRects = [];
  _selectRects = [];
  globalSeatData.seatCvs.addEventListener('mousemove', selectMousemoveEvent);
}

//提示信息
function changeMsg(text, delay = 5) {
  setTips(text, delay);
}

// TODO 完善方法
function setSeatNoFunc() {}

export const setStructNoViewType = function (viewType: StructNoViewTypeEnum) {
  structNoViewType = viewType;
  setStructNo(rowsNo, colsNo, viewType);
  // 重绘所有
  drawSeat();
};

export const initSeatByNo = function (props: SeatProps) {
  const { setTips: _setTips } = props;
  setTips = _setTips;
  if (isNotEmpty(props.rowsNum)) {
    globalSeatData.rowsNum = props.rowsNum > 10 ? props.rowsNum : 10;
  }
  if (isNotEmpty(props.colsNum)) {
    globalSeatData.colsNum = props.colsNum > 10 ? props.colsNum : 10;
  }
  if (isNotEmpty(props.seatDetail)) {
    seatDetail = props.seatDetail;
    // 座位号补零
    seatDetailIndexList = seatDetail.map((item) => {
      const index = item.split('|')[0];
      if (isNaN(Number(index))) return index;
      return seatNumToString(Number(index));
    });
  }
  //初始化票图画板事件
  seatCvsEventInit();
  //初始化座位
  initSeatDataByNo();
  // 设置座位号
  setStructNo(rowsNo, colsNo, structNoViewType);
  // 重绘所有
  drawSeat();
};

export const destroySeatByNo = function () {
  // 移除监听事件
  seatCvsEventDestroy();
  // 移除座位
  globalSeatData.shapes = [];
  // 重置座位号
  setStructNo([], [], StructNoViewTypeEnum.ALL);
  // 重绘所有
  drawSeat();
};
