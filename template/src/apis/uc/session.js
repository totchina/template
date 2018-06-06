import request from 'request/index'
import { UC_RES } from 'utils/config'

export default {
  /**
   * 创建会话
   * 接口信息地址：http://wiki.sdp.nd/index.php?title=UC_API_RestfulV0.93#.5BPOST.5D.2Fsession_.E5.88.9B.E5.BB.BA.E4.BC.9A.E8.AF.9D
   */
  sGetSession ({
    session_type,
    device_id,
    org_name
  } = {}) {
    return request({
      method: 'POST',
      res: UC_RES,
      api: '/session',
      body: {
        session_type,
        device_id,
        org_name
      }
    })
  }
}
