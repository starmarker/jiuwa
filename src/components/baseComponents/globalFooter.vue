<template>
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item icon="wap-home" to="/index">首页</van-tabbar-item>
      <van-tabbar-item to="/rank">
      <i class="iconfont icon-paihang" slot="icon"></i>
      排行榜</van-tabbar-item>
      <van-tabbar-item to="/sign" v-if="teacher && !isact">
      <i class="iconfont icon-edit-2" slot="icon"></i>
      报名</van-tabbar-item>
      <van-tabbar-item icon="contact" :to="user_center" v-else>我的</van-tabbar-item>
    </van-tabbar>
</template>
<script>
export default {
  props: {
    teacher: {
      type: Boolean
    },
    isact: {
      type: Boolean,
      default: true
    }
  },
  data() {},
  mounted() {
    console.log(this.$props);
    // this.$emit("input", this.actived);
    this.setActive();
  },
  computed: {
    user_center() {
      let result = this.teacher ? "/pick" : "/jiuwa";
      return result;
    },
    arrList() {
      this.teacher;
    }
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    change(index) {},
    setActive() {
      let arr = ["index", "rank", "sign"];
      let cname = this.$route.name;
      let result = arr.indexOf(cname);
      this.active = result > -1 ? result : 0;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/iconfont.css";
.van-tabbar-item--active {
  background-color: rgba(159, 194, 138, 0.8);
  color: #fff;
}
.van-tabbar-item {
  .van-tabbar-item__icon {
    font-size: 32px;
  }
}
</style>


