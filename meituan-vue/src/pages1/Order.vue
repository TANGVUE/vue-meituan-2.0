<template>
  <div class="order-page">
    <header>
      <van-nav-bar title="订单" />
    </header>
    <main>
      <SortList :sortArr="sortArr" />
      <van-loading size="24px" v-if="isloading" class="loading">加载中...</van-loading>
      <OrderCard v-for="item in orderArr" :key="item._id" :item="item" v-else />
    </main>
    <FooterTab />
  </div>
</template>

<script>
import FooterTab from "../components/footer/FooterTab.vue";
import SortList from "../components/common/SortList.vue";
import OrderCard from "../components/center/OrderCard.vue";

export default {
  name: "Order",
  data() {
    return {
      sortArr: ["全部", "待付款", "待使用", "待评价", "退款/售后"],
      orderArr: null,
      u_id: "",
      isloading: true
    };
  },
  components: {
    SortList,
    OrderCard,
    FooterTab
  },
  methods: {
    getUserID() {
      this.u_id = this.$store.getters.getUserObj.u_id;
    },
    // 加载订单数
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
    this.getUserID();
    this.loadingOrder();
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.order-page {
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
}
</style>

<style lang="scss">
@function vw($px) {
  @return ($px/1080) * 100vw;
}
.order-page {
  li {
    flex: 1;
  }

  .loading {
    width: vw(300);
    margin: vw(100) auto;
  }
}
</style>