<template>
    <van-row>
        <van-col :span="8" class="van-hairline--top van-hairline--right">
            <p class="col-title">参赛人数</p>
            <p class="col-detail">{{teachernumber}}</p>
        </van-col>
        <van-col :span="8" class="van-hairline--top van-hairline--right">
            <p class="col-title">采摘艾草</p>
            <p class="col-detail">{{picktotal}}</p>
        </van-col>
        <van-col :span="8" class="van-hairline--top">
            <p class="col-title">参与人数</p>
            <p class="col-detail">{{gamertotal}}</p>
        </van-col>
    </van-row>
</template>
<script>
export default {
  props: [, "teachernumber", "picktotal", "gamertotal"],
  computed: {}
};
</script>
<style lang="less" scoped>
[class*="van-hairline"]::after {
  border-color: #fff;
}
.van-row {
  background-color: rgba(255, 255, 255, 0.5);
  .van-col {
    p {
      font-size: 14px;
      color: #a52726;
    }
    .col-detail {
      font-size: 16px;
      color: #ca0e33;
      font-weight: 700;
    }
  }
}
</style>