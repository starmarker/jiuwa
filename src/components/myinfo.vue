<template>
    <div class="main">
      <div class="info-pic1"></div>
      <div class="info-pic2"></div>
      <div class="info-pic3"></div>
      <div class="info-pic4"></div>
      <info-top-bar :nickname="userInfo.userfeil.nickname" :avatar="userInfo.userfeil.avatar_src" :basescore="userInfo.basescore" :rank="userInfo.paiming"  @clickuser="godetail" class="topbar"/>
        <!-- <div class="sign-header">
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
        </div> -->
        <!-- <van-panel title="我的队友" desc="" status="" style="text-align:left;">
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
        <myFooter @pick="pick" :isShowPick="!this.is_teacher"/> -->
        <router-link to="/" class="backhome">        
        </router-link>
        <div class="pick" @click="pick" v-if="!is_teacher"></div>
        <div class="calc" @click="calc" v-if="is_teacher && isSelf "></div>
        <!-- 默认小灸灸记录 -->
      <van-popup v-model="showneed" :close-on-click-overlay="true" :overlay-style="{height:'100vh'}" :lock-scroll="false" class="help-div">
        <van-nav-bar title="您附近的灸疗师" />
        <HelpList :list="need_list" :finished="need_finish" :loading="need_loading" @loadmore="getNeedList" @rqhelp="helpJiuwa"></HelpList>        
      </van-popup>
    </div>
</template>
<script>
import Base from "./baseComponents/base";
import teamMember from "./baseComponents/teamMember";
import MoreInfo from "./moreInfo";
import InfoTopBar from "./baseComponents/top_info_bar";
import HelpList from "./baseComponents/helplist";
// import myFooter from "./baseComponents/myFooter";
export default {
  extends: Base,
  components: {
    teamMember,
    MoreInfo,
    HelpList,
    InfoTopBar
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
      },
      isFirst: true,
      need_list: [],
      cur_need_page: 1,
      need_finish: true,
      need_loading: false,
      showneed: false
    };
  },
  computed: {
    isSelf: {
      get: function() {
        return this.userInfo.user_token == this.user.user_token;
      },
      set: function(value) {
        // this.showneed = value;
      }
    }
  },
  async created() {
    await this.isTeacher();
    await this.getInfo();

    // this.getTeamWorker();
  },
  mounted() {
    this.calc();
  },
  beforeUpdate() {
    if (this.isFirst && this.isSelf) {
      this.showneed = true;
      this.isFirst = false;
    }
  },
  methods: {
    pick() {
      let module_token = this.$api_urls["pick"];
      let moxibustion_token = this.$route.params.token;
      let plucking_type = 1;
      this.getData("com_manage", {
        module_token,
        moxibustion_token,
        plucking_type
      })
        .then(res => {
          if (res.data) {
            this.$suc("采摘成功");
          } else {
            this.$err("采集失败,5小时后才能采集");
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
    },
    godetail() {
      let user_token = this.$route.params.user_token || "";
      this.$go("/my/" + user_token);
    },
    calc() {
      if (this.isSelf) {
        this.showneed = true;
      } else {
        this.showneed = false;
      }
    },
    getNeedList() {},
    helpJiuwa() {}
  }
};
</script>
<style lang="less" scoped>
.main {
  // overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  text-align: left;
  .info-pic1,
  .info-pic2,
  .info-pic3,
  .info-pic4 {
    position: fixed;
    width: 50%;
    height: 50vh;
    top: 0;
    left: 0;
    background-image: url("../assets/home_01.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .info-pic2 {
    left: 50%;
    background-image: url("../assets/home_02.jpg");
  }
  .info-pic3 {
    top: 50vh;
    background-image: url("../assets/home_03.jpg");
  }
  .info-pic4 {
    top: 50vh;
    left: 50%;
    background-image: url("../assets/home_04.jpg");
  }
  & > img {
    display: block;
    width: 50vw;
    height: 50vh;
    z-index: -1;
    float: left;
  }
  .topbar {
    position: absolute;
    top: 0;
    left: 0;
  }
  .backhome,
  .pick,
  .calc {
    position: absolute;
    bottom: 10px;
    display: block;
    width: 20vw;
    height: 20vw;
    background-size: contain;
  }
  .backhome {
    background-image: url("../assets/back_home_icon.png");
    left: 5vw;
  }
  .pick,
  .calc {
    background-image: url("../assets/info_pick_icon.png");
    right: 5vw;
  }
  .calc {
    background-image: url("../assets/pick_calc_btn.png");
  }
  .help-div {
    width: 80%;
    max-height: 80%;
    background-color: rgba(255, 255, 255, 0.8);
    overflow-y: auto;
    .van-nav-bar {
      background-color: transparent;
      color: #45a50e;
      font-size: 18px;
    }
  }
}
</style>


