// 管理用户类型的文件

// 登录请求数据类型
export interface LoginFormData {
  username: string
  password: string
}

// 定义所有响应数据的接口类型
interface ResponseData{
  code: number
  ok: boolean
  message: string
}

// 登录响应数据类型
export interface LoginResponseDate extends ResponseData {
  data:string
}

interface UserInfoType {
  avatar: string
  name: string
  roles: string[]
  buttons: string[]
  routes: string[]
}

export interface UserResponseDate extends ResponseData {
  data: UserInfoType
}

export interface LogoOutResponseDate extends ResponseData {
  data:null
}