<template>
	<van-button :loading="btn_sendcode.loading" :disabled="btn_sendcode.disabled" icon="message" @click="send_phone_code">{{btn_sendcode.title}}</van-button>
</template>
<script>
export default {
  components: {
    //这里存放导入的加载组件
  },
  props: {
    //手机号
    value: {
      default() {
        return "";
      }
    },
    //发送标记
    tag: {
      type: String,
      require: true
    },
    //组件传递参数
    btn_sendcode: {
      type: Object,
      default() {
        return {
          loading: false,
          disabled: false,
          title: "发送验证码"
        };
      }
    }
  },
  computed: {
    //计算属性,会根据引用的数据变化重新计算
    isrequire() {
      return false;
    }
  },
  data() {
    return {};
  },
  methods: {
    //方法
    send_phone_code() {
      const _this = this;
      if (_this.value == "") {
        _this.$alert_dlg("请输入手机号");
        return false;
      }
      if ((_this.value + "").length != 11) {
        _this.$alert_dlg("手机号格式不正确");
        return false;
      }
      _this.btn_sendcode.loading = true;
      _this.btn_sendcode.title = "发送中...";
      const request_ok = function() {
        _this.btn_sendcode.loading = false;
        _this.btn_sendcode.title = "发送验证码";
        _this.btn_sendcode.disabled = false;
      };
      _this.$api({
        name: "send_code",
        params: {
          phone: _this.value + "",
          type: _this.tag
        },
        callback: function(json_result) {
          const send_result = json_result.data;
          request_ok();
          if (send_result.code == 1) {
            //如果发送次数已经大于了3分之2，则提示用户
            const sycount =
              parseInt(send_result.allcount) - parseInt(send_result.count);
            if (
              sycount > 0 &&
              parseInt(send_result.count) > parseInt(send_result.allcount) / 1.5
            ) {
              _this.$alert_dlg(
                "发送成功,请查看手机短信。<br/><span style='color:red;'>注意：你今日仅剩" +
                  sycount +
                  "次发送验证码机会,请耐心等待</span>"
              );
            } else {
              _this.$alert_dlg(
                "发送成功,请查看手机短信。如果没有收到，请稍等一会儿！"
              );
            }
            _this.btn_sendcode.disabled = true;
            //重置按钮时间
            _this.reset_sendbtn();
          } else {
            _this.$alert_dlg(send_result.msg);
          }
        },
        errorcllback: request_ok,
        catchcallback: request_ok
      });
    },
    reset_sendbtn() {
      const _this = this;
      var time = 60;
      var sendcode_time = setInterval(function() {
        time--;
        if (time == 0) {
          _this.btn_sendcode.disabled = false;
          _this.btn_sendcode.title = "发送验证码";
          clearInterval(sendcode_time);
        } else {
          _this.btn_sendcode.title = "等待(" + time + ")秒";
        }
      }, 1000);
    }
  },
  mounted() {
    //页面加载并且dom显示完的时候
  },
  //加载页面执行的方法,缓存后也会执行
  activated() {},
  created() {
    //组件创建成功的时候
  }
};
</script>
<style scoped>
/*样式表，只会在此组件中生效*/
</style>