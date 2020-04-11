// 管理搜索模块数据

import {
    reqProductList
} from "@/api";

const state = {
    // 搜索出的商品列表相关数据对象
    productList: {}
}
const mutations = {
    // 接收保存商品列表相关数据
    RECEIVE_PRODUCT_LIST(state, productList) {
        state.productList = productList
    }
}
const actions = {
    // 根据指定的搜索条件, 异步获取商品列表
    async getProductList({
        commit
    }, searchParams) {
        // 发ajax请求 获取数据
        const result = await reqProductList(searchParams)
        // 如果成功, 提交给mutation
        if (result.code === 200) {
            const productList = result.data

            commit('RECEIVE_PRODUCT_LIST', productList) 
        }
    }
}
const getters = {
    // 返回品牌列表
    trademarkList(state) {
        return state.productList.trademarkList || []
    },
    // 返回属性列表
    attrsList(state) {
        return state.productList.attrsList || []
    },

    // 商品列表
    goodsList(state) {
        return state.productList.goodsList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}