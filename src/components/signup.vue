<template>
	<div class="signup">
		<van-nav-bar class="navbar" title="注册"  left-arrow @click-left="back" >

		</van-nav-bar>
		<div class="main">
			<div class="input">
				<div> <span>
            账号
          </span> <input v-model="reg_param.phone" placeholder="请输入手机号" /> </div>
				<div class="verification"> <span>
            验证码
          </span> <input v-model="reg_param.phone_code" placeholder="请输入验证码" />
					<sendSMSCode :tag="reg_param.sms_type" v-model="reg_param.phone"></sendSMSCode>
				</div>
				<div> <span>
            密码
          </span> <input v-model="reg_param.pwd" type="password" placeholder="请输入登录密码" /> </div>
				<!-- <div class="type"> <span>
            属性
          </span>
					<p> <span v-for="(item, index) in typeList" :class="{'active': item == reg_param.reg.role_field_sys_shuxing}" @click="changeIndex(item)" :key="index">{{ item }}</span> </p>
				</div> -->
			</div>
			<div class="idpsd">
				<p> <span @click="showChecked">
            <i class="fa fa-check" v-show="checked" ></i>
          </span> 我已阅读并接受<span>《用户服务协议》</span> </p>
			</div>
			<van-button type="default" @click="sub_reg">注册</van-button>
		</div>
		<div class="other">
			<div class="other-login">
				<div class="header">
					<p> <span></span> <span>其他登录方式</span> <span></span> </p>
				</div>
				<div class="main">
					<p> <span><i class="fa fa-weibo"></i></span> <span><i class="fa fa-qq"></i></span> <span><i class="fa fa-weixin"></i></span> </p>
				</div>
			</div>
		</div> <span class="ver">
      v{{ reg_param.client_version }}
    </span> </div>
</template>
<script>
import sendSMSCode from "./sendSMSCode.vue";
export default {
  components: {
    sendSMSCode
  },
  data() {
    return {
      //注册提交信息
      reg_param: {
        phone: "",
        pwd: "",
        pwdre: "",
        phone_code: "",
        sms_type: "注册微信帐号",
        login_device: "weixin",
        //此处打包的时候需要修改成正常公司tag
        pro_tag: "jzt",
        client_version: "1.2.8",
        reg: {
          role_field_sys_shuxing: "保密",
          user_gps_lat: 0,
          user_gps_lng: 0,
          user_gps_city: "",
          company_token: company_token,
          m_type: this.$route.params.m_type || 4
        },
        hangye: "",
        title: ""
      },
      typeList: ["保密", "T", "P", "H", "Bi"],
      checked: false
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    changeIndex(item) {
      this.reg_param.reg.role_field_sys_shuxing = item;
    },
    showChecked() {
      this.checked = !this.checked;
    },
    //提交注册
    sub_reg() {
      const _this = this;
      _this.reg_param.pwdre = _this.reg_param.pwd;
      if ((_this.reg_param.phone + "").length != 11) {
        _this.$alert_dlg("手机号格式不正确!");
        return false;
      }
      _this.$api({
        name: "reg",
        params: _this.reg_param,
        callback: function(json_result) {
          //注册成功，转到主页
          if (json_result.code !== 1) {
            _this.$alert_dlg("注册失败!");
            return false;
          }
          //保存login_info
          _this.$login_info(json_result.data);
          _this.$go("/login/4", true);
        },
        errcallback: function(json_result) {
          _this.$alert_dlg(json_result.msg);
        }
      });
    },
    dialog() {
      this.$dialog
        .alert({
          title: "温馨提示",
          message:
            "拉帮姐派是纯LES家园，异性禁入。如果擅自注册，您将终生被禁用账号，请谅解",
          showCancelButton: true,
          confirmButtonText: "我是LES",
          cancelButtonText: "离开"
        })
        .then(() => {})
        .catch(() => {
          this.back();
        });
    }
  },
  mounted() {
    //this.dialog();
  }
};
</script>
<style lang="less" scoped>
.signup {
  width: 100%;
  height: 100vh;
  background: #ffffff;
  overflow: hidden;
  position: relative;
  .navbar {
    background: #2bb2f0;
    color: #ffffff;
  }
  .main {
    width: 80%;
    margin: 10% auto 0;
    .input {
      > div {
        text-align: center;
        width: 100%;
        overflow: hidden;
        display: flex;
        margin: 7px auto;
        background: #ffffff;
        height: 2.5em;
        line-height: 2.5em;
        align-items: center;
        font-size: 16px;
        > span {
          width: 60px;
          min-width: 60px;
          text-align: left;
          display: inline-block;
          background: #ffffff;
          color: #2bb2f0;
          font-weight: bold;
        }
        > input {
          min-width: 100px;
          border: 1px solid #cccccc;
          box-sizing: border-box;
          border-radius: 5px;
          padding-left: 5px;
          color: #2bb2f0;
          background: #ffffff;
          flex: 1;
          display: inline-block;
          height: 2.5em;
          line-height: 2.5em;
          resize: none;
          outline: none;
        }
      }
      .verification {
        display: flex;
        > button {
          flex: 1;
          max-width: 120px;
          font-size: 16px;
          color: #2bb2f0;
          box-sizing: border-box;
          height: 2.5em;
          line-height: 2.5em;
          margin-left: 10px;
          padding: 0;
        }
        > input {
          flex: 1;
        }
      }
      .type {
        > p {
          flex: 1;
          display: flex;
          box-sizing: border-box;
          border: 2px solid #2bb2f0;
          border-radius: 5px;
          overflow: hidden;
          font-size: 16px;
          color: #2bb2f0;
          height: 2.5em;
          line-height: 2.5em;
          align-items: center;
          > span {
            flex: 1;
            box-sizing: border-box;
            border-left: 2px solid #2bb2f0;
            &:first-child {
              border-left: 2px solid transparent;
            }
          }
        }
      }
      .active {
        background: #2bb2f0;
        color: #ffffff;
      }
    }
    .idpsd {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin: 20px auto;
      > p {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        height: 2.5em;
        line-height: 2.8em;
        font-size: 13px;
        display: flex;
        align-items: center;
        > span {
          &:first-child {
            box-sizing: border-box;
            width: 1.5em;
            height: 1.5em;
            line-height: 1.5em;
            color: #2bb2f0;
            border: 1px solid #cccccc;
            border-radius: 5px;
            margin-right: 5px;
          }
          &:last-child {
            color: #2bb2f0;
          }
        }
      }
    }
    > button {
      width: 100%;
      background: #2bb2f0;
      color: #ffffff;
      font-size: 16px;
      height: 2.5em;
      line-height: 2.5em;
    }
  }
  .other {
    width: 80%;
    position: absolute;
    bottom: 5%;
    left: 10%;
    .other-login {
      @color: #2bb2f0;
      @back: #ffffff;
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
    font-size: 12px;
    color: #cccccc;
  }
}
</style>