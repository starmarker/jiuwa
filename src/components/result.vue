<template>
  <div class="main">
      <div class="container">
          <div class="icons" :class="resultClass">
            <van-icon name="checked" v-if="type=='success'"/>
            <van-icon name="clear" v-if="type=='fail'"/>
          </div>

          <p>{{show_info}}</p>
      </div>
      <van-tabbar>
            <van-tabbar-item icon="home" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="edit-data" @click="back">上一步</van-tabbar-item>
      </van-tabbar> 
  </div>
</template>
<script>
export default {
  name: "result",
  props: ["type"],
  computed: {
    show_info() {
      return this.type == "success" ? "提交成功" : "提交失败";
    },
    resultClass() {
      return this.type == "success" ? "success" : "fail";
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  position: relative;
  .container {
    position: absolute;
    top: 50%;
    left: 0%;
    width: 100%;
    transform: translateY(-50%);
    text-align: center;
    .icons {
      font-size: 20vw;
    }
    .success {
      color: #4b0;
    }
    .fail {
      color: #f44;
    }
  }
}
</style>

