import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const charts: AppRouteModule = {
  path: '/merchant',
  name: 'Merchant',
  component: LAYOUT,
  redirect: '/merchant/office',
  meta: {
    icon: 'ion:bar-chart-outline',
    title: t('routes.merchant.merchant.moduleName'),
  },
  children: [
    {
      path: 'office',
      name: 'OfficeManagement',
      meta: {
        title: t('routes.merchant.merchant.office'),
      },
      component: () => import('/@/views/merchant/office/index.vue'),
    },
    {
      path: 'user',
      name: 'UserManagement',
      meta: {
        title: t('routes.merchant.merchant.user'),
      },
      component: () => import('/@/views/merchant/user/index.vue'),
    },
  ],
};

export default charts;
