// 包含所有接口请求函数

import ajax from "./ajax";
import mockAjax from "./mockAjax";

export const reqBaseCategoryList = () => ajax('/product/getBaseCategoryList')

//登录
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', {mobile, password})

//请求mock的接口
export const reqBanners = () => mockAjax.get('/banners')
//获取所有楼层的列表数据
export const reqFloors = () => mockAjax.get('/floors')


// 测试接口请求函数
// reqBanners().then(reslove => {
//     console.log('resolve', reslove)
// })