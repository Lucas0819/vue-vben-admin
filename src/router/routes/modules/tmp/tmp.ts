import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const charts: AppRouteModule = {
  path: '/tmp',
  name: 'Tmp',
  component: LAYOUT,
  redirect: '/tmp/tmpChart',
  meta: {
    icon: 'ion:bar-chart-outline',
    title: t('routes.tmp.tmp.moduleName'),
  },
  children: [
    {
      path: 'tmpChart',
      name: 'TmpChartManagement',
      meta: {
        title: t('routes.tmp.tmp.tmpChart'),
      },
      component: () => import('/@/views/tmp/tmp-chart/index.vue'),
    },
    {
      path: 'tmpChartSplit',
      name: 'TmpChartSplitManagement',
      meta: {
        title: t('routes.tmp.tmp.tmpChartSplit'),
      },
      component: () => import('/@/views/tmp/tmp-chart-split/index.vue'),
    },
  ],
};

export default charts;
