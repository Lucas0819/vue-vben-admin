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
        title: t('routes.merchant.office.moduleName'),
      },
      component: () => import('/@/views/merchant/office/index.vue'),
      children: [
        {
          path: 'form',
          name: 'OfficeForm',
          meta: {
            title: t('routes.merchant.office.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/merchant/office',
            currentActiveMenu: '/merchant/office',
          },
          component: () => import('/@/views/merchant/office/officeForm.vue'),
        },
      ],
    },
    {
      path: 'user',
      name: 'UserManagement',
      meta: {
        title: t('routes.merchant.user.moduleName'),
      },
      component: () => import('/@/views/merchant/user/index.vue'),
      children: [
        {
          path: 'form',
          name: 'UserForm',
          meta: {
            title: t('routes.merchant.user.form'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/merchant/user',
            currentActiveMenu: '/merchant/user',
          },
          component: () => import('/@/views/merchant/user/userForm.vue'),
        },
      ],
    },
  ],
};

export default charts;
