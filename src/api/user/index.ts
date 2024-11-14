import service from '@/utils/axios'
import { AxiosResponse } from 'axios'
import { NameGetDto } from './type'

/**
 * get
 * @returns
 */
export const getUserInfo = (): Promise<AxiosResponse> => {
  return service({
    url: '/jzk/hello',
    method: 'get'
  })
}
/**
 * get 带参数
 * @param data
 * @returns
 */
export const getName = (data: NameGetDto): Promise<AxiosResponse> => {
  return service({
    url: '/jzk/hello/name',
    method: 'get',
    data
  })
}
