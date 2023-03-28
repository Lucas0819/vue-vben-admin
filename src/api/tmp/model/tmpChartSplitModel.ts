import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export type TmpChartSplitParams = {
  id?: string;
  remarks?: string;
  // createBy?: User;
  createDate?: Date;
  updateDate?: Date;
  tempChartId?: string;
  name?: string;
  initRow?: number;
  initColumn?: number;
  stagePosition?: number;
  splitCss?: string;
  desJson?: string;
};

export type TmpChartSplitPageParams = BasicPageParams & TmpChartSplitParams;

export interface TmpChartSplitItem {
  id: string;
  remarks: string;
  // createBy: User;
  createDate: Date;
  updateDate: Date;
  tempChartId: string;
  name: string;
  initRow: number;
  initColumn: number;
  stagePosition: number;
  splitCss: string;
  desJson: string;
}

export type TmpChartSplitListGetResultModel = BasicFetchResult<TmpChartSplitItem>;
