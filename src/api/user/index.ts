//统一管理有关用户的接口

import request from "@/utils/request";
import type {LoginForm, LoginResponseDate,UserResponseDate} from "./type"
enum API{
    LOGIN_URL='user/login',
    USERINFO_URL='user/info'
}
export const reqLogin=(info:LoginForm)=>{ return request.post<any, LoginResponseDate>(API.LOGIN_URL,info)}
export const reqUserInfo=()=>{ return  request.get<any,UserResponseDate>(API.USERINFO_URL)}
