//统一管理有关用户的接口

import request from "@/utils/request";
import type {LoginForm, LoginResponseDate,UserResponseDate} from "./type"
enum API{
    LOGIN_URL='user/login',
    USERINFO_URL='user/info'
}
export const reqLogin=(info:LoginForm)=>{ request.post<LoginResponseDate>(API.LOGIN_URL,info)}
export const reqUserInfo=()=>{ request.get<UserResponseDate>(API.USERINFO_URL)}
