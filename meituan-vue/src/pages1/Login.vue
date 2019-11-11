<template>
  <div class="Login">
    <header>
      <van-nav-bar left-text="返回" right-text="帮助" left-arrow @click-left="onClickLeft" />
    </header>
    <main>
      <h3>欢迎登录美团</h3>
      <div class="formdata">
        <div class="num-head">
          <span>+89</span>
          <van-icon name="arrow" />
        </div>
        <input type="text" class="username" placeholder="请输入手机号" v-model.trim="tel" />
      </div>
      <div class="formdata">
        <input type="password" class="password" placeholder="请输入密码" v-model.trim="pasd" />
      </div>
      <p class="tips">
        <a href="javascript:;">忘记密码？</a>
        <router-link to="/register">立即注册</router-link>
      </p>
      <van-button
        color="linear-gradient(to right, #e9ca4b, #ffbe00)"
        size="large"
        :disabled="disabled"
        @click="onLogin"
      >登录</van-button>
    </main>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      disabled: true,
      tel: "",
      pasd: "",
      show: false,
      duration: 0
    };
  },
  methods: {
    // 检测信息是否填写
    checkInput() {
      if (this.tel && this.pasd) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    // 发送ajax检测登录
    onLogin() {
      let store = this.$store;
      const timer = this.$toast.loading({
        message: "登录中……",
        forbidClick: true,
        mask: true,
        duration: 0
      });
      this.$axios
        .post(
          "http://localhost:3000/user/login",
          qs.stringify({
            tel: this.tel,
            password: this.pasd
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(({ data }) => {
          timer.clear();
          if (data.err === 0) {
            window.console.log(data);
            this.$notify({
              type: "success",
              message: data.mesg,
              // 存放用户数据到仓库
              onOpened() {
                store.dispatch("setUserObj", {
                  u_id: data._id,
                  u_username: data.username
                });
                location.href = "http://localhost:8080/#/home";
              },
              duration: 500
            });
            // 存放7天cookie
            let cookieTime = new Date();
            cookieTime.setDate(cookieTime.getDate() + 7);
            document.cookie = `u_id=${data._id};expires=${cookieTime};path=/`;
            document.cookie = `u_username=${data.username};expires=${cookieTime};path=/`;
          } else if (data.err === -2 || data.err === -1) {
            this.$notify({
              type: "danger",
              message: data.mesg,
              duration: 2000
            });
          }
        });
    },
    onClickLeft() {
      history.back();
    }
  },
  watch: {
    tel() {
      this.checkInput();
    },
    pasd() {
      this.checkInput();
    }
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.Login {
  h3 {
    font-size: vw(75);
    font-weight: normal;
  }

  main {
    padding: 0 vw(130);
  }

  header {
    .van-nav-bar {
      background-color: #f5f5f5;

      .van-icon {
        color: black;
      }
      .van-nav-bar__text {
        color: black;
      }
    }
  }

  .formdata {
    width: 100%;
    padding: vw(8) 0;
    display: flex;
    border-bottom: 2px solid #b6b6b6;

    input {
      border: none;
      font-size: vw(46);
      height: vw(150);
      background-color: #f5f5f5;
      &::placeholder {
        color: #cccccc;
        font-size: vw(46);
        font-weight: normal;
      }
    }

    .num-head {
      height: vw(150);
      width: vw(160);
      font-size: vw(46);
      line-height: vw(150);
      text-align: left;

      i,
      span {
        vertical-align: middle;
      }
    }

    .username {
      flex: 1;
    }
    .password {
      flex: 1;
      width: 100%;
    }
  }

  .van-button {
    margin-top: vw(150);
    border-radius: 10px;
  }

  .tips {
    font-size: vw(34);
    display: flex;
    margin: vw(60) 0;
    justify-content: space-between;
    a {
      color: #555555;
    }
  }
}
</style>