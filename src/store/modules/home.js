// 用于操作首页模块数据的vuex模块
import {
    reqBaseCategoryList,
    reqBanners,
    reqFloors
} from "@/api";
const state = {
    // 三级分类的数组
    baseCategoryList: [],
    // 广告轮播
    banners: [],
    // 楼层列表
    floors: []
}
const mutations = {
    // 接收保存分类列表
    RECEIVE_CATEGORYS(state, categorys) {
        state.baseCategoryList = categorys.splice(0, categorys.length - 2)
    },

    RECEIVE_BANNERS(state, banners) {
        state.banners = banners
    },

    RECEIVE_FLOORS(state, floors) {
        state.floors = floors
    }
}
const actions = {
    // 异步获取分类列表
    async getBaseCategoryList({
        commit
    }) {
        //1. 调用接口请求函数  异步ajax请求
        const result = await reqBaseCategoryList()
        //2. 得到成功的数据后, 提交给mutation去处理
        if (result.code === 200) {
            const categorys = result.data
            commit('RECEIVE_CATEGORYS', categorys)
        }
    },

    // 异步获取广告轮播列表
    async getBanners({
        commit
    }) {
        // 异步请求获取数据
        const result = await reqBanners()
        // 成功得到数据后, 提交给mutation
        if (result.code === 200) {
            const banners = result.data
            commit('RECEIVE_BANNERS', banners)
        }
    },

    // 异步获取楼层列表
    async getFloors({
        commit
    }) {
        // 异步请求获取数据
        const result = await reqFloors()
        // 成功得到数据后, 提交给mutation
        if (result.code === 200) {
            const floors = result.data
            commit('RECEIVE_FLOORS', floors)
        }
    }


}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}