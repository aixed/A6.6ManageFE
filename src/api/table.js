import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/Client/table/list',
    method: 'get',
    params
  })
}
