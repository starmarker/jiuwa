<template>
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="like-o" to="/sign">报名</van-tabbar-item>
      <van-tabbar-item icon="records" to="/rank">排行榜</van-tabbar-item>
      <van-tabbar-item icon="contact" :to="user_center">我的</van-tabbar-item>
    </van-tabbar>
</template>
<script>
export default {
  props: {
    teacher: {
      type: Boolean,
      default: false
    },
    actived: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    console.log(this.$props);
    // this.$emit("input", this.actived);
  },
  computed: {
    user_center() {
      let result = this.teacher ? "/my" : "/jiuwa";
      return result;
    },
    active: {
      set() {
        return this.actived;
      },
      get() {
        return this.actived;
      }
    }
  },
  data() {
    return {
      //active: 0
    };
  },
  methods: {
    change(index) {
      //this.active = index;
    }
  }
};
</script>

