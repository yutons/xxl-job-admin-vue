
import request from '@/router/axios';
import { baseUrl } from '@/config/env';
export const list = (data) => {
  return request({
    url: baseUrl + '/crud/list',
    method: 'get',
    meta: {
      isSerialize: true
    },
    params: data
  })
}
export const del = (id) => request.delete(baseUrl + '/crud/delete', {
  params: {
    id
  }
})
export const add = (data) => request({
  url: baseUrl + '/crud/add',
  method: 'post',
  meta: {
    isSerialize: true
  },
  data: data
})
export const update = (id, data) => request({
  url: baseUrl + '/crud/update',
  method: 'put',
  meta: {
    isSerialize: true
  },
  data: data
})



