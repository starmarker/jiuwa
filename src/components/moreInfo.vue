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
                      <p>店铺:高新直营店</p>
                      <p>[ <router-link to="/sign">点击修改</router-link>]</p>
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
                <img :src="user.avatar_src" alt="" srcset="">
            </div>
        </van-panel> 
        <myFooter />
    </div>  
</template>
<script>
import teamMember from "./baseComponents/teamMember";
import myFooter from "./baseComponents/myFooter";
export default {
  props: ["user", "teamWorker"],
  components: {
    teamMember,
    myFooter
  }
};
</script>
<style lang="less" scoped>
.main {
  height: 100vh;
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
  }
}
</style>
