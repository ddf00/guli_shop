// 包含所有接口请求函数

import ajax from "./ajax";
import mockAjax from "./mockAjax";

export const reqBaseCategoryList = () => ajax('/product/getBaseCategoryList')

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


// 添加购物车 / 修改购物项数量
export const reqAddToCart = (skuId,skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
// 获取购物车列表
export const reqCartList = () => ajax.get('/cart/cartList')
// 指定商品项的选中转台
export const reqCheckCartItem = (skuId, isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
// 删除购物车商品  /api/cart/deleteCart/{skuId}
export const reqDeleteCartItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)


// 登录 请求
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', {mobile, password}) 
// 退出登录
export const reqlogout = () => ajax.get('/user/passport/logout')
// 注册Register接口
export const reqRegister = (userInfo) => ajax.post('/user/passport/register',userInfo)


// 获取提交订单交易信息
export const reqTradeInfo = () => ajax.get('/order/auth/trade')
// 获取我的订单列表                                                    //  页码   每一页数量
export const reqMyOrders = (page, limit) => ajax.get(`/order/auth/${page}/${limit}`)

// 提交订单  
/* 
    tradeNo: 交易号, 以query 参数提交
    orderInfo: 订单对象信息, 以请求体json数据提交
*/                   
export const reqSubmitOrder = (tradeNo,orderInfo) => ajax({
    url: '/order/auth/submitOrder',
    method: 'POST',
    params: {
        tradeNo
    },
    data: orderInfo
})
// 获取订单支付信息
// orderId: 订单号
export const reqPayInfo = (orderId) => ajax.get(`/payment/weixin/createNative/${orderId}`)

// 查询支付订单状态
export const reqOrderStatus = (orderId) => ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)