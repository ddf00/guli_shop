// 包含所有接口请求函数

import ajax from "./ajax";

export const reqBaseCategoryList = () => ajax('/product/getBaseCategoryList')

//登录
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', {mobile, password})