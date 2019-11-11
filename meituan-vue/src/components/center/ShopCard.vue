<template>
  <div class="ShopCard" @click="onClick">
    <p class="title">
      <span class="title-name">{{ item.s_shopName }}</span>
      <van-tag color="#ffbd33" text-color="#222222">外卖</van-tag>
    </p>
    <p class="parameter">
      <span class="score">{{ item.s_score }}</span>
      <span>|</span>
      <span class="sales">{{ item.s_salesVolume | salesVolume }}</span>
      <span>|</span>
      <span class="free">{{ item.s_freeDistribution | freeDistribution }}</span>
      <span>|</span>
      <span class="avg">{{ item.s_averagePrice | averagePrice }}</span>
      <span class="time">{{ item.s_overTime | overTime }}</span>
    </p>
    <p class="discount">
      <van-tag color="#ff5a3e" text-color="#f0f0f0">优惠</van-tag>
      <span
        class="discount-item"
        v-for="(disObj,i) in item.s_discount"
        :key="i"
      >{{ disObj.meet }}减{{ disObj.reduce }}</span>
    </p>
    <div class="samples">
      <div class="sample-item" v-for="(sample, i) in item.s_samples" :key="i">
        <img :src="sample.url" />
        <div class="sample-pirce">
          <span>{{ sample.curPrice }}</span>
          <del>{{ sample.oldPrice }}</del>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopCard",
  props: {
    item: Object
  },
  methods: {
    onClick() {
      location.href = "http://localhost:8080/#/shop/" + this.item._id;
    }
  },
  filters: {
    salesVolume(value) {
      return "月销" + value;
    },
    freeDistribution(value) {
      if (value) return "免费配送";
      else return "需配送费";
    },
    averagePrice(value) {
      return "均价￥" + value;
    },
    overTime(value) {
      return value + "送达";
    }
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px / 1080) * 100vw;
}
.ShopCard {
  margin: vw(30) vw(30);
  background-color: white;
  border-radius: vw(30);
  padding: vw(40) vw(30);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .title {
    .title-name {
      font-size: vw(43);
      font-weight: bold;
      margin-right: vw(30);
    }
  }

  .parameter {
    font-size: vw(30);
    color: #646464;
    span {
      padding: 0 2px;
    }
    .score {
      color: #ff9900;
    }
    .time {
      float: right;
    }
  }

  p {
    margin: vw(30) 0;
  }

  .discount {
    .discount-item {
      font-size: vw(30);
      padding: 0 vw(18);
    }
  }

  .samples {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .sample-item {
      position: relative;
      width: vw(300);
      height: vw(300);
      overflow: hidden;
      border-radius: vw(20);

      img {
        width: 100%;
        height: 100%;
      }

      .sample-pirce {
        position: absolute;
        bottom: vw(15);
        width: 100%;
        text-align: center;
        color: white;
        font-size: vw(30);

        span {
          margin-right: vw(30);
        }
      }
    }
  }
}
</style>