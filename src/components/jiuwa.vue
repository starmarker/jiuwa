<template>
  <div class="main" v-if="is_showPage">
    <!-- <div class="sign-header">
      <van-row>
          <van-col span="8">
              <img :src="model.userfeil.avatar_src" alt="">
          </van-col>
          <van-col span="16">
              <div class="user-info">
                  <p>姓名：{{model.userfeil.nickname}}</p> 
                  <p>采摘成绩:{{model.aicao_num}}</p>                
              </div>
          </van-col>
          
      </van-row>
    </div> -->
    <top-jiuwa-bar :avatar="model.userfeil.avatar_src" :nickname="jiuwa.petname" :basescore="model.aicao_num" :experience="jiuwa.experience" :growthvalue="jiuwa.growthvalue" @editJiuwa="edit"  />
    
    <div class="jiuwa-talk" v-if="showTalk">
      <div class="talk-content" v-html="showInfo">       
      </div>
    </div>    
    <div class="help-btn" @click="help" v-if="jiuwa.fall_type!=0"></div>
    <Jiuwa :model="jiuwa" @rescue="help" :img="pic_src" v-cloak v-show="showJiuwa"></Jiuwa>
    <myFooter :isShowPick="true" @pick="gopick" @checkOrder="checkOrder" />
      <van-popup v-model="showHelpList" :close-on-click-overlay="true" :overlay-style="{height:'100vh'}" :lock-scroll="false" class="help-div">
        <van-nav-bar title="您附近的灸疗师" />
        <!-- <HelpList :list="teacher_list"  :loading="loading" @loadmore="getList" @rqhelp="rqhelp"></HelpList>  -->
        
          <div class="wraper list2">
              <div class="van-list" v-if="teacher_list.length>0">
                <user-list-item v-for="item in teacher_list" :key="item.id" @btnClick="()=>{reqhelp(item)}" :disabled="item.disabled" :avatar="item.headimage" :title="item.nickname" disText="已求助"/> 
              </div>
            <p v-if="teacher_list.length<1">没有附近灸疗师数据</p>
            <van-button type="primary" size="small" @click="getList" style="margin:10px auto;">刷新</van-button>
          </div>  
              
      </van-popup>
  </div>
</template>
<script>
import Jiuwa from "./baseComponents/jiujiu";
import Base from "./baseComponents/base";
import myFooter from "./baseComponents/myFooter";
import TopJiuwaBar from "./baseComponents/top_jiuwa_bar";
import HelpList from "./baseComponents/helplist";
import userListItem from "./baseComponents/user_list_item";

// import Bus from "../libs/bus.js";
export default {
  name: "jiuwa",
  extends: Base,
  components: {
    Jiuwa,
    myFooter,
    HelpList,
    TopJiuwaBar,
    userListItem
  },
  data() {
    return {
      model: {
        aicao_num: 0,
        userfeil: {
          avatar_src: "",
          nickname: ""
        },
        aicao_num: ""
      },
      jiuwa: {
        id: null,
        experience: 0,
        petname: "",
        health: 100,
        ill_name: "",
        type: 0,
        growthvalue: 0,
        fall_type: 0
      },
      ill_name: "",
      pic_src: "",
      finish: false,
      loading: false,
      showHelpList: false,
      teacher_list: [],
      cur_page: 1,
      last_page: 1,
      page_size: 6,
      showTalk: false,
      showJiuwa: false,
      page_info: {}
    };
  },
  computed: {
    showInfo() {
      let result;
      if (this.jiuwa.type != 1) {
        result = `给我采摘艾草<br/>我要快快长大`;
      } else {
        if (this.jiuwa.fall_type == 1) {
          result = "我生病了，" + this.ill_name + ",找灸疗师救助我";
        } else {
          let now = new Date().getHours();
          if (now < 11) {
            result = "早上好";
          } else if (now >= 11 && now < 13) {
            result = "中午好";
          } else if (now >= 13 && now < 17) {
            result = "下午好";
          } else {
            result = "晚上好";
          }
        }
      }
      return result;
    }
  },
  created() {
    this.getInfo();
  },
  mounted() {
    this.setJiuwa();
    this.$onEvent("reload", () => {
      this.getInfo();
    });
    setTimeout(() => {
      this.showTalk = true;
      this.showJiuwa = true;
    }, 1000);
  },
  beforeRouteEnter(to, from, next) {
    document.title = to.meta.title;
    next(vm => {
      vm.getWxConfig(to.name);
    });
  },
  methods: {
    getInfo() {
      let user_token = this.$login_info().user_token;
      let module_token = this.$api_urls["myinfo"];
      this.getData("com_manage", { module_token, user_token })
        .then(res => {
          if (res.data.code == 1) {
            if (!res.data.data.code) {
              this.is_hasJiuwa = true;
              this.model = res.data.data;
              this.jiuwa = res.data.data.xiaojiujiu;
              if (this.jiuwa.type != 0) {
                let m_t = this.$api_urls["illness"];
                this.getData("com_manage", { module_token: m_t }).then(res1 => {
                  if (res1.code == 1) {
                    this.ill_name = res1.data.disease_name;
                    this.pic_src = res1.data.pic_src;
                  }
                });
              }
            }
          } else {
            this.$alert_dlg(res.data.msg);
          }
        })
        .catch(rej => {
          this.$alert_dlg(rej.data.msg);
        });
    },
    help() {
      this.cur_page = 1;
      this.getList();
      this.showHelpList = true;
    },
    reqhelp(item) {
      let module_token = this.$api_urls["rescue"];
      let jiujiu_id = this.jiuwa.id;
      let moxibustion_token = item.user_token;
      this.getData("com_manage", {
        module_token,
        jiujiu_id,
        moxibustion_token
      }).then(res => {
        if (res.data.code == 1) {
          this.$suc(res.data.msg);
          item.disabled = true;
          this.$forceUpdate();
        } else if (res.data.code == 0) {
          this.$err(res.data.msg);
          item.disabled = true;
          this.$forceUpdate();
        } else {
          this.$err(res.data.msg);
        }
      });
    },
    async getList() {
      let position = {};
      await this.getLocation()
        .then(res => {
          position = res;
        })
        .catch(() => {
          position = {
            longitude: "104.0678322315",
            latitude: "30.5465175160"
          };
        });
      let module_token = this.$api_urls["teacher_list"],
        search = this.search;
      console.log("module_token :", module_token);
      this.loading = true;
      let obj = Object.assign(
        {},
        {
          module_token,
          page: this.cur_page,
          search
        },
        position
      );
      this.getData("com_manage", obj)
        .then(res => {
          if (res.data.code == 1) {
            res.data.data.lists.forEach(item => {
              item.type = "danger";
              if (item.help == "已求助") {
                item.disabled = true;
              }
            });
            if (this.cur_page == 1) {
              this.teacher_list = [];
            }
            this.teacher_list = this.teacher_list.concat(res.data.data.lists);

            //this.cur_page++;

            //this.finished = this.cur_page > res.data.data.page_info.last_page;
          } else {
            this.$err(res.data.msg);
          }
          this.$nextTick(() => {
            this.loading = false;
          });
        })
        .catch(rej => {
          this.$err(rej.msg);
          this.loading = false;
        });
    },
    edit(petname) {
      console.log(petname);
      // Bus.$emit("showConfirm", petname);
      if (!this.is_hasJiuwa) this.$sendEvent("showConfirm");
      // let petname = this.jiuwa.petname;
      let jiujiu_id = this.jiuwa.id;

      //this.showAlert(petname, jiujiu_id);
      this.$sendEvent("showConfirm", petname, jiujiu_id);
    },
    checkOrder() {
      this.$alert_dlg("敬请期待第二阶段");
    },
    gopick() {
      // if (this.is_hasJiuwa) {
      this.$go("/");
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url("../assets/jiuwa_bg.jpg") no-repeat top left;
  background-size: 100% 100%;
  .jiuwa-talk {
    position: absolute;
    right: 5vw;
    bottom: 45%;
    width: 40vw;
    height: 41vw;
    background-image: url("../assets/xjj_talk.png");
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 4;
    .talk-content {
      width: 75%;
      position: absolute;
      height: 40%;
      top: 12%;
      left: 10%;
      font-size: 4vw;
      color: #45a50e;
    }
  }
  .help-btn {
    width: 15vw;
    height: 15vw;
    position: absolute;
    right: 10vw;
    bottom: 25vw;
    background: url(../assets/get_help_btn.png) no-repeat top left;
    background-size: contain;
    z-index: 4;
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
    .wraper {
      min-height: 10vh;
      max-height: calc(70vh - 120px);
      overflow-y: scroll;
      > p {
        font-size: 14px;
        color: #666;
        text-align: center;
      }
    }
  }
  // .van-list {
  //   // max-height: 80%;
  // }
}
// .sign-header {
//   width: 100%;
//   box-sizing: border-box;
//   padding: 2vw;
//   position: relative;
//   background-image: linear-gradient(to right, orange, orangered);
//   img {
//     width: 80%;
//     border-radius: 50%;
//   }
//   .user-info {
//     text-align: left;
//     font-size: 3.4vw;
//     height: 26vw;
//     display: flex;
//     flex-direction: column;
//     p,
//     a {
//       flex-grow: 1;
//       color: #fff;
//     }
//   }
//   .van-button {
//     position: absolute;
//     top: 10vw;
//     right: 1vw;
//   }
//   .info-detail {
//     color: #fff;
//     font-size: 4.5vw;
//     small {
//       font-size: 0.8em;
//     }
//   }
// }
[v-cloak] {
  display: none;
}
</style>


