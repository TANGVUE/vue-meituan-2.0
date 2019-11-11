<template>
  <div class="ShowPanel">
    <img :src="item.url" />
    <p class="text">{{ item.text | maxLength }}</p>
    <div class="user">
      <div class="headimg">
        <img :src="item.url" />
      </div>
      <span>作者名称</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShowPanel",
  props: ["item"],
  filters: {
    maxLength(string) {
      if (string.length > 20) {
        return string.slice(0, 20) + "...";
      } else {
        return string;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px / 1080) * 100vw;
}
.ShowPanel {
  position: relative;
  width: vw(480);
  height: vw(880);
  background-color: white;
  margin-bottom: vw(30);
  border-radius: vw(30);
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  > img {
    width: 100%;
    height: vw(630);
  }

  .text {
    font-size: vw(36);
    font-weight: bold;
    padding: vw(36);
    margin: 0;
  }

  .user {
    position: absolute;
    bottom: vw(15);
    width: 100%;
    box-sizing: border-box;
    display: flex;
    padding: 0 vw(36);
    .headimg {
      width: vw(50);
      height: vw(50);
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    span {
      font-size: vw(30);
      margin-left: vw(30);
    }
  }
}
</style>