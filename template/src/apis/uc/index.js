import { merge } from 'utils/helpers'
import tokenApi from './token'
import userApi from './user'
import passwordApi from './password'
import sessionApi from './session'
import smsApi from './sms'

export default merge(
  tokenApi,
  userApi,
  passwordApi,
  sessionApi,
  smsApi
)
