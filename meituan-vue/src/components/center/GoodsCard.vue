<template>
  <div class="GoodsCard">
    <div class="card-top" @click="onClick">
      <div class="goods-img">
        <img :src="goods.g_url" alt />
      </div>
      <div class="goods-mesg">
        <h3>{{ goods.g_name }}</h3>
        <div class="goods-text">
          <van-tag
            :color="goods.g_type.code | color"
            :text-color="goods.g_type.code | text_color"
            :class="'type'+goods.g_type.code"
          >{{ goods.g_type.text }}</van-tag>
          <span class="goods-intro">{{ goods.g_intro | maxLength }}</span>
        </div>
        <p class="parameter">
          <span>销量{{ goods.g_salesVolume }}</span>
          <span>赞{{ goods.g_fabulous }}</span>
        </p>
      </div>
    </div>
    <div class="card-bottom">
      <div class="card-right">
        <span class="fuhao">￥</span>
        <span class="price">{{ goods.g_price }}</span>
        <van-button type="default" round plain size="mini" @click="cartReduce">-</van-button>
        <van-button round color="#ffce5d" size="mini" @click="cartAdd">+</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsCard",
  props: {
    goods: Object,
    s_id: String
  },
  methods: {
    onClick() {
      location.href =
        "http://localhost:8080/#/goods/" + this.goods._id + "/" + this.s_id;
    },
    cartAdd() {
      this.$store.dispatch("cartArrAdd", {
        s_id: this.s_id,
        g_id: this.goods._id,
        c_id: 0,
        g_url: this.goods.g_url,
        g_name: this.goods.g_name,
        g_intro: this.goods.g_intro,
        g_price: this.goods.g_price,
        count: 1
      });
    },
    cartReduce() {
      this.$store.dispatch("cartArrReduce", this.goods._id);
    }
  },
  filters: {
    maxLength(value) {
      return value.slice(0, 20) + "...";
    },
    color(value) {
      if (value == 0) {
        return "#ffe5a2";
      } else if (value == 1) {
        return "#ffe1e1";
      } else {
        return "#f2826a";
      }
    },
    text_color(value) {
      if (value == 0) {
        return "#7d6120";
      } else if (value == 1) {
        return "#ad0000";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.GoodsCard {
  width: 100%;
  box-sizing: border-box;
  padding: vw(30);

  .card-top {
    display: flex;
  }

  .goods-img {
    width: vw(270);
    height: vw(270);
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .goods-mesg {
    padding-left: vw(45);
    flex: 1;
    h3 {
      margin: 0;
      font-size: vw(40);
    }

    .goods-text {
      margin-top: vw(20);
      .goods-intro {
        font-size: vw(36);
        margin-left: vw(20);
      }
    }

    .parameter {
      font-size: vw(36);
      margin: vw(15) 0 0 0;
      span {
        margin-right: vw(30);
        color: #999999;
      }
    }
  }

  .card-bottom {
    width: 100%;
    overflow: hidden;
    .card-right {
      float: right;
      width: vw(460);
      margin-top: vw(40);

      .fuhao {
        font-size: vw(26);
        color: #fb4e47;
      }

      .price {
        font-size: vw(40);
        font-weight: bold;
        color: #fb4e47;
      }

      .van-button {
        margin-left: vw(10);
      }
    }
  }
}
</style>