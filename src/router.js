import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ApiTestChannels from './views/ApiTestChannels.vue'
import ApiTestGet from './views/ApiTestGet.vue'
import Youtubers from './views/Youtubers.vue'
import Videos from './views/Videos.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },{
        path: '/apis/channels',
        name: 'ApiTestChannels',
        component: ApiTestChannels
      },{
        path: '/apis/get',
        name: 'ApiTestGet',
        component: ApiTestGet
      },{
        path: '/videos',
        name: 'Videos',
        component: Videos
      },{
        path: '/youtubers',
        name: 'Youtubers',
        component: Youtubers
      }
  ]
})
