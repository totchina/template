import request from 'request/index'
import { CS_RES } from 'utils/config'

export default {
  /**
   * 获取目录项列表
   * 接口地址：http://wiki.sdp.nd/index.php?title=%E5%86%85%E5%AE%B9%E6%9C%8D%E5%8A%A1all_new#.E8.8E.B7.E5.8F.96.E7.9B.AE.E5.BD.95.E9.A1.B9.E5.88.97.E8.A1.A8_.5BGET.5D_.2Fv0.1.2Fdentries.3Fpath.3D.7Bpath.7D.26dentryId.3D.7BdentryId.7D.26.24filter.3D.7Bfilter.7D.26.24orderby.3D.7Borderby.7D.26.24limit.3D.7Blimit.7D.26.24offset.3D.7Boffset.7D.26session.3D.7Bsession.7D
   */
  sGetDentries ({
    path, // URL编码后的目录项路径，（path 和 dentryId 二选一）
    dentryId, // 目录项ID，（path 和 dentryId二选一）
    $filter, // 查询条件  可选
    $orderby, // 排序字段,可选。注：定义的是数据库检索的顺序，而非结果显示属性
    $limit,  // 返回记录数。可选，默认20 范围5-1000 小于5设为5 大于1000设为1000
    $offset, // 查询的偏移量，可选，通过偏移量进行分页时传入该参数，偏移量分页时，默认通过自然顺序排序
    session  // 通过调用接口 1.7.1 获得   必选
  } = {}) {
    return request({
      method: 'GET',
      res: CS_RES,
      api: '/dentries',
      progress: false,
      query: {
        path,
        dentryId,
        $filter,
        $orderby,
        $limit,
        $offset,
        session
      }
    })
  },
  /**
   * 获取目录项列表
   * 接口地址：1.9.18 批量获取目录项信息 [PATCH] /v0.1/dentries?session={session}&$orderby={orderby}[&exception={exception}]
   */
  sGetDentryList ({
    dentry_ids, // dentryId素组
    session  // 通过调用接口 1.7.1 获得   必选
  } = {}) {
    return request({
      method: 'PATCH',
      res: CS_RES,
      api: '/dentries',
      progress: false,
      query: {
        session
      },
      body: {
        dentry_ids
      }
    })
  },
  /**
   * 文件普通秒传
   * 接口详细信息：http://wiki.sdp.nd/index.php?title=%E5%86%85%E5%AE%B9%E6%9C%8D%E5%8A%A1all#.E6.96.87.E4.BB.B6.E7.A7.92.E4.BC.A0
   */
  sFileQuick ({
    session,
    path,
    name,
    md5,
    scope = 1
  }) {
    return request({
      method: 'POST',
      res: CS_RES,
      api: `/dentries/actions/quick?session=${session}`,
      body: {
        path,
        name,
        scope,
        md5
      }
    })
  },
  /**
   * 获取下载地址
   * @returns {string}
   */
  getDownloadUrl (dentry_id, {
    attachment = false
  } = {}) {
    let url = `${CS_RES.protocol}${CS_RES.host}/${CS_RES.ver}/download?dentryId=${dentry_id}`
    if (attachment) {
      url += '&attachment=true'
    }
    return url
  },
  /**
   * 修改目录项
   * @return
   */
  sModifyDentry (dentryId, session, {
    other_name, // 选填 备注名
    info // 选填 自定义元数据
  }) {
    return request({
      method: 'PUT',
      res: CS_RES,
      api: '/dentries/{dentryId}',
      query: {
        session
      },
      params: {
        dentryId
      },
      body: {
        other_name,
        info
      }
    })
  },
  /**
   * 获取目录信息
   * @return
   */
  sGetDentry (dentryId) {
    return request({
      method: 'GET',
      res: CS_RES,
      api: '/dentries/{dentryId}',
      params: {
        dentryId
      }
    })
  }
}
