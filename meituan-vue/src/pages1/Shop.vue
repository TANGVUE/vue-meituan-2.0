<template>
  <div class="shop-page">
    <header>
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    </header>
    <main>
      <div class="head-img">
        <img :src="shopObj.s_imgURL" />
        <div class="shop-panel">
          <div class="shop-mesg">
            <h3>{{ shopObj.s_shopName }}</h3>
            <div class="shop-img">
              <img :src="shopObj.s_imgURL" alt />
            </div>
            <p class="parameter">
              <van-tag mark type="primary">配送</van-tag>
              <span>约{{ shopObj.s_overTime }}</span>
              <span>|</span>
              <van-tag type="success" mark>退款</van-tag>
              <span>急速退款</span>
            </p>
            <p class="notice">公告：美团开业活动凡下单金额过10元送一年会员..</p>
            <p class="discount">
              <van-tag
                color="#f2826a"
                plain
                v-for="(discount,index) in shopObj.s_discount"
                :key="index"
              >{{ discount.meet }}减{{ discount.reduce }}</van-tag>
            </p>
          </div>
        </div>
      </div>
      <div class="tab-btns">
        <div class="btn">
          <a href="###">点菜</a>
        </div>
        <div class="btn">
          <a href="###">评价</a>
        </div>
        <div class="btn">
          <a href="###">商家</a>
        </div>
        <van-button color="#ebbd70" plain size="small" round>好友拼单</van-button>
      </div>
      <div class="tab-btns btns-fiexd" v-show="isfiexd">
        <div class="btn">
          <a href="###">点菜</a>
        </div>
        <div class="btn">
          <a href="###">评价</a>
        </div>
        <div class="btn">
          <a href="###">商家</a>
        </div>
        <van-button color="#ebbd70" plain size="small" round>好友拼单</van-button>
      </div>
      <div class="order">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            :title="type.text"
            v-for="(type, index) in shopObj.s_goodsTypes"
            :key="index"
          />
        </van-sidebar>
        <van-sidebar v-model="activeKey" class="sidebar-fiexd" v-show="isfiexd">
          <van-sidebar-item
            :title="type.text"
            v-for="(type, index) in shopObj.s_goodsTypes"
            :key="index"
          />
        </van-sidebar>
        <van-loading size="24px" v-if="isloading" class="loading">加载中...</van-loading>
        <div class="goods-list" v-else>
          <GoodsCard
            v-for=" goods in goodsArr"
            :key="goods.id"
            :goods="goods"
            :s_id="shopObj._id+''"
          />
        </div>
      </div>
    </main>
    <ShopFooter :shop_id="shopObj._id" />
  </div>
</template>

<script>
import GoodsCard from "../components/center/GoodsCard.vue";
import ShopFooter from "../components/footer/ShopFooter.vue";

export default {
  name: "Shop",
  data() {
    return {
      shopObj: {
        s_averagePrice: "",
        s_discount: [],
        s_freeDistribution: true,
        s_goodsTypes: [],
        s_id: "",
        s_imgURL: "",
        s_overTime: "",
        s_salesVolume: "",
        s_samples: [],
        s_score: "",
        s_shopName: "",
        _id: ""
      },
      activeKey: 0,
      num: 10,
      loading: false,
      finished: false,
      isfiexd: false,
      isloading: true,
      scrollTop: 0,
      goodsArr: []
    };
  },
  methods: {
    onClickLeft() {
      history.back();
    },
    // 加载商品数据
    loadingGoods() {
      this.$axios
        .get("http://localhost:3000/goods/getAllGoods", {
          params: {
            s_id: this.$route.params.id
          }
        })
        .then(({ data }) => {
          this.goodsArr = data.result;
          this.isloading = false;
        });
    },
    loadingShop() {
      const shop_id = this.$route.params.id;
      this.shopObj = this.$store.getters.getShopById(shop_id)[0];
    }
  },
  watch: {
    activeKey() {
      if (this.goodsArr.length === 0) return;
      let tag = this.$el.querySelectorAll(`.type${this.activeKey}`)[0];
      this.$el.scrollTop = tag.offsetTop - 100;
    },
    scrollTop() {
      let btns = this.$el.querySelectorAll(".tab-btns")[0];
      if (btns.offsetTop <= this.scrollTop) {
        this.isfiexd = true;
      } else {
        this.isfiexd = false;
      }
    }
  },
  created() {
    this.loadingGoods();
    this.loadingShop();
    window.console.log(this.shopObj);
  },
  mounted() {
    this.$el.addEventListener("scroll", () => {
      this.scrollTop = this.$el.scrollTop;
    });
  },
  components: {
    GoodsCard,
    ShopFooter
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.shop-page {
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
      .van-nav-bar__text {
        color: black;
      }
    }
  }
  background-color: white;
  main {
    padding: vw(133) 0;
    padding-bottom: vw(160);
    .btns-fiexd {
      position: fixed;
      top: vw(133);
      width: 100%;
      box-sizing: border-box;
      z-index: 99;
    }
    .sidebar-fiexd {
      position: fixed;
      top: vw(255);
      z-index: 99;
    }
    .head-img {
      position: relative;
      width: 100%;
      height: vw(454);
      margin-bottom: vw(200);

      img {
        width: 100%;
        height: 100%;
      }

      .shop-panel {
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        padding: 0 vw(28);
        top: vw(290);
        .shop-mesg {
          box-sizing: border-box;
          width: 100%;
          padding: vw(30) vw(36);
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
          border-radius: 10px;

          .shop-img {
            position: absolute;
            width: vw(150);
            height: vw(150);
            border-radius: 5px;
            overflow: hidden;
            right: vw(80);
            top: vw(-50);
          }

          h3 {
            font-size: vw(54);
            font-weight: bold;
            margin: 0;
          }

          p {
            margin: 0;
          }

          .parameter {
            padding: vw(16) 0;
            span {
              font-size: vw(30);
              padding: 0 vw(10);
            }
          }

          .notice {
            font-size: vw(30);
            color: #999999;
          }
        }
      }
    }
    .tab-btns {
      padding: 0 vw(26);
      line-height: vw(120);
      overflow: hidden;
      background-color: white;
      border-bottom: 1px solid #e4e4e4;
      .btn {
        width: vw(240);
        height: 100%;
        float: left;
        text-align: center;

        a {
          color: #666666;
          font-size: vw(44);
        }
      }
      .van-button {
        float: right;
        margin-top: vw(18);
      }
    }
    .loading {
      width: 100%;
      text-align: center;
    }
    .order {
      width: 100%;
      display: flex;
      .goods-list {
        flex: 1;
      }
    }
  }
}
</style>

<style lang="scss">
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.shop-page {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.discount {
  padding-top: vw(18);
  .van-tag {
    margin-right: vw(12);
  }
}
</style>