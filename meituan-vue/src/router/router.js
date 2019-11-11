import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages1/Home.vue';
import Order from '../pages1/Order.vue';
import Find from '../pages1/Find.vue';
import My from '../pages1/My.vue';
import UnLogin from '../pages2/UnLogin.vue';
import Login from '../pages1/Login.vue';
import Register from '../pages1/Register.vue';
import Shop from '../pages1/Shop.vue';
import Account from '../pages2/Account.vue';
import Goods from '../pages1/Goods.vue';
import Settlement from '../pages1/Settlement.vue';
import AddressList from '../pages1/AddressList.vue';
import AddressEdit from '../pages1/AddressEdit.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/find', component: Find },
        { path: '/order', component: Order },
        {
            path: '/my',
            component: My,
            children: [
                { path: 'unlogin', component: UnLogin },
                { path: 'account', component: Account }
            ]
        },
        {
            path: '/shop/:id',
            component: Shop,
            children: [
                // {} 评论页
                // {} 商家信息页面
            ],
            props: true
        },
        { path: '/goods/:id/:s_id', component: Goods, props: true },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/settlement/:id', component: Settlement, props: true },
        { path: "/addresslist", component: AddressList },
        { path: '/addressedit/:id', component: AddressEdit, props: true }
    ]
});