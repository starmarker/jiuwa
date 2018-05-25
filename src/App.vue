<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="g-bg"></div>
    <router-view/>
  <van-dialog v-model="show"
    show-cancel-button
    :before-close="beforeClose"
    title="给小灸灸取个名字"
  >
    <van-field
      v-model="petname"
      placeholder="请输入用户名"
    />
  </van-dialog>
  </div>
</template>

<script>
import Bus from "./libs/bus.js";
export default {
  name: "App",
  data() {
    return {
      show: false,
      petname: ""
    };
  },
  methods: {
    beforeClose(action, done) {
      if (action == "confirm") {
        console.log("action :", action);
        Bus.$emit("subname", this.petname);
        this.petname = "";

        done();
      } else {
        this.petname = "";
        done();
      }
    }
  },
  mounted() {
    Bus.$on("showConfirm", e => {
      this.show = true;
    });
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
</style>
