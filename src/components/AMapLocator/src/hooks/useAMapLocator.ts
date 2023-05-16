import { getCurrentInstance, onUnmounted, ref, unref } from 'vue';
import { isProdMode } from '@/utils/env';
import { error } from '@/utils/log';
import { LocationItem, LocatorMethods } from '@/components/AMapLocator/src/typing';

export function useAMapLocator() {
  const locator = ref<Nullable<LocatorMethods>>(null);
  const loaded = ref<Nullable<boolean>>(false);

  function register(locatorMethods: LocatorMethods) {
    if (!getCurrentInstance()) {
      throw new Error('useModal() can only be used inside setup() or functional components!');
    }
    isProdMode() &&
      onUnmounted(() => {
        locator.value = null;
        loaded.value = false;
      });
    if (unref(loaded) && isProdMode() && locatorMethods === unref(locator)) return;

    locator.value = locatorMethods;
    loaded.value = true;
  }

  const getInstance = () => {
    const instance = unref(locator);
    if (!instance) {
      error('useModal instance is undefined!');
    }
    return instance;
  };

  const methods: LocatorMethods = {
    setLocation: (location: LocationItem): void => {
      getInstance()?.setLocation(location);
    },
    getLocation: (): Location | null => {
      return getInstance()?.getLocation() ?? null;
    },
  };
  return [register, methods];
}
