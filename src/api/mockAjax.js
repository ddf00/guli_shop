//      专门针对mock接口
// 对ajax进行二次包装

import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//只显示水平进度条
// NProgress.configure({showSpinner: false})

// 创建一个新的axios的实例

const ajax = axios.create({
    baseURL: '/mock', //前缀路径
    timeout: 10000 //超时时间
})

// 添加请求拦截器
ajax.interceptors.request.use((config) => {
    //显示进度条
    NProgress.start()


    //必须返回config
    return config
})

//添加响应拦截器
ajax.interceptors.response.use(

    response => {
        //隐藏进度条
        NProgress.done()
        return response.data
    },
    error => {
        //隐藏进度条
        NProgress.done()
        alert('请求出错' + error.message || '未知错误')

        //中断Promise链
        // return new Promise(() => {})

        // 返回失败的Promise
        return Promise.reject(error)
    }
)
// 向外暴露
export default ajax