<template>
    <div class="main">
      <div class="cloud-left"></div>
      <div class="cloud-right"></div>
      <div class="mountain"></div>
      <div class="zhalan"></div>
      <div class="grass-field"  @click="pick"></div>
      <info-top-bar :nickname="userInfo.user_name" :avatar="userInfo.headimage" :basescore="userInfo.total" :rank="userInfo.paiming"  @clickuser="godetail" class="topbar"/>
      <team-member :members="members" :showNumber="4" :showBtn="true" class="member" @aClick="godetail1"/>
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
            <!-- <van-list class="wraper list2" @scroll="scroll($event,1)"> -->
              <div class="wraper list2" >
              <van-list v-model="loading" :finished="finish" :immediate-check="false" @load="getNeedList" v-if="need_list.length>0">            
               <user-list-item v-for="(item,index) in need_list" :disabled="item.disabled" :key="index" :avatar="item.headimage" :title="item.nickname" @btnClick="()=>{helpJiuwa(item)}" mormalText="给TA救治" disText="已救治" :tel="item.mobile" /> 
              </van-list>              
              <p v-if="this.finish">没有更多数据</p>
            </div>
            
            <!-- <HelpList :list="need_list"  :loading=""  @rqhelp="helpJiuwa"></HelpList> -->
          </van-tab>
          <van-tab title="已救助">
            <div class="wraper list2"> 
              <!-- <div class="van-list" v-if="rescued_list.length>0"> -->
                <van-list v-model="r_loading" :finished="rescued_finish" @load="getRescuedList" :offset="30">
                <user-list-item v-for="(item ,index) in rescued_list" :disabled="true" :key="index" :avatar="item.headimage" :title="item.nickname" disText="已救治" />
              <!-- </div> -->
                </van-list>
              <p v-if="this.rescued_finish">没有更多数据</p>             
            </div> 

            <!-- 内容 {{ index }} -->
            <!-- <HelpList :list="recued_list" :finished="rescued_finish" :loading="loading" @loadmore="getRecuedList"></HelpList> -->
          </van-tab>
        </van-tabs>                
      </van-popup>
      <!-- 艾草采摘记录 -->
       <van-popup v-model="showRecourd" :close-on-click-overlay="true" :overlay-style="{height:'100vh'}" :lock-scroll="true" class="help-div">
        <van-nav-bar title="你的艾草采摘情况" />
            <div class="wraper">
              <van-list v-model="p_loading" :finished="pick_finish" @load="getPickList" :offset="30">
                <user-list-item v-for="(item,index) in pick_recourd" :disabled="true" :key="index" :avatar="item.avatar_src" :title="item.nickname" :disText="item.sum+' 棵'" />
              </van-list> 
              <p v-if="this.pick_finish" class="nomore">没有更多数据</p>
            </div>     
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
        user_name: "",
        headimage: "",
        total: "",
        paiming: ""
        // userfeil: {
        //   avatar_src: ""
        // }
      },
      list: [],
      finish: false,
      isFirst: true,
      need_list: [],
      cur_need_page: 1,
      need_finish: false,
      rescued_list: [],
      cur_rescued_page: 1,
      rescued_finish: false,
      loading: false,
      r_loading: false,
      p_loading: false,
      showneed: false,
      showType: 0,
      showRecourd: false,
      count: 0,
      pick_recourd: [],
      cur_pick_page: 1,
      pick_finish: false,
      members: [],
      isSelf: !this.$route.params.token,
      isPicking: false, //正在采摘，防止重复采摘
      page_info: {} //分享页面信息
    };
  },
  computed: {
    // isSelf: {
    //   get: function() {
    //     return this.userInfo.user_token == this.user.user_token;
    //   },
    //   set: function(value) {
    //     // this.showneed = value;
    //   }
    // }
  },
  async created() {
    await this.isTeacher();
    await this.getInfo();
    console.log(this.isSelf);
    // this.getTeamWorker();

    this.getNeedList();
    this.getPickList();
    this.getTeamWorker();
    // this.getRescuedList();
  },
  mounted() {
    this.calc();
  },
  beforeRouteEnter(to, from, next) {
    document.title = to.meta.title;
    next(vm => {
      vm.getWxConfig(to.name);
    });
  },
  beforeUpdate() {
    if (this.count == 0 && this.need_list.length > 0) {
      this.showneed = true;
    }
  },
  methods: {
    pick() {
      if (this.isPicking) {
        this.$err("不要频繁采集");
        return false;
      }
      this.isPicking = true;
      let module_token = this.$api_urls["pick"];
      let moxibustion_token = this.$route.params.token;
      let plucking_type = 1;
      this.getData("com_manage", {
        module_token,
        moxibustion_token,
        plucking_type
      })
        .then(res => {
          if (res.data.code == 1) {
            this.$suc(res.data.msg);
          } else if (res.data.code == 0) {
            this.$alert_dlg(res.data.msg, "", () => {
              this.$go("/jiuwa");
            });
          } else {
            this.$err(res.data.msg);
          }
          this.isPicking = false;
        })
        .catch(rej => {
          this.$err(rej.msg);
          this.isPicking = false;
        });
    },
    getTeamWorker() {
      let module_token = this.$api_urls["getTeam"];
      let user_token = this.$route.params.token || this.user.user_token;
      this.getData("com_manage", { module_token, user_token }).then(res => {
        if (res.data.code == 1) {
          this.members = res.data.data;
        }
      });
    },
    getInfo() {
      let user_token = this.$route.params.token;
      let module_token = this.$api_urls["t_info"];
      let user_token1 =
        user_token == undefined ? this.user.user_token : user_token;
      this.getData("com_manage", {
        module_token,
        user_token: user_token1
      }).then(res => {
        if (res.data.code == 1) {
          this.userInfo = res.data.data;
          this.isSelf = user_token1 == this.user.user_token;
        } else {
          this.$alert_dlg(res.data.msg, () => {});
        }

        //console.log("res :", res.data);
      });
    },
    godetail1(user_token) {
      this.$go("/my/" + user_token);
    },
    godetail() {
      let user_token = this.$route.params.token || this.user.user_token;
      this.$go("/my/" + user_token);
    },
    calc() {
      console.log(this.count);
      if (this.isSelf) {
        if (this.count > 0) {
          if (this.count % 2 == 0) {
            this.showRecourd = true;
          } else {
            this.showneed = true;
          }
        }
        this.count++;
      }
    },
    getNeedList() {
      if (!this.isSelf) return;
      let module_token = this.$api_urls["need_rescue"],
        page = this.cur_need_page;
      //this.loading = true;

      this.getData("com_manage", { module_token, page })
        .then(res => {
          if (res.data.code == 1) {
            res.data.data.lists.forEach(item => {
              item.type = "danger";
            });

            if (this.cur_need_page == 1) {
              this.need_list = [];
            }
            this.need_list = this.need_list.concat(res.data.data.lists);
            this.cur_need_page++;
            this.finish =
              this.cur_need_page > res.data.data.page_info.last_page;
            this.$nextTick(() => {
              this.loading = false;
            });
          } else {
            this.$err(res.data.msg);
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getRescuedList() {
      if (!this.isSelf) return;
      let module_token = this.$api_urls["rescued_list"];
      let page = this.cur_rescued_page;
      // if (this.rescued_finish) return false;
      // this.r_loading = true;
      this.getData("com_manage", { module_token, page })
        .then(res => {
          if (res.data.code == 1) {
            res.data.data.lists.forEach(item => {
              item.type = "danger";
            });
            if (this.cur_rescued_page == 1) {
              this.rescued_list = [];
            }
            this.rescued_list = this.rescued_list.concat(res.data.data.lists);
            this.cur_rescued_page++;
            this.rescued_finish =
              this.cur_rescued_page > res.data.data.page_info.last_page;
            this.$nextTick(() => {
              this.r_loading = false;
            });
          } else {
            this.$err(res.data.msg);
            this.r_loading = false;
          }
        })
        .catch(() => {
          this.r_loading = false;
        });
    },
    getPickList() {
      if (!this.isSelf) return;
      // this.loading = true;
      let module_token = this.$api_urls["picked_recourd"];
      let page = this.cur_pick_page;
      this.getData("com_manage", { module_token, page })
        .then(res => {
          if (res.data.code == 1) {
            if (this.cur_pick_page == 1) {
              this.pick_recourd = [];
            }
            this.pick_recourd = this.pick_recourd.concat(res.data.data.lists);
            this.cur_pick_page++;
            this.pick_finish =
              this.cur_pick_page > res.data.data.page_info.last_page;
            this.$nextTick(() => {
              this.p_loading = false;
            });
          } else if (res.data.code == 0) {
            this.pick_finish = true;
            this.p_loading = false;
          } else {
            this.$err(res.data.msg);
            this.p_loading = false;
          }
        })
        .catch(rej => {
          this.p_loading = false;
        });
    },
    helpJiuwa(item) {
      let id = item.id,
        module_token = this.$api_urls["rescue_jiuwa"];
      this.getData("com_manage", { id, module_token })
        .then(res => {
          if (res.data.code == 1) {
            this.$suc(res.data.msg);
          } else {
            this.$err(res.data.msg);
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
      // console.log("this.showType :", this.showType);
      if (index == 1 && this.cur_rescued_page == 1) {
        this.getRescuedList();
      }
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finish = true;
        }
      }, 500);
    },
    scroll(e, type) {
      let ele = e.target;
      let et = ele.offsetHeight,
        sh = ele.scrollHeight,
        st = ele.scrollTop;
      // console.log({ et, st, sh });
      //resolve();
      if (et + st > sh - 5) {
        if (type == 2 && !this.r_loading && !this.rescued_finish) {
          this.getRescuedList();
        } else if (type == 1 && !this.loading && !this.finish) {
          this.getNeedList();
        } else if (type == 3 && !this.p_loading && !this.pick_finish) {
          this.getPickList();
        }
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
  background: url("../assets/aicao_bg.jpg") no-repeat top left;
  background-size: 100% 100%;
  .cloud-left,
  .cloud-right,
  .mountain,
  .zhalan,
  .grass-field {
    position: absolute;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .cloud-left {
    width: 40vw;
    height: 22vw;
    background-image: url("../assets/cloud_left.png");
    top: 26vw;
  }
  .cloud-right {
    width: 30vw;
    height: 15vw;
    top: 24vw;
    right: 3vw;
    background-image: url("../assets/cloud_right.png");
  }
  .mountain {
    width: 100%;
    height: 33vw;
    top: 27.5vh;
    left: 0;
    background-image: url("../assets/mountais.png");
  }
  .zhalan {
    width: 100%;
    height: 50vw;
    bottom: 23vh;
    left: 0;
    background-image: url("../assets/zhalan.png");
  }
  .grass-field {
    width: 90vw;
    height: 60vw;
    left: 6vw;
    bottom: 16vh;
    background-image: url("../assets/aicao.png");
  }
  // .info-pic1,
  // .info-pic2,
  // .info-pic3,
  // .info-pic4 {
  //   position: fixed;
  //   width: 50%;
  //   height: 50vh;
  //   top: 0;
  //   left: 0;
  //   background-image: url("../assets/home_01.jpg");
  //   background-size: 100% 100%;
  //   background-repeat: no-repeat;
  // }
  // .info-pic2 {
  //   left: 50%;
  //   background-image: url("../assets/home_02.jpg");
  // }
  // .info-pic3 {
  //   top: 50vh;
  //   background-image: url("../assets/home_03.jpg");
  // }
  // .info-pic4 {
  //   top: 50vh;
  //   left: 50%;
  //   background-image: url("../assets/home_04.jpg");
  // }
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
    max-width: 70vw;
    padding-top: 5px;
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
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 7vw;
    // overflow-y: auto;
    // .van-list {
    //   max-height: calc(100% - 60px);
    //   overflow-y: auto;
    // }
    .van-nav-bar {
      background-color: transparent;
      color: #45a50e;
      font-size: 18px;
    }
    .van-tab--active {
      background-color: #000 !important;
    }
    .van-tab__pane {
      padding: 15px;
      padding-top: 3px;
      overflow: hidden;
      box-sizing: border-box;
      .wraper {
        min-height: 10vh;
        p,
        .nomore {
          font-size: 14px;
          color: #666;
          text-align: center;
        }
        .van-list {
          min-height: 10vh;
          max-height: calc(70vh - 120px);
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
        }
      }
    }
  }
  .nomore {
    font-size: 14px;
    color: #666;
    text-align: center;
  }
}
</style>


