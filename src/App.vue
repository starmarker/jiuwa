<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  <van-dialog v-model="show"
    show-cancel-button
    :before-close="beforeClose"
  >
    <van-field
      v-model="petname"
      label="用户名"
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
  margin-bottom: 60px;
}
</style>
