// 管理购物车模块先关vuex模块
import {
    reqAddToCart,
    reqCartList,
    reqCheckCartItem,
    reqDeleteCartItem
} from "@/api";

const state = {
    cartList: [], //所有购物车列表数据
}
const mutations = {
    RECEIVE_CART_LIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {

    // 设置购物项的选中状态
    async checkCartItem({
        commit
    }, {
        skuId,
        isChecked
    }) {
        const result = await reqCheckCartItem(skuId, isChecked)
        if (result.code !== 200) {
            throw new Error('勾线购物项失败')
        }
    },


    // 删除某个购物项 异步action
    async deleteCartItem({
        commit
    }, skuId) {
        const result = await reqDeleteCartItem(skuId)
        // if(result.code === 200) {
        //     // 成功, 重新获取购物车列表数据


        // } else {
        //     // 出错了 告诉组件显示失败的提示
        //     alert('')
        // }

        // 只有成功的promise  不对
        return result.code === 200 ? '' : result.message || '删除此商品失败'
    },

    async deleteCartItem2({
        commit
    }, skuId) {
        const result = await reqDeleteCartItem(skuId)
        // if(result.code === 200) {
        //     // 成功, 重新获取购物车列表数据

        // } else {
        //     // 出错了 告诉组件显示失败的提示
        //     alert('')
        // }

        // 只有成功的promise  不对
        // return result.code === 200 ? '' : result.message || '删除此商品失败'

        if (result.code !== 200) { // 如果删除失败 抛出error
            throw new Error('删除此商品失败')
            // return Promise.reject(new Error('删除此商品失败'))
        }
    },

    // 获取购物车数据列表的异步action
    async getCartList({
        commit
    }) {
        const result = await reqCartList()
        if (result.code === 200) {
            const cartList = result.data
            commit('RECEIVE_CART_LIST', cartList)
        }
    },

    async addToCart({
        commit
    }, {
        skuId,
        skuNum,
    }) {
        const result = await reqAddToCart(skuId, skuNum)
        return result.code === 200 ? '' : (result.message) || '添加购物车失败'
    },

    async addToCart2({
        dispatch
    }, {
        skuId,
        skuNum,
    }) {
        const result = await reqAddToCart(skuId, skuNum)
        if (result.code === 200) {
            // 成功 分发请求获取最新的购物车列表action
            dispatch('getCartList')
        } else {
            // 失败了 可以自己直接提示

            alert(result.message || '添加购物车失败')
            // 或 return 让组件处理错误提示
            // return result.message || '添加购物车失败'
        }
    }
}
const getters = {

    // 总数量
    totalCount(state) {
        // let total = 0
        // cartList.forEach(item => {
        //     if (item.isChecked === 1) {
        //         total += item.skuNum
        //     }
        // })

        return state.cartList.reduce((per, item) => {
            return item.isChecked === 1 ? per + item.skuNum : per
        }, 0)
    },
    // 总价格
    totalPrice(state) {
        return state.cartList.reduce((per, item) => {
            return item.isChecked === 1 ? per + item.cartPrice * item.skuNum : per
        }, 0)
    },

    // 是否全选
    isAllCheck(state) {
        return state.cartList.length > 0 && state.cartList.every((item, index) => item.isChecked === 1)
    },

    // 所有选中购物项数组
    selectedCartItems(state) {
        // return state.cartList.filter((item, index) => item.isChecked === 1)

        return state.cartList.reduce((per, item) => {
            if (item.isChecked === 1) {
                per.push(item)
            }
            return per // 初始指定的数组
        }, [])
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}