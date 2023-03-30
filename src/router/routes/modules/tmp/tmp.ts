import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const charts: AppRouteModule = {
  path: '/tmp',
  name: 'Tmp',
  component: LAYOUT,
  redirect: '/tmp/tmp-chart',
  meta: {
    icon: 'ion:bar-chart-outline',
    title: t('routes.tmp.tmp.moduleName'),
  },
  children: [
    {
      path: 'tmp-chart',
      name: 'TmpChartManagement',
      meta: {
        title: t('routes.tmp.tmpChart.moduleName'),
      },
      component: () => import('/@/views/tmp/tmp-chart/index.vue'),
      children: [
        {
          path: 'form',
          name: 'TmpChartForm',
          meta: {
            title: t('routes.tmp.tmpChart.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/tmp/tmp-chart',
            currentActiveMenu: '/tmp/tmp-chart',
          },
          component: () => import('/@/views/tmp/tmp-chart/tmpChartForm.vue'),
        },
      ],
    },
    {
      path: 'tmp-chart-split',
      name: 'TmpChartSplitManagement',
      meta: {
        title: t('routes.tmp.tmpChartSplit.moduleName'),
      },
      component: () => import('/@/views/tmp/tmp-chart-split/index.vue'),
      children: [
        {
          path: 'form',
          name: 'TmpChartSplitForm',
          meta: {
            title: t('routes.tmp.tmpChartSplit.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/tmp/tmp-chart-split',
            currentActiveMenu: '/tmp/tmp-chart-split',
          },
          component: () => import('/@/views/tmp/tmp-chart-split/tmpChartSplitForm.vue'),
        },
      ],
    },
  ],
};

export default charts;
