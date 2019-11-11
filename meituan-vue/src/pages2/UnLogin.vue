<template>
  <div class="UnLogin">
    <p>登录后可以查看“我的美团”页面</p>
    <van-button color="linear-gradient(to right, #e9ca4b, #ffbe00)" size="large" to="/login">登录</van-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px / 1080) * 100vw;
}

.UnLogin {
  padding: 0 vw(100);

  p {
    font-size: vw(50);
    text-align: center;
    font-weight: normal;
    padding: vw(30);
    margin-top: vw(300);
  }

  .van-button {
    border-radius: vw(18);
  }
}
</style>
