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
    path: '/InfoQuery',
    component: Layout,
    alwaysShow: true,
    redirect: '/InfoQuery/',
    name: 'InfoQuery',
    meta: { title: '常用功能', icon: 'el-icon-search' },
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

    path: '/InfoEdit',
    component: Layout,
    alwaysShow: true,
    redirect: '/InfoEdit/',
    name: 'InfoEdit',
    meta: { title: '凭证查询', icon: 'edit' },
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
        meta: { title: '信息填报', icon: 'form' },
        hidden: true,
      }
    ]
  },

  {
    path: '/ReportQuery',
    component: Layout,
    alwaysShow: true,
    redirect: '/ReportQuery/',
    name: 'ReportQuery',
    meta: { title: '报表查询', icon: 'table' },
    children: [
      {
        path: 'MonthlyReport',
        name: '月报',
        component: () => import('@/views/ReportQuery/MonthlyReport'),
        meta: { title: '月报', icon: 'documentation' }
      },
      {
        path: 'MonthlyReportDetail/MonthlyReportDetail_InExSt',
        name: '收支表',
        component: () => import('@/views/ReportQuery/MonthlyReportDetail/MonthlyReportDetail_InExSt'),
        meta: { title: '收支表', icon: 'documentation' },
        hidden: true,
      },
      {
        path: 'MonthlyReportDetail/MonthlyReportDetail_ZB_St',
        name: '指标（报表）',
        component: () => import('@/views/ReportQuery/MonthlyReportDetail/MonthlyReportDetail_ZB_St'),
        meta: { title: '指标（报表）', icon: 'documentation' },
        hidden: true,
      },
      {
        path: 'MonthlyReportDetail/MonthlyReportDetail_Local_Z',
        name: '指标（本地帐）',
        component: () => import('@/views/ReportQuery/MonthlyReportDetail/MonthlyReportDetail_Local_Z'),
        meta: { title: '指标（本地帐）', icon: 'documentation' },
        hidden: true,
      },
      {
        path: 'QuarterlyReport',
        name: '季报',
        component: () => import('@/views/ReportQuery/QuarterlyReport'),
        meta: { title: '季报', icon: 'documentation'}
      },

      {
        path: 'AnnualReport',
        name: '年报',
        component: () => import('@/views/ReportQuery/AnnualReport'),
        meta: { title: '年报', icon: 'documentation' }
      },

    ]
  },



  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
