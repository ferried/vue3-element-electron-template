/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-12-10 11:21:49
 * @LastEditTime: 2020-12-10 14:29:20
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /nebula-iot-helper/src/router/index.js
 * @LICENSE: Apache-2.0
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
