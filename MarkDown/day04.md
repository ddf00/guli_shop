## 响应式数据对象: 添加新属性与删除属性:

## 添加新属性

    options: 响应式对象

```js
// 错误方式:
this.options.trademark = id + ":" + name;
// 响应式对象直接添加新属性, 内部没有监视 / 劫持 ==> 没有数据绑定

// 解决:      $set方法   有数据绑定效果
vm.$set(options, trademark, id + ":" + name);
```

## 删除已有属性

```js
// delete, 删除已有属性不会触发界面更新
// setter 可以监视属性"改变"  不能监视属性的"移除"
delete this.options.trademark;
```

## 优化请求

```js
// 搜索请求携带参数为空   发请求前过滤 / 删除为空的参数属性

// 不改变组件 options
searchParams = {
  ...searchParams
};
// 过滤searchParams对象中所有属性值为空串的
Object.keys(searchParams).forEach(key => {
  if (searchParams[key] === "") {
    delete searchParams[key]; // 组件中的options也改变了
  }
});
```

## 自定义通用分页组件
    基本界面布局
