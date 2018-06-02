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
      sub: false
    };
  },
  async created() {
    // if (!this.user) {
    //   if (this.$getBrowserType() == "weixin") {
    //     this.$weixin_login(() => {});
    //   } else {
    //   }
    // }
    this.$cklogin(() => {
      // await this.getuser();
    }, false);
    // await this.isTeacher();
    // await this.isHasJiuwa();
    // await this.isSigned();
    await this.checkUser();
    await this.wxLocation();
  },
  beforeRouteEnter: (to, from, next) => {
    // ...
    document.title = to.meta.title;
    next();
  },
  computed: {
    activity_token() {
      let result;
      if (this.$route.query.activity_token) {
        result = this.$route.query.activity_token;
        window.sessionStorage.setItem(
          "activity_token",
          this.$route.query.activity_token
        );
      } else if (
        this.$login_info() != null &&
        sessionStorage.getItem("activity_token")
      ) {
        result = sessionStorage.getItem("activity_token");
      } else {
        result = "263764d167ee33343036fb1510a58503";
      }
      return result;
    },
    inviter_code() {
      return (
        this.$route.query.inviter_code || "33359507b753485b6f47490383a47aa8"
      );
    },
    user() {
      return this.$login_info();
    },
    is_teacher() {
      return Boolean(this.$login_info().is_teacher);
    },
    isAlert() {
      let result = sessionStorage.getItem("no_alert");
      return Boolean(result);
    }
  },
  mounted() {
    Bus.$on("subname", (resultname, id) => {
      this.petname = resultname;
      this.getJiuwa(this.petname, id);
    });

    //this.is_teacher = this.user.is_teacher == 1 ? true : false;
    // console.log(this.$login_info());
  },
  updated() {
    this.$hide_loading();
  },
  methods: {
    getData(name, obj) {
      this.$show_loading();
      let activity_token = this.activity_token;
      let obj1 = Object.assign({}, obj, {
        activity_token
      });
      return new Promise((resolve, reject) => {
        this.$api({
          name: name,
          params: obj1,
          callback: res => {
            resolve(res);
            this.$hide_loading();
          },
          errcallback: rej => {
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
    getLocation() {
      let position = {};
      return new Promise((resolve, reject) => {
        if (this.wxPosition) {
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

    isTeacher() {
      // let module_token = this.$api_urls["is_teacher"];
      // return new Promise((resolve, reject) => {
      //   this.getData("com_manage", { module_token }).then(res => {
      //     this.is_teacher = res.data;
      //     Bus.$emit("isTeacher", this.is_teacher);
      //     resolve(res.data);
      //   });
      // });
    },
    isHasJiuwa() {
      let module_token = this.$api_urls["isHasJiuwa"];
      return new Promise((resolve, reject) => {
        this.getData("com_manage", { module_token }).then(res => {
          this.is_hasJiuwa = res.data;
          Bus.$emit("isHasJiuwa", this.is_hasJiuwa);
          Bus.$emit("isSigned", this.is_signed);
          Bus.$emit("isTeacher", this.is_teacher);
          resolve(res.data);
        });
      });
    },
    isSigned() {
      let module_token = this.$api_urls["is_signed"];
      return new Promise((resolve, reject) => {
        this.getData("com_manage", { module_token }).then(res => {
          Bus.$emit("isHasJiuwa", this.is_hasJiuwa);
          Bus.$emit("isSigned", this.is_signed);
          Bus.$emit("isTeacher", this.is_teacher);
          this.is_signed = res.data;
          resolve(res.data);
        });
      });
    },
    async getuser() {
      //let user_token;
      await this.test();

      //this.user_token = this.$login_info()["user_token"];
      // this.is_teacher = await this.isTeacher();
      // console.log("user_token :", this.user_token);
    },
    async getStatus() {
      // await this.isTeacher();
      if (!this.is_teacher) {
        await this.isHasJiuwa();
      } else {
        await this.isSigned();
      }
    },
    async checkUser() {
      // this.user = this.$login_info();

      await this.getStatus();
      console.log(this.is_teacher, this.is_signed, this.is_hasJiuwa);
      if (this.is_teacher && !this.is_signed && !this.no_alert) {
        this.$confirm_dlg(
          "灸疗师" + this.user.nick_name + ",你还未报名参赛，是否报名参加活动",
          () => {
            this.$go("/sign");
          },
          () => {
            console.log("不参加活动");
            sessionStorage.setItem("no_alert", true);
          }
        );
      }
      if (!this.is_teacher && !this.is_hasJiuwa) {
        this.$confirm_dlg(
          this.user.nick_name + ",你还未领取小灸灸，是否领取",
          () => {
            // this.show = true;
            this.showAlert();
            //this.getJiuwa(inviter_token);
          },
          () => {
            console.log("不领取");
          }
        );
      }
    },
    async getJiuwa(name, id) {
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
        this.showAlert("");
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
      if (this.sub) return false;
      this.sub = true;
      this.getData("com_manage", obj)
        .then(res => {
          if (res.data.code == 1) {
            this.$alert_dlg(j_msg, "", () => {
              this.petname = "";
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
      Bus.$emit("showConfirm", petname, id);
    },
    wxLocation() {
      return new Promise((resolve, reject) => {
        wx.getLocation({
          type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function(res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            this.wxPosition = { latitude, longitude };
            resolve(position);
          },
          cancel: function(rej) {
            reject(rej);
          },
          fail: function(err) {
            reject(err);
          }
        });
      });
    }
  }
};
</script>

