<template>
  <div class="AddressList">
    <header>
      <van-nav-bar title="地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    </header>
    <main>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @click-item="selectAddress"
      />
    </main>
  </div>
</template>

<script>
export default {
  name: "AddressList",
  data() {
    return {
      chosenAddressId: "1"
    };
  },
  methods: {
    onClickLeft() {
      history.back();
    },
    onAdd() {
      location.href = "http://localhost:8080/#/addressedit/-1";
    },
    onEdit(item) {
      location.href = "http://localhost:8080/#/addressedit/" + item.id;
    },
    selectAddress(item) {
      this.$store.dispatch("setAddressDefault", item.id);
    }
  },
  // 监听store中地址列表的数据
  computed: {
    list() {
      let arr = this.$store.getters.getAddressAll;
      if (!arr) return null;
      return arr.map(item => {
        return {
          id: item._id,
          name: item.name,
          tel: item.tel,
          address: item.province + item.city + item.county + item.addressDetail
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

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

main {
  padding-top: vw(133);
}

.van-button--danger {
  background-color: #ffbe00;
  border-color: #ffbe00;
}
.van-submit-bar__price {
  color: black;
  font-weight: bold;
}
</style>

<style lang="scss">
.AddressList {
  .van-address-item .van-radio__icon--checked .van-icon {
    background-color: #ffbe00;
    border-color: #ffbe00;
  }
}
</style>