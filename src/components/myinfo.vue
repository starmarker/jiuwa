<template>
    <div class="main">
      <div class="info-pic1"></div>
      <div class="info-pic2"></div>
      <div class="info-pic3"></div>
      <div class="info-pic4"></div>
      <info-top-bar :nickname="userInfo.userfeil.nickname" :avatar="userInfo.userfeil.avatar_src" :basescore="userInfo.basescore" :rank="userInfo.paiming"  @clickuser="godetail" class="topbar"/>
      <team-member :members="members" :showNumber="3" :showBtn="true" class="member"/>
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
      <van-popup v-model="showneed" :close-on-click-overlay="true" :overlay-style="{height:'100vh'}" :lock-scroll="true" class="help-div">
        <van-nav-bar title="向你求助的小灸灸" />
        <van-tabs type="card" v-model="showType" @click="checkType">
          <van-tab title="待救助">
            <!-- 内容 {{ index }} -->
            <van-list :finished="need_finish" @loadmore="getNeedList" v-model="loading" :immediate-check="false" :offset="50">
              <user-list-item v-for="(item,index) in need_list" :disabled="item.disabled" :key="index" :avatar="item.headimage" :title="item.nickname" @btnClick="()=>{helpJiuwa(item)}" mormalText="给TA救治" disText="已救治" />
            </van-list>
            <!-- <HelpList :list="need_list"  :loading=""  @rqhelp="helpJiuwa"></HelpList> -->
          </van-tab>
          <van-tab title="已救助">
            <van-list :finished="rescued_finish" @loadmore="getNeedList" v-model="loading" :immediate-check="false" :offset="50">
              <user-list-item v-for="(item ,index) in rescued_list" :disabled="true" :key="index" :avatar="item.headimage" :title="item.nickname" disText="已救治" v-if="rescued_list.length>0"/>
            </van-list>
            <!-- 内容 {{ index }} -->
            <!-- <HelpList :list="recued_list" :finished="rescued_finish" :loading="loading" @loadmore="getRecuedList"></HelpList> -->
          </van-tab>
        </van-tabs>                
      </van-popup>
      <!-- 艾草采摘记录 -->
       <van-popup v-model="showRecourd" :close-on-click-overlay="true" :overlay-style="{height:'100vh'}" :lock-scroll="true" class="help-div">
        <van-nav-bar title="你的艾草采摘情况" />
        <van-list :finished="pick_finish" v-model="loading" @loadmore="getPickList" :immediate-check="false" :offset="50">
          <user-list-item v-for="(item,index) in pick_recourd" :disabled="true" :key="index" :avatar="item.avatar_src" :title="item.nickname" :disText="item.sum+'棵'" v-if="pick_recourd.length>0"/>
        </van-list>        
      </van-popup> 
    </div>
</template>
<script>
import Base from "./baseComponents/base";
import teamMember from "./baseComponents/teamMember";
import MoreInfo from "./moreInfo";
import InfoTopBar from "./baseComponents/top_info_bar";
import HelpList from "./baseComponents/teamMember";
import userListItem from "./baseComponents/user_list_item";
export default {
  extends: Base,
  components: {
    teamMember,
    MoreInfo,
    userListItem,
    InfoTopBar,
    teamMember
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
      rescued_list: [],
      cur_rescued_page: 1,
      rescued_finish: true,
      loading: false,
      showneed: false,
      showType: 0,
      showRecourd: false,
      count: 0,
      pick_recourd: [],
      cur_pick_page: 1,
      pick_finish: true,
      members: []
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
    this.getNeedList();
    this.getPickList();
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
        this.count++;
        if (this.count % 2 == 1) {
          this.showRecourd = true;
        } else {
          this.showneed = true;
        }
      }
    },
    getNeedList() {
      if (!this.is_teacher) return;
      let module_token, page;
      this.loading = true;
      if (this.showType == 0) {
        module_token = this.$api_urls["need_rescue"];
        page = this.cur_need_page;
      } else {
        module_token = this.$api_urls["rescued_list"];
        page = this.cur_rescued_page;
      }
      this.getData("com_manage", { module_token, page })
        .then(res => {
          if (res.data) {
            res.data.lists.forEach(item => {
              item.type = "danger";
            });
            if (this.showType == 0) {
              this.need_list = this.need_list.concat(res.data.lists);
              this.cur_need_page++;
              this.need_finish =
                this.cur_need_page > res.data.page_info.last_page;
            } else {
              this.rescued_list = this.rescued_list.concat(res.data.lists);
              this.cur_rescued_page++;
              this.recued_finish =
                this.cur_rescued_page > res.data.page_info.last_page;
            }
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getPickList() {
      if (!this.is_teacher) return;
      this.loading = true;
      let module_token = this.$api_urls["picked_recourd"];
      let page = this.cur_pick_page;
      this.getData("com_manage", { module_token, page })
        .then(res => {
          this.pick_recourd = this.pick_recourd.concat(res.data.list);
          this.cur_pick_page++;
          this.pick_finish = this.cur_pick_page > res.data.page_info.last_page;
          this.loading = false;
        })
        .catch(rej => {
          this.loading = false;
        });
    },
    helpJiuwa(item) {
      let id = item.id,
        module_token = this.$api_urls["rescue_jiuwa"];
      this.getData("com_manage", { id, module_token })
        .then(res => {
          if (res.data) {
            this.$suc("治疗成功");
          } else {
            this.$err("来晚啦！");
          }
          item.disabled = true;
          this.$forceUpdate();
        })
        .catch(rej => {
          if (rej.msg) {
            this.$err(rej.msg);
          } else {
            this.$err("未知错误");
          }
        });
    },
    checkType(index, title) {
      console.log("this.showType :", this.showType);
      if (index == 1 && this.cur_rescued_page == 1) {
        this.getNeedList();
      }
    }
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
  .member {
    position: absolute;
    top: 80px;
    right: 10px;
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
    .van-tab__pane {
      padding: 15px;
      padding-top: 3px;
      box-sizing: border-box;
    }
  }
}
</style>


