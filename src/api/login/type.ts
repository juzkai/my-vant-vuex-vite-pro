export interface LoginInDto {
  mobile: string,
  password?: string,
  msgCode?: string
}

export interface GetUserByIdDto {
  id: string | number
}
export interface GetUserByTokenDto {
  token: string
}

export interface LoginSendMsgDto {
  mobile: string
}
