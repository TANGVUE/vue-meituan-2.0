<template>
  <div class="register-page">
    <header>
      <van-nav-bar left-text="返回" right-text="帮助" left-arrow @click-left="onClickLeft" />
    </header>
    <main>
      <h3>欢迎注册美团</h3>
      <van-field
        v-model.trim="username"
        label="用户名"
        @change="checkFrom('username')"
        placeholder="字母开头,6~14位数字、字母下划线组成"
        :error-message="usernameErr"
      />
      <van-field
        v-model.trim="phone"
        label="手机号"
        placeholder="请输入手机号码，将用于登录"
        :error-message="phoneErr"
        @change="checkFrom('phone')"
      />
      <van-field
        v-model.trim="password"
        label="密码"
        placeholder="由8~16位字母、数组、下划线组成"
        :error-message="passwordErr"
        @change="checkFrom('password')"
        type="password"
      />
      <van-field
        label="确认密码"
        v-model.trim="sure"
        placeholder="请再次输入密码"
        :error-message="sureErr"
        @change="checkFrom('sure')"
        type="password"
      />
      <van-field
        v-model.trim="emil"
        label="邮箱号"
        placeholder="请输入邮箱号码"
        :error-message="emilErr"
        @change="checkFrom('emil')"
      />
      <van-field
        v-model.trim="sms"
        center
        clearable
        label="邮箱验证码"
        placeholder="请输入验证码"
        @input="checkFrom('sms')"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="sendEmil"
          :disabled="disabled2"
        >{{ disabled2?sendEmilTime+'s重发':'获取验证码' }}</van-button>
      </van-field>
      <van-button
        color="linear-gradient(to right,#e9ca4b, #ffbe00)"
        size="large"
        :disabled="disabled1"
        @click="onRegister"
      >立即注册</van-button>
    </main>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      phone: "",
      password: "",
      sure: "",
      emil: "",
      sms: "",
      usernameErr: "",
      phoneErr: "",
      passwordErr: "",
      emilErr: "",
      sureErr: "",
      disabled1: true,
      disabled2: false,
      sendEmilTime: 59,
      isok: [false, false, false, false, false, false],
      errs: [
        "用户名不能为空",
        "请输入正确用户名",
        "手机号不能为空",
        "请输入正确手机",
        "密码不能为空",
        "请输入符合规则的密码",
        "邮箱不能为空",
        "请输入正确的邮箱",
        "验证码不能为空",
        "验证码错误",
        "输入不能为空",
        "请输入正确的密码"
      ]
    };
  },
  methods: {
    checkFrom(propString) {
      let reg = null;
      let index = 0;
      let checkNum = 0;
      if (propString === "username") {
        reg = /^[a-zA-Z][a-zA-Z0-9_]{5,13}$/;
        checkNum = 0;
        index = 0;
      } else if (propString === "phone") {
        reg = /^[0-9]{11,12}$/;
        index = 2;
      } else if (propString === "password") {
        reg = /^[a-zA-Z0-9_]{8,16}$/;
        checkNum = 2;
        index = 4;
      } else if (propString === "emil") {
        checkNum = 4;
        reg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.com$/;
        index = 6;
      } else if (propString === "sure") {
        checkNum = 3;
        index = 10;
        if (!this[propString]) {
          // 为空
          this[propString + "Err"] = this.errs[index];
          this.isok[checkNum] = false;
          this.checkAbled();
          return;
        }
        if (this[propString] != this.password) {
          // 不相等
          this[propString + "Err"] = this.errs[index + 1];
          this.isok[checkNum] = false;
          this.checkAbled();
          return;
        } else {
          // 相等
          this[propString + "Err"] = "";
          this.isok[checkNum] = true;
          this.checkAbled();
          return;
        }
      } else if (propString === "sms") {
        if (this.sms) {
          this.isok[5] = true;
        } else {
          this.isok[5] = false;
        }
        this.checkAbled();
        return;
      }

      if (!this[propString]) {
        // 为空
        this[propString + "Err"] = this.errs[index];
        this.isok[checkNum] = false;
        this.checkAbled();
        return;
      }
      if (reg.test(this[propString])) {
        // 满足规则
        this[propString + "Err"] = "";
        this.isok[checkNum] = true;
        this.checkAbled();
        if (propString === "phone") {
          this.checkTel();
        }
      } else {
        // 不满足
        this[propString + "Err"] = this.errs[index + 1];
        this.isok[checkNum] = false;
        this.checkAbled();
      }
    },
    onClickLeft() {
      history.back();
    },
    checkTel() {
      this.$axios
        .get("http://localhost:3000/user/checktel", {
          params: {
            tel: this.phone
          }
        })
        .then(({ data }) => {
          if (data.err === -1) {
            this.phoneErr = data.mesg;
            this.isok[1] = false;
            this.checkAbled();
          } else {
            this.phoneErr = "";
            this.isok[1] = true;
            this.checkAbled();
          }
        });
    },
    sendEmil() {
      this.$axios
        .post(
          "http://localhost:3000/user/sendEmil",
          qs.stringify({
            tel: this.phone,
            emil: this.emil
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(({ data }) => {
          window.console.log(data);
          this.disabled2 = true;
          let timer = setInterval(() => {
            if (this.sendEmilTime === 0) {
              clearInterval(timer);
              this.disabled2 = false;
              this.sendEmilTime = 59;
            }
            this.sendEmilTime--;
          }, 1000);
        });
    },
    checkAbled() {
      let bool = !this.isok.every(bool => bool);
      window.console.log(bool);
      this.disabled1 = bool;
    },
    onRegister() {
      const timer = this.$toast.loading({
        message: "注册中……",
        forbidClick: true,
        mask: true,
        duration: 0
      });
      window.console.log(123);
      this.$axios
        .post(
          "http://localhost:3000/user/register",
          qs.stringify({
            username: this.username,
            password: this.password,
            tel: this.phone,
            emil: this.emil,
            sms: this.sms
          })
        )
        .then(({ data }) => {
          timer.clear();
          if (data.err === 0) {
            this.$notify({
              type: "success",
              message: data.mesg,
              onOpened() {
                location.href = "http://localhost:8080/#/login";
              },
              duration: 1000
            });
          } else {
            this.$notify({
              type: "danger",
              message: data.mesg
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/1080) * 100vw;
}

.register-page {
  h3 {
    font-size: vw(75);
    font-weight: normal;
    padding: 0 vw(60);
  }

  > .van-button {
    margin-top: vw(100);
  }
}
</style>

<style lang="scss">
.van-field__right-icon {
  color: #07c160 !important;
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
</style>