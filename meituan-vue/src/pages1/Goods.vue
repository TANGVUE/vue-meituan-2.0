<template >
  <div class="Goods">
    <header>
      <div class="nav-haed">
        <div class="back-btn" @click="onClick">
          <van-icon name="arrow-left" />
        </div>
      </div>
    </header>
    <van-loading size="24px" v-if="isloading" class="loading">加载中...</van-loading>
    <main v-else>
      <div class="goods-img">
        <img :src="goodsObj.g_url" alt />
      </div>
      <div class="goods-mesg">
        <p class="goods-name">
          <van-tag color="#ffba38" text-color="#32312c">招牌</van-tag>
          <span class="name">{{ goodsObj.g_name }}</span>
        </p>
        <p class="parameter">
          <span class="salesVolume">{{ goodsObj.g_salesVolume}}</span>
          <span class="overTime">配送约30分钟</span>
        </p>
        <p class="price">
          <span class="sym">￥</span>
          <span class="price-sp">{{ goodsObj.g_price }}</span>
          <van-button color="linear-gradient(to right, #ffcf60, #ffb717)" round size="small">选购</van-button>
        </p>
        <p class="intro">{{ goodsObj.g_intro }}</p>
      </div>
    </main>
    <ShopFooter :shop_id="s_id" />
  </div>
</template>

<script>
import ShopFooter from "../components/footer/ShopFooter.vue";

export default {
  name: "Goods",
  data() {
    return {
      goodsObj: {
        g_url: "",
        g_salesVolume: "",
        g_overTime: "",
        g_price: ""
      },
      isloading: true,
      s_id: ""
    };
  },
  components: {
    ShopFooter
  },
  methods: {
    onClick() {
      history.back();
    },
    loadingGoods() {
      this.$axios
        .get("http://localhost:3000/goods/getOneGoods", {
          params: {
            _id: this.$route.params.id
          }
        })
        .then(({ data }) => {
          this.goodsObj = data.result;
          this.isloading = false;
        });
    },
    getShopId() {
      this.s_id = this.$route.params.s_id;
    }
  },
  created() {
    this.getShopId();
    this.loadingGoods();
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.Goods {
  header {
    position: fixed;
    top: vw(60);
    width: 100%;

    .nav-haed {
      width: 100%;
      height: vw(120);

      .back-btn {
        width: vw(120);
        height: vw(120);
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 50%;
        color: white;
        text-align: center;
        line-height: vw(120);
        margin-left: vw(30);
        font-weight: bold;
      }
    }
  }

  main {
    padding-bottom: vw(200);
    .goods-img {
      width: 100%;
      height: vw(760);

      img {
        width: 100%;
        height: 100%;
      }
    }

    p {
      margin: vw(30) 0;
    }

    .goods-mesg {
      padding: vw(48);
      background-color: white;

      .goods-name {
        .name {
          margin-left: vw(20);
          font-size: vw(53);
          font-weight: bold;
        }
      }
    }

    .parameter {
      span {
        font-size: vw(33);
        color: #999999;
        margin-right: vw(40);
      }
    }

    .price {
      display: flex;
      span {
        font-weight: bold;
      }

      .sym {
        color: #fc4e45;
        font-size: vw(30);
      }

      .price-sp {
        color: #fc4e45;
        font-size: vw(52);
      }

      .van-button {
        margin-left: auto;
        span {
          color: black;
        }
      }
    }
  }
}

.intro {
  font-size: vw(36);
}

.loading {
  width: vw(300);
  margin: vw(100) auto;
}
</style>