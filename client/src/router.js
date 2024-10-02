import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/community/:parkCode',
    name: 'Park Community',
    component: loadPage('ParkCommunityPage')
  },
  {
    path: '/park/:parkCode',
    name: 'Park Details',
    component: loadPage('ParkDetailsPage')
  },
  {
    path: '/search',
    name: 'Search',
    component: loadPage('SearchPage')
  },
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
