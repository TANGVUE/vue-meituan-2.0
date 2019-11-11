<template>
  <div class="Settlement">
    <header>
      <van-nav-bar title="提交订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    </header>
    <main>
      <div class="order-panel">
        <div class="order-mesg">
          <p class="address" @click="onClickAddress">
            <van-tag type="success">地址</van-tag>
            <span class="adr">{{ addressObj.address }}</span>
            <van-icon name="arrow" />
          </p>
          <p class="account">
            <span class="name">{{ addressObj.name }}</span>
            <span class="phone">{{ addressObj.tel }}</span>
          </p>
          <van-divider />
          <p class="take">
            <span>立即送出</span>
            <span>{{ overTime | getTime }}</span>
          </p>
        </div>
      </div>
      <div class="goods-panel">
        <div class="goods-mesg">
          <p class="shop-name">
            <span class="name">{{ shopName }}</span>
            <van-tag plain>美团快送</van-tag>
          </p>
          <van-divider />
          <div class="goods-list">
            <SettleCard v-for="(item,index) in cartArr" :key="index" :item="item" />
          </div>
          <van-divider />
          <p class="package-money">
            <span>包装费</span>
            <span>￥2000</span>
          </p>
        </div>
      </div>
    </main>
    <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import SettleCard from "../components/center/SettleCard.vue";
import qs from "qs";
export default {
  name: "Settlement",
  data() {
    return {
      addressObj: {},
      overTime: new Date(),
      cartArr: [],
      price: "",
      shopName: "",
      u_id: ""
    };
  },
  methods: {
    onSubmit() {
      window.console.log("click");
      let _ = this;
      const timer = this.$toast.loading({
        message: "订单生成中……",
        forbidClick: true,
        mask: true,
        duration: 0
      });
      this.$axios
        .post(
          "http://localhost:3000/order/addOrder",
          qs.stringify({
            s_id: _.$route.params.id,
            o_price: _.price,
            u_id: _.u_id,
            o_orderState: 1,
            s_imgURL: _.imgURL,
            s_shopName: _.shopName
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(({ data }) => {
          timer.clear();
          if (data.err === 0) {
            this.$toast("支付成功！");
            location.href = "http://localhost:8080/#/order";
          } else {
            this.$notify({
              type: "danger",
              message: "订单超时，请重试..."
            });
          }
        });
    },
    onClickLeft() {
      history.back();
    },
    onClickAddress() {
      location.href = "http://localhost:8080/#/addresslist";
    },
    loadingCart() {
      this.cartArr = this.$store.getters.getCartArrById(this.$route.params.id);
    },
    handlePrice(price) {
      let priceString = price.split("");
      priceString.splice(-3, 1);
      return priceString.join("");
    },
    setPrice() {
      let arr = this.cartArr;
      let price = 0;
      arr.forEach(element => {
        price += this.handlePrice(element.g_price) * element.count;
      });
      this.price = price + 200000;
    },
    getShop() {
      this.shopName = this.$store.getters.getShopById(
        this.$route.params.id
      )[0].s_shopName;
      this.imgURL = this.$store.getters.getShopById(
        this.$route.params.id
      )[0].s_imgURL;
    },
    getUserId() {
      this.u_id = this.$store.getters.getUserObj.u_id;
    }
  },
  created() {
    this.loadingCart();
    this.setPrice();
    this.getShop();
    this.getUserId();
    let arr = this.$store.getters.getAddressDefault;
    if (arr.length == 0) {
      this.addressObj = {
        address: "请填写收货地址",
        name: "",
        tel: ""
      };
    } else {
      this.addressObj = {
        address: arr[0].addressDetail,
        name: arr[0].name,
        tel: arr[0].tel
      };
    }
  },
  components: {
    SettleCard
  },
  filters: {
    getTime(value) {
      let h = value.getHours();
      let m = value.getMinutes();
      if (m + 30 > 60) {
        h += 1;
        m = m + 30 - 60;
      }
      return h + ":" + (m > 9 ? m : "0" + m);
    }
  }
};
</script>


<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.Settlement {
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

  p {
    margin: 0;
    padding: vw(20) 0;
  }

  main {
    padding-top: vw(133);
    padding-bottom: vw(200);
    .order-panel {
      width: 100%;
      height: vw(550);
      box-sizing: border-box;
      padding: vw(30);
      background: linear-gradient(to bottom, #ffbe00, #ffffff);

      .order-mesg {
        width: 100%;
        height: vw(450);
        box-sizing: border-box;
        padding: vw(30);
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .address {
          display: flex;
          font-size: vw(54);
          font-weight: bold;
          justify-content: space-between;

          .adr {
            margin-right: auto;
            margin-left: vw(30);
          }

          .van-icon {
            vertical-align: middle;
          }
        }

        .account {
          span {
            font-size: vw(43);
            color: #656565;
            margin-right: vw(30);
          }
        }

        .take {
          display: flex;
          justify-content: space-between;

          span {
            font-size: vw(40);

            &:nth-child(2) {
              color: #4baaff;
            }
          }
        }
      }
    }

    .goods-panel {
      padding: 0 vw(30);

      .goods-mesg {
        width: 100%;
        padding: vw(40);
        box-sizing: border-box;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        .shop-name {
          display: flex;
          justify-content: space-between;
          .name {
            font-size: vw(40);
            color: #676767;
          }
        }

        .package-money {
          font-size: vw(40);
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }

  .van-button--danger {
    background-color: #ffbe00;
    border-color: #ffbe00;
  }
  .van-submit-bar__price {
    color: black;
    font-weight: bold;
  }
}
</style>