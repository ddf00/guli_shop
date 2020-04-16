// 操作storage数据的工具函数模块

// 获取UUID值
// 用于操作首页模块数据的vuex模块
import UUID from "uuidjs";

// 将生成的UUID保存到localstorage中
export function getUUID() {
    // 从localstorage 中读取
    let uuid = localStorage.getItem('UUID_KEY')
    // 如果没有, 生成一个新的, 保存到从localstorage
    if (!uuid) {
        uuid = UUID.generate()   //"19a10c24-b45f-49a9-b06b-92c0b2cb6291"
        localStorage.setItem('UUID_KEY', uuid)
    }
    return uuid
}