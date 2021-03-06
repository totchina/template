import createRoutes from './create-routes'
import createStore from './create-store'

export default (context, options = {}) => {
  options = { scope: 'home', prefix: '/', ...options }
  return {
    store: createStore(options),
    routes: createRoutes(context, options),
    options
  }
}
