import Storage from 'nd-storage'
// 框架版本
const APP_CORE = '0.0.1'
// 本地模拟
const SIMULATION = 0
// 开发
const DEVELOPMENT = 1
// 测试
const DEBUG = 2
// 生产
const PRODUCTION = 4
// 预生产
const PREPRODUCTION = 8
// 压测
const PRESSURE = 16
// 集成环境
const INTEGRATION = 32
// 本地开发
const LOCDEVELOPMENT = 64

const LOC_PROTOCOL = location.protocol + '//'
const LOC_HOST = location.host
// host === hostname:port
const LOC_HOSTNAME = location.hostname

const ENV = (() => {
  switch (LOC_HOSTNAME) {
    case 'localhost':
    case '127.0.0.1':
    case '192.168.244.144':
    case '192.168.244.3':
    case '192.168.244.27':
    case '192.168.244.157':
      return DEVELOPMENT
    default:
      if (/\.dev\.web\.nd$/.test(LOC_HOSTNAME)) {
        return DEVELOPMENT
      }
      if (/\.debug\.web\.nd$/.test(LOC_HOSTNAME)) {
        return DEBUG
      }
      if (/\.pre1\.web\.nd$/.test(LOC_HOSTNAME)) {
        return INTEGRATION
      }
      if (/\.qa\.web\.sdp\.101\.com$/.test(LOC_HOSTNAME)) {
        return PRESSURE
      }
      if (/\.beta\.101\.com$/.test(LOC_HOSTNAME)) {
        return PREPRODUCTION
      }
      return PRODUCTION
  }
})()

const LOC_RES = {
  module: 'loc',
  protocol: LOC_PROTOCOL,
  host: LOC_HOST,
  ver: 'v0.1'
}

let UC_RES = {
  module: 'uc',
  protocol: 'https://',
  ver: 'v1.0'
}

switch (ENV) {
  case LOCDEVELOPMENT:
  case DEVELOPMENT:
  case DEBUG:
  case PREPRODUCTION:
  case INTEGRATION:
  case PRESSURE:
    UC_RES.host = 'authbeta.101.com'
    break
  case PRODUCTION:
    UC_RES.host = 'a.101.com'
    break
  default:
    UC_RES = LOC_RES
}

let CS_RES = {
  module: 'cs',
  ver: 'v0.1'
}

switch (ENV) {
  case LOCDEVELOPMENT:
  case DEVELOPMENT:
  case DEBUG:
  case PREPRODUCTION:
  case INTEGRATION:
  case PRESSURE:
    CS_RES.protocol = 'http://'
    CS_RES.host = 'sdpcs.beta.web.sdp.101.com'
    break
  case PRODUCTION:
    CS_RES.protocol = 'https://'
    CS_RES.host = 'cdncs.101.com'
    break
  default:
    CS_RES = LOC_RES
}

let VIRTUAL_ORGANIZATION_RES = {
  module: 'VIRTUAL_ORGANIZATION_RES',
  ver: 'v0.1',
  protocol: 'http://',
  org_id: ''
}

switch (ENV) {
  case LOCDEVELOPMENT:
  case DEVELOPMENT:
    VIRTUAL_ORGANIZATION_RES.protocol = 'https://'
    VIRTUAL_ORGANIZATION_RES.host = 'ucvorg-beta.101.com'
    VIRTUAL_ORGANIZATION_RES.org_id = '491036515111'
    break
  case DEBUG:
    VIRTUAL_ORGANIZATION_RES.protocol = 'https://'
    VIRTUAL_ORGANIZATION_RES.host = 'ucvorg-beta.101.com'
    VIRTUAL_ORGANIZATION_RES.org_id = '491036515396'
    break
  case INTEGRATION:
    break
  case PRESSURE:
    break
  case PREPRODUCTION:
    VIRTUAL_ORGANIZATION_RES.protocol = 'https://'
    VIRTUAL_ORGANIZATION_RES.host = 'ucvorg-beta.101.com'
    VIRTUAL_ORGANIZATION_RES.org_id = '491036491193'
    break
  case PRODUCTION:
    VIRTUAL_ORGANIZATION_RES.protocol = 'https://'
    VIRTUAL_ORGANIZATION_RES.host = 'ucvorg.101.com'
    VIRTUAL_ORGANIZATION_RES.org_id = '481036505701'
    break
  default:
    VIRTUAL_ORGANIZATION_RES = LOC_RES
}

const SessionStorage = new Storage('S-ND-RES-', -1)
const LocalStorage = new Storage('L-ND-RES-', 5 * 24 * 60 * 60)

export default {
  APP_CORE,
  SIMULATION,
  LOCDEVELOPMENT,
  DEVELOPMENT,
  DEBUG,
  PRODUCTION,
  PREPRODUCTION,
  PRESSURE,
  ENV,
  LOC_RES,
  UC_RES,
  CS_RES,
  VIRTUAL_ORGANIZATION_RES,
  SessionStorage,
  LocalStorage
}
