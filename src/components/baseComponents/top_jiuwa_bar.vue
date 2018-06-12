<template>
    <div class="top-info-bar">
        <van-row>
            <van-col span="8">
                <div class="user">
                    <img :src="avatar" alt="">
                    <div class="level">
                      成长值
                      <van-progress :percentage="percentage" color="#db4e56" :show-pivot="false"/>
                    </div>
                    
                </div>
            </van-col>
            <van-col span="9" @click.native="edit(nickname)">
                <div class="info-icon">
                    <img src="../../assets/jiujiu_top_name.png" alt="">
                    <span>{{nickname!=""?nickname:'未命名'}}</span>
                </div>                
            </van-col>
            <van-col span="7">
                <div class="info-icon">
                    <img src="../../assets/jiujiu_top_score.png" alt="">
                    <span>{{basescore}}</span>
                </div>                
            </van-col>
        </van-row>
    </div>
</template>
<script>
export default {
  name: "jiuwa-top-bar",
  props: ["nickname", "basescore", "avatar", "experience", "growthvalue"],
  computed: {
    percentage() {
      let total = Number(this.growthvalue);
      let result =
        this.experience > this.growthvalue
          ? 100
          : (this.experience / total * 100).toFixed(0);
      return ~~result;
    }
  },
  methods: {
    edit(petname) {
      this.$emit("editJiuwa", petname);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/base.less";
.top-info-bar {
  width: 100%;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  .box-shadow(3px,#666);
  .van-row {
    .van-col {
      & > div {
        box-sizing: border-box;
        padding: 5px;
        width: 100%;
        height: 40px;
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
        text-align: left;
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
          box-shadow: 1px -1px 1px #666;
          color: #fff;
          font-size: 14px;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          padding: 5px;
          z-index: 1;
          background-color: rgba(80, 80, 80, 0.2);
        }
        .level {
          position: absolute;
          width: calc(100% - 50px);
          top: 10px;
          right: 0;
          font-size: 12px;
          line-height: 2;
          color: #fff;
        }
      }
      .info-icon {
        padding-left: 32px;
        img {
          width: 40px;
          height: auto;
          left: 0;
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


