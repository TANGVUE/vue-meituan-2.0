<template>
  <div class="ShopFooter">
    <transition>
      <div class="cart-list" v-show="show">
        <van-notice-bar text="凡是今日下单，都可以成为12年美团会员，更多活动敬请期待！" left-icon="volume-o" />
        <van-card
          :num="item.count"
          :price="item.g_price"
          :desc="item.g_intro"
          :title="item.g_name"
          :thumb="item.g_url"
          v-for="item in cartList"
          :key="item.c_id"
        >
          <div slot="footer">
            <van-button size="mini" @click="cartReduce(item)">-</van-button>
            <van-button size="mini" @click="cartAdd(item)">+</van-button>
          </div>
        </van-card>
      </div>
    </transition>
    <div class="shop-cart">
      <div class="shop-chat">
        <van-icon name="chat-o" />
        <p>联系商家</p>
      </div>
      <div class="cart-box" @click="show=!show">
        <div class="cart-count">
          <van-icon name="shopping-cart" />
          <van-tag round type="danger" v-show="count>0">{{ count }}</van-tag>
        </div>
        <div class="price-box">
          <p class="take-price">
            <span>￥</span>
            <span>{{ price }}</span>
          </p>
          <p class="tips">免费配送</p>
        </div>
      </div>
      <div class="pay-btn" @click="onClick">去结算</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  props: {
    shop_id: String
  },
  methods: {
    onClick() {
      let u_id = this.$store.getters.getUserObj.u_id;
      if (u_id) {
        location.href = "http://localhost:8080/#/settlement/" + this.shop_id;
      } else {
        location.href = "http://localhost:8080/#/login";
      }
    },
    handlePrice(price) {
      let priceString = price.split("");
      priceString.splice(-3, 1);
      return priceString.join("");
    },
    cartAdd(item) {
      this.$store.dispatch("cartArrAdd", {
        s_id: item.s_id,
        g_id: item.g_id,
        c_id: item.c_id,
        g_url: item.g_url,
        g_name: item.g_name,
        g_intro: item.g_intro,
        g_price: item.g_price,
        count: 1
      });
    },
    cartReduce(item) {
      this.$store.dispatch("cartArrReduce", item.g_id);
    }
  },
  computed: {
    cartList() {
      // 获取全部数据
      let arr = this.$store.getters.getCartArrById(this.shop_id);
      if (arr.length !== 0) {
        return arr;
      } else {
        return null;
      }
    },
    count() {
      let arr = this.$store.getters.getCartArrById(this.shop_id);
      let count = 0;
      arr.forEach(element => {
        count += element.count;
      });
      return count;
    },
    price() {
      let arr = this.$store.getters.getCartArrById(this.shop_id);
      let price = 0;
      arr.forEach(element => {
        price += this.handlePrice(element.g_price) * element.count;
      });
      price = price / 100 + "";
      return price;
    }
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px / 1080) * 100vw;
}
.v-enter,
.v-leave-to {
  transform: translateY(200px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}

.ShopFooter {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: vw(18) vw(48);
  z-index: 1000;

  .cart-list {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: white;
    overflow-y: auto;
    max-height: vw(1200);
    min-height: vw(300);
    border-radius: 10px 10px 0 0;
    padding-bottom: vw(200);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .shop-cart {
    width: 100%;
    height: vw(150);
    display: flex;
    z-index: 1001;
    justify-content: space-between;

    .shop-chat {
      position: relative;
      width: vw(200);
      height: 100%;
      background-color: #1f1f1f;
      border-radius: 30px 5px 5px 30px;
      text-align: center;
      line-height: vw(150);
      .van-icon {
        color: #ffd25f;
        font-size: vw(80) !important;
      }

      p {
        position: absolute;
        top: vw(96);
        width: 100%;
        line-height: vw(30);
        margin: 0;
        font-size: vw(24);
        color: #ffd25f;
        // z-index: 1000;
      }
    }

    .cart-box {
      position: relative;
      width: vw(576);
      height: 100%;
      color: white;
      margin-left: auto;
      background-color: #1f1f1f;

      .cart-count {
        position: absolute;
        left: vw(50);
        top: vw(-30);
        width: vw(150);
        height: vw(150);
        background-color: #ffd25f;
        border-radius: 50%;
        text-align: center;
        line-height: vw(200);

        .van-icon {
          font-size: vw(90) !important;
          color: black;
        }

        .van-tag {
          position: absolute;
          top: vw(-10);
          right: vw(6);
        }
      }

      .price-box {
        float: left;
        width: vw(300);
        padding: 0 vw(30);
        margin-left: vw(200);
        p {
          margin: 0;
        }
        .take-price {
          font-size: vw(55);
          padding: vw(10) 0;
        }

        .tips {
          font-size: vw(30);
          color: #989898;
        }
      }
    }

    .pay-btn {
      float: right;
      width: vw(200);
      z-index: 1001;
      height: 100%;
      text-align: center;
      line-height: vw(150);
      background-color: #ffd25f;
      font-size: vw(38);
      color: #000000;
      font-weight: bold;
      border-radius: 0px 30px 30px 0px;
    }
  }
}
</style>


<style lang="scss">
.ShopFooter {
  .van-image {
    img {
      object-fit: cover !important;
    }
  }
}
</style>