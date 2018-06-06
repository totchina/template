import request from 'request/index'
import { UC_RES } from 'utils/config'

export default {
  /**
   * 获取tokens
   * 接口信息地址：http://wiki.sdp.nd/index.php?title=UC_API_RestfulV0.9#.5BPOST.5D.2Ftokens_.E7.94.A8.E6.88.B7.E7.99.BB.E5.BD.95
   */
  sGetTokens ({ login_name, password }) {
    return request({
      method: 'POST',
      res: UC_RES,
      body: {
        login_name,
        password
      },
      api: '/tokens'
    })
  },
  sCheckTokens ({
    access_token,
    nonce,
    mac,
    request_uri,
    host,
    http_method
  }) {
    return request({
      method: 'POST',
      res: UC_RES,
      body: {
        nonce,
        mac,
        request_uri,
        host,
        http_method
      },
      api: '/tokens/{access_token}/actions/valid',
      params: {
        access_token
      }
    })
  }
}
