<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="g-bg"></div>
    <router-view/>
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
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      show: false,
      petname: "",
      id: "",
      title: "给小灸灸取一个名字"
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
