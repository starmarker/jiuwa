import { Dialog } from "vant";
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Dialog);
Vue.use(Toast);
const notice = {
  $suc(msg) {
    if (msg) {
      Toast.success(msg);
    } else {
      Toast.success("成功");
    }
  },
  $err(msg) {
    if (msg) {
      Toast.fail(msg);
    } else {
      Toast.fail("失败");
    }
  },
  $show_loading(msg) {
    if (msg) {
      Toast.loading(msg);
    } else {
      Toast.loading("加载中");
    }
  },
  $hide_loading(msg) {
    Toast.clear(true);
  },
  $alert_dlg(msg, buttonText, closeCallback) {
    Dialog.alert({
      message: msg
    }).then(() => {
      if (closeCallback) closeCallback();
    });
  },
  $confirm_dlg(msg, callback_ok, callback_no) {
    Dialog.confirm({
      message: msg
    })
      .then(
        function() {
          if (callback_ok) callback_ok();
        },
        function() {
          if (callback_no) callback_no();
        }
      )
      .catch(() => {
        callback_no();
      });
  }
};
export default notice;
