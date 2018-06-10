<template>
    <van-tabbar v-model="active" @change="change" v-if="userInfo!=null">
      <van-tabbar-item icon="wap-home" to="/index">首页</van-tabbar-item>
      <van-tabbar-item to="/rank">
      <i class="iconfont icon-paihang" slot="icon"></i>
      排行榜</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="button_click(buttonObejct.url)">{{buttonObejct.text}}</van-tabbar-item>
      <van-tabbar-item icon="upgrade" @click.native="toggleUser">切换</van-tabbar-item>
    </van-tabbar>
</template>
<script>
export default {
  // props: {user},
  data() {
    return {
      isact: false,
      active: 0
    };
  },
  mounted() {
    //console.log(this.$props);
    // this.$emit("input", this.actived);
    // this.$onEvent("isSigned", act => {
    //   this.updateAct(act);
    // });
    //const _this = this;
    if (this.userInfo != null && this.userInfo.is_teacher == 1) {
      this.updateAct();
    }
    this.setActive();
  },
  computed: {
  	activity_token() {
      let result=this.getQueryString('token');
      return result;
    },
    userInfo() {
      return this.$login_info();
    },
    buttonObejct() {
      let result = {};
      if (this.userInfo != null && this.userInfo.is_teacher == 1) {
        if (this.isact) {
          result = {
            url: "/pick",
            text: "我的"
          };
        } else {
          result = {
            url: "/sign",
            text: "报名"
          };
        }
      } else {
        result = { url: "/jiuwa", text: "我的" };
      }
      return result;
    }
  },

  methods: {
    change(index) {},
    setActive() {
      let arr = ["index", "rank", "sign"];
      let cname = this.$route.name;
      let result = arr.indexOf(cname);
      this.active = result > -1 ? result : 0;
    },
    button_click(url) {
      let params = {
        activity_token: this.activity_token
      };
      if (this.userInfo.is_teacher != 1) {
        let module_token = this.$api_urls["isHasJiuwa"];
        let obj = Object.assign({}, params, { module_token });
        this.$api({
          name: "com_manage",
          params: obj,
          callback: res => {
            if (res.data.code == 1) {
              this.$go(url);
            } else {
              this.$confirm_dlg(
                res.data.msg,
                () => {
                  window.location.reload();
                },
                () => {}
              );
            }
          }
        });
      } else {
        this.$go(url);
      }
    },
    updateAct() {
      let params = {
        activity_token: this.activity_token
      };
      let module_token = this.$api_urls["is_signed"];
      let obj = Object.assign({}, params, { module_token });
      this.$api({
        name: "com_manage",
        params: obj,
        callback: res => {
          if (res.data.code == 1) {
            this.isact = true;
          } else {
            this.isact = false;
          }
        }
      });
    },
    toggleUser(){
      this.$loginOut(()=>{
        //wx.closeWindow();//微信关闭窗口
        window.location.reload();//原生刷新页面
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/iconfont.css";
.van-tabbar-item--active {
  background-color: rgba(159, 194, 138, 0.8);
  color: #fff;
}
.van-tabbar-item {
  .van-tabbar-item__icon {
    font-size: 32px;
  }
}
</style>


