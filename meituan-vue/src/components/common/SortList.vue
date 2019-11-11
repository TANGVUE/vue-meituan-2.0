<template>
  <div class="sort-list">
    <ul>
      <li v-for="(item,i) in sortArr" :key="i" @click="onActive(i)">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  props: ["sortArr"],
  methods: {
    onActive(index) {
      this.active = index;
      let lis = this.$el.querySelectorAll(".sort-list li");
      for (let i = 0; i < lis.length; i++) {
        if (i === index) {
          lis[i].className = "active";
          continue;
        }
        lis[i].className = "";
      }
    }
  },
  mounted() {
    this.onActive(0);
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}
.sort-list {
  width: 100%;
  height: vw(126);
  line-height: vw(126);
  overflow: auto;
  background-color: white;

  ul {
    display: flex;
    li {
      width: vw(150);
      height: 100%;
      font-size: vw(36);
      text-align: center;
      flex-shrink: 0;
      font-weight: normal;
    }

    .active {
      font-weight: bold;
      font-size: vw(42);
    }
  }
}
</style>