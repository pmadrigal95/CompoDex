import { createRouter, createWebHistory } from 'vue-router';

import MainLayout from '@/layouts/MainLayout.vue'
import Index from '@/pages/Index.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Index },
      { path: 'history', component: () => import('@/pages/History.vue') },
      { path: 'components', component: () => import('@/pages/Components.vue') },
      { path: 'about', component: () => import('@/pages/About.vue') }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;