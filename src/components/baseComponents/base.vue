<template>
  
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    // if (!this.user) {
    //   this.getuser();
    // }
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
    getuser() {
      this.$http.post("/api/getuser", {}).then(res => {
        // this.user = res.data;
        this.$login_info(res.data);
      });
    }
  }
};
</script>

