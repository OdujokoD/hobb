import Vue from 'vue'
import Router from 'vue-router'
import VueSession from 'vue-session'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Hobbies from '@/components/Hobbies'

Vue.use(Router)
Vue.use(VueSession)
Vue.use(VueAxios, axios)

export default new Router({
  routes: [
    { path: '/', name: 'Login', component: Login },
    { path: '/signup', name: 'Signup', component: Signup },
    { path: '/hobbies', name: 'Hobbies', component: Hobbies }
  ]
})
