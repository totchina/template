import parser from 'utils/parser'
import { sFetchUser, sCheckTokens } from 'apis/uc'

export default function (router, store) {
  // router hooks
  router.beforeEach((to, from, next) => {
    const { auth } = to.query
    if (auth) {
      const authorization = parser.parseToken(auth) || {}
      Object.assign(authorization, {
        'request_uri': '/',
        'host': window.location.hostname,
        'http_method': 'GET'
      })
      let loginToken
      let userInfo
      sCheckTokens(authorization).then(res => {
        loginToken = res
        return sFetchUser(res.user_id, res)
      }).then(res => {
        userInfo = res
        store.dispatch('user/setLoginUserInfo', userInfo)
        store.dispatch('user/setTokens', loginToken)
        next(to.path)
      }).catch(err => {
        console.log(err)
        next(to.path)
      })
    } else {
      next()
    }
  })

  router.afterEach(() => {
    if (document.activeElement && document.activeElement.nodeName !== 'BODY') {
      document.activeElement.blur()
    }
    // store.dispatch('setProgress', 100)
  })
}
