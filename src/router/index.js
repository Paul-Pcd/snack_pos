import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Dianpu from '@/components/page/Dianpu'
import Shangping from '@/components/page/Shangping'
import Huiyuan from '@/components/page/Huiyuan'
import Tongji from '@/components/page/Tongji'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/dianPu',
      name: 'dianpu',
      component: Dianpu
    },
    {
      path: '/shangPing',
      name: 'shangping',
      component: Shangping
    },
    {
      path: '/huiYuan',
      name: 'huiYuan',
      component: Huiyuan
    },
    {
      path: '/tongJi',
      name: 'tongJi',
      component: Tongji
    }
  ]
})
