import { defineStore } from 'pinia';
import { DictModel } from '/@/api/sys/model/dictModel';
import { DICT_ENUM_KEY } from '/@/enums/cacheEnum';
import { getDictData, setDictCache } from '/@/utils/dict';
import { getAllDictList } from '/@/api/sys/dict';

interface DictState {
  dictList: DictModel[];
}

export const useDictStore = defineStore({
  id: 'app-dict',
  state: (): DictState => ({
    dictList: [],
  }),
  getters: {
    getDictList(): DictModel[] {
      return this.dictList.length > 0 ? this.dictList : getDictData();
    },
  },
  actions: {
    setDictList(dictList: DictModel[]) {
      this.dictList = dictList;
      setDictCache(DICT_ENUM_KEY, dictList);
    },
    async getDictListAction() {
      const dictList = await getAllDictList();
      this.setDictList(dictList);
    },
  },
});
