import Mock from "mockjs";
// 自动解析为js数组
import banners from "./banners.json";
import floors from "./floors.json";

// 定义返回banners数据的接口
Mock.mock('/mock/banners', {code: 200, data: banners})
// 定义返回floors数据的接口
Mock.mock('/mock/floors', {code: 200, data: floors})


// 不需要使用export 向外暴露数据

// 但是必须执行一次  ==>  2个mock的接口就可以被访问了