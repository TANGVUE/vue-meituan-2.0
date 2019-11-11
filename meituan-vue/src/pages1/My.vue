<template>
  <div class="My-page">
    <header>
      <van-nav-bar title="我的美团" @click-right="onClickRight">
        <van-icon name="setting-o" slot="right" />
      </van-nav-bar>
    </header>
    <main>
      <transition>
        <router-view></router-view>
      </transition>
    </main>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    <FooterTab />
  </div>
</template>

<script>
import FooterTab from "../components/footer/FooterTab.vue";

export default {
  name: "My",
  data() {
    return {
      show: false,
      actions: null
    };
  },
  methods: {
    getActiveNum(index1, index2) {
      this.$emit("getActiveNum", index1, index2);
    },
    onClickRight() {
      this.show = true;
    },
    onSelect(item) {
      this.show = false;
      this.$toast(item.name);
      if (item.name === "注销" || item.name === "切换账号") {
        this.clearCookie();
        location.reload();
      } else if (item.name === "请先登录") {
        location.href = "http://localhost:8080/#/login";
      }
    },
    checkStoreId() {
      let obj = this.$store.getters.getUserObj;
      if (obj.u_id) {
        this.actions = [{ name: "注销" }, { name: "切换账号" }];
      } else {
        this.actions = [{ name: "请先登录" }, { name: "关闭" }];
      }
    },
    clearCookie() {
      let prevDate = new Date();
      prevDate.setDate(prevDate.getDate() - 1);
      document.cookie = `u_id='';expires=${prevDate};path=/`;
      document.cookie = `u_username='';expires=${prevDate};path=/`;
    }
  },
  components: {
    FooterTab
  },
  created() {
    this.checkStoreId();
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  .van-search,
  .van-nav-bar {
    background-color: #ffbe00 !important;
    .van-icon {
      color: black;
    }
  }
}

main {
  padding: vw(133) 0;
}
</style>