import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 商铺数据
    shopArr: [
    ],
    // 订单数据
    orderArr: [
    ],
    // 购物车数据
    cartArr: [
    ],
    // 地址数据
    addressArr: [
    ],
    // 用户数据
    userObj: {
      u_id: null,
      u_username: null,
      u_money: null,
      u_orders: null,
      u_consumption: null
    },
  },
  mutations: {
    shopArrAdd(state, shops) {
      state.shopArr = state.shopArr.concat(shops);
    },
    // 添加一个
    addressAdd(state, address) {
      state.addressArr.push(address);
    },
    // 初始化
    setAddress(state, arr) {
      state.addressArr = arr;
    },
    cartArrAdd(state, obj) {
      // 判断是否存在，存在则加一
      let next = state.cartArr.some(item => {
        if (item.g_id == obj.g_id) {
          item.count += 1;
          return true
        }
      })
      // 如果不存在，直接填在至数组
      if (!next) {
        window.console.log(123);
        state.cartArr.push(obj);
      }
    },
    cartArrReduce(state, id) {
      state.cartArr.some((item, index) => {
        if (item.g_id == id) {
          item.count -= 1;
          if (item.count <= 0) {
            state.cartArr.splice(index, 1);
          }
          return true;
        }
      });
    },
    setAddressDefault(state, id) {
      // 找到数组
      state.addressArr.some((item) => {
        if (item.isDefault) {
          item.isDefault = false;
          return true;
        }
      })
      state.addressArr.some((item) => {
        if (item._id == id) {
          item.isDefault = true;
          return true;
        }
      })
    },
    setUserObj(state, obj) {
      state.userObj = obj;
    },
    setOrderArr(state, arr) {
      state.orderArr = arr;
      state.orderArr.reverse();
    }
  },
  actions: {
    shopArrAdd({ commit }, shops) {
      commit('shopArrAdd', shops);
    },
    addressAdd({ commit }, address) {
      commit('addressAdd', address);
    },
    cartArrAdd({ commit }, obj) {
      commit('cartArrAdd', obj);
    },
    cartArrReduce({ commit }, id) {
      commit('cartArrReduce', id);
    },
    setAddressDefault({ commit }, id) {
      commit('setAddressDefault', id);
    },
    setUserObj({ commit }, obj) {
      commit('setUserObj', obj);
    },
    setAddress({ commit }, arr) {
      commit('setAddress', arr);
    },
    setOrderArr({ commit }, arr) {
      commit('setOrderArr', arr);
    }
  },
  getters: {
    getShopArr(state) {
      return state.shopArr;
    },
    getShopById: (state) => (id) => {
      return state.shopArr.filter(shop => shop._id == id);
    },
    getOrderArr: (state) => (orderState) => {
      return state.orderArr.filter(order => order.o_orderState === orderState);
    },
    getAddressById: (state) => (id) => {
      return state.addressArr.filter(address => address.id == id);
    },
    getAddressAll(state) {
      return state.addressArr;
    },
    getAddressDefault(state) {
      return state.addressArr.filter(address => address.isDefault);
    },
    getUserObj(state) {
      return state.userObj;
    },
    // 返回当前店铺的购物车数据
    getCartArrById: (state) => (id) => {
      return state.cartArr.filter(item => item.s_id == id);
    }
  }

})
