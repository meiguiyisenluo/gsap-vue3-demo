import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView/Index.vue'),
    },
    {
      path: '/ScrollFade',
      name: 'ScrollFade',
      component: () => import('@/views/ScrollFade.vue'),
    },
    {
      path: '/FlowTest',
      name: 'FlowTest',
      component: () => import('@/views/FlowTest/Index.vue'),
    },
  ],
})

export default router
