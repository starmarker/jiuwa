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
              <van-button size="small" type="primary">查看更多信息</van-button>
          </van-row>
        </div>
        <van-panel title="我的队友" desc="" status="" style="text-align:left;">
            <div class="panel-content">
                <teamMember :members="teamWorker"/>
            </div>
        </van-panel>
        <van-panel title="艾草地" desc="" status="" style="text-align:left;">
            <div class="panel-content" style="text-align:center">
                <img :src="user.avatar_src" alt="" srcset="" @click="pick">
            </div>
        </van-panel> 
        <van-panel title="个人介绍" desc="" status="" style="text-align:left;">
            <div class="panel-content">
                <p>个人介绍内容</p>
            </div>
        </van-panel>   
        <van-panel title="参赛照片" desc="" status="" style="text-align:left;">
            <div class="panel-content" style="text-align:center">
                <img :src="user.avatar_src" alt="" srcset="" @click="pick">
            </div>
        </van-panel> 
    </div>
</template>
<script>
import Base from "./baseComponents/base";
import teamMember from "./baseComponents/teamMember";
export default {
  extends: Base,
  components: {
    teamMember
  },
  data() {
    return {
      teamWorker: []
    };
  },
  created() {
    this.getTeamWorker();
  },
  methods: {
    pick() {},
    getTeamWorker() {
      this.$http.post("/api/mutepuly", {}).then(res => {
        this.teamWorker = res.data.lists;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.main {
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


