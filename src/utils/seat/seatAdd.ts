import { ref } from 'vue';
import {
  addHistory,
  buildPath,
  buildText,
  CustomCanvasRenderingContext2D,
  getHistory,
  trackTransform,
  windowToCanvas,
} from './seatUtil';
import { isDef, isEmpty, isNullOrUnDef } from '/@/utils/is';
import { cloneDeep } from 'lodash-es';
import { LabelText, RuleStyle, ShapeItem, TmpShapeItem } from '@/utils/seat/seat';
import { SeatAddProps, SelectTypeEnum } from '@/utils/seat/typing';

/**
 * 改写自：seat-add12121.js
 *
 * @Author: Lucas
 * @Date: 2023-03-30
 */
let seatCtx: CustomCanvasRenderingContext2D;
let seatCvs; //canvas.context和jcanvas

//可配置变量
//初始行列数
let rowsNum = 10; //排数
let colsNum = 10; //列数
const seatColor = '#EEEEEE'; //非座位默认颜色
const seatSetColor = '#AAAAAA'; //设定的座位默认颜色
const seatBorderColor = '#CCCCCC'; //座位默认边框颜色
const seatBorderSelectedColor = '#FF0000'; //座位选中后边框颜色
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
let selectInitStatus = false; //下次选择时是否清空之前已选状态(与批量选择状态互斥)
let selectBatchStatus = false; //按ctrl批量选择状态
let seatWidthTotal; //已有座位总长度
let seatHeightTotal; //已有座位总宽度
let shapes: ShapeItem[] = []; //所有票图图形
let leftLabelBg; //左方坐标标尺背景图形
let leftLabelsText: LabelText[] = []; //左方坐标标尺文字
let topLabelBg; //上方坐标标尺背景图形
let topLabelsText: LabelText[] = []; //上方坐标标尺文字
let selectRects: ShapeItem[] = []; //选中状态的图形
let _selectRects: ShapeItem[] = []; //本次选中状态的图形
let _lastSelectRects: ShapeItem[] = []; //本次选中状态的图形
let _lineTrajectory: ShapeItem[] = []; //上次滑动轨迹
let stageShape; //舞台方向图形
let stageShapeText; //舞台方向文字
let stageShapeMiddleLine; //舞台中心线
let moveStageStatus = false; //移动舞台状态
let stageShowStatus = true; //显示舞台状态

// 按钮选择状态
export const selectType = ref(SelectTypeEnum.SQUARE); // 选择方式, square: 矩形选择 || trajectory: 轨迹

export const selectRule = ref<RuleStyle>(); // 选择内容提示

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

//初始化座位
function initSeat() {
  shapes = []; //所有票图图形
  leftLabelsText = []; //左方坐标标尺文字
  topLabelsText = []; //上方坐标标尺文字
  for (let i = 0; i < rowsNum; i++) {
    for (let j = 0; j < colsNum; j++) {
      //座位形状初始化
      shapes.push({
        index: j + colsNum * i,
        type: 'rect',
        x: j * (seatSizeWidth + seatInterval) + seatMarginLeft,
        y: i * (seatSizeHeight + seatInterval) + seatMarginTop,
        width: seatSizeWidth,
        height: seatSizeHeight,
        lineWidth: 0.4, //border
        borderColor: seatBorderColor, //border color
        fillColor: seatColor, //fill color
        isSeat: false, //是否被设定为座位
      });
      //上label文字(列号)只需要加载一次
      if (i == 0) {
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
    }
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
      linePosition: Math.round(colsNum / 2), //舞台中线位置
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

//点的位置是否在图形上,返回行列信息,不在返回null
function isPointInPath(point) {
  //根据点击坐标按缩放比例取得真实坐标
  const cvsRealPoint = seatCtx.transformedPoint(point.x, point.y);
  //行列位置:(真实坐标-边距)/(座位大小+间距),范围:0 < 结果的小数位 < 座位大小/(座位大小+间距),根据此公式,即可不用循环判断,提升效率
  const selectCol = (cvsRealPoint.x - seatMarginLeft) / (seatSizeWidth + seatInterval);
  const selectRow = (cvsRealPoint.y - seatMarginTop) / (seatSizeHeight + seatInterval);
  if (
    selectCol - parseInt(selectCol) <= seatSizeWidth / (seatSizeWidth + seatInterval) &&
    selectRow - parseInt(selectRow) <= seatSizeHeight / (seatSizeHeight + seatInterval) &&
    parseInt(selectCol) < colsNum &&
    parseInt(selectRow) < rowsNum &&
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
function onKeydown({ ctrlKey, key }) {
  //按住ctrl批量选择开始
  if (ctrlKey) {
    selectBatchStatus = true;
  } else if (key === 'Enter') {
    //回车触发事件,设置座位
    setSeatStatus(true);
    drawSeat();
  } else if (key === 'Delete') {
    //删除触发事件,清除座位
    setSeatStatus(false);
    drawSeat();
  } else if (key === 'ArrowUp') {
    //上移
    moveSeats(1);
    drawSeat();
  } else if (key === 'ArrowRight') {
    //右移
    moveSeats(2);
    drawSeat();
  } else if (key === 'ArrowDown') {
    //下移
    moveSeats(3);
    drawSeat();
  } else if (key === 'ArrowLeft') {
    //左移
    moveSeats(4);
    drawSeat();
  }
}

function onKeyup({ ctrlKey }) {
  //按住ctrl批量选择结束
  if (!ctrlKey) {
    selectBatchStatus = false;
  }
}

function seatCvsEventInit() {
  //屏蔽浏览器canvas右键事件
  seatCvs.oncontextmenu = function (ev) {
    ev.preventDefault();
  };
  // 按键监听
  document.removeEventListener('keydown', onKeydown);
  document.addEventListener('keydown', onKeydown);
  // 按键抬起监听
  document.removeEventListener('keyup', onKeyup);
  document.addEventListener('keyup', onKeyup);

  //鼠标按下,记录最后点击坐标,同事根据ctrl是否按下状态,判断是否批量选择,批量时,不改变"选择前是否初始化状态"
  seatCvs.onmousedown = function (e) {
    mousePointLastX = e.clientX;
    mousePointLastY = e.clientY;
    //0左键,2右键
    if (e.button == 0) {
      //滑选,点击
      selectInitStatus = !selectBatchStatus;
      //如果移动舞台状态未激活,执行选择操作
      if (!moveStageStatus) {
        changeMsg('按住Ctrl键批量选择，Enter:确定座位，Delete:删除座位，←↑↓→:移动座位', 10);
        select();
      } else {
        //结束掉移动舞台状态
        moveStageStatus = false;
        changeMsg('舞台已选定');
      }
    } else if (e.button == 2) {
      //移动画布
      //如果移动舞台状态未激活,执行选择操作
      if (!moveStageStatus) {
        drag();
      } else {
        //结束掉移动舞台状态
        moveStageStatus = false;
        ////隐藏舞台
        //stageShowStatus = false;
        //changeMsg("舞台已经移除，再次点击移动舞台可以恢复");
      }
    }
  };

  //鼠标移开事件
  seatCvs.onmouseup = function () {
    seatCvs.onmousemove = null;
    //屏幕保持seatRatioOfScreen(默认:1/4)座位
    keepSeatOnScreen();
    //保持坐标标尺位置
    keepLabelAndTextFixed();
    selectRects.push(..._selectRects.filter((item) => !hasShapeItem(selectRects, item)));

    //重绘所有
    drawSeat();
    //清除上次滑动轨迹
    _lineTrajectory = [];
    // TODO @Lucas 隐藏选择框
    // $('#selectRule').hide();
  };

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

//票图画布整体拖动实现
function drag() {
  seatCvs.onmousemove = function (e) {
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
  };
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
  const clickSeat = isPointInPath(windowToCanvas(seatCvs, mousePointLastX, mousePointLastY));
  if (clickSeat) {
    //判断是否是按ctrl批量选择状态
    if (!selectBatchStatus) {
      console.error('need reset: ', selectRects);
      selectRects.forEach((item) => {
        const shape = getShapeItem(shapes, item);
        if (isDef(shape)) {
          shape.borderColor = seatBorderColor;
          console.error('reset: ', shape);
        }
      });
      selectRects = [];
    }
    //转换选择的座位的边框颜色
    const selectedShape = shapes[clickSeat.row * colsNum + clickSeat.col];
    selectedShape.borderColor = seatBorderSelectedColor;
    //放入到选中状态的图形数组中
    selectRects.push(selectedShape);
    console.error('add rect: ', selectedShape);
    //重绘所有
    drawSeat();
  }
  _lastSelectRects = [];
  _selectRects = [];
  seatCvs.onmousemove = function (e) {
    //下次选择时是否清空之前已选状态
    if (selectInitStatus) {
      selectRects.forEach((item) => {
        const shape = getShapeItem(shapes, item);
        if (isDef(shape)) {
          shape.borderColor = seatBorderColor;
        }
      });
      selectRects = [];
      selectInitStatus = false;
    }
    _selectRects = [];
    //重绘所有
    drawSeat();
    //获取到画板矩阵
    const seatTransform = seatCtx.getTransform();
    const _trueSelectPoint = windowToCanvas(seatCvs, mousePointLastX, mousePointLastY);
    const trueSelectPoint = seatCtx.transformedPoint(_trueSelectPoint.x, _trueSelectPoint.y);
    const _trueSelectPoint2 = windowToCanvas(seatCvs, e.clientX, e.clientY);
    const trueSelectPoint2 = seatCtx.transformedPoint(_trueSelectPoint2.x, _trueSelectPoint2.y);
    //选择方式
    if (selectType.value == 'square') {
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
            const selectedShape = shapes[constantSeat.row * colsNum + constantSeat.col];
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
        let _selectMinRow = rowsNum;
        let _selectMaxRow = 0;
        let _selectMixCol = colsNum;
        let _selectMaxCol = 0;
        let _selectSeatTotalCount = 0;
        _selectRects.forEach((item) => {
          if (item.isSeat) {
            _selectSeatTotalCount++;
          }
          const _row = Math.floor(item.index / colsNum);
          const _col = item.index % colsNum;
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
    } else if (selectType.value == 'trajectory') {
      //轨迹选择
      seatCtx.fillStyle = seatBorderColor;
      seatCtx.fillRect(
        trueSelectPoint2.x - seatSizeWidth * 0.5,
        trueSelectPoint2.y - seatSizeHeight * 0.5,
        seatSizeWidth,
        seatSizeHeight,
      );
      const constantSeat = isPointInPath({ x: _trueSelectPoint2.x, y: _trueSelectPoint2.y });
      if (constantSeat) {
        const selectedShape = shapes[constantSeat.row * colsNum + constantSeat.col];
        if (!hasShapeItem(_lineTrajectory, selectedShape)) {
          _lineTrajectory.push(selectedShape);
        }
      }
      _lineTrajectory.forEach((selectedShape) => {
        if (!hasShapeItem(_selectRects, selectedShape)) {
          //设置为选择状态
          selectedShape.borderColor = seatBorderSelectedColor;
          //已经选择的图形
          _selectRects.push(selectedShape);
        }
      });
    }
    //上次选择的图形本次选择的图形作对比,将取消选择的图形重置
    _lastSelectRects.forEach((item) => {
      if (!hasShapeItem(_selectRects, item)) {
        item.borderColor = seatBorderColor;
      }
    });
    //记录本次选择数组
    _lastSelectRects = _selectRects;
  };
}

//提示信息
function changeMsg(text, delay = 5) {
  seatAddProps.setTips(text, delay);
}

//设定/删除已选定的座位 true:设定,false:删除
function setSeatStatus(status) {
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
  for (const i in selectRects) {
    selectRects[i].borderColor = seatBorderColor;
    selectRects[i].fillColor = status ? seatSetColor : seatColor;
    selectRects[i].isSeat = status;
  }
  selectRects = [];
}

//移动座位1234代表↑ → ↓ ←
function moveSeats(status) {
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
  //选择的范围
  const selectIndexList: number[] = [];
  //移动后不在原范围的范围
  const otherIndexList: number[] = [];
  //选择范围内是否有座位状态
  let haveSeatStatus = false;
  //复制选中的座位
  const selectRectsCopy: ShapeItem[] = [];
  //判断选中状态的图形中是否包含座位;对选择的图形进行深度复制;记录被选图形下标
  selectRects.forEach((item) => {
    selectIndexList.push(item.index);
    selectRectsCopy.push(cloneDeep(item));
    if (item.isSeat) {
      haveSeatStatus = true;
    }
  });
  if (!haveSeatStatus) {
    changeMsg('选择范围内没有座位');
    getHistory(); //移动失败,清除放入的历史记录
    return;
  }
  //记录移动后不在范围内的图形下标
  selectIndexList.forEach((index) => {
    let row = Math.floor(index / colsNum);
    let col = index % colsNum;
    let newIndex = index;
    switch (status) {
      case 1:
        row--;
        break;
      case 2:
        col++;
        break;
      case 3:
        row++;
        break;
      case 4:
        col--;
        break;
    }
    newIndex = row * colsNum + col;
    if (!selectIndexList.includes(newIndex)) {
      otherIndexList.push(newIndex);
    }
  });
  for (const i in otherIndexList) {
    if (!shapes[otherIndexList[i]]) {
      changeMsg('超出画布，不能移动');
      getHistory(); //移动失败,清除放入的历史记录
      return;
    }
    if (shapes[otherIndexList[i]].isSeat) {
      changeMsg('要移动的范围内有座位，不能移动');
      getHistory(); //移动失败,清除放入的历史记录
      return;
    }
  }
  //记录操作后的图形对象,将赋值给已选择图形数组,用于保持座位的选中状态
  const _selectRectsTemp: ShapeItem[] = [];
  //清除原范围座位
  for (const i in selectRects) {
    selectRects[i].borderColor = seatBorderColor;
    selectRects[i].fillColor = seatColor;
    selectRects[i].isSeat = false;
  }
  //赋值移动后座位
  selectRects.forEach((item, index) => {
    let row = Math.floor(item.index / colsNum);
    let col = item.index % colsNum;
    switch (status) {
      case 1:
        row--;
        break;
      case 2:
        col++;
        break;
      case 3:
        row++;
        break;
      case 4:
        col--;
        break;
    }
    //根据原始index计算出移动后的index,并用拷贝的已选择图形对新位置的图形赋值,并记录到操作后的图形数组中
    const _newIndex = row * colsNum + col;
    shapes[_newIndex].borderColor = selectRectsCopy[index].borderColor;
    shapes[_newIndex].fillColor = selectRectsCopy[index].fillColor;
    shapes[_newIndex].isSeat = selectRectsCopy[index].isSeat;
    _selectRectsTemp.push(shapes[_newIndex]);
  });
  //将移动后座位赋值为已选择数组
  selectRects = _selectRectsTemp;
}

//窗口大小改变后的操作
function addResizeEventListener() {
  // TODO @Lucas 监听窗口变化，处理currWidth等
  // window.addEventListener(
  //   'resize',
  //   function () {
  //     clearTimeout(tid);
  //     tid = setTimeout(function () {
  //       //canvas实际宽高
  //       currWidth = $(window).width() - 60;
  //       currHeight = $(window).height() - 100 - 44;
  //       //根据改变后的实际宽高重新调整座位画板宽高
  //       $('#seatCvs').attr('width', currWidth).attr('height', currHeight);
  //       //重新设置画板最后状态
  //       const _f = seatCtx.getTransform();
  //       seatCtx.setTransform(_f.a, _f.b, _f.c, _f.d, _f.e, _f.f);
  //       //初始化上帝视角
  //       godPerspectives();
  //       //屏幕保持seatRatioOfScreen(默认:1/4)座位
  //       keepSeatOnScreen();
  //       //保持坐标标尺位置
  //       keepLabelAndTextFixed();
  //       //重绘所有
  //       drawSeat();
  //     }, 300); //这里设置了300ms的防抖间隔
  //   },
  //   false,
  // );
}

//生成画布按钮事件
export const reInitSeatAdd = function (_rowsNum: number, _colsNum: number) {
  _rowsNum = _rowsNum ?? 10;
  _colsNum = _rowsNum ?? 10;
  //行列初始化
  rowsNum = _rowsNum >= 10 ? _rowsNum : 10;
  colsNum = _rowsNum >= 10 ? _colsNum : 10;
  //初始化上帝视角
  godPerspectives();
  //初始化座位
  initSeat();
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
  //重定义鼠标移动事件
  seatCvs.onmousemove = function (ev) {
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
  };
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
  if (!isEmpty(history)) {
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
  seatAddProps?.setBtnAvailable?.(true);
};

//保存按钮点击事件
// export const saveData = function () {
//   //构建数据
//   const result = {
//     name: $('#name').val(),
//     tempChartId: tempChartId,
//     rowsNum: rowsNum,
//     colsNum: colsNum,
//     stageShow: stageShowStatus ? 1 : 0,
//     stagePosition: stageShapeMiddleLine.linePosition, //舞台位置,在第几列之后(注:位置信息以1为起始)
//     seatDetail: [],
//   };
//   for (const i in shapes) {
//     if (shapes[i].isSeat) {
//       result.seatDetail.push(i + '|0|0|0|0|0|0'); //index|座位行|座位列|颜色|预留|预留|预留
//     }
//   }
//   if (!result.name) {
//     layer.msg(
//       '结构名称未填写',
//       {
//         icon: 2,
//         time: 2000,
//         shade: [0.4, '#000'],
//         shadeClose: true,
//       },
//       function () {
//         $('#name').focus();
//       },
//     );
//     return;
//   }
//   if (result.seatDetail.length == 0) {
//     layer.msg('没有已选定座位', {
//       icon: 2,
//       time: 2000,
//       shade: [0.4, '#000'],
//       shadeClose: true,
//     });
//     return;
//   }
//   const loading = layer.msg('正在提交，请稍等...', {
//     icon: 16,
//     shade: [0.4, '#000'],
//     time: 0,
//   });
//   $.ajax({
//     type: 'post',
//     url: ctx + '/tmp/tmpChartSplit/save',
//     data: { tmpChartSplitJson: encodeURI(JSON.stringify(result)) },
//     dataType: 'json',
//     success: function (result) {
//       layer.close(loading);
//       if (result.success) {
//         layer.msg('保存成功', {
//           icon: 1,
//           time: 2000,
//           shade: [0.4, '#000'],
//           shadeClose: true,
//         });
//         try {
//           window.opener.refreshTable();
//         } catch (e) {}
//         window.location = ctx + '/tmp/tmpChartSplit/form?id=' + result.msg;
//       } else {
//         showError(result.msg);
//       }
//     },
//     error: function () {
//       showError('服务器开小差了，请稍后再试!');
//       layer.close(loading);
//     },
//   });
// };

//选择方式切换
export const changeSelectType = function (type: SelectTypeEnum) {
  selectType.value = type;
  changeMsg('鼠标左键滑选，轨迹选择性能低，需匀速慢慢滑动', 15);
};

export const getStagePosition = () => {
  return stageShapeMiddleLine.linePosition;
};

export const getSeatDetail = () => {
  const result: string[] = [];
  for (const i in shapes) {
    if (shapes[i].isSeat) {
      result.push(i + '|0|0|0|0|0|0'); //index|座位行|座位列|颜色|预留|预留|预留
    }
  }
  return result;
};

export const initSeatAdd = function (props: SeatAddProps) {
  seatAddProps = props;
  // 添加窗口变化监听事件
  addResizeEventListener();
  //初始化所有画板大小(此方法需要在所有操作之前执行)
  cvsSizeInit();
  //初始化上帝视角
  godPerspectives();
  //初始化座位
  initSeat();
  //根据初始化的座位绘制票图,画前清空画板
  drawSeat();
  //初始化票图画板事件
  seatCvsEventInit();
};
