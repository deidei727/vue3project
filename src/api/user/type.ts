// 管理用户类型的文件
export interface LoginForm { 
    username: string;
    password: string;
}

interface DataType{
    token: string;
}

export interface LoginResponseDate{
    code: number;
    data:DataType
}

interface UserDataType{
    userId: number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string,
}

export interface UserResponseDate{
    code: number;
    data:UserDataType
}