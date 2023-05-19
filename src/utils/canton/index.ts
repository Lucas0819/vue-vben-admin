import { BasicKeys, Persistent } from '/@/utils/cache/persistent';
import { CacheTypeEnum, CANTON_ENUM_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';
import { isEmpty, isNullOrUnDef } from '/@/utils/is';
import { CantonModel } from '@/api/sys/model/cantonModel';
import { CantonLevelEnum } from '@/enums/cantonLevelEnum';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;
const DEFAULT_CANTON_VALUE = '-';

export function getCantonData(): CantonModel[] {
  return getCantonCache(CANTON_ENUM_KEY);
}

export function getCantonCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setCantonCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearCantonCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}

export function translateCantonData(areaId: number): string {
  if (isEmpty(areaId)) return DEFAULT_CANTON_VALUE;
  const cantonData = getCantonData() ?? [];
  const currentData = cantonData.find((item: CantonModel) => item.areaId === areaId);
  if (isNullOrUnDef(currentData)) return DEFAULT_CANTON_VALUE;
  return currentData.areaName;
}

export function translateCantonDataAllLevels(areaId: number): object {
  if (isEmpty(areaId)) return { areaIds: [], areaNames: [DEFAULT_CANTON_VALUE] };
  const cantonData = getCantonData() ?? [];
  const currentData = cantonData.find((item: CantonModel) => item.areaId === areaId);
  if (isNullOrUnDef(currentData)) return { areaIds: [], areaNames: [DEFAULT_CANTON_VALUE] };
  // 省级数据
  if (currentData.areaLevel === CantonLevelEnum.LEVEL_1) {
    return { areaIds: [currentData.areaId], areaNames: [currentData.areaName] };
  }
  // 市级数据
  if (currentData.areaLevel === CantonLevelEnum.LEVEL_2) {
    return {
      areaIds: [currentData.belongtoProvinceId, currentData.areaId],
      areaNames: [currentData.belongtoProvinceName || '-', currentData.areaName || '-'],
    };
  }
  // 区域数据
  if (currentData.areaLevel === CantonLevelEnum.LEVEL_3) {
    return {
      areaIds: [currentData.belongtoProvinceId, currentData.belongtoCityId, currentData.areaId],
      areaNames: [
        currentData.belongtoProvinceName || '-',
        currentData.belongtoCityName || '-',
        currentData.areaName,
      ],
    };
  }
  return { areaIds: [], areaNames: [DEFAULT_CANTON_VALUE] };
}
