<template>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="like-o" to="/sign">报名</van-tabbar-item>
      <van-tabbar-item icon="records" to="/rank">排行榜</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
    </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

