
import request from '@/router/axios';
export const list = (data) => {
  return request({
    url: '/crud/list',
    method: 'get',
    meta: {
      isSerialize: true
    },
    params: data
  })
}
export const del = (id) => request.delete('/crud/delete', {
  params: {
    id
  }
})
export const add = (data) => request({
  url: '/crud/add',
  method: 'post',
  meta: {
    isSerialize: true
  },
  data: data
})
export const update = (id, data) => request({
  url: '/crud/update',
  method: 'put',
  meta: {
    isSerialize: true
  },
  data: data
})



