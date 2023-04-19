import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const charts: AppRouteModule = {
  path: '/bis',
  name: 'Bis',
  component: LAYOUT,
  redirect: '/bis/bis-banner',
  meta: {
    icon: 'ion:bar-chart-outline',
    title: t('routes.bis.bis.moduleName'),
  },
  children: [
    {
      path: 'bis-banner',
      name: 'BisBannerManagement',
      meta: {
        title: t('routes.bis.bisBanner.moduleName'),
      },
      component: () => import('/@/views/bis/bis-banner/index.vue'),
      children: [
        {
          path: 'form',
          name: 'BisBannerForm',
          meta: {
            title: t('routes.bis.bisBanner.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/bis/bis-banner',
            currentActiveMenu: '/bis/bis-banner',
          },
          component: () => import('/@/views/bis/bis-banner/bisBannerForm.vue'),
        },
      ],
    },
    {
      path: 'bis-activity',
      name: 'BisActivityManagement',
      meta: {
        title: t('routes.bis.bisActivity.moduleName'),
      },
      component: () => import('/@/views/bis/bis-activity/index.vue'),
      children: [
        {
          path: 'form',
          name: 'BisActivityForm',
          meta: {
            title: t('routes.bis.bisActivity.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/bis/bis-activity',
            currentActiveMenu: '/bis/bis-activity',
          },
          component: () => import('/@/views/bis/bis-activity/bisActivityForm.vue'),
        },
      ],
    },
    {
      path: 'bis-activity-event',
      name: 'BisActivityEventManagement',
      meta: {
        title: t('routes.bis.bisActivityEvent.moduleName'),
      },
      component: () => import('/@/views/bis/bis-activity-event/index.vue'),
      children: [
        {
          path: 'form',
          name: 'BisActivityEventForm',
          meta: {
            title: t('routes.bis.bisActivityEvent.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/bis/bis-activity-event',
            currentActiveMenu: '/bis/bis-activity-event',
          },
          component: () => import('/@/views/bis/bis-activity-event/bisActivityEventForm.vue'),
        },
      ],
    },
    {
      path: 'bis-vipcard',
      name: 'BisVipcardManagement',
      meta: {
        title: t('routes.bis.bisVipcard.moduleName'),
      },
      component: () => import('/@/views/bis/bis-vipcard/index.vue'),
      children: [
        {
          path: 'form',
          name: 'BisVipcardForm',
          meta: {
            title: t('routes.bis.bisVipcard.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/bis/bis-vipcard',
            currentActiveMenu: '/bis/bis-vipcard',
          },
          component: () => import('/@/views/bis/bis-vipcard/bisVipcardForm.vue'),
        },
      ],
    },
  ],
};

export default charts;
