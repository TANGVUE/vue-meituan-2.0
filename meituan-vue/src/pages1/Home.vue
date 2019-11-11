<template>
  <div class="home-page">
    <header>
      <van-search
        v-model="value"
        label="地址"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </header>
    <main>
      <van-grid :column-num="5">
        <!-- <van-grid-item v-for="value in 10" :key="value" icon="photo-o" text="文字" /> -->
        <van-grid-item v-for="(item,i) in urls" :key="i">
          <van-image :src="item.url" />
          <span class="text">{{ item.text }}</span>
        </van-grid-item>
      </van-grid>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <van-image
            width="100%"
            height="100%"
            src="https://p0.meituan.net/waimaipoi/c2743f55460403aca355d81af7b1b82d39965.jpg"
            fit="cover"
          />
        </van-swipe-item>
        <van-swipe-item>
          <van-image
            width="100%"
            height="100%"
            src="https://p1.meituan.net/waimaipoi/a069cda780cfad105f7d34b193f4cd8027807.jpg"
            fit="cover"
          />
        </van-swipe-item>
      </van-swipe>
      <van-divider>附近推介</van-divider>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ShopCard v-for="item in shopArr" :key="item._id" :item="item" />
      </van-list>
    </main>
    <FooterTab />
  </div>
</template>

<script>
import FooterTab from "../components/footer/FooterTab.vue";
import ShopCard from "../components/center/ShopCard.vue";
export default {
  name: "Home",
  data() {
    return {
      value: "",
      loading: false,
      finished: false,
      urls: [
        { text: "美食", url: require("../assets/1_0000_1.png") },
        { text: "猫眼电影", url: require("../assets/1_0001_3.png") },
        { text: "酒店", url: require("../assets/1_0002_4.png") },
        { text: "休闲娱乐", url: require("../assets/1_0003_6.png") },
        { text: "外卖", url: require("../assets/1_0004_7.png") },
        { text: "KTV", url: require("../assets/1_0005_8.png") },
        { text: "周边游", url: require("../assets/1_0006_9.png") },
        { text: "丽人", url: require("../assets/1_0007_10.png") },
        { text: "小吃快餐", url: require("../assets/1_0001_3.png") },
        { text: "其他", url: require("../assets/1_0005_8.png") }
      ]
    };
  },
  methods: {
    onSearch() {
      window.console.log(1);
    },
    onLoad() {
      setTimeout(() => {
        this.loading = false;
        this.finished = true;
      }, 2000);
    }
  },
  computed: {
    shopArr() {
      return this.$store.getters.getShopArr;
    }
  },
  components: {
    FooterTab,
    ShopCard
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px / 1080) * 100vw;
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
  padding: vw(156) 0;

  .van-swipe {
    height: vw(300);
    .van-swipe-item {
      background-color: #ffbe00;
    }
  }
}

.van-image {
  width: vw(100);
  height: vw(100);
}

.text {
  font-size: vw(36);
  padding-top: vw(10);
}
</style>