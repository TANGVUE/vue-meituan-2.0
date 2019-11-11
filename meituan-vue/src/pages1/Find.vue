<template>
  <div class="find-page">
    <header>
      <van-nav-bar title="发现" />
    </header>
    <main>
      <SortList :sortArr="sortArr" />
      <div class="find-list">
        <ShowPanel v-for="item in showArr" :key="item.id" :item="item" />
      </div>
    </main>
    <FooterTab />
  </div>
</template>

<script>
import FooterTab from "../components/footer/FooterTab.vue";
import ShowPanel from "../components/center/ShowPanel.vue";
import SortList from "../components/common/SortList.vue";
export default {
  name: "Find",
  data() {
    return {
      sortArr: [
        "推介",
        "丽人",
        "美食",
        "旅游",
        "电影",
        "结婚",
        "购物",
        "教育",
        "酒店",
        "唱歌"
      ],
      showArr: [
        {
          id: 0,
          url: require("../assets/lbjn.jpeg"),
          text: "这是一些测试信息而已"
        },
        {
          id: 1,
          url:
            "https://p1.meituan.net/waimaipoi/a069cda780cfad105f7d34b193f4cd8027807.jpg",
          text: "这是一些测试信息而已这是一些测试信息而已"
        },
        {
          id: 2,
          url:
            "https://p0.meituan.net/waimaipoi/c2743f55460403aca355d81af7b1b82d39965.jpg",
          text: "这是一些测试信息而已这是一些测试信息而已这是一些测试信息而已"
        }
      ]
    };
  },
  methods: {
    onActive(index) {
      this.active = index;
      let lis = this.$el.querySelectorAll(".sort-list li");
      for (let i = 0; i < lis.length; i++) {
        if (i === index) {
          lis[i].className = "active";
          continue;
        }
        lis[i].className = "";
      }
    }
  },
  components: {
    ShowPanel,
    SortList,
    FooterTab
  }
};
</script>


<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.find-page {
  .find-list {
    display: flex;
    padding: 0 vw(30);
    justify-content: space-between;
    flex-wrap: wrap;
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
}
</style>