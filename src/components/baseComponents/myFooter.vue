<template>
    <div class="myfooter van-hairline--top">
        <van-row>
            <van-col span="12">
                <van-icon name="home" />
                <p>首页</p>
            </van-col>
            <van-col span="12">
                <van-icon name="pending-orders" />
                <p>订单</p>                
            </van-col>
        </van-row>
        <div class=" picker ">
            <div class="picker-content">
                <img src="../../assets/hand.png" alt="">
                <p>采集艾草</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.myfooter {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 100;
  p {
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    font-size: 14px;
    line-height: 1.2em;
  }
  .van-col {
    line-height: 24px;
    padding: 5px 0;
  }
  .picker {
    position: absolute;
    width: 20vw;
    height: 20vw;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -10%);
    border-radius: 50% !important;
    border: solid 1px #ccc;
    z-index: 101;
    background-color: #fff;
    .picker-content {
      width: calc(20vw - 6px);
      height: calc(20vw - 6px);
      position: relative;
      top: 3px;
      left: 3px;
      background-color: rgb(168, 44, 44);
      text-align: center;
      border-radius: 50%;
      img {
        width: 60%;
      }
      p {
        color: #fff;
      }
    }
  }
}
</style>


