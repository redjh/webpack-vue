export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
  },
];
