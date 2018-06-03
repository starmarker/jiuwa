<template>
    <div class="top-info-bar">
        <van-row>
            <van-col span="10">
                <div class="user" @click="clickUser">
                    <img :src="avatar" alt="">
                    <span>{{nickname}}</span>
                </div>
            </van-col>
            <van-col span="9">
                <div class="info-icon">
                    <img src="../../assets/top_info_score.png" alt="">
                    <span>{{basescore}}</span>
                </div>                
            </van-col>
            <van-col span="5">
                <div class="info-icon">
                    <img src="../../assets/top_info_rank.png" alt="">
                    <span style="color:red;">{{rank}}</span>
                </div>                
            </van-col>
        </van-row>
    </div>
</template>
<script>
export default {
  name: "info-top-bar",
  props: ["nickname", "basescore", "rank", "avatar"],
  methods: {
    clickUser() {
      this.$emit("clickuser");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/base.less";
.top-info-bar {
  width: 100%;
  height: 60px;
  background-color: rgba(64, 157, 164, 0.8);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  .box-shadow(3px,#666);
  .van-row {
    .van-col {
      & > div {
        box-sizing: border-box;
        padding: 5px;
        width: 100%;
        height: 50px;
        line-height: 40px;
        //   background-size: 30px 30px;
        //   background-repeat: no-repeat;
        //   padding-left: 35px;
        //   background-position: 5px 5px;
      }
      .user,
      .info-icon {
        position: relative;
        padding-left: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: clip;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
          position: absolute;
          top: 5px;
          left: 5px;
          z-index: 2;
        }
        span {
          //   .box-shadow(-2px);
          box-shadow: 0px -1px 1px #666;
          color: #fff;
          font-size: 14px;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          padding: 5px;
          z-index: 1;
          background-color: rgba(255, 255, 255, 0.5);
        }
      }
      .info-icon {
        padding-left: 25px;
        img {
          width: 35px;
          height: auto;
          border-radius: 0;
        }
        span {
          padding: 5px 12px;
        }
      }
    }
  }
}
</style>


