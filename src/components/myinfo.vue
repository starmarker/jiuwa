<template>
    <div class="main">
        <div class="sign-header">
          <van-row>
              <van-col span="8">
                  <img :src="user.avatar_src" alt="">
              </van-col>
              <van-col span="16">
                  <div class="user-info">
                      <p>姓名：{{user.user_nickname}}</p>
                      <p>[ <router-link to="/sign">点击修改</router-link>]</p>
                  </div>
              </van-col>
          </van-row>
          <van-row class="info-detail">
              <van-col span="6"><p>编号<br><small>5</small></p></van-col>
              <van-col span="6"><p>采摘成绩<br><small>5</small></p></van-col>
              <van-col span="6"><p>下单成绩<br><small>5</small></p></van-col>
              <van-col span="6"><p>总成绩<br><small>5</small></p></van-col>
          </van-row>
        </div>
        <van-panel title="当前排名" desc="" status="2" style="text-align:left;">
            <div style="box-sizing:border-box;width:100%;padding:5px 15px;">距离上一名还差50分</div>
        </van-panel>
        <van-panel title="艾草地" desc="" status="" style="text-align:left;">
            <div style="box-sizing:border-box;width:100%;padding:5px 15px;text-align:center">
                <img :src="user.avatar_src" alt="" srcset="" @click="pick">
            </div>
        </van-panel>    
    </div>
</template>
<script>
import Base from "./baseComponents/base";
export default {
  extends: Base,
  data() {
    return {};
  },
  methods: {
    pick() {}
  }
};
</script>
<style lang="less" scoped>
.main {
  .sign-header {
    width: 100%;
    box-sizing: border-box;
    padding: 5vw 2vw;
    background-image: linear-gradient(to right, orange, orangered);
    img {
      width: 80%;
      border-radius: 50%;
    }
    .user-info {
      text-align: left;
      font-size: 4vw;
      height: 26vw;
      display: flex;
      flex-direction: column;
      p,
      a {
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        line-height: 3em;
        flex-grow: 1;
        color: #fff;
      }
    }
    .info-detail {
      color: #fff;
      font-size: 4.5vw;
      small {
        font-size: 0.8em;
      }
    }
  }
}
</style>


