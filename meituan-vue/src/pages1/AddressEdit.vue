<template>
  <div class="AddressEdit">
    <header>
      <van-nav-bar title="地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    </header>
    <main>
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :address-info="addressInfo"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        @save="saveAddress"
      />
    </main>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "AddressEdit",
  data() {
    return {
      addressInfo: null,
      searchResult: [],
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市"
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县"
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区"
        }
      }
    };
  },

  methods: {
    saveAddress(content) {
      const timer = this.$toast.loading({
        message: "保存中……",
        forbidClick: true,
        mask: true,
        duration: 0
      });
      content.u_id = this.$store.getters.getUserObj.u_id;
      this.$axios
        .post(
          "http://localhost:3000/address/saveAddress",
          qs.stringify(content),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(({ data }) => {
          if (data.err === 0) {
            timer.clear();
            this.$toast(data.mesg);
            this.$store.dispatch("addressAdd", content);
          } else {
            timer.clear();
            this.$toast(data.mesg);
          }
        });
    },
    onDelete() {
      window.console.log(123);
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    },
    onClickLeft() {
      history.back();
    }
  },
  created() {
    this.addressInfo = this.$store.getters.getAddressById(
      this.$route.params.id
    )[0];
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.AddressEdit {
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
}
</style>

<style lang="scss">
.AddressEdit {
  .van-button {
    &:nth-child(1) {
      background-color: #ffbe00;
      border-color: #ffbe00;
    }
  }
}
</style>