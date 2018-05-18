<template>
    <div class="main">
      <div class="main-body">
        <div class="sign-header">
          <van-row>
              <van-col span="8">
                  <img :src="moreInfo.userfeil.avatar_src" alt="">
              </van-col>
              <van-col span="16">
                  <div class="user-info">
                      <p>姓名：{{moreInfo.userfeil.nickname}}</p>
                      <p>店铺:高新直营店</p>
                      <p v-if="showEdit">[ <router-link :to="'/sign/'+moreInfo.user_token">点击修改</router-link>]</p>
                  </div>
              </van-col>
          </van-row>
        </div>
        <van-panel title="我的队友" desc="" status="" style="text-align:left;">
            <div class="panel-content">
                <teamMember :members="teamWorker"/>
            </div>
        </van-panel>
        <van-panel title="个人介绍" desc="" status="" style="text-align:left;">
            <div class="panel-content">
                <p>个人介绍内容</p>
            </div>
        </van-panel>   
        <van-panel title="参赛照片" desc="" status="" style="text-align:left;">
            <div class="panel-content" style="text-align:center">
                <img :src="moreInfo.liliao_image_src" alt="" srcset="">
            </div>
        </van-panel>
      </div>
 
      <myFooter @pick="pick"/>
    </div>  
</template>
<script>
import teamMember from "./baseComponents/teamMember";
import myFooter from "./baseComponents/myFooter";
// import Base from "./baseComponents/base";
export default {
  props: ["moreInfo", "teamWorker", "showEdit"],
  // extends: Base,
  components: {
    teamMember,
    myFooter
  },
  methods: {
    pick() {
      this.$emit("click-pick");
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  height: 100vh;
  position: relative;
  .main-body {
    overflow: hidden;
    position: relative;
    margin-bottom: 50px;
  }
  .sign-header {
    width: 100%;
    box-sizing: border-box;
    padding: 2vw;
    position: relative;
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
        flex-grow: 1;
        color: #fff;
      }
    }
    .van-button {
      position: absolute;
      top: 10vw;
      right: 1vw;
    }
    .info-detail {
      color: #fff;
      font-size: 4.5vw;
      small {
        font-size: 0.8em;
      }
    }
  }
  .panel-content {
    box-sizing: border-box;
    width: 100%;
    padding: 5px 15px;
    img {
      max-width: 90%;
    }
  }
}
</style>
