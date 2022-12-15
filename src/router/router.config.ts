import BasicLayout from '/@/layouts/BasicLayout/index.vue';
import BlankLayout from '/@/layouts/BlankLayout.vue';
import type { RouteRecordRaw } from 'vue-router';

export const accessRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'admin',
    component: BasicLayout,
    redirect: '/admin/index',
    meta: { title: '管理平台' },
    children: [
      {
        path: '/admin/index',
        component: () => import('/@/views/dashboard/index.vue'),
        name: 'index',
        meta: {
          title: 'index',
          icon: 'shouye',
          auth: ['index'],
        },
      },
      {
        path: '/admin/components',
        name: 'components',
        component: () => import('/@/views/components/index.vue'),
        meta: {
          title: 'component',
          keepAlive: true,
          icon: 'zujian',
          auth: ['components'],
          breadcrumb: true
        },
      },
      {
        path: '/admin/drag',
        name: 'drag',
        component: () => import('/@/views/drag/index.vue'),
        meta: {
          title: 'drag',
          keepAlive: true,
          icon: 'yidong',
          auth: ['drag'],
          breadcrumb: true
        },
      },
      {
        path: '/admin/confManage',
        name: 'confManage',
        component: BlankLayout,
        redirect: '/admin/confManage/roleRights',
        meta: {
          title: 'confManage',
          keepAlive: true,
          icon: 'jiaosequanxian',

        },
        children: [
          {
            path: '/admin/confManage/roleRights',
            name: 'roleRights',
            component: () => import('/@/views/roleRights/index.vue'),
            meta: {
              title: 'roleRights',
              keepAlive: true,
              icon: 'jiaosequanxian',
              auth: ['roleRights'],
              breadcrumb: true
            },
          },
          {
            path: '/admin/confManage/apis',
            name: 'apis',
            component: () => import('/@/views/apis/index.vue'),
            meta: {
              title: 'apiManage',
              keepAlive: true,
              icon: 'APIguanli1',
              auth: ['apis'],
              breadcrumb: true
            },
          },
          {
            path: '/admin/confManage/menu',
            name: 'menu',
            component: () => import('/@/views/menu/index.vue'),
            meta: {
              title: 'menuManage',
              keepAlive: true,
              icon: 'caidan',
              auth: ['menu'],
              breadcrumb: true
            },
          },
          {
            path: '/admin/confManage/area',
            name: 'area',
            component: () => import('/@/views/area/index.vue'),
            meta: {
              title: 'area',
              keepAlive: true,
              icon: 'caidan',
              auth: ['area'],
              breadcrumb: true
            },
          }
        ]
      },
      {
        path: '/admin/ruleManage',
        name: 'ruleManage',
        component: BlankLayout,
        redirect: '/admin/ruleManage/strategy',
        meta: {
          title: 'ruleManage',
          icon: 'rizhiguanli',
        },
        children: [
          {
            path: '/admin/ruleManage/strategy',
            name: 'strategy',
            component: () => import('/@/views/ruleManage/strategy/index.vue'),
            meta: {
              title: 'strategy',
              keepAlive: true,
              icon: 'caozuorizhi32',
              breadcrumb: true,
              auth: ['strategy']
            },
          },
          {
            path: '/admin/ruleManage/alertLevel',
            name: 'alertLevel',
            component: () => import('/@/views/ruleManage/alertLevel/index.vue'),
            meta: {
              title: 'alertLevel',
              keepAlive: true,
              icon: 'caozuorizhi32',
              breadcrumb: true,
              auth: ['alertLevel']
            },
          }
        ],
      },
      {
        path: '/admin/dataManage',
        name: 'dataManage',
        component: BlankLayout,
        redirect: '/admin/logs/operateLog',
        meta: {
          title: 'dataManage',
          icon: 'rizhiguanli',
        },
        children: [
          {
            path: '/admin/dataManage/data',
            name: 'historyData',
            component: () => import('/@/views/dataManage/historyData/index.vue'),
            meta: {
              title: 'historyData',
              keepAlive: true,
              icon: 'caozuorizhi32',
              breadcrumb: true,
              auth: ['historyData']
            },
          },
          {
            path: '/admin/dataManage/event',
            name: 'historyEvent',
            component: () => import('/@/views/dataManage/historyEvent/index.vue'),
            meta: {
              title: 'historyEvent',
              keepAlive: true,
              icon: 'caozuorizhi32',
              breadcrumb: true,
              auth: ['historyEvent']
            },
          }
        ],
      },
      {
        path: '/admin/logs',
        name: 'logs',
        component: BlankLayout,
        redirect: '/admin/logs/operateLog',
        meta: {
          title: 'logs',
          icon: 'rizhiguanli',
        },
        children: [
          {
            path: '/admin/logs/operateLog',
            name: 'operateLog',
            component: () => import('/@/views/logs/operateLog/index.vue'),
            meta: {
              title: 'operateLog',
              keepAlive: true,
              icon: 'caozuorizhi32',
              breadcrumb: true,
              auth: ['operateLog']
            },
          }
        ],
      }
    ],
  },
];

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
    name: 'login',
    meta: { title: '登录' },
  },
  // ...accessRoutes,
];

export const publicRoutes = [
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('/@/views/404.vue'),
  },
];

// /**
//  * 基础路由
//  * @type { *[] }
//  */
// export const constantRouterMap = [];

export default constantRoutes;
