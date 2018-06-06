import request from 'request/index'
import { VIRTUAL_ORGANIZATION_RES } from 'utils/config'
import md5 from 'utils/md5'

/**
 * 接口目录：
 * http://wiki.sdp.nd/index.php?title=Virtual_Org_API_Restful#.5BPOST.5D.2Fvirtual_organizations.2F.7Bv_org_id.7D.2Ftokens_.E8.99.9A.E6.8B.9F.E7.BB.84.E7.BB.87.E7.94.A8.E6.88.B7.E7.99.BB.E5.BD.95
 */
export default {
  /**
   * 5.1.15 [POST]/virtual_organizations/{v_org_id}/tokens 虚拟组织用户登录
   */
  sGetVirtualOrgToken ({
    v_org_id = VIRTUAL_ORGANIZATION_RES.org_id, // 虚拟组织id
    login_name, // 用户名或手机号或工号，注：对于安全等级高的登录，该字段为密文，需要用UC 4.5.1接口创建会话时返回的会话密钥(session_key)进行DES对称加密
    password, // 密码(加密算法由uc_sdk提供)，注：对于安全等级高的登录，该字段为密文，还需要用UC 4.5.1接口创建会话时返回的会话密钥(session_key)再进行一次DES对称加密
    org_name, // 组织登录名称(可选)
    imei, // 移动设备国际身份码(可选)
    device_type,  // 登录设备类型(可选)，如：ios\android\pc\pad
    device_desc, // 登录设备型号(可选), 如：MI 2S
    session_id,  // 会话Id(可选)，注：对于安全等级高的登录，需填该字段，即先调用UC 4.5.1接口创建会话
    identify_code, // 验证码(可选)，注：对于安全等级高的登录，当异常登录次数超过3次时需填该验证码，验证码接口4.5.2
    tid // 图形验证服务的会话id(可选)，注：接入图形验证服务时必填
  } = {}) {
    return request({
      method: 'POST',
      res: VIRTUAL_ORGANIZATION_RES,
      api: '/virtual_organizations/{v_org_id}/tokens',
      params: {
        v_org_id
      },
      body: {
        login_name,
        password: md5(password),
        org_name,
        imei,
        device_type,
        device_desc,
        session_id,
        identify_code,
        tid
      }
    })
  }
}
