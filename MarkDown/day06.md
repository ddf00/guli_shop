## 详情页:轮播图 放大镜

## 初始显示报错

报错: Cannot read property 'imgUrl' of undefined"
skuImageList 初始值为[], 异步获取数据 所有会报错

```js
//zoom标签里写v-if
 v-if="skuImageList.length > 0"
 // v-if 判断值为false 不会显示标签
```
