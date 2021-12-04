import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/Home',
    children: [
      {
      path: 'Home',
      name: 'Home',
      component: () => import('@/views/Home/index'),
      meta: { title: '首页', icon: '', affix: true}
    }
    ]
  },

  {
    // example
    // Example
    path: '/InfoQuery',
    component: Layout,
    alwaysShow: true,
    redirect: '/InfoQuery/',
    name: 'InfoQuery',
    meta: { title: '信息查询', icon: 'el-icon-search' },
    children: [
      {
        path: 'OnlineStatistics',
        name: '在线用户统计',
        component: () => import('@/views/InfoQuery/OnlineStatistics'),
        meta: { title: '在线用户统计', icon: 'people' }
      },
      {
        path: 'All_CO_CODE',
        name: '全区所有单位',
        component: () => import('@/views/InfoQuery/All_CO_CODE'),
        meta: { title: '全区所有单位', icon: 'international'}
      },

      {
        path: 'Oper_Log',
        name: '操作日志',
        component: () => import('@/views/InfoQuery/Oper_Log'),
        meta: { title: '操作日志', icon: 'message' }
      },
      {
        path: 'LoginList',
        name: '登录列表查询',
        component: () => import('@/views/InfoQuery/LoginList'),
        meta: { title: '登录情况', icon: 'user' }
      },
      {
        path: 'YEHZB',
          name: '余额汇总表查询',
        component: () => import('@/views/InfoQuery/YEHZB'),
        meta: { title: '余额汇总表', icon: 'money' }
      },
      {
        path: 'UserRoleZW',
        name: '用户权限职位表查询',
        component: () => import('@/views/InfoQuery/UserRoleZW'),
        meta: { title: '用户权限职位', icon: 'peoples' }
      },
      {
        path: 'UserYearUseInfo',
        name: '用户年度登录情况',
        component: () => import('@/views/InfoQuery/UserYearUseInfo'),
        meta: { title: '用户年度登录情况', icon: 'user' }
      },
      {
        path: 'UserAllUseInfo',
        name: '用户总共登录次数表',
        component: () => import('@/views/InfoQuery/UserAllUseInfo'),
        meta: { title: '用户总共登录次数', icon: 'user' }
      },
      {
        path: 'KJDZQQB_AYFL',
          name: '登账情况表_按月',
        component: () => import('@/views/InfoQuery/KJDZQQB_AYFL'),
        meta: { title: '登账情况_按月', icon: 'skill' }
      },
      {
        path: 'KJDZQQB_ARFL',
        name: '登账情况表_按人',
        component: () => import('@/views/InfoQuery/KJDZQQB_ARFL'),
        meta: { title: '登账情况_按人', icon: 'skill' }
      },
      {
        path: 'KJDZQQB_ZTFL',
        name: '登账情况表_按账套',
        component: () => import('@/views/InfoQuery/KJDZQQB_ZTFL'),
        meta: { title: '登账情况_按账套', icon: 'skill' }
      },
	  {
        path: 'BANK_ACCOUNT',
        name: '出纳人员账簿',
        component: () => import('@/views/InfoQuery/BANK_ACCOUNT'),
        meta: { title: '出纳人员账簿', icon: 'user' }
      }
    ]
  },


  {
    // example
    // Example
    path: '/InfoEdit',
    component: Layout,
    alwaysShow: true,
    redirect: '/InfoEdit/',
    name: 'InfoEdit',
    meta: { title: '信息修改', icon: 'edit' },
    children: [
      {
        path: 'PZBH',
        name: '凭证编号查询',
        component: () => import('@/views/InfoEdit/PZBH'),
        meta: { title: '凭证编号', icon: 'table' }
      },


    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '信息填报', icon: 'form' }
      }
    ]
  },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://Snlie.github.io/A6.6ManagerFE/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
