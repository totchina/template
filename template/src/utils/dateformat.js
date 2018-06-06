import moment from 'moment'

/*
  距离开课时间
 已开课的系列课程，没有直播课时时，则距离下一课时的开课时间（规则：距离直播时间>1天，则
 以天数为单位显示；距离直播时间大于1小时且小于1天时，以小时为单位显示；小于1小时，则以分钟为单位显示）
 */
export function toCurriculumStart (dateTime) {
  const now = moment()
  let to

  try {
    to = moment(dateTime)
  } catch (e) {
    return ''
  }

  if (to.isBefore(now)) {
    return ''
  }

  const days = to.diff(now, 'days')
  if (days > 0) {
    return `${days}天`
  }
  const hours = to.diff(now, 'hours')
  if (hours > 0) {
    return `${hours}小时`
  }
  const minutes = to.diff(now, 'hours')
  if (minutes > 0) {
    return `${minutes}分钟`
  }
  return ''
}

export function lastnmonth (dateTime, n) {
  let m
  try {
    m = moment(dateTime)
  } catch (e) {
    m = moment()
  }

  return m.subtract(n, 'months')
}

/**
 * 日期格式化
 */
export function formatDate (dateTime, format = 'YYYYMMDD') {
  let m
  try {
    m = moment(dateTime)
  } catch (e) {
    m = moment()
  }
  return m.format(format)
}
