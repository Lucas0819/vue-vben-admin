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
        {
          path: 'split-seat',
          name: 'TmpChartSplitSeat',
          meta: {
            title: t('routes.tmp.tmpChartSplit.seat'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/tmp/tmp-chart',
            currentActiveMenu: '/tmp/tmp-chart',
          },
          component: () => import('/@/views/tmp/tmp-chart-split/tmpChartSplitSeat.vue'),
        },
      ],
    },
    {
      path: 'tmp-place',
      name: 'TmpPlaceManagement',
      meta: {
        title: t('routes.tmp.tmpPlace.moduleName'),
      },
      component: () => import('/@/views/tmp/tmp-place/index.vue'),
      children: [
        {
          path: 'form',
          name: 'TmpPlaceForm',
          meta: {
            title: t('routes.tmp.tmpPlace.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/tmp/tmp-place',
            currentActiveMenu: '/tmp/tmp-place',
          },
          component: () => import('/@/views/tmp/tmp-place/tmpPlaceForm.vue'),
        },
      ],
    },
    {
      path: 'tmp-paper',
      name: 'TmpPaperManagement',
      meta: {
        title: t('routes.tmp.tmpPaper.moduleName'),
      },
      component: () => import('/@/views/tmp/tmp-paper/index.vue'),
      children: [
        {
          path: 'form',
          name: 'TmpPaperForm',
          meta: {
            title: t('routes.tmp.tmpPaper.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/tmp/tmp-paper',
            currentActiveMenu: '/tmp/tmp-paper',
          },
          component: () => import('/@/views/tmp/tmp-paper/tmpPaperForm.vue'),
        },
      ],
    },
  ],
};

export default charts;
