<template>
    <div class="main">
        <div class="sign-header">
          <van-row>
              <van-col span="8">
                  <img :src="userInfo.userfeil.avatar_src" alt="">
              </van-col>
              <van-col span="16">
                  <div class="user-info">
                      <p>姓名：{{userInfo.userfeil.nickname}}</p>
                      <p>店铺:高新直营店</p>
                      <p v-if="userInfo.user_token==user.user_token && is_teacher">[ <router-link :to="'/sign/'+userInfo.user_token" >点击修改</router-link>]</p>
                  </div>
              </van-col>
              <van-button size="small" type="primary" @click="isShowMore=true">查看更多信息</van-button>
          </van-row>
        </div>
        <van-panel title="我的队友" desc="" status="" style="text-align:left;">
            <div class="panel-content">
                <teamMember :members="teamWorker"/>
            </div>
        </van-panel>
        <van-panel title="艾草地" desc="" status="" style="text-align:left;">
            <div class="panel-content" style="text-align:center">
                <img :src="userInfo.userfeil" alt="" srcset="" @click="pick">
            </div>
        </van-panel> 
        <van-popup position="right" v-model="isShowMore" style="width:100vw;" :modal="false">
          <more-info :moreInfo="userInfo" :teamWorker="teamWorker" :showEdit="userInfo.user_token==user.user_token" @click-pick="pick"></more-info>
        </van-popup>
        <myFooter @pick="pick" :isShowPick="!this.is_teacher"/>
    </div>
</template>
<script>
import Base from "./baseComponents/base";
import teamMember from "./baseComponents/teamMember";
import MoreInfo from "./moreInfo";
import myFooter from "./baseComponents/myFooter";
export default {
  extends: Base,
  components: {
    teamMember,
    MoreInfo,
    myFooter
  },
  data() {
    return {
      teamWorker: [],
      isShowMore: false,
      userInfo: {
        userfeil: {
          avatar_src: "",
          nickname: ""
        }
      }
    };
  },
  async created() {
    await this.isTeacher();
    this.getInfo();

    // this.getTeamWorker();
  },
  methods: {
    pick() {
      let module_token = this.$api_urls["pick"];
      let moxibustion_token = this.$route.params.token;
      let plucking_type = 0;
      this.getData("com_manage", {
        module_token,
        moxibustion_token,
        plucking_type
      })
        .then(res => {
          if (res.data) {
            this.$suc("采摘成功");
          } else {
            this.$err("采摘失败");
          }
        })
        .catch(rej => {
          this.$err(rej.msg);
        });
    },
    getTeamWorker() {
      this.$http.post("/api/rank", {}).then(res => {
        this.teamWorker = res.data.aicao;
      });
    },
    getInfo() {
      let user_token = this.$route.params.token;
      let module_token = user_token
        ? this.$api_urls["t_info"]
        : this.$api_urls["myinfo"];

      this.getData("com_manage", { module_token, user_token }).then(res => {
        this.userInfo = res.data;
        //console.log("res :", res.data);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  overflow-y: auto;
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
      font-size: 3.4vw;
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


