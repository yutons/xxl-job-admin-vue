import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return;
  //获取列表
  Mock.mock(/\/crud\/list/, 'get', () => {
    let list = []
    for (let i = 0; i < 5; i++) {
      list.push(Mock.mock({
        name: Mock.mock('@cname'),
        'sex|0-1': 0
      }))
    }
    return {
      data: {
        total: 11,
        data: list
      }
    }
  })
  //删除
  Mock.mock(/\/crud\/del/, 'delete', () => {
    return {
      data: {}
    }
  })
  //新增
  Mock.mock(/\/crud\/add/, 'post', () => {
    return {
      data: {}
    }
  })
  //更新
  Mock.mock(/\/crud\/update/, 'put', () => {
    return {
      data: {}
    }
  })
}