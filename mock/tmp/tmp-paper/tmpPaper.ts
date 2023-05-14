import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, resultSuccess } from '../../_util';

const tmpPaperItem = {
  id: '@id()',
  remarks: '@remarks()',
  createBy: '@createBy()',
  createDate: '@createDate()',
  updateDate: '@updateDate()',
  ticketFaceData:
    '{"orderDetailId":"${orderDetailId}","orderId":"${orderId}","printNum":1,"seatInfo":"${zoneAndSeatNo}","ticketElementList":[{"elmTop":96,"elmLef":13,"elmWidth":88,"elmHeight":88,"fontBold":false,"fontHeight":88,"fontName":"","caption":"${ticketCode}","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEQRCod","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":17,"elmLef":209,"elmWidth":125,"elmHeight":28,"fontBold":true,"fontHeight":18,"fontName":"SIMHEI","caption":"${activityName}","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":70,"elmLef":132,"elmWidth":121,"elmHeight":25,"fontBold":true,"fontHeight":16,"fontName":"SIMHEI","caption":"时 间（Date）：","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":68,"elmLef":330,"elmWidth":111,"elmHeight":25,"fontBold":true,"fontHeight":16,"fontName":"SIMHEI","caption":"${eventTime}","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":100,"elmLef":317,"elmWidth":111,"elmHeight":25,"fontBold":true,"fontHeight":16,"fontName":"SIMHEI","caption":"${showAddress}","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":131,"elmLef":303,"elmWidth":153,"elmHeight":25,"fontBold":true,"fontHeight":16,"fontName":"SIMHEI","caption":"${zoneAndSeatNo}","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":166,"elmLef":306,"elmWidth":111,"elmHeight":25,"fontBold":true,"fontHeight":16,"fontName":"SIMHEI","caption":"${pricePrice}","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":101,"elmLef":131,"elmWidth":133,"elmHeight":25,"fontBold":true,"fontHeight":16,"fontName":"SIMHEI","caption":"场 馆（Venue）：","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":132,"elmLef":131,"elmWidth":120,"elmHeight":25,"fontBold":true,"fontHeight":16,"fontName":"SIMHEI","caption":"座 位（Seat）：","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":164,"elmLef":131,"elmWidth":124,"elmHeight":25,"fontBold":true,"fontHeight":16,"fontName":"SIMHEI","caption":"票 价（Price）：","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":40,"elmLef":607,"elmWidth":97,"elmHeight":22,"fontBold":true,"fontHeight":14,"fontName":"SIMHEI","caption":"${showAddress}","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":91,"elmLef":614,"elmWidth":83,"elmHeight":22,"fontBold":true,"fontHeight":14,"fontName":"SIMHEI","caption":"${zone}","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":137,"elmLef":614,"elmWidth":83,"elmHeight":22,"fontBold":true,"fontHeight":14,"fontName":"SIMHEI","caption":"${seatNo}","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":183,"elmLef":609,"elmWidth":83,"elmHeight":19,"fontBold":true,"fontHeight":12,"fontName":"SIMHEI","caption":"${pricePrice}","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":195,"elmLef":109,"elmWidth":348,"elmHeight":19,"fontBold":false,"fontHeight":12,"fontName":"SIMHEI","caption":"儿童及成人一律一人一票，按对应楼层对号入座，一次入场有效。","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":166,"elmLef":463,"elmWidth":79,"elmHeight":25,"fontBold":true,"fontHeight":16,"fontName":"SIMHEI","caption":"${giveTicket}","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false},{"elmTop":218,"elmLef":132,"elmWidth":97,"elmHeight":22,"fontBold":true,"fontHeight":14,"fontName":"SIMHEI","caption":"${printRemarks}","fontHorizonal":0,"fontVertical":0,"fontReverse":false,"fontItalic":false,"fontUnderline":false,"diagonalLeft":false,"diagonalRight":false,"nonDefault":"","oldId":null,"pattern":"","elementType":"TEText","borderDown":false,"borderLeft":false,"borderRight":false,"borderUp":false}],"ticketFace":{"printerName":"PPL1"}}',
  ticketFaceWidth: '@ticketFaceWidth()',
  ticketFaceHeight: '@ticketFaceHeight()',
  bgImg: '@bgImg()',
};

const tmpPaperList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push(tmpPaperItem);
  }
  return result;
})();

export default [
  {
    url: '/basic-api/tmpPaper/getTmpPaperPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, tmpPaperList);
    },
  },
  {
    url: '/basic-api/tmpPaper/getAllTmpPaperList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(tmpPaperList);
    },
  },
  {
    url: '/basic-api/tmpPaper/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(tmpPaperItem);
    },
  },
  {
    url: '/basic-api/tmpPaper/createTmpPaper',
    timeout: 500,
    method: 'post',
    response: () => {
      return resultSuccess({ id: (Math.random() * 100).toFixed(0) + '' });
    },
  },
  {
    url: '/basic-api/tmpPaper/updateTmpPaper',
    timeout: 100,
    method: 'put',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/tmpPaper/deleteTmpPaper/:id',
    timeout: 100,
    method: 'delete',
    response: ({ id }) => {
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
