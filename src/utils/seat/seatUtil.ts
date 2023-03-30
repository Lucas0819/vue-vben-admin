/**
 * 改写自：seat-util12121.js
 *
 * @Author: Lucas
 * @Date: 2023-03-30
 */
import { cloneDeep } from 'lodash-es';
import { isEmpty } from '/@/utils/is';
import { ShapeItem } from '/@/utils/seat/seatAdd';

//使用SvgAPI进行扩展,SVG的API比canvas更加全面
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
let xform: DOMMatrix = svg.createSVGMatrix();
let ctxInfo: CustomCanvasRenderingContext2D;
const savedTransforms: DOMMatrix[] = []; //保存的画板矩阵
let history = []; //对座位历史操作记录
export interface CustomCanvasRenderingContext2D extends CanvasRenderingContext2D {
  transformedPoint: (x: number, y: number) => DOMPoint;
  transformedPoint2: (x: number, y: number) => DOMPoint;
}

//记录context操作记录,并对context对象本身扩展
export const trackTransform = function (ctx: CustomCanvasRenderingContext2D) {
  //获取到画板矩阵,内容为最后一次操作后的实际值
  ctx.getTransform = function () {
    return xform;
  };
  const save = ctx.save;
  ctx.save = function () {
    savedTransforms.push(xform.translate(0, 0));
    return save.call(ctx);
  };
  const restore = ctx.restore;
  ctx.restore = function () {
    if (!isEmpty(savedTransforms)) {
      // @ts-ignore
      xform = savedTransforms.pop();
    }
    return restore.call(ctx);
  };
  const scale = ctx.scale;
  ctx.scale = function (sx, sy) {
    xform = xform.scaleNonUniform(sx, sy);
    return scale.call(ctx, sx, sy);
  };
  const rotate = ctx.rotate;
  ctx.rotate = function (deg) {
    const radians = (deg * Math.PI) / 180;
    xform = xform.rotate(deg);
    return rotate.call(ctx, radians);
  };
  const translate = ctx.translate;
  ctx.translate = function (dx, dy) {
    xform = xform.translate(dx, dy);
    return translate.call(ctx, dx, dy);
  };
  const transform = ctx.transform;
  ctx.transform = function (a, b, c, d, e, f) {
    const m2 = svg.createSVGMatrix();
    m2.a = a;
    m2.b = b;
    m2.c = c;
    m2.d = d;
    m2.e = e;
    m2.f = f;
    xform = xform.multiply(m2);
    return transform.call(ctx, a, b, c, d, e, f);
  };
  type SetTransformByNum = (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  ) => void;
  const setTransform = ctx.setTransform as SetTransformByNum;

  (ctx.setTransform as SetTransformByNum) = function (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  ): void {
    xform.a = a;
    xform.b = b;
    xform.c = c;
    xform.d = d;
    xform.e = e;
    xform.f = f;
    return setTransform.call(ctx, a, b, c, d, e, f);
  };

  const pt = svg.createSVGPoint();
  //通过原坐标系点x，y求对应当前坐标系的坐标值
  ctx.transformedPoint = function (x, y) {
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(xform.inverse());
  };
  const pt2 = svg.createSVGPoint();
  //当前坐标系中的的xy还原到原坐标系坐标值
  ctx.transformedPoint2 = function (x, y) {
    pt2.x = x;
    pt2.y = y;
    return pt2.matrixTransform(xform);
  };
  const clearRect = ctx.clearRect;
  ctx.clearRect = function (x, y, w, h) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    clearRect.call(ctx, x, y, w, h);
    ctx.restore();
  };
  ctxInfo = ctx;
  return ctx;
};

//根据图形属性生成图形路径,并根据颜色填充
export const buildPath = function (shape: ShapeItem) {
  let x = shape.x;
  let y = shape.y;
  let width = shape.width;
  let height = shape.height;
  const r = shape.r;
  const type = shape.type;
  if (type == 'rect') {
    if (shape.borderColor) {
      ctxInfo.lineWidth = shape.lineWidth;
      ctxInfo.strokeStyle = shape.borderColor;
      ctxInfo.strokeRect(x, y, width, height);
    }
    if (shape.fillColor) {
      ctxInfo.fillStyle = shape.fillColor;
      ctxInfo.fillRect(x, y, width, height);
      //                ctxInfo.fill();
    }
  } else if (type == 'corner') {
    let r1, r2, r3, r4;
    // Convert width and height to positive for better borderRadius
    if (width < 0) {
      x = x + width;
      width = -width;
    }
    if (height < 0) {
      y = y + height;
      height = -height;
    }
    if (typeof r === 'number') {
      r1 = r2 = r3 = r4 = r;
    } else if (r instanceof Array) {
      if (r.length === 1) {
        r1 = r2 = r3 = r4 = r[0];
      } else if (r.length === 2) {
        r1 = r3 = r[0];
        r2 = r4 = r[1];
      } else if (r.length === 3) {
        r1 = r[0];
        r2 = r4 = r[1];
        r3 = r[2];
      } else {
        r1 = r[0];
        r2 = r[1];
        r3 = r[2];
        r4 = r[3];
      }
    } else {
      r1 = r2 = r3 = r4 = 0;
    }
    let total;
    if (r1 + r2 > width) {
      total = r1 + r2;
      r1 *= width / total;
      r2 *= width / total;
    }
    if (r3 + r4 > width) {
      total = r3 + r4;
      r3 *= width / total;
      r4 *= width / total;
    }
    if (r2 + r3 > height) {
      total = r2 + r3;
      r2 *= height / total;
      r3 *= height / total;
    }
    if (r1 + r4 > height) {
      total = r1 + r4;
      r1 *= height / total;
      r4 *= height / total;
    }
    ctxInfo.beginPath();
    ctxInfo.moveTo(x + r1, y);
    ctxInfo.lineTo(x + width - r2, y);
    r2 !== 0 && ctxInfo.quadraticCurveTo(x + width, y, x + width, y + r2);
    ctxInfo.lineTo(x + width, y + height - r3);
    r3 !== 0 && ctxInfo.quadraticCurveTo(x + width, y + height, x + width - r3, y + height);
    ctxInfo.lineTo(x + r4, y + height);
    r4 !== 0 && ctxInfo.quadraticCurveTo(x, y + height, x, y + height - r4);
    ctxInfo.lineTo(x, y + r1);
    r1 !== 0 && ctxInfo.quadraticCurveTo(x, y, x + r1, y);
    if (shape.borderColor) {
      ctxInfo.lineWidth = shape.lineWidth;
      ctxInfo.strokeStyle = shape.borderColor;
      ctxInfo.stroke();
    }
    if (shape.fillColor) {
      ctxInfo.fillStyle = shape.fillColor;
      ctxInfo.fill();
    }
  } else if (type == 'dashLine') {
    const inter = shape.inter; //虚线的间隔
    if (!isEmpty(inter)) {
      const num = parseInt(height / inter);
      ctxInfo.beginPath();
      for (let i = 0; i < num; i++) {
        if (i % 2 == 0) {
          ctxInfo.moveTo(x, y + inter * i);
        } else {
          ctxInfo.lineTo(x, y + inter * i);
        }
      }
      if (shape.borderColor) {
        ctxInfo.lineWidth = shape.lineWidth;
        ctxInfo.strokeStyle = shape.borderColor;
        ctxInfo.stroke();
      }
    }
  }
};

export const buildText = function (shape) {
  if (shape.text) {
    ctxInfo.font = shape.font;
    ctxInfo.fillStyle = shape.color;
    ctxInfo.fillText(shape.text, shape.x, shape.y);
  }
};

export const buildImage = function (shape) {
  if (shape.img) {
    ctxInfo.globalAlpha = shape.alpha;
    ctxInfo.drawImage(shape.img, shape.x, shape.y, shape.width, shape.height);
    ctxInfo.globalAlpha = 1;
  }
};

//坐标转换,从window窗口坐标转换为canvas坐标
export const windowToCanvas = function (canvas, x, y) {
  const bbox = canvas.getBoundingClientRect();
  return {
    x: (x - bbox.left) * (canvas.width / bbox.width),
    y: (y - bbox.top) * (canvas.height / bbox.height),
  };
};

export const addHistory = function (operationObj, btnObjs) {
  //深复制新对象和对象数组,从而不影响原全局变量,但是取出时,为了影响全局变量,需要调整子数组的指针地址,重新指向到克隆后的母数组
  operationObj.shapes = cloneDeep(operationObj.shapes);
  operationObj.selectRects = cloneDeep(operationObj.selectRects);
  operationObj.stageShape = cloneDeep(operationObj.stageShape);
  operationObj.stageShapeText = cloneDeep(operationObj.stageShapeText);
  operationObj.stageShapeMiddleLine = cloneDeep(operationObj.stageShapeMiddleLine);
  if (operationObj.rowsNo) {
    operationObj.rowsNo = cloneDeep(operationObj.rowsNo);
  }
  if (operationObj.colsNo) {
    operationObj.colsNo = cloneDeep(operationObj.colsNo);
  }
  if (operationObj.selectRects) {
    for (const i in operationObj.selectRects) {
      operationObj.selectRects[i] = operationObj.shapes[operationObj.selectRects[i].index];
    }
  }
  //放入到历史记录中
  if (!isEmpty(operationObj)) {
    history.push(operationObj);
  }
  if (btnObjs) {
    // TODO @Lucas 处理按钮
    // $.each(btnObjs, function (x, y) {
    //   y.attr('disabled', false);
    // });
  }
};
export const getHistory = function (btnObjs?: string[]) {
  //以堆栈方式,从历史记录中取出最后一次操作记录
  const _history = history.pop();
  if (history.length == 0 && btnObjs) {
    // TODO @Lucas 处理按钮
    // $.each(btnObjs, function (x, y) {
    //   y.attr('disabled', true);
    // });
  }
  return _history;
};
export const hasHistory = function () {
  return history.length > 0;
};
export const getReset = function (btnObjs) {
  //取出最初始状态返回,并清除所有历史记录
  const resetObj = history[0];
  history = [];
  if (btnObjs) {
    // TODO @Lucas 处理按钮
    // $.each(btnObjs, function (x, y) {
    //   y.attr('disabled', true);
    // });
  }
  return resetObj;
};
