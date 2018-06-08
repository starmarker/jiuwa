<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="g-bg"></div>
    
      <router-view />
  
  <van-dialog v-model="show"
    show-cancel-button
    :before-close="beforeClose"
    :title="title"
  >
    <van-field
      v-model="petname"
      placeholder="给小灸灸取一个名字"
    class="jiujiu" />
  </van-dialog>
  <bindTel v-model="bindTelShow" @bindok="bindok" :showclose="show_close"></bindTel>
  </div>
</template>

<script>
import bindTel from "./components/baseComponents/bindTel";
export default {
  name: "App",
  components: { bindTel },
  data() {
    return {
      show: false,
      petname: "",
      id: "",
      title: "给小灸灸取一个名字",
      bindTelShow: false,
      //是否显示取消按钮
      show_close: false,
      bindok_topath: function() {}
    };
  },
  methods: {
    beforeClose(action, done) {
      if (action == "confirm") {
        done();
        this.$sendEvent("subname", this.petname, this.id);
        this.petname = "";
        // this.$offEvent("subname");
      } else {
        this.petname = "";
        done();
      }
    },
    bindPhone(show_close, topath) {
      console.log("触发了绑定手机号");
      this.bindTelShow = true;
      this.show_close = show_close;
      this.bindok_topath = topath;
    },
    bindok() {
      this.$go(this.bindok_topath);
    }
  },
  mounted() {
    this.$onEvent("showConfirm", (petname, id) => {
      this.show = true;
      if (id) {
        this.title = "给小灸灸换个好听的名字吧";
      }
      this.petname = petname;
      this.id = id;
    });
    this.$onEvent("bindPhone", this.bindPhone);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 50px;
}
.g-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("./assets/app_bg.jpg");
  background-attachment: fixed;
  background-size: 100% 100%;
  z-index: -1;
}
.jiujiu .van-field__control {
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  padding-left: 5px;
}
</style>
