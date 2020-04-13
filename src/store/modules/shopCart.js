// 管理购物车模块先关vuex模块
import {
    reqAddToCart
} from "@/api";

const state = {
    cartList: [], //所有购物车列表数据
}
const mutations = {}
const actions = {

    // 添加到购物车的异步action
    // async addToCart({
    //     commit
    // }, {
    //     skuId,
    //     skuNum,
    //     callback
    // }) {
    //     const result = await reqAddToCart(skuId, skuNum)
    //     if (result.code === 200) {
    //         callback('')
    //     } else {
    //         callback(result.mesage || '添加购物车失败')
    //     }
    // },

    async addToCart({
        commit
    }, {
        skuId,
        skuNum,
    }) {
        const result = await reqAddToCart(skuId, skuNum)

    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}