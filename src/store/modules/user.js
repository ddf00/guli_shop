// 用于操作首页模块数据的vuex模块
import {
    reqLogin,
    reqlogout,
    reqRegister
} from "@/api";
import {
    getUUID
} from "@/utils/storageUtils";
const state = {
    // 用户对象
    // userInfo: {},
    // 从loca中读取保存的用户信息对象  没有指定为空对象
    userInfo: JSON.parse(localStorage.getItem('user_info_key')) || {},
    userTempId: getUUID()
}
const mutations = {
    RECEIVE_USER_INFO(state, userInfo) {
        state.userInfo = userInfo
    },

    RESET_USER_INFO(state) {
        state.userInfo = {}
    }
}
const actions = {
    // 登录的异步action
    async Login({
        commit
    }, {
        mobile,
        password
    }) {
        const result = await reqLogin(mobile, password)
        if (result.code === 200) { // 登录成功
            const userInfo = result.data
            // 保存userInfo的JSON字符串 到local
            localStorage.setItem('user_info_key', JSON.stringify(userInfo))
            commit('RECEIVE_USER_INFO', userInfo)
        } else { // 登录失败
            throw new Error(result.message || '登录失败')
        }
    },
    // 注册异步action
    async register({
        commit
    }, userInfo) {
        const result = await reqRegister(userInfo)
        if (result.code !== 200) { // 注册失败
            throw new Error(result.message || '注册失败')
        }
    },
    // 退出登录
    async logout({
        commit
    }) {
        const result = await reqlogout()
        if (result.code !== 200) { // 退出登录失败
            throw new Error(result.message || '退出登录失败')
        } else { // 成功
            commit('RESET_USER_INFO'),
            localStorage.removeItem('user_info_key')
        }
    },

}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}