<template>
    <div class="myfooter">
        <van-row>
            <van-col span="12" @click.native="$go('/')">
                <van-icon name="home" />
                <p>首页</p>
            </van-col>
            <van-col span="12">
                <van-icon name="pending-orders" @click.native="checkOrder"/>
                <p>下单</p>                
            </van-col>
        </van-row>
        <div class=" picker " v-if="isShowPick" @click="pick">
            <!-- <div class="picker-content">
                <img src="../../assets/hand.png" alt="">
                <p>采集艾草</p>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
  props: {
    isShowPick: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    pick() {
      this.$emit("pick");
    },
    checkOrder() {
      this.$emit("checkOrder");
    }
  }
};
</script>
<style lang="less" scoped>
.myfooter {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 100;
  background-color: rgb(111, 163, 80);
  border: 1px solid rgb(111, 163, 80);
  color: #fff;
  box-shadow: 0px 1px 1px 0px #fff inset;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  p {
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    font-size: 14px;
    line-height: 1.2em;
  }
  .van-col {
    line-height: 1.6;

    padding: 8px 0;
    .van-icon {
      font-size: 20px;
    }
    p {
      font-size: 14px;
    }
  }
  .picker {
    position: absolute;
    width: 80px;
    height: 80px;
    bottom: 0;
    left: 50%;
    background: transparent url("../../assets/pick.png") no-repeat top left;
    background-size: 100%;
    transform: translate(-50%, -10%);
    z-index: 101;
  }
}
</style>


