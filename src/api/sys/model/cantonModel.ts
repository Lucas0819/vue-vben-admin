import { CantonLevelEnum } from '@/enums/cantonLevelEnum';

export interface CantonModel {
  id: any;
  areaId: number;
  areaLevel: CantonLevelEnum;
  areaName: string;
  belongtoCityId?: number;
  belongtoCityName?: string;
  belongtoProvinceId?: number;
  belongtoProvinceName?: string;
  code?: string;
  latitude?: number;
  longitude?: number;
  shortName?: string;
}

export type CantonParams = {
  areaLevel?: CantonLevelEnum;
  belongtoCityId?: number;
  belongtoProvinceId?: number;
};
