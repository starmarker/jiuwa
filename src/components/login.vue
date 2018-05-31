<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.png"/>
    </div>
    <div class="input">
      <div>
        <span>
          <i class="fa fa-phone"></i>
        </span>
        <input v-model="loginV.account" placeholder="手机号"/>
      </div>
      <div>
        <span>
          <i class="fa fa-lock"></i>
        </span>
        <input v-model="loginV.pwd" placeholder="密码" type="password"/>
      </div>
    </div>
    <div class="btns">
      <van-button type="default" @click="login">登录</van-button>
      <van-button type="default" @click="signup">注册</van-button>
    </div>
     <div class="idpsd">
      <p>
        
        <label>
          <span style="display:inline-block;width:30px;">
            <van-icon name="checked" v-show="loginV.autoLogin" :size="14" style="vertical-align:middle;"/>
          </span>
        
        <input type="checkbox" name="" id="" v-model="loginV.autoLogin" style="font-size:20px;display:none;" >
        记住密码
        </label>
      </p>
      <p>忘记密码？</p>
    </div>
   <!-- <div class="other">
      <div class="other-login">
        <div class="header">
          <p>
            <span></span>
            <span>其他登录方式</span>
            <span></span>
          </p>
        </div>
        <div class="main">
          <p>
            <span><i class="fa fa-weibo"></i></span>
            <span><i class="fa fa-qq"></i></span>
            <span><i class="fa fa-weixin"></i></span>
          </p>
        </div>
      </div>
    </div>
    <span class="ver">
      v{{ loginV.client_version }}
    </span> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否自动登录
      loginV: {
        account: "",
        pwd: "",
        autoLogin: true,
        login_device: "weixin",
        type: "0",
        company_token: "6be1a0da74f875d42a80e1dfec92e28e",
        client_version: "1.2.8",
        m_type: this.$route.params.m_type || 4
      },
      refer: "",
      isWeixin: false
    };
  },
  beforeRouteEnter(to, from, next) {
    // ...

    // this.setData(from.path);
    // console.log(this.refer);
    next(vm => {
      vm.refer = from.path;
      if (vm.$getBrowserType() == "weixin") {
        vm.isWeixin = true;
        vm.$weixin_login(() => {});
      }
    });
  },
  mounted() {
    let auto_user = localStorage.getItem("auto_user");
    if (auto_user) {
      let auto_user_obj = JSON.parse(auto_user);
      this.loginV.account = auto_user_obj.account;
      this.loginV.pwd = auto_user_obj.pwd;
      //Object.assign(this.loginV, auto_user_obj);
    }
  },
  updated() {
    // this.$cklogin(() => {
    //   let next_path = _this.refer == "" ? "/" : _this.refer;
    //   this.$go(next_path);
    // }, false);
  },
  mounted() {
    if (this.$getBrowserType() == "weixin") {
      alert(111);
      this.isWeixin = true;
      this.$weixin_login();
    }
  },
  methods: {
    showAutoLogin() {
      this.loginV.autoLogin = !this.loginV.autoLogin;
    },
    login() {
      const _this = this;
      //登录

      if (this.loginV.account && this.loginV.pwd) {
        _this.$api({
          name: "login",
          params: _this.loginV,
          callback: function(json_result) {
            // 成功，转到主页
            console.log("success :");
            if (json_result.data === false) {
              _this.$err("账号或密码错误");
              return false;
            }

            //如果不具备my_info则不允许登录(未注册app,权限较高)
            if (json_result.data.my_info === false) {
              _this.$err("未注册APP");
              return false;
            }
            // 保存login_info
            if (_this.loginV.autoLogin) {
              let { account, pwd } = _this.loginV;
              let str = JSON.stringify({ account, pwd });
              localStorage.setItem("auto_user", str);
            } else {
              localStorage.removeItem("auto_user");
            }
            _this.$login_info(json_result.data);
            let next_path = _this.refer == "" ? "/" : _this.refer;
            _this.$router.push(next_path);
            // localStorage.setItem("user_Info", JSON.stringify(json_result.data));
          },
          errcallback: function(json_result) {
            _this.$err(json_result.msg);
          }
        });
      }
    },

    signup() {
      this.$router.push({ path: "/signup/4" });
    },
    setData(refer) {
      if (refer) {
        this.refer = refer;
      } else {
        this.refer = "/";
      }
    }
  },
  mounted() {
    // this.loginV.account = this.$cookie.get("loginV.account") || "13541119331";
    // this.loginV.pwd = this.$cookie.get("loginV.pwd") || "123123";
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: #0786bd;
  overflow: hidden;
  position: relative;
  .logo {
    text-align: center;
    margin-top: 10%;
    box-sizing: border-box;
    > img {
      width: 55%;
    }
  }
  .input {
    text-align: center;
    > div {
      text-align: center;
      width: 80%;
      overflow: hidden;
      display: flex;
      margin: 0 auto;
      background: #066b97;
      height: 3em;
      line-height: 3em;
      align-items: center;
      &:first-child {
        border-bottom: 1px solid #0786bd;
        border-radius: 0.5em 0.5em 0 0;
      }
      &:last-child {
        border-radius: 0 0 0.5em 0.5em;
      }
      > span {
        width: 40px;
        text-align: center;
        display: inline-block;
        background: #066b97;
        color: #ffffff;
      }
      > input {
        color: #ffffff;
        background: #066b97;
        flex: 1;
        display: inline-block;
        border: 0;
        font-size: 14px;
        line-height: 24px;
        outline: none;
        height: 24px;
        padding: 0;
        resize: none;
      }
    }
  }
  .btns {
    display: flex;
    flex-direction: column;
    margin: 1em 0;
    > button {
      width: 80%;
      margin: 0 auto;
      height: 3rem;
      border-radius: 0.5rem;
      box-sizing: border-box;
      &:first-child {
        background: #ffffff;
        color: #0786bd;
        margin-bottom: 5px;
      }
      &:last-child {
        background: #0786bd;
        color: #ffffff;
        border: 3px solid #ffffff;
      }
    }
  }
  .idpsd {
    display: flex;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto;
    > p {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      height: 2em;
      line-height: 2em;
      color: #ffffff;
      display: flex;
      align-items: center;
      > span {
        box-sizing: border-box;
        width: 1.5em;
        height: 1.5em;
        line-height: 1.5em;
        border: 1px solid #ffffff;
        border-radius: 5px;
        text-align: center;
        margin-right: 5px;
      }
    }
  }
  .other {
    width: 80%;
    position: absolute;
    bottom: 5%;
    left: 10%;
    .other-login {
      @color: #ffffff;
      @back: #0786bd;
      .header {
        margin-bottom: 1em;
        > p {
          display: flex;
          align-items: center;
          > span {
            &:first-child {
              flex: 1;
              background: linear-gradient(-90deg, @color 50%, @back);
              height: 1px;
            }
            &:nth-child(2) {
              color: @color;
              width: 85px;
              text-align: center;
              font-size: 13px;
            }
            &:last-child {
              flex: 1;
              background: linear-gradient(90deg, @color 65%, @back);
              height: 1px;
            }
          }
        }
      }
      .main {
        > p {
          width: 80%;
          margin: 0 auto;
          display: flex;
          position: fiexd;
          bottom: 20px;
          left: 10%;
          align-items: center;
          justify-content: space-around;
          > span {
            display: flex;
            background: @color;
            color: @back;
            border-radius: 100%;
            height: 50px;
            width: 50px;
            font-size: 35px;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
  .ver {
    position: absolute;
    right: 10px;
    bottom: 25px;
    color: #ffffff;
    font-size: 12px;
  }
}
</style>
