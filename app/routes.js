const pages = [
  require('./pages/about'),
  require('./pages/index'),
  require('./pages/log'),
  require('./pages/option')
]

export default pages
  .map(page => ({
    name: page.name,
    path: page.path,
    component: page
  }))
  .concat([{
    name: 'default',
    path: '*',
    redirect: { name: 'index' }
  }])
