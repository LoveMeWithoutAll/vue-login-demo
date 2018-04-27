import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import store from '@/vuex/store'

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  if (store.getters.getIsAuth) return next()
  next('/')
}

export default new Router({
  routes: [
    {
      path: '/', // 첫 화면을 로그인 화면으로 설정한다
      name: 'Login',
      component: Login
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: requireAuth()
    }
  ]
})
