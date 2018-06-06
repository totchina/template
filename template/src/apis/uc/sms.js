import request from 'request/index'
import { UC_RES } from 'utils/config'

export default {
  /**
   * 下发短信验证码
   * 接口信息地址：http://wiki.sdp.nd/index.php?title=UC_API_RestfulV0.93#.5BPOST.5D.2Fsmses_.E4.B8.8B.E5.8F.91.E7.9F.AD.E4.BF.A1.E9.AA.8C.E8.AF.81.E7.A0.81
   */
  sSendSms ({
    mobile, // 手机号码
    op_type, // --业务操作类型，0:注册用户下发短信，1：重置密码，2：更新手机号码，3：用户短信登陆，5：更新手机时新手机的验证
    org_name, // 组织登录名称(可选)，注：组织相关的业务需要填写。
    country_code, // 国际区号(可选)，注：国外的业务需要填写。 格式示例：中国：+86，印度：+91，默认“+86”
    session_id, // 会话Id(可选)，注：对于特定业务(由UC开启)，需填该字段，即先调用4.5.1创建会话
    identify_code, // 验证码(可选)，注：单个设备下发短信次数超过3次时需填该验证码，验证码接口4.5.2
    tid // 图形验证服务的会话id(可选)，注：接入图形验证服务时必填
  } = {}) {
    return request({
      method: 'POST',
      res: UC_RES,
      api: '/smses',
      body: {
        mobile, // 手机号码
        op_type,
        org_name,
        country_code,
        session_id,
        identify_code,
        tid
      }
    })
  }
}
