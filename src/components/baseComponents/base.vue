<template>
  
</template>
<script>
import Bus from "../../libs/bus.js";
export default {
  data() {
    return {
      user_token: "",
      is_teacher: true,
      is_signed: false,
      is_hasJiuwa: false
      // petname: "",
      // show: false
    };
  },
  async created() {
    if (!this.user) {
      await this.getuser();
    }
    // await this.isTeacher();
    // await this.isHasJiuwa();
    // await this.isSigned();
    await this.checkUser();
  },
  beforeRouteEnter: (to, from, next) => {
    // ...
    document.title = to.meta.title;
    next();
  },
  computed: {
    user() {
      return this.$login_info();
    },
    inviter_code() {
      return (
        this.$route.query.inviter_code || "33359507b753485b6f47490383a47aa8"
      );
    }
  },
  mounted() {
    Bus.$on("subname", resultname => {
      this.petname = resultname;
      this.getJiuwa();
    });
  },
  methods: {
    getData(name, obj) {
      return new Promise((resolve, reject) => {
        this.$api({
          name: name,
          params: obj,
          callback: res => {
            resolve(res);
          },
          errcallback: rej => {
            reject(rej);
          },
          catchcallback: rej => {
            reject(rej);
          }
        });
      });
    },
    getLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function(p) {
              let position = {
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
      });
    },
    back() {
      this.$router.back();
    },
    test() {
      return new Promise((resolve, reject) => {
        this.$ckServiceLogin(res => {
          resolve(res);
        });
      });
    },

    isTeacher() {
      let module_token = this.$api_urls["is_teacher"];
      return new Promise((resolve, reject) => {
        this.getData("com_manage", { module_token }).then(res => {
          this.is_teacher = res.data;
          Bus.$emit("isTeacher", this.is_teacher);
          resolve(res.data);
        });
      });
    },
    isHasJiuwa() {
      let module_token = this.$api_urls["isHasJiuwa"];
      return new Promise((resolve, reject) => {
        this.getData("com_manage", { module_token }).then(res => {
          this.is_hasJiuwa = res.data;
          Bus.$emit("isHasJiuwa", this.is_hasJiuwa);
          resolve(res.data);
        });
      });
    },
    isSigned() {
      let module_token = this.$api_urls["is_signed"];
      return new Promise((resolve, reject) => {
        this.getData("com_manage", { module_token }).then(res => {
          this.is_signed = res.data;
          Bus.$emit("isSigned", this.is_signed);
          resolve(res.data);
        });
      });
    },
    async getuser() {
      //let user_token;
      this.user_token = await this.test();
      //this.user_token = this.$login_info()["user_token"];
      this.is_teacher = await this.isTeacher();
      console.log("user_token :", this.user_token);
    },
    async getStatus() {
      await this.isTeacher();
      await this.isHasJiuwa();
      await this.isSigned();
    },
    async checkUser() {
      // this.user = this.$login_info();

      await this.getStatus();
      console.log(this.is_teacher, this.is_signed, this.is_hasJiuwa);
      if (this.is_teacher && !this.is_signed) {
        this.$confirm_dlg(
          "灸疗师" + this.user.nick_name + ",你还未报名参赛，是否报名参加活动",
          () => {
            this.$go("/sign");
          },
          () => {
            console.log("不参加活动");
          }
        );
      }
      if (!this.is_teacher && !this.is_hasJiuwa) {
        this.$confirm_dlg(
          "顾客" + this.user.nick_name + ",你还未领取小灸灸，是否领取",
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
    async getJiuwa() {
      let position = {};
      await this.getLocation()
        .then(res => {
          position = res;
        })
        .catch(() => {
          postion = {
            longitude: "104.0678322315",
            latitude: "30.5465175160"
          };
        });
      let user_type = 0,
        module_token = this.$api_urls["getJiuwa"],
        inviter_token =
          this.inviter_token || "33359507b753485b6f47490383a47aa8",
        petname = this.petname;
      if (petname.trim() == "" || petname.length > 7) {
        this.$alert_dlg("小灸灸名字长度应介于1-7之间");
        return false;
      }
      let obj = Object.assign(
        {},
        {
          user_type,
          module_token,
          inviter_token,
          petname
        },
        position
      );
      this.getData("com_manage", obj).then(res => {
        if (res.data) {
          this.$alert_dlg(
            "领养小灸灸成功，你可以采集艾草让小灸灸成长咯",
            "",
            () => {
              this.petname = "";
            }
          );
        } else {
          this.$err("领取失败");
        }
      });
    },
    showAlert() {
      // this.show = true;
      Bus.$emit("showConfirm");
    }
  }
};
</script>

