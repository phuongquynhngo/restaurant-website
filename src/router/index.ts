import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/ContactView.vue')
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../views/Checkout.vue')
      },


  ]
})

//@ts-ignore
router.beforeEach((to, from, next) => {
  //@ts-ignore
  document.title = 'Restaurant' + ' | ' + to.name

  next()
})
export default router