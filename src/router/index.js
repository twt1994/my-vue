import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/register', component: () => import('@/views/register'), hidden: true },
  { path: '/forgetPaw', component: () => import('@/views/forgetPaw'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/financial',
    component: Layout,
    redirect: '/financial/recharge',
    name: 'Financial',
    meta: { title: '财务管理', icon: 'example' },
    children: [
    	{
        path: 'recharge',
        name: 'Recharge',
        component: () => import('@/views/recharge/index'),
        meta: { title: '充值', icon: 'tree' }
      },
      {
        path: 'rechargeRecord',
        name: 'RechargeRecord',
        component: () => import('@/views/rechargeRecord/index'),
        meta: { title: '充值记录', icon: 'tree' }
      },
      {
        path: 'cash',
        name: 'Cash',
        component: () => import('@/views/cash/index'),
        meta: { title: '提现申请', icon: 'tree' }
      },
      {
        path: 'tradeRecord',
        name: 'TradeRecord',
        component: () => import('@/views/tradeRecord/index'),
        meta: { title: '交易记录', icon: 'tree' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/changePaw',
    name: 'User',
    meta: { title: '用户操作', icon: 'nested' },
    children: [
      {
        path: 'changePaw',
        name: 'ChangePaw',
        component: () => import('@/views/changePaw/index'),
        meta: { title: '修改密码', icon: 'form' }
      },
      {
        path: 'addTask',
        name: 'AddTask',
        component: () => import('@/views/addTask/index'),
        meta: { title: '添加任务', icon: 'form' }
      }
    ]
  },

  {
    path: '/help',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Help',
        component: () => import('@/views/help/index'),
        meta: { title: '帮助中心', icon: 'link' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
