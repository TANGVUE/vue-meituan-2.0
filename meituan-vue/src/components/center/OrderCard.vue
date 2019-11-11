<template>
  <div class="OrderCart">
    <p class="title">
      <span class="name">
        {{ item.s_shopName }}
        <van-icon name="arrow" />
      </span>
      <span class="order-state">{{ item.o_orderState | orderState }}</span>
    </p>
    <van-divider />
    <div class="order-msg">
      <div class="order-img">
        <img :src="item.s_imgURL" />
      </div>
      <div class="order-text">
        <p class="order-time">下单时间：{{ item.o_orderTime }}</p>
        <p class="order-price">总价:￥{{ item.o_price | getPrice }}</p>
      </div>
    </div>
    <van-button type="default" size="small">再来一单</van-button>
  </div>
</template>

<script>
export default {
  props: ["item"],
  filters: {
    orderState(value) {
      if (value == 1) {
        return "已完成";
      }
    },
    getPrice(value) {
      let arr = value.split("");
      arr.splice(-2, 0, ".");
      return arr.join("");
    }
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.OrderCart {
  position: relative;
  width: 100%;
  height: vw(430);
  padding: vw(30) vw(60);
  background-color: white;
  margin-top: vw(30);
  box-sizing: border-box;

  p {
    margin: 0;
  }

  i {
    vertical-align: middle;
  }

  .title {
    .name {
      font-size: vw(40);
      font-weight: bold;
    }
    .order-state {
      float: right;
      font-size: vw(36);
      color: #555555;
    }
  }

  .order-msg {
    display: flex;
    .order-img {
      width: vw(150);
      height: vw(150);
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .order-text {
      margin-left: vw(60);
      .order-time,
      .order-price {
        font-size: vw(36);
        color: #555555;
        padding: vw(12) 0;
      }
    }
  }

  .van-button {
    position: absolute;
    right: vw(60);
    bottom: vw(40);
  }
}
</style>