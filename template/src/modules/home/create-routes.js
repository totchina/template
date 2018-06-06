export default () => {
  return [
    {
      path: '',
      name: 'root',
      redirect: '/main',
      component: () => System.import('./views/index.vue'),
      children: [
        {
          path: 'main',
          name: 'main',
          component: () => System.import('./children/main/index.vue')
        }
      ]
    }
  ]
}
