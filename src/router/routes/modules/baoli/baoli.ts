import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const charts: AppRouteModule = {
  path: '/baoli',
  name: 'Baoli',
  component: LAYOUT,
  redirect: '/baoli/baoli-price',
  meta: {
    icon: 'ion:bar-chart-outline',
    title: t('routes.baoli.baoli.moduleName'),
  },
  children: [
    {
      path: 'baoli-price',
      name: 'BaoliPriceManagement',
      meta: {
        title: t('routes.baoli.baoliPrice.moduleName'),
      },
      component: () => import('/@/views/baoli/baoli-price/index.vue'),
      children: [
        {
          path: 'form',
          name: 'BaoliPriceForm',
          meta: {
            title: t('routes.baoli.baoliPrice.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/baoli/baoli-price',
            currentActiveMenu: '/baoli/baoli-price',
          },
          component: () => import('/@/views/baoli/baoli-price/baoliPriceForm.vue'),
        },
      ],
    },
    {
      path: 'baoli-result',
      name: 'BaoliResultManagement',
      meta: {
        title: t('routes.baoli.baoliResult.moduleName'),
      },
      component: () => import('/@/views/baoli/baoli-result/index.vue'),
      children: [
        {
          path: 'form',
          name: 'BaoliResultForm',
          meta: {
            title: t('routes.baoli.baoliResult.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/baoli/baoli-result',
            currentActiveMenu: '/baoli/baoli-result',
          },
          component: () => import('/@/views/baoli/baoli-result/baoliResultForm.vue'),
        },
      ],
    },
    {
      path: 'baoli-seat',
      name: 'BaoliSeatManagement',
      meta: {
        title: t('routes.baoli.baoliSeat.moduleName'),
      },
      component: () => import('/@/views/baoli/baoli-seat/index.vue'),
      children: [
        {
          path: 'form',
          name: 'BaoliSeatForm',
          meta: {
            title: t('routes.baoli.baoliSeat.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/baoli/baoli-seat',
            currentActiveMenu: '/baoli/baoli-seat',
          },
          component: () => import('/@/views/baoli/baoli-seat/baoliSeatForm.vue'),
        },
      ],
    },
  ],
};

export default charts;
