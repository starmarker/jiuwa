<template>
  
</template>
<script>
export default {
  data() {
    return {
      user_token: "",
      is_teacher: true,
      is_signed: false,
      is_hasJiuwa: false
    };
  },
  async created() {
    if (!this.user) {
      await this.getuser();
    }
    await this.isTeacher();
    await this.isHasJiuwa();
    await this.isSigned();
  },
  beforeRouteEnter: (to, from, next) => {
    // ...
    document.title = to.meta.title;
    next();
  },
  computed: {
    user() {
      return this.$login_info();
    }
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
                lat: p.coords.latitude,
                lng: p.coords.longitude
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
          resolve(res.data);
        });
      });
    },
    isHasJiuwa() {
      let module_token = this.$api_urls["isHasJiuwa"];
      return new Promise((resolve, reject) => {
        this.getData("com_manage", { module_token }).then(res => {
          this.is_hasJiuwa = res.data;
          resolve(res.data);
        });
      });
    },
    isSigned() {
      let module_token = this.$api_urls["is_signed"];
      return new Promise((resolve, reject) => {
        this.getData("com_manage", { module_token }).then(res => {
          this.is_signed = res.data;
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
    getStatus() {
      this.isTeacher();
      this.isHasJiuwa();
      this.isSigned();
    }
  }
};
</script>

