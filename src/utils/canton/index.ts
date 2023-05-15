import { BasicKeys, Persistent } from '/@/utils/cache/persistent';
import { CacheTypeEnum, CANTON_ENUM_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';
import { isEmpty, isNullOrUnDef } from '/@/utils/is';
import { CantonModel } from '@/api/sys/model/cantonModel';

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
