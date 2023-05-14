import { withInstall } from '/@/utils';

import pageFooter from './src/PageFooter.vue';
import pageWrapper from './src/PageWrapper.vue';
import pageToolbox from './src/PageToolbox.vue';

export const PageFooter = withInstall(pageFooter);
export const PageWrapper = withInstall(pageWrapper);
export const PageToolbox = withInstall(pageToolbox);

export const PageWrapperFixedHeightKey = 'PageWrapperFixedHeight';
