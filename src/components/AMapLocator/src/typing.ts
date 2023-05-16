/**
 * @description: 弹窗对外暴露的方法
 */
export interface LocatorMethods {
  setLocation: (location: LocationItem) => void;
  getLocation: () => Location | null;
}

export interface LocationItem {
  longitude: number;
  latitude: number;
  address?: string;
}
