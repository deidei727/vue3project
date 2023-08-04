//统一管理有关用户的接口

import request from "@/utils/request";
import type { LoginFormData, LoginResponseDate, UserResponseDate,LogoOutResponseDate } from "./type"
enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout'
}
// 用户登录接口
export const reqLogin = (info: LoginFormData) => {
    // post中第二个数据类型是约束返回数据类型的
    return request.post<any, LoginResponseDate>(API.LOGIN_URL, info)
}
// 获取用户信息接口
export const reqUserInfo = () => {
    return request.get<any, UserResponseDate>(API.USERINFO_URL)
}

// 退出登录
export const reqLogout = () => {
    return request.post<any, LogoOutResponseDate>(API.LOGOUT_URL)
}