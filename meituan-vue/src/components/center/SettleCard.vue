<template>
  <div class="SettleCard">
    <div class="goods-img">
      <img :src="item.g_url" alt />
    </div>
    <div class="goods-mesg">
      <p class="goods-title">
        <span class="goods-name">{{ item.g_name }}</span>
        <span class="goods-price">￥{{ item.g_price }}</span>
      </p>
      <div class="count">数量：x {{ item.count }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>


<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.SettleCard {
  width: 100%;
  height: vw(150);
  display: flex;
  margin-bottom: vw(60);

  p {
    margin: 0;
  }

  .goods-img {
    width: vw(150);
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .goods-mesg {
    flex: 1;
    padding: 0 vw(40);
    font-size: vw(40);

    .goods-title {
      display: flex;
      justify-content: space-between;

      .goods-price {
        font-weight: bold;
      }
    }
    .count {
      margin-top: vw(40);
      color: #999999;
    }
  }
}
</style>