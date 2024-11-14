import service from '@/utils/axios'
import { AxiosResponse } from 'axios'
import { GetUserByIdDto, GetUserByTokenDto, LoginInDto, LoginSendMsgDto } from './type'
/**
 * 登录
 * @param data
 * @returns
 */
export const loginIn = (data: LoginInDto): Promise<AxiosResponse> => {
  return service({
    url: '/user/login',
    method: 'post',
    data
  })
}
/**
 * 获取用户信息
 * @param data
 * @returns
 */
export const getUserById = (data: GetUserByIdDto): Promise<AxiosResponse> => {
  return service({
    url: '/user/getUserById',
    method: 'get',
    data
  })
}
/**
 * 获取用户信息
 * @param data
 * @returns
 */
export const getUserByToken = (data: GetUserByTokenDto): Promise<AxiosResponse> => {
  return service({
    url: '/user/getUserByToken',
    method: 'get',
    data
  })
}
/**
 * 登录 - 发送验证码
 * @param data
 * @returns
 */
export const sendMsg = (data: LoginSendMsgDto): Promise<AxiosResponse> => {
  return service({
    url: `/user/sendMsg/${data.mobile}`,
    method: 'get'
  })
}
/**
 * 注册 - 发送验证码
 * @param data
 * @returns
 */
export const sendRegisterMsg = (data: LoginSendMsgDto): Promise<AxiosResponse> => {
  return service({
    url: `/user/sendMsg/register/${data.mobile}`,
    method: 'get'
  })
}
/**
 * 注册
 * @param data
 * @returns
 */
export const userRegister = (data: LoginInDto): Promise<AxiosResponse> => {
  return service({
    url: '/user/register',
    method: 'post',
    data
  })
}
/**
 * 验证码登录
 * @param data
 * @returns
 */
export const loginByMsgCode = (data: LoginInDto): Promise<AxiosResponse> => {
  return service({
    url: '/user/loginByMsgCode',
    method: 'post',
    data
  })
}
/**
 * 重置密码
 * @param data
 * @returns
 */
export const resetPassword = (data: LoginInDto): Promise<AxiosResponse> => {
  return service({
    url: '/user/resetPassword',
    method: 'post',
    data
  })
}
