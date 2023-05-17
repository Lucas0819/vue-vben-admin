import {
  addHistory,
  buildPath,
  buildText,
  CustomCanvasRenderingContext2D,
  getHistory,
  setSeatActionDisable,
  trackTransform,
  windowToCanvas,
} from './seatUtil';
import { LabelText, SeatAddProps, ShapeItem } from '@/utils/seat/typing';
import { useThrottleFn } from '@vueuse/core';
import { isNotEmpty } from '@/utils/is';

/**
 * 摘取自：seat-add12121.js
 * 抽取初始化相关方法
 *
 * @Author: Lucas
 * @Date: 2023-05-16
 */
let seatCtx: CustomCanvasRenderingContext2D;
let seatCvs; //canvas.context和jcanvas

//可配置变量
//初始行列数
let rowsNum = 10; //排数
let colsNum = 10; //列数
// const seatColor = '#EEEEEE'; //非座位默认颜色
// const seatSetColor = '#AAAAAA'; //设定的座位默认颜色
const seatBorderColor = '#CCCCCC'; //座位默认边框颜色
// const seatBorderSelectedColor = '#FF0000'; //座位选中后边框颜色
const seatSizeWidth = 2; //座位宽
const seatSizeHeight = 2; //座位高
const seatInterval = 2; //座位间距
const seatMarginTop = 10.5; //座位上边距(否则上方label无法显示)
const seatMarginLeft = 10.5; //座位边距(否则左侧label无法显示)
let minScale = 0.6; //最小缩放比例(值已无效,改为自动计算极限值)
let maxScale = 2.4; //最大缩放比例(值已无效,改为自动计算极限值)
const scaleInterval = 0.1; //每次缩放间距
const seatRatioOfScreenX = 0.25; //屏幕横向至少保持1/4的座位,无法移出画布
const seatRatioOfScreenY = 0.44; //屏幕纵向至少保持1/4的座位,无法移出画布

let seatAddProps: SeatAddProps;

//不可配置变量
let mousePointLastX, mousePointLastY; //鼠标上次移动点坐标
let currWidth, currHeight; //浏览器可视区域当前宽高-边距
// const selectInitStatus = false; //下次选择时是否清空之前已选状态(与批量选择状态互斥)
// const selectBatchStatus = false; //按ctrl批量选择状态
let seatWidthTotal; //已有座位总长度
let seatHeightTotal; //已有座位总宽度
let shapes: ShapeItem[] = []; //所有票图图形
let leftLabelBg; //左方坐标标尺背景图形
let leftLabelsText: LabelText[] = []; //左方坐标标尺文字
let topLabelBg; //上方坐标标尺背景图形
let topLabelsText: LabelText[] = []; //上方坐标标尺文字
let selectRects: ShapeItem[] = []; //选中状态的图形
// const _selectRects: ShapeItem[] = []; //本次选中状态的图形
// const _lastSelectRects: ShapeItem[] = []; //本次选中状态的图形
// const _lineTrajectory: ShapeItem[] = []; //上次滑动轨迹
let stageShape; //舞台方向图形
let stageShapeText; //舞台方向文字
let stageShapeMiddleLine; //舞台中心线
let moveStageStatus = false; //移动舞台状态
let stageShowStatus = true; //显示舞台状态

//初始化所有画板大小
function cvsSizeInit() {
  //canvas宽高=当前视角大小
  seatCvs = document.getElementById('seatCvs');
  currWidth = seatCvs.offsetWidth;
  currHeight = seatCvs.offsetHeight;
  seatCvs.width = currWidth;
  seatCvs.height = currHeight;
  //初始化矩阵转换; context为 getContext("2d")所得的CanvasRenderingContext2D对象。
  seatCtx = trackTransform(seatCvs.getContext('2d'));
}

//初始化上帝视角
function godPerspectives() {
  //上帝视角
  seatWidthTotal = colsNum * (seatSizeWidth + seatInterval) + seatMarginLeft;
  seatHeightTotal = rowsNum * (seatSizeWidth + seatInterval) + seatMarginTop;
  //画板大小/座位大小=全屏比例
  const widthScale = Math.floor(currWidth / seatWidthTotal);
  const heightScale = Math.floor(currHeight / seatHeightTotal);
  const scale = Math.min(widthScale, heightScale) * 0.9;
  seatCtx.setTransform(
    scale,
    0,
    0,
    scale,
    (currWidth - seatWidthTotal * scale) / 2,
    (currHeight - seatHeightTotal * scale) / 2,
  );
  //最大最小缩放比例初始化 增加10%偏差
  maxScale =
    Math.min(
      Math.floor(widthScale / seatRatioOfScreenX),
      Math.floor(heightScale / seatRatioOfScreenY),
    ) * 0.7;
  minScale = scale;
}

/**
 * 刻度尺数据初始化
 */
function initSeatLabelData() {
  leftLabelsText = []; //左方坐标标尺文字
  topLabelsText = []; //上方坐标标尺文字
  for (let j = 0; j < colsNum; j++) {
    //上方坐标标尺文字
    topLabelsText.push({
      x:
        j * (seatSizeWidth + seatInterval) +
        seatMarginLeft +
        (j < 9 ? seatSizeWidth * 0.25 : -seatSizeWidth * 0.1),
      y: seatMarginTop / 2 + seatSizeWidth * 1.15,
      text: j + 1 + '',
      font: seatSizeWidth + 'px italic arial,sans-serif',
      color: '#ffffff',
    });
  }
  for (let i = 0; i < rowsNum; i++) {
    //左方坐标标尺文字
    leftLabelsText.push({
      x: seatMarginLeft / 2 + seatSizeWidth * 0.2 + (i < 9 ? seatSizeWidth * 0.25 : 0),
      y: i * (seatSizeHeight + seatInterval) + seatMarginTop + seatSizeHeight * 0.9,
      text: i + 1 + '',
      font: seatSizeHeight + 'px italic arial,sans-serif',
      color: '#ffffff',
    });
  }
  //左方坐标标尺背景图形
  leftLabelBg = {
    type: 'corner',
    x: seatMarginLeft / 2, //左边距/2
    y: seatMarginTop - seatSizeHeight / 2, //上边距-座位高度一半
    width: seatSizeWidth * 1.5,
    height: (seatSizeHeight + seatInterval) * rowsNum,
    r: seatSizeHeight, //圆角
    fillColor: 'rgba(66,79,99,0.7)', //fill color
  };

  //上方坐标标尺背景图形
  topLabelBg = {
    type: 'corner',
    x: seatMarginLeft - seatSizeWidth / 2,
    y: seatMarginTop / 2,
    width: (seatSizeWidth + seatInterval) * colsNum,
    height: seatSizeHeight * 1.5,
    r: seatSizeHeight, //圆角
    fillColor: 'rgba(66,79,99,0.7)', //fill color
  };
}

/**
 * 舞台数据初始化
 * @param linePosition
 */
function initStageData(linePosition?: number) {
  //判断是否显示舞台
  if (stageShowStatus) {
    //舞台中心线
    stageShapeMiddleLine = {
      type: 'dashLine',
      x:
        Math.round(colsNum / 2) * (seatSizeWidth + seatInterval) +
        seatMarginLeft -
        seatInterval * 0.5,
      y: seatSizeHeight * 1.5,
      height: seatHeightTotal,
      lineWidth: seatInterval * 0.1, //border
      borderColor: seatBorderColor,
      inter: seatInterval * 0.5, //虚线的间隔
      linePosition: linePosition ?? Math.round(colsNum / 2), //舞台中线位置
    };
    //舞台位置
    stageShape = {
      type: 'corner',
      //                x: (seatWidthTotal - (seatSizeWidth + seatInterval) * 5 - seatMarginLeft) / 2 + seatMarginLeft - seatInterval * 0.5 + stageDeviation,
      x: stageShapeMiddleLine.x - ((seatSizeWidth + seatInterval) * 5) / 2,
      y: 0,
      width: (seatSizeWidth + seatInterval) * 5,
      height: seatSizeHeight * 1.5,
      r: seatSizeHeight, //圆角
      fillColor: 'rgba(66,79,99,0.7)', //fill color
    };
    //舞台位置文字
    stageShapeText = {
      x: stageShape.x + seatSizeWidth * 1.5,
      y: seatSizeHeight * 1.5 * 0.7,
      text: '舞　台　位　置',
      font: seatSizeHeight + 'px italic arial,sans-serif',
      color: '#ffffff',
    };
  }
}

//根据初始化的座位绘制票图以及所有初始化的图形,画前清空画板
function drawSeat() {
  //清空画布
  seatCtx.clearRect(0, 0, currWidth, currHeight);
  //绘制座位
  shapes.forEach(buildPath);
  //判断是否显示舞台
  if (stageShowStatus) {
    //绘制舞台中心线
    buildPath(stageShapeMiddleLine);
  }
  //绘制左方坐标标尺背景
  buildPath(leftLabelBg);
  //绘制左方坐标标尺文字
  leftLabelsText.forEach(buildText);
  //绘制上方坐标标尺背景
  buildPath(topLabelBg);
  //绘制上方坐标标尺文字
  topLabelsText.forEach(buildText);
  //判断是否显示舞台
  if (stageShowStatus) {
    //绘制舞台位置背景
    buildPath(stageShape);
    //绘制舞台位置文字
    buildText(stageShapeText);
  }
}

function seatCvsEventInit() {
  //屏蔽浏览器canvas右键事件
  seatCvs.oncontextmenu = function (ev) {
    ev.preventDefault();
  };

  //鼠标按下,记录最后点击坐标,同事根据ctrl是否按下状态,判断是否批量选择,批量时,不改变"选择前是否初始化状态"
  seatCvs.addEventListener('mousedown', function (e) {
    // seatCvs.onmousedown = function (e) {
    mousePointLastX = e.clientX;
    mousePointLastY = e.clientY;
    //0左键,2右键
    if (e.button == 0) {
      if (moveStageStatus) {
        //结束掉移动舞台状态
        moveStageStatus = false;
        changeMsg('舞台已选定');
        // 启用其他操作
        setTimeout(() => {
          setSeatActionDisable(seatCvs, false);
        });
      }
    } else if (e.button == 2) {
      //移动画布
      //如果移动舞台状态未激活,执行选择操作
      if (!moveStageStatus) {
        drag();
      } else {
        //结束掉移动舞台状态
        moveStageStatus = false;
        // 启用其他操作
        setTimeout(() => {
          setSeatActionDisable(seatCvs, false);
        });
        ////隐藏舞台
        //stageShowStatus = false;
        //changeMsg("舞台已经移除，再次点击移动舞台可以恢复");
      }
    }
  });

  //鼠标移开事件
  seatCvs.addEventListener('mouseup', function () {
    seatCvs.removeEventListener('mousemove', dragMousemoveEvent);
    seatCvs.removeEventListener('mousemove', stageMoveMousemoveEvent);
    //屏幕保持seatRatioOfScreen(默认:1/4)座位
    keepSeatOnScreen();
    //保持坐标标尺位置
    keepLabelAndTextFixed();
    //重绘所有
    drawSeat();
  });

  //chrome firefox浏览器兼容  滚轮缩放事件
  seatCvs.onmousewheel = seatCvs.onwheel = function (e) {
    const seatTransform = seatCtx.getTransform();
    const wheelDelta = e.wheelDelta ? e.wheelDelta : e.deltaY * -40;
    //TODO 从鼠标所在坐标缩放,暂未实现!!求不跑偏算法
    // const clientXY = windowToCanvas(seatCvs, e.clientX, e.clientY);
    if (wheelDelta > 0) {
      //放大
      if (seatTransform.a < maxScale) {
        //不超过最大放大比例
        seatCtx.transform(1 + scaleInterval, 0, 0, 1 + scaleInterval, 0, 0);
      } else {
        changeMsg('已经缩放到最大啦');
      }
    } else if (wheelDelta < 0) {
      //缩小
      if (seatTransform.a >= minScale) {
        //不超过最小缩小比例
        seatCtx.transform(1 - scaleInterval, 0, 0, 1 - scaleInterval, 0, 0);
      } else {
        changeMsg('已经缩放到最小啦');
      }
    }
    //屏幕保持seatRatioOfScreen(默认:1/4)座位
    keepSeatOnScreen();
    //保持坐标标尺位置
    keepLabelAndTextFixed();
    //重绘所有
    drawSeat();
  };
}

//屏幕保持seatRatioOfScreen(默认:1/4)座位
function keepSeatOnScreen() {
  let seatTransform = seatCtx.getTransform();
  const trueSeatTransformX = seatTransform.e / seatTransform.a; //原点真实坐标
  const trueSeatTransformY = seatTransform.f / seatTransform.a; //原点真实坐标
  //屏幕保持1/4座位
  if (
    trueSeatTransformX < 0 &&
    Math.abs(trueSeatTransformX) > seatWidthTotal * (1 - seatRatioOfScreenX)
  ) {
    //左移超限制
    seatCtx.setTransform(
      seatTransform.a,
      seatTransform.b,
      seatTransform.c,
      seatTransform.d,
      -seatWidthTotal * (1 - seatRatioOfScreenX) * seatTransform.a,
      seatTransform.f,
    );
  }
  if (
    trueSeatTransformX > 0 &&
    Math.abs(trueSeatTransformX) >
      currWidth / seatTransform.a -
        seatWidthTotal * seatRatioOfScreenX -
        seatMarginLeft / seatTransform.a
  ) {
    //右移超限制
    seatCtx.setTransform(
      seatTransform.a,
      seatTransform.b,
      seatTransform.c,
      seatTransform.d,
      currWidth -
        seatWidthTotal * seatRatioOfScreenX * seatTransform.a -
        seatMarginLeft * seatTransform.a,
      seatTransform.f,
    );
  }
  seatTransform = seatCtx.getTransform();
  if (
    trueSeatTransformY < 0 &&
    Math.abs(trueSeatTransformY) > seatHeightTotal * (1 - seatRatioOfScreenY)
  ) {
    //上移超限制
    seatCtx.setTransform(
      seatTransform.a,
      seatTransform.b,
      seatTransform.c,
      seatTransform.d,
      seatTransform.e,
      -seatHeightTotal * (1 - seatRatioOfScreenY) * seatTransform.a,
    );
  }
  if (
    trueSeatTransformY > 0 &&
    Math.abs(trueSeatTransformY) >
      currHeight / seatTransform.a -
        seatHeightTotal * seatRatioOfScreenY -
        seatMarginTop / seatTransform.a
  ) {
    //下移超限制
    seatCtx.setTransform(
      seatTransform.a,
      seatTransform.b,
      seatTransform.c,
      seatTransform.d,
      seatTransform.e,
      currHeight -
        seatHeightTotal * seatRatioOfScreenY * seatTransform.a -
        seatMarginTop * seatTransform.a,
    );
  }
}

//保持坐标标尺位置
function keepLabelAndTextFixed() {
  const seatTransform = seatCtx.getTransform();
  //画布缩放时,坐标标尺位置实时计算
  if (seatTransform.e < 0) {
    //原点移除画布外时,保持label处于屏幕内
    leftLabelBg.x = -seatTransform.e / seatTransform.a + seatMarginLeft / 2;
    leftLabelsText = leftLabelsText.map((text, index) => {
      text.x =
        -seatTransform.e / seatTransform.a +
        seatMarginLeft / 2 +
        seatSizeWidth * 0.2 +
        (index < 9 ? seatSizeWidth * 0.25 : 0);
      return text;
    });
  } else {
    leftLabelBg.x = seatMarginLeft / 2;
    leftLabelsText = leftLabelsText.map((text, index) => {
      text.x = seatMarginLeft / 2 + seatSizeWidth * 0.2 + (index < 9 ? seatSizeWidth * 0.25 : 0);
      return text;
    });
  }
  if (seatTransform.f < 0) {
    //原点移除画布外时,保持label处于屏幕内
    topLabelBg.y = -seatTransform.f / seatTransform.a + seatMarginTop / 2;
    topLabelsText = topLabelsText.map((text) => {
      text.y = -seatTransform.f / seatTransform.a + seatMarginTop / 2 + seatSizeWidth * 1.15;
      return text;
    });
  } else {
    topLabelBg.y = seatMarginTop / 2;
    topLabelsText = topLabelsText.map((text) => {
      text.y = seatMarginTop / 2 + seatSizeWidth * 1.15;
      return text;
    });
  }
  //判断是否显示舞台
  if (stageShowStatus) {
    if (seatTransform.f < 0) {
      //原点移除画布外时,保持舞台位置处于屏幕内
      stageShape.y = -seatTransform.f / seatTransform.a;
      stageShapeText.y = -seatTransform.f / seatTransform.a + seatSizeHeight * 1.5 * 0.7;
    } else {
      // stageShape.y = -seatTransform.f / seatTransform.a;
      // stageShapeText.y = -seatTransform.f / seatTransform.a + seatSizeHeight * 1.5 * 0.7;
      stageShape.y = 0;
      stageShapeText.y = seatSizeHeight * 1.5 * 0.7;
    }
  }
}

/**
 * 画布拖动-鼠标移动监听事件
 * @param e
 */
function dragMousemoveEvent(e) {
  //获取到画板矩阵
  const seatTransform = seatCtx.getTransform();
  const x = e.clientX;
  const y = e.clientY;
  const diffX = x - mousePointLastX;
  const diffY = y - mousePointLastY;
  seatCtx.transform(1, 0, 0, 1, diffX / seatTransform.a, diffY / seatTransform.d);
  //保持坐标标尺位置
  keepLabelAndTextFixed();
  //重绘所有
  drawSeat();
  //每次记录拖拽的最后位置
  mousePointLastX = x;
  mousePointLastY = y;
}

//票图画布整体拖动实现
function drag() {
  seatCvs.addEventListener('mousemove', dragMousemoveEvent);
}

/**
 * 舞台移动-鼠标移动监听事件
 * @param ev
 */
function stageMoveMousemoveEvent(ev) {
  const e = ev || event;
  const x = e.clientX;
  const y = e.clientY;
  //转换坐标
  const _trueOverPoint = windowToCanvas(seatCvs, x, y);
  const trueOverPoint = seatCtx.transformedPoint(_trueOverPoint.x, _trueOverPoint.y);
  //舞台位置背景位置
  stageShape.x = trueOverPoint.x - ((seatSizeWidth + seatInterval) * 5) / 2;
  //线位置基于舞台位置
  stageShapeMiddleLine.x = stageShape.x + stageShape.width / 2;
  //四舍五入,求出距离最近的座位
  let selectCol = Math.round(
    (stageShapeMiddleLine.x - seatMarginLeft) / (seatSizeWidth + seatInterval),
  );
  if (selectCol < 0) {
    selectCol = 0;
  } else if (selectCol > colsNum) {
    selectCol = colsNum;
  }
  //设置中心线位置
  stageShapeMiddleLine.x =
    selectCol * (seatSizeWidth + seatInterval) + seatMarginLeft - seatInterval * 0.5;
  //舞台中线位置
  stageShapeMiddleLine.linePosition = selectCol;
  //反推背景位置
  stageShape.x = stageShapeMiddleLine.x - stageShape.width / 2;
  //根据背景确定文字位置
  stageShapeText.x = stageShape.x + seatSizeWidth * 1.5;
  //根据初始化的座位绘制票图,画前清空画板
  drawSeat();
}

//提示信息
function changeMsg(text, delay = 5) {
  seatAddProps.setTips?.(text, delay);
}

//窗口大小改变后的操作
function addResizeEventListener() {
  const resizeCanvas = useThrottleFn(() => {
    seatCvs = document.getElementById('seatCvs');
    currWidth = seatCvs.offsetWidth;
    currHeight = seatCvs.offsetHeight;
    seatCvs.width = currWidth;
    seatCvs.height = currHeight;
    //重新设置画板最后状态
    const _f = seatCtx.getTransform();
    seatCtx.setTransform(_f.a, _f.b, _f.c, _f.d, _f.e, _f.f);
    //初始化上帝视角
    godPerspectives();
    //屏幕保持seatRatioOfScreen(默认:1/4)座位
    keepSeatOnScreen();
    //保持坐标标尺位置
    keepLabelAndTextFixed();
    //重绘所有
    drawSeat();
  }, 300);
  window.addEventListener('resize', resizeCanvas, false);
}

// 根据行和高，重新绘制结构
export const reInitSeat = function (_rowsNum: number, _colsNum: number) {
  _rowsNum = _rowsNum ?? 10;
  _colsNum = _colsNum ?? 10;
  //行列初始化
  rowsNum = _rowsNum >= 10 ? _rowsNum : 10;
  colsNum = _colsNum >= 10 ? _colsNum : 10;
  //初始化上帝视角
  godPerspectives();
  // 根据行列初始化坐标尺数据
  initSeatLabelData();
  // 初始化舞台数据
  initStageData();
  //重绘所有
  drawSeat();
};

export const initSeat = function (props: SeatAddProps) {
  if (isNotEmpty(props.rowsNum)) {
    rowsNum = props.rowsNum > 10 ? props.rowsNum : 10;
  }
  if (isNotEmpty(props.colsNum)) {
    colsNum = props.colsNum > 10 ? props.colsNum : 10;
  }
  seatAddProps = props;
  // 添加窗口变化监听事件
  addResizeEventListener();
  //初始化所有画板大小(此方法需要在所有操作之前执行)
  cvsSizeInit();
  //初始化上帝视角
  godPerspectives();
  // 根据行列初始化坐标尺数据
  initSeatLabelData();
  // 初始化舞台数据
  initStageData(props.stagePosition);
  //根据初始化的座位绘制票图,画前清空画板
  drawSeat();
  //初始化票图画板事件
  seatCvsEventInit();

  return {
    seatCtx,
    seatCvs,
  };
};

// 设置座位数据，进行绘制
export const setSeatData = function (_shapes: ShapeItem[]) {
  shapes = _shapes;
  //重绘所有
  drawSeat();
};

//移动舞台按钮事件
export const moveStage = function () {
  changeMsg('鼠标左键确定舞台位置', 10);
  //增加操作历史
  // TODO @Lucas 按钮处理
  addHistory(
    {
      shapes: shapes,
      selectRects: selectRects,
      stageShowStatus: stageShowStatus,
      stageShape: stageShape,
      stageShapeText: stageShapeText,
      stageShapeMiddleLine: stageShapeMiddleLine,
    },
    ['#backupBtn'],
  );
  //显示舞台状态重置
  stageShowStatus = true;
  //移动舞台状态激活
  moveStageStatus = true;
  // 禁用其他操作
  setSeatActionDisable(seatCvs, true);
  //重定义鼠标移动事件
  seatCvs.removeEventListener('mousemove', dragMousemoveEvent);
  seatCvs.addEventListener('mousemove', stageMoveMousemoveEvent);
};

// 获取舞台位置
export const getStagePosition = () => {
  return stageShapeMiddleLine.linePosition;
};

// 重置比例
export const resizeProportion = function () {
  godPerspectives();
  keepLabelAndTextFixed();
  drawSeat();
  changeMsg('已恢复上帝视角');
};

//撤销按钮点击事件
export const revocation = function () {
  // TODO @Lucas 按钮处理
  const history = getHistory(['#backupBtn']);
  if (isNotEmpty(history)) {
    //从历史记录中还原保存的操作
    // TODO @Lucas history类型定义
    // @ts-ignore
    shapes = history.shapes; //还原座位
    // @ts-ignore
    selectRects = history.selectRects; //还原已选择座位
    // @ts-ignore
    stageShowStatus = history.stageShowStatus; //还原舞台是否显示
    // @ts-ignore
    stageShape = history.stageShape; //还原舞台背景
    // @ts-ignore
    stageShapeText = history.stageShapeText; //还原舞台文字
    // @ts-ignore
    stageShapeMiddleLine = history.stageShapeMiddleLine; //还原舞台中心线
    drawSeat();
    changeMsg('已经后退到上一步操作');
  }
};
