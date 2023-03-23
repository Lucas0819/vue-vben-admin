import { BasicKeys, Persistent } from '/@/utils/cache/persistent';
import { CacheTypeEnum, DICT_ENUM_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';
import { DictModel } from '/@/api/sys/model/dictModel';
import { isEmpty } from '/@/utils/is';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;
const DEFAULT_DICT_VALUE = '-';

export function getDictData(): DictModel[] {
  return getDictCache(DICT_ENUM_KEY);
}

export function getDictCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setDictCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearDictCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}

export function translateDictData(type: string, code: string): string {
  if (isEmpty(code)) return DEFAULT_DICT_VALUE;
  const currentDictData = getDictDataByType(type);
  const currentData = currentDictData.find((item: DictModel) => item.code === code);
  return currentData ? currentData.description : DEFAULT_DICT_VALUE;
}

export function getDictDataByType(type: string): DictModel[] {
  if (isEmpty(type)) return [];
  const dictData = getDictData();
  return dictData.filter((item: DictModel) => item.type === type);
}
