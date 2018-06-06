import request from 'request/index'
import { UC_RES } from 'utils/config'
import md5 from 'utils/md5'

export default {
  /**
   * 获取tokens
   * 接口信息地址：http://wiki.sdp.nd/index.php?title=UC_API_RestfulV0.9#.5BPOST.5D.2Ftokens_.E7.94.A8.E6.88.B7.E7.99.BB.E5.BD.95
   */
  sModifyPassword ({ user_id, old_password, new_password }) {
    return request({
      method: 'PUT',
      res: UC_RES,
      api: '/users/{user_id}/password/actions/modify',
      params: {
        user_id
      },
      body: {
        old_password: md5(old_password),
        new_password: md5(new_password)
      }
    })
  }
}
