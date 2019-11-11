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
在vue的项目中，为了解决组件数据共享的问题，我们就使用了vuex这个状态管理仓库。然而，我们在store中往往存的数据不一个简单的数据类型，而可能是数组和对象。</br>
比如本次项目中，购物车数据，店铺数据，地址数据等等，这都数据都是存放在一个数组里面的。这时候，我们就会碰到一个问题，如何快速的从这些数组中，选出某一个数据或者多个数据。

#### 解决方案：</br>
我们可以这样去写`getter`属性中的函数。
```js
// 返回当前店铺的购物车数据
    getCartArrById: (state) => (id) => {
      return state.cartArr.filter(item => item.s_id == id);
    }
```
可以知道，我们在使用`this.$store.getters.getXXX`获取某某数据的时候，这个函数就会想vue实例中的`computed`属性一样，立即执行这个函数并且返回一个值。通过这个原理，就可以采用一种办法---`让这个getters中的函数返回一个闭包的函数`。</br>
通过这种方式，在获取store仓库中数据的时候就会变得相当灵活，因为返回的是一个闭包函数，所以返回的这个函数的内部就可以访问仓库中`state`这个属性。这样我们就可以根据自己需求，传参调用这个函数，来获取你需要的数据。
## 2019-11-7 vuex到底该放什么数据
首先要知道，vuex所创建的store仓库，其实可以当成一个去全局的变量。在这个页面没有关闭的时候，它是始终占据一定内存的。如果它里面放的数据太多，就会占用多内存。</br>
#### 所以vuex该放什么数据？
个人认为：</br>

- 多组件共享的数据
- 长期需要使用的数据


就以该项目为例子，购物车的数据和用户的数据就是典型的多组件需要共享的数据。因为当我们选择外卖产品的加入购物车候，有时候可能会切换到其他页面去看其他的东西，这时候这些页面也可能会用到购物车中的数据，比如结算的页面，比如商品详情页等等，如果购物车数据只在购物车页的实例中保存，当另外一个页面需要用这个数据的时候，这个数据的传递就会变的特别麻烦，这个数据可能要经过几个组件的传递才能到指定的页面。用户数据也是如此，比如订单页和地址页，都需要用户的信息去分别请求该用户的订单数据和地址数据。
所以，这种被多个组件都要用到的，或者只需要一次请求长期用到的数据最好是放在一个公共的仓库里面管理。
## 2019-11-8 axios之post请求报跨域问题
本项目中所以的ajax请求，都是用axios去发送的。但是，在用axios的时候，发送get请求没有问题,但是有时候在用post请求的时候，就会出现一个奇怪的问题---`ajax请求跨域`。（建立在后端已确认服务代理无误的情况下）

问题的根源：axios 请求中默认 `headers` 的` Content-Type` 属性为 `application/json` 类型，这种类型在跨域时，浏览器会先发送 `options` 请求，如果服务器响应完全符合请求要求，浏览器则会发送真正的 `post` 请求。

解决过程：

1. 修改axios请求头的`Content-Type`信息 

   一般前后端数据交互,提交数据的方式有三种`form-data`，`xxx-form-urlencoded`，`raw`，`binary`于是我可以尝试修改请求头信息。

   ```js
   this.$axios
        .post(
          "http://localhost:3000/user/login",
          {
            tel: this.tel,
            password: this.pasd
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
   ```
   这样的确解决了跨域问题，但是我们发现后端接受的不是一个正常的数据形式:在浏览器发送的请求中可以看到，它发送的是一个怪异的数据。
   ```hash
   {"tel":"18570567018","password":"tzc241241"}:
   ```
   因为在我的项目后端用的是`node+express`，然后会发现在后端的接受的是一个空对象。因这个字符串后面的冒号，导致后端的`req.body`无法解析这个数据。然后我换成了`text/plain`然后发现结果也是一样的。

   于是出现了第二问题，虽然改了`Content-Type`的信息让它不发送`application/json`类型从而解决了不报跨域错误问题，但是我们发送的数据，后端无法处理。

2. 引入`qs`模块解决数据格式问题

    最后发现在vue的项目中，可以引入一个`qs`模块，这模块可以将我们的数据格式转成一个键值对字符串的形式。

    ```js
    this.$axios
        .post(
          "http://localhost:3000/user/login",
          qs.stringify({
            tel: this.tel,
            password: this.pasd
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
    ```
    将post请求需要发送的数据用`qs.stringify`处理，在改变一下`header`请求头，这样完美解决了post请求跨域和数据格式不正确的问题了。

    可以看到发送的数据格式是:
    ```hash
    form-data：
    tel: 18570567018
    password: tzc241241
    ```
    如果`Content-Type`改成`text/plain`，则数据格式是：

    ```hash
    tel=18570567018&password=tzc241241
    ```

    在我后端用`node+express`的情况下，也不能解析这个数据。
## 2019-11-9 js价格精确度问题
js在处理价格的计算是一个经常碰到的问题，虽然计算的价格存放数据的时候最后往往都是后端去做，但是前端有时候也需要去展示某些价格的计算结果。比如购物车价格的计算，结算页面的价格计算.....

但是js在计算带有小数变量的时候，就会出现一个奇葩的现象：

```js
0.1+0.2
0.30000000000000004

39.8*100
3979.9999999999995
```
它不仅是小数与小数运算有时候会出现精度误差，小数和整数的运算也是会精度误差。

#### 解决方案如下：
在js的运算中，我们会发现，只要是整数的计算就不会出现问题。所以我们在计算价格的时候，一般都会把小数都变成整数在进行计算。

1. 钱的最小单位是分，所以我们在计算人民币的时候，最多是两位小数。如：`xxx.xx`

2. 因为只有整数相互做运算才不会出现精度误差，所以我们一般都会讲价格的数据保存为字符串形式，例如：`38.90 17.00 99.88`

3. 每次进行计算的时候，就可以直接删掉字符中的小数点，然后讲字符串变成一个整数，在做运算。

```js
let price = '99.88';
let count = 3;
let set = 0;
let priceArr = price.split(''); //['9','9','.','8','8']
priceArr.splice(-3,1); //删掉 '.'
price = priceArr.join(''); // '9988'
set = price * count /100;//299.64
```
这样就基本解决了前端在计算小数的时候出现的精度问题了。


## 2019-11-9 mongodb通过_id查询数据问题
mongodb在插入数据的时候，是默认是会添加一个自增长id的，但是这个id在数据库中存放的数据类型是一个对象。

```js
 ObjectId("5dc62bc82d34bac132e1a59d")
```
但是我们前端在获取这个数据的时候，它有默认转换成了字符串的格式，所以我们在node里面用id进行数据查找的时候，就会找不到该数据。

#### 解决办法如下：

首选在后端，我们需要导入一个ObjectID的构造函数

```js
var ObjectID = require('mongodb').ObjectID;
```
当前端发来id字符串的时候，用这个函数new一个ObjectID出来

```js
let result = await find('goods', { _id: new ObjectID(_id) }, db);
```
这样我们在查找数据的时候，就可以根据自增长id找到对应的数据了。
