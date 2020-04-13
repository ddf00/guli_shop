// 包含所有接口请求函数

import ajax from "./ajax";
import mockAjax from "./mockAjax";

export const reqBaseCategoryList = () => ajax('/product/getBaseCategoryList')

//登录
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', {
    mobile,
    password
})

//请求mock的接口
export const reqBanners = () => mockAjax.get('/banners')
//获取所有楼层的列表数据
export const reqFloors = () => mockAjax.get('/floors')

// 测试接口请求函数
// reqBanners().then(reslove => {
//     console.log('resolve', reslove)
// })


// 请求搜索匹配相关数据
export const reqProductList = (searchParams) => ajax.post('/list', searchParams)

// reqProductionList({})

// 详情Detail接口
// 获取商品详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)

// 添加购物车

export const reqAddToCart = (skuId,skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
