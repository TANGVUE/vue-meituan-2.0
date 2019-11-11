# vue-meituan-2.0
vw+sass+vue+vuex+vue-router+vue-axios+vant+node+express+Mongdb
# meituan - 踩坑日记

## 2019-10-31 解决vw布局

### 1.引入第三方组件，将组件修改为vw布局形式。

要想实现vw布局，首先要安装 `sass-loader` `node-sass`
```hash
npm i sass-loader node-sass -D
```
也可以通过`vue-cli`的可视化工具安装。

因为引入第三方组件`Vant`默认是用px单位的，但是项目是用整体是用vw布局来实现的，所以要将引入的组件也改成vw的形式。

#### 解决步骤：
1.先安装两个插件分别是`autoprefixer`和`postcss-px-to-viewport`
```hash
npm i autoprefixer postcss-px-to-viewport -D
```

2.配置vue.config.js文件

```js
const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');

module.exports = {
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375
          })
        ]
      }
    }
  }
};

```




## 2019-11-4 每一个路由布局方式
在本次应用中大数据都是采用三层布局，也就是分别是`header`,`main`,`footer`的形式 来进行布局的。

```html
<root>
  <header></header>
  <main></main>
  <footer></footer>
</root>
```
但是其实，这种布局方式具有一定的弊端，就是每当我们切换路由的时候，切换的整个页面，这样导致我们有的组件会多次重复渲染。
```html
<!-- 目前项目中，app根组件的形式 -->
<app>
  <!-- 如下是每一个一级路由渲染的位置 -->
  <router-view></router-view>
</app>
```
在如上结构中，几乎每一次路由的切换，都要导致整个页面的切换，浪费一定的性能。首先，在项目中我们可以看到，`header`和`footer`部分，经常有很多的组件是在重复使用的，然而更多切换的是`main`区域的内容。所以，可以优化如下：
```html
<app>
  <!-- 头部公共部分 -->
  <header></header>
  <main>
    <!-- 如下是每一个一级路由渲染的位置 -->
    <router-view></router-view>
  </main>
  <!-- 底部公共部分 -->
  <footer></footer>
</app>
```
但是这种布局，虽然解决了某些组件被重复渲染的问题，但是也诞生了一个新的问题，就是当路由切换的时候，如何去判定`header`和`footer`区域的组件，在什么时候该切换成谁，在什么时候该出现或者消失。

目前想到解决办法：

#### 1.在app组件监听`$route.path`的变化
也就是根据路由的变化来判断谁当前路由，`header`和`footer`部分该是谁，或者是否要出现。但是这里有一个注意点，就是切换的路由的那页面的样式要判断是否需要使用`padding`，因为有的页面，需要展示`header footer`但是有的不需要。



## 2019-11-6 vuex之拿数组中某一个元素数据
在vue的项目中，为了解决组件数据共享的问题，我们就使用了vuex这个状态管理仓库。

## 2019-11-7 vuex到底该放什么数据

## 2019-11-8 axios之post请求报跨域问题

## 2019-11-9 js价格精确度问题

## 2019-11-9 mongodb通过_id查询数据问题
