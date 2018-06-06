import Notification from './instance'

const prefixKey = 'message_key_'

let defaultDuration = 1.5
let messageInstance
let name = 1

function getMessageInstance () {
  messageInstance = messageInstance || Notification.newInstance()
  return messageInstance
}

function notice (content, duration = defaultDuration, type, onClose) {
  if (!onClose) {
    onClose = function () {
    }
  }

  const instance = getMessageInstance()

  instance.notice({
    name: `${prefixKey}${name}`,
    duration,
    transitionName: 'move-up',
    content: `<p class="text">${content}</p>`,
    onClose
  })

  // 用于手动消除
  return (function () {
    const target = name++

    return function () {
      instance.remove(`${prefixKey}${target}`)
    }
  })()
}

export default {
  info (content, duration, onClose) {
    return notice(content, duration, 'info', onClose)
  },
  config (options) {
    if (options.duration) {
      defaultDuration = options.duration
    }
  },
  destroy () {
    const instance = getMessageInstance()
    messageInstance = null
    instance.destroy()
  }
}
