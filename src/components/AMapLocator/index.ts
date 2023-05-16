import { withInstall } from '/@/utils';
import aMapLocator from './src/AMapLocator.vue';

export const AMapLocator = withInstall(aMapLocator);
export { useAMapLocator } from './src/hooks/useAMapLocator';
export * from './src/typing';
