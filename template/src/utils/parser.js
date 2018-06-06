export default {
  // 解析token
  parseToken (token) {
    const regExp = new RegExp('id=\\s*"(.*?)",nonce=\\s*"(.*?)",mac=\\s*"(.*?)"')

    const authrization = token.match(regExp)
    // 如果是手机端的就调用的Bridge的getMACContent方法，不需要再走token了
    if (authrization) {
      return {
        'access_token': authrization[1],
        'nonce': authrization[2],
        'mac': authrization[3]
      }
    }
  }
}
