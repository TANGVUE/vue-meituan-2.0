<template>
  <footer class="FooterTab">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="browsing-history-o" :dot="dot1" to="/find">发现</van-tabbar-item>
      <van-tabbar-item icon="orders-o" :info="count" to="/order">订单</van-tabbar-item>
      <van-tabbar-item icon="user-o" :dot="dot2" :to="isLogin? '/my/account': '/my/unlogin'">我的</van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script>
export default {
  name: "FooterTab",
  data() {
    return {
      active: 0,
      dot1: true,
      dot2: true,
      isLogin: false
    };
  },
  methods: {
    checkStoreId() {
      let obj = this.$store.getters.getUserObj;
      if (obj.u_id) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    }
  },
  computed: {
    count() {
      return this.$store.getters.getOrderArr(1).length;
    }
  },
  created() {
    this.checkStoreId();
    if (this.$route.path.indexOf("/home") !== -1) {
      this.active = 0;
    } else if (this.$route.path.indexOf("/find") !== -1) {
      this.active = 1;
    } else if (this.$route.path.indexOf("/order") !== -1) {
      this.active = 2;
    } else if (this.$route.path.indexOf("/my") !== -1) {
      this.active = 3;
    }
  }
};
</script>

<style lang="scss" scope>
.van-tabbar-item--active {
  color: #ffbe00 !important;
  font-weight: bold;
}
.FooterTab {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>