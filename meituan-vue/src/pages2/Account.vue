<template>
  <div class="Account">
    <header>
      <div class="head-box">
        <div class="account-mesg">
          <div class="account-img"></div>
          <p class="account-name">{{ user_obj.u_username }}</p>
        </div>
        <van-grid :border="false">
          <van-grid-item icon="star-o" text="收藏" />
          <van-grid-item icon="records" text="评论" />
          <van-grid-item icon="cash-on-deliver" text="红包" />
          <van-grid-item icon="chat-o" text="消息" />
        </van-grid>
      </div>
    </header>
    <main>
      <div class="wallet-panel">
        <div class="my-wallet">
          <p class="wallets-in">
            <span>我的钱包</span>
            <span>
              进入钱包
              <van-icon name="arrow" />
            </span>
          </p>
          <div class="wallet-tabs">
            <div class="wallet-item money">
              <p class="my-money">2999.00</p>
              <p class="tips">余额</p>
            </div>
            <div class="wallet-item order">
              <p class="my-money">0</p>
              <p class="tips">总订单</p>
            </div>
            <div class="wallet-item money">
              <p class="my-money">00.00</p>
              <p class="tips">共消费</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <FooterTab />
  </div>
</template>

<script>
import FooterTab from "../components/footer/FooterTab.vue";
export default {
  name: "Account",
  components: {
    FooterTab
  },
  computed: {
    user_obj() {
      return this.$store.getters.getUserObj;
    }
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.Account {
  header {
    .head-box {
      width: 100%;
      box-sizing: border-box;
      padding: vw(30);
      background: linear-gradient(to right, #fed000, #febd00);

      .account-mesg {
        padding: 0 vw(30);
        width: 100%;
        height: vw(150);
        display: flex;

        .account-img {
          width: vw(150);
          height: vw(150);
          background-color: #ebebeb;
          border-radius: 50%;
          overflow: hidden;
        }
        .account-name {
          font-size: vw(44);
          margin: 0;
          margin-left: vw(50);
          font-weight: bold;
          line-height: vw(150);
        }
      }

      .van-grid {
        margin-top: vw(60);
      }
    }
  }

  main {
    .wallet-panel {
      width: 100%;
      height: vw(400);
      box-sizing: border-box;
      padding: 0 vw(45);
      margin-top: vw(30);
      border-radius: 10px;

      .my-wallet {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        .wallets-in {
          padding: vw(30) vw(30);
          margin: 0;
          display: flex;
          justify-content: space-between;

          span {
            &:nth-child(1) {
              font-size: vw(40);
              font-weight: bold;
            }

            &:nth-child(2) {
              font-size: vw(36);
              color: #999999;
            }
          }
        }

        .wallet-tabs {
          display: flex;
          height: vw(200);
          margin-top: vw(30);

          .wallet-item {
            flex: 1;
            height: 100%;
            text-align: center;

            p {
              margin: 0;
              padding: vw(20);
            }

            .my-money {
              font-weight: bold;
              font-size: vw(46);
            }

            .tips {
              font-size: vw(40);
              color: #999999;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.Account {
  .van-grid-item__content {
    background: none !important;
  }
  .van-grid-item__text {
    color: black !important;
  }
}
</style>