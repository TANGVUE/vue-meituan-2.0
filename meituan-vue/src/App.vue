<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "http://localhost:8080/#/",
      u_id: ""
    };
  },
  methods: {
    // 应用启动，检测用户是否登录
    checkLogin() {
      let cookie = document.cookie;
      if (!cookie) return;
      let ckArr = cookie.split("; ");
      // 检测cookie
      let next = ckArr.some(item => {
        if (item.indexOf("u_id") !== -1) {
          this.u_id = item.split("=")[1];
          return true;
        }
      });
      if (next) {
        let u_username = null;
        ckArr.some(item => {
          if (item.indexOf("u_username") !== -1) {
            u_username = item.split("=")[1];
            return true;
          }
        });
        this.$store.dispatch("setUserObj", {
          u_id: this.u_id,
          u_username
        });
      }
    },
    // 启动 加载商家数据
    loadingShops() {
      this.$axios
        .get("http://localhost:3000/shop/getShopPage", {
          params: {}
        })
        .then(({ data }) => {
          window.console.log(data);
          this.$store.dispatch("shopArrAdd", data.result);
        });
    },
    // 启动 加载地址数据
    loadingAddress() {
      this.$axios
        .get("http://localhost:3000/address/getAddress", {
          params: {
            u_id: this.u_id
          }
        })
        .then(({ data }) => {
          window.console.log(data.result);
          if (data.err === 0) {
            this.$store.dispatch("setAddress", data.result);
          }
        });
    },
    loadingOrder() {
      this.$axios
        .get("http://localhost:3000/order/getOrders", {
          params: {
            u_id: this.u_id
          }
        })
        .then(({ data }) => {
          this.isloading = false;
          if (data.err === 0) {
            this.$store.dispatch("setOrderArr", data.result);
            this.orderArr = this.$store.getters.getOrderArr(1);
          }
        });
    }
  },
  created() {
    this.checkLogin();
    this.loadingShops();
    this.loadingAddress();
    this.loadingOrder();
    location.href = this.url;
  }
};
</script>
<style lang="scss">
@function vw($px) {
  @return ($px / 1080) * 100vw;
}
html,
body {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

#app {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
