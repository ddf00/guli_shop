## 登录与退出登录

userTempId: 浏览器端生成, 用于标识一个未登录的客户端, 每次去请求(尤其是购物车) 都携带 userTempId
token: 请求登录成功时服务器返回浏览器保存的, 用于标识这个登录用户

## 路由守卫

### 只有登录了才能进入交易 / 支付 / 个人中心界面

- 使用全局前置守卫

```js
// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  // 跳转目标路径
  const targetPath = to.path;
  if (checkPaths.find((path) => targetPath.indexOf(path) === 0)) {
    // 如果targetPath 在 checkPaths 中 // 需要检查
    if (store.state.user.userInfo.name) {
      // 如果已经登录 放行
      next();
    } else {
      // 如果没有 跳转登录页面
      next("/login");
    }
  } else {
    // 否则放行
    next();
  }
});
```

### 没有登录时 才能查看登录页面

- 使用路由独享前置守卫

```js
// 即将跳转到login 时调用
beforeEnter: (to, form, next) => {
  if (store.state.user.userInfo.name) {
    // 如果已经登录 跳转到首页
    next("/");
  } else {
    // 如果没有登录 放行 去登录
    next();
  }
};
```

- 组件内的守卫

```js
// 组件内守卫
beforeRouteEnter: (to, form, next) => {
  if (store.state.user.userInfo.name) {
    // 如果已经登录 跳转到首页
    next("/");
  } else {
    // 如果没有登录 放行 去登录
    next();
  }
};
```
