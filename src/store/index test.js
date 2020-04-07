// vuex 最核心的管理对象

import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex)
const moduleA = {
    state: {
        aaa: 1
    }
}

const moduleB = {
    state: {
        zzz: []
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,


    modules: {
        a: moduleA,
        b: moduleB,
    }
})
