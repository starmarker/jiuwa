<template>
    <div class="process">
        <!-- <van-steps direction="vertical" :active="1" active-color="#f60">
            <van-step>
               
                <p>领取小灸灸</p>
            </van-step>
            <van-step>            
                <p>采摘艾草</p>
            </van-step>
        </van-steps> -->
        <router-link to="/detail">查看详情 <van-icon name="arrow" size="14px" /></router-link>
        <!-- <a href="">查看详情</a> -->
    </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.process {
  background-color: #fff;
  position: relative;
  padding-bottom: 30px;
  .van-step--vertical {
    padding: 2px 10px 2px 0;
  }
  a {
    font-size: 14px;
    color: #ca0e33;
    line-height: 20px;
    position: absolute;
    bottom: 5px;
    right: 10px;
    i {
      font-size: 12px;
      vertical-align: baseline;
    }
  }
}
</style>