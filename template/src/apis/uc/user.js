import request from 'request/index'
import { CS_RES, UC_RES } from 'utils/config'
import { promiseCached } from 'utils/cached'

function sFetchUser (userId, token) {
  return request({
    method: 'GET',
    res: UC_RES,
    api: '/users/{user_id}',
    params: {
      user_id: userId
    }
  }, token)
}

export default {
  sFetchUser,
  sFetchUserCached: promiseCached(sFetchUser),
  /**
   * 获取用户头像地址
   * 接口信息地址：http://wiki.sdp.nd/index.php?title=%E4%B8%AA%E4%BA%BA%E5%A4%B4%E5%83%8F#.E8.8E.B7.E5.8F.96.E7.94.A8.E6.88.B7.E5.A4.B4.E5.83.8F.E6.88.96.E5.BD.A2.E8.B1.A1.E7.85.A7_.5BGET.5D_.2Fv0.1.2Fstatic.2F.7Bpath.7D.5B.3Fsize.3D.7Bsize.7D.5D
   */
  sGetAvatarUrl ({ userId, size = 120, random }) {
    const CS_API_ORIGIN = CS_RES.protocol + CS_RES.host + '/' + CS_RES.ver
    let avatarUrl = CS_API_ORIGIN.indexOf('beta') === -1
      ? (`${CS_API_ORIGIN}/static/cscommon/`)
      : (`${CS_API_ORIGIN}/static/preproduction_content_cscommon/`)
    avatarUrl += `avatar/${userId}/${userId}.jpg?size=${size}`
    avatarUrl += random ? `&random=${random}` : ''
    return avatarUrl
  },
  /**
   * 获取组织下用户
   * 接口信息地址：http://wiki.sdp.nd/index.php?title=UC_API_RestfulV0.9#.5BGET.5D.2Forganizations.2F.7Borg_id.7D.2Fusers.3F.24offset.3D.E5.81.8F.E7.A7.BB.E9.87.8F.26.24limit.3D.E6.95.B0.E9.87.8F_.E5.85.A8.E9.87.8F.E6.88.96.E5.A2.9E.E9.87.8F.E8.8E.B7.E5.8F.96.E7.BB.84.E7.BB.87.E4.B8.8B.E7.94.A8.E6.88.B7.28.E5.88.86.E9.A1.B5.29
   */
  sGetUserList (org_id, {
    $offset,
    $limit
  }) {
    return request({
      method: 'GET',
      res: UC_RES,
      api: '/organizations/{org_id}/users',
      params: {
        org_id
      },
      query: {
        $offset,
        $limit
      }
    })
  },
  /** 根据关键字搜索用户
   *  wiki地址：http://wiki.sdp.nd/index.php?title=UC_API_RestfulV0.9#.5BGET.5D.2Fusers.3F.24key.3Dxxx.26.24offset.3D0.26.24limit.3D10_.E6.9F.A5.E6.89.BE.E7.94.A8.E6.88.B7
   */
  sSearchUsersSimple ({
    orgId,
    nodeId,
    key,
    $offset,
    $limit,
    filter
  }) {
    return request({
      method: 'GET',
      res: UC_RES,
      api: '/organizations/{org_id}/orgnodes/{node_id}/users/actions/search',
      params: {
        'org_id': orgId,
        'node_id': nodeId
      },
      query: {
        'name': key,
        $offset,
        $limit,
        filter
      }
    })
  }
}
