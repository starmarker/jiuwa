<template>
  
</template>
<script>
import Bus from "../../libs/bus.js";
export default {
  data() {
    return {
      user_token: "",
      a_token: undefined,
      // is_teacher: true,
      is_signed: false,
      is_hasJiuwa: false,
      // petname: "",
      // show: false
      wxPosition: null,
      a_token: undefined,
      sub: false,
      is_showPage: false,
      wxconfig: {},
      dtd: null,
      initSdkSuccess: false
    };
  },
  async created() {
    this.$show_loading("正在进入活动");
    await this.$cklogin(res => {
      console.log("res :", res);
      if (res != null) {
        this.is_showPage = true;
      }

      this.$hide_loading();
    }, false);

    await this.wxLocation();
  },
  beforeRouteEnter: (to, from, next) => {
    // ...
    document.title = to.meta.title;
    next();
  },
  computed: {
    activity_token() {
      let result = this.getQueryString("token");
      return result;
    },
    inviter_code() {
      let result = this.getQueryString("inviter_code");

      return result;
    },
    user() {
      if (this.$login_info()) {
        return this.$login_info();
      } else {
        return null;
      }
    },
    is_teacher() {
      if (this.$login_info()) {
        return this.$login_info().is_teacher == 1;
      }
      return false;
    },
    // is_teacher() {
    //   let result;
    //   if (this.$login_info()) {
    //     result = this.$login_info()["is_teacher"] == 0;
    //   }
    //   return result;
    // },
    isAlert() {
      let result = sessionStorage.getItem("no_alert");
      return Boolean(result);
    }
  },
  mounted() {
    //this.is_teacher = this.user.is_teacher == 1 ? true : false;
    // console.log(this.$login_info());
  },
  updated() {
    // this.$hide_loading();
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    this.ckRoute(to, from, next);
  },
  methods: {
    getData(name, obj) {
      this.$show_loading("", 0);
      let activity_token = this.activity_token;
      let obj1 = Object.assign({}, obj, {
        activity_token
      });
      return new Promise((resolve, reject) => {
        this.$api({
          name: name,
          params: obj1,
          callback: res => {
            this.$hide_loading();
            if (res.data && res.data.data && res.data.data.code) {
              switch (res.data.data.code) {
                case 888:
                  this.$confirm_dlg(
                    res.data.data.msg,
                    () => {
                      this.showAlert("");
                    },
                    () => {}
                  );

                  break;
                case 999:
                  if (this.$session("no_alert") != 1) {
                    this.$confirm_dlg(
                      res.data.data.msg,
                      () => {
                        this.$go("/sign");
                      },
                      () => {
                        this.$session("no_alert", 1);
                      }
                    );
                  }
                  break;
              }
              this.$hide_loading();
            }
            // if (res.data && res.data.code == 0) {
            //   this.$err(res.data.msg);
            // }
            resolve(res);
          },
          errcallback: rej => {
            if (rej.data.code == "555") {
              // window.location.href = rej.data.url;
              this.$alert_dlg(rej.data.msg, "", () => {
                window.location = rej.data.url;
              });
            }
            reject(rej);
            this.$hide_loading();
          },
          catchcallback: rej => {
            reject(rej);
            this.$hide_loading();
          }
        });
      });
    },
    setJiuwa() {
      this.$onEvent("subname", (resultname, id) => {
        this.petname = resultname;
        if (!this.sub) {
          this.getJiuwa(this.petname, id);
        }
      });
    },
    async getLocation() {
      let position = {};

      this.wxLocation();
      return new Promise((resolve, reject) => {
        if (this.wxPosition != null) {
          resolve(this.wxPosition);
        } else {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              function(p) {
                position = {
                  latitude: p.coords.latitude,
                  longitude: p.coords.longitude
                };
                resolve(position);
              },
              function(e) {
                var msg = e.code + "\n" + e.message;
                reject(e.message);
              }
            );
          } else {
            reject("硬件不支持");
          }
        }
      });
    },
    back() {
      this.$router.back();
    },
    test() {
      return new Promise((resolve, reject) => {
        this.$cklogin(data => {
          // this.$go("/");
          resolve(data);
        }, false);
      });
    },

    isTeacher() {},
    isHasJiuwa() {
      let module_token = this.$api_urls["isHasJiuwa"];
      return new Promise((resolve, reject) => {
        this.getData("com_manage", { module_token }).then(res => {
          this.is_hasJiuwa = res.data;
          // Bus.$emit("isHasJiuwa", res.data);
          //Bus.$emit("isSigned", this.is_signed);
          //Bus.$emit("isTeacher", this.is_teacher);
          resolve(res.data);
        });
      });
    },
    isSigned() {
      let module_token = this.$api_urls["is_signed"];
      return new Promise((resolve, reject) => {
        this.getData("com_manage", { module_token }).then(res => {
          this.is_signed = res.data;
          this.$sendEvent("isSigned", res.data);
          resolve(res.data);
        });
      });
    },
    ckRoute(to, from, next) {
      const _this_v = this;
      if (to.meta && to.meta.ck_bind_phone && to.meta.ck_bind_phone === true) {
        _this_v.$ckBindPhone(next);
      } else {
        next();
      }
    },
    async getJiuwa(name, id) {
      if (this.sub) return false;
      this.sub = true;
      let position = {};
      let jiujiu_id = id;
      await this.getLocation()
        .then(res => {
          position = res;
        })
        .catch(() => {
          position = {
            longitude: "104.0678322315",
            latitude: "30.5465175160"
          };
        });
      let j_msg = "领养小灸灸成功，你可以采集艾草让小灸灸成长咯";
      let user_type = 0,
        module_token = this.$api_urls["getJiuwa"],
        inviter_token = this.inviter_token,
        petname = this.petname;
      if (id) {
        module_token = this.$api_urls["editJiuwa"];
        j_msg = "修改小灸灸昵称成功";
      }
      if (petname.trim() == "" || petname.length > 6) {
        this.$alert_dlg("小灸灸名字长度应介于1-6之间");
        this.$offEvent("subname", null);
        this.showAlert(petname);
        this.setJiuwa();
        this.sub = false;
        return false;
      }
      let obj = Object.assign(
        {},
        {
          user_type,
          module_token,
          inviter_token,
          petname,
          id
        },
        position
      );
      this.getData("com_manage", obj)
        .then(res => {
          if (res.data.code == 1) {
            this.$alert_dlg(j_msg, "", () => {
              this.petname = "";
              this.$sendEvent("reload");
              this.$go("/jiuwa");
            });
          } else {
            this.$err(res.data.msg);
          }
          this.sub = false;
        })
        .catch(rej => {
          this.$err("领养失败,原因未知");
          this.sub = false;
        });
    },
    showAlert(petname, id) {
      // this.show = true;
      this.$sendEvent("showConfirm", petname, id);
    },
    wxLocation() {
      // const _this = this;
      // return new Promise((resolve, reject) => {
      //   wx.getLocation({
      //     type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //     success: function(res) {
      //       let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //       let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //       _this.wxPosition = { latitude, longitude };
      //       resolve(position);
      //     },
      //     cancel: function(rej) {
      //       reject(rej);
      //     },
      //     fail: function(err) {
      //       reject(err);
      //     }
      //   });
      // });
    },
    getWxConfig(page_name) {
      // let token = this.activity_token;
      // let module_token = this.$api_urls["wxconfig"];
      // this.getData("com_manage", {
      //   module_token,
      //   page_name,
      //   token,
      //   isdebug: false,
      //   wx_token
      // }).then(res => {
      //   if (res.code == 1) {
      //     let config = res.data.jssdk;
      //     console.log("success");
      //     // wx.config({ ...config });
      //     // wx.ready(() => {
      //     //   this.wxLocation();
      //     // });
      //   }
      // });
    }
  }
};
</script>

