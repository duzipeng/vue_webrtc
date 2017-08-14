import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/map'
import MyVideo from '@/components/MyVideo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'map',
      component: Map
    },
    {
      path: '/video',
      component: MyVideo
    }
  ]
})
