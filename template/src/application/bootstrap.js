import Vue from 'vue'
import { configure, use, run } from 'system'

import { log } from 'utils/console'

import logger from 'modules/logger'
import user from 'modules/user'
import home from 'modules/home'

import Root from './views/root'

import mRouter from './router'

import VeeValidate from 'vee-validate'

{{#elementUI}}
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
{{/elementUI}}
{{#iviewUI}}
import iView from 'iview'
import 'iview/dist/styles/iview.css'
{{/iviewUI}}

Vue.use(VeeValidate, { locale: 'zh_CN' })

{{#elementUI}}
Vue.use(ElementUI)
{{/elementUI}}
{{#iviewUI}}
Vue.use(iView)
{{/iviewUI}}

/**
 * 全局配置
 */
configure({
  // 项目名称
  name: 'PLATO',
  // 项目版本号
  version: '1.0',
  // 系统自动将 component 挂载到 element
  element: '#app',
  component: Root
})

/**
 * 调试相关
 */
__DEV__ && use(logger)

use(home)
use(user)

/**
 * Run Modules
 */
run(({ router, store }, done) => {
  log('%c[PLATO] %cLet\'s go!', 'font-weight: bold', 'color: green; font-weight: bold')
  mRouter(router, store)
  done()
})
