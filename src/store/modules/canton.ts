import { defineStore } from 'pinia';
import { CANTON_ENUM_KEY } from '/@/enums/cacheEnum';
import { CantonModel } from '@/api/sys/model/cantonModel';
import { getCantonList } from '@/api/sys/canton';
import { getCantonData, setCantonCache } from '@/utils/canton';

interface CantonState {
  cantonList: CantonModel[];
}

export const useCantonStore = defineStore({
  id: 'app-canton',
  state: (): CantonState => ({
    cantonList: [],
  }),
  getters: {
    getCantonList(): CantonModel[] {
      return this.cantonList.length > 0 ? this.cantonList : getCantonData();
    },
  },
  actions: {
    setCantonList(cantonList: CantonModel[]) {
      this.cantonList = cantonList;
      setCantonCache(CANTON_ENUM_KEY, cantonList);
    },
    async getCantonListAction() {
      const cantonList = await getCantonList();
      // 简化数据
      this.setCantonList(
        cantonList.map((item) => ({
          id: item.id,
          areaId: item.areaId,
          areaLevel: item.areaLevel,
          areaName: item.areaName,
          belongtoProvinceId: item.belongtoProvinceId,
          belongtoProvinceName: item.belongtoProvinceName,
          belongtoCityId: item.belongtoCityId,
          belongtoCityName: item.belongtoCityName,
        })),
      );
    },
  },
});
