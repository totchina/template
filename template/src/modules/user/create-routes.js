export default () => {
  const list = []
  list.push({
    path: '*',
    meta: {
      icon: 'lock',
      auth: false
    },
    redirect: { name: 'root' }
  })
  return list
}
