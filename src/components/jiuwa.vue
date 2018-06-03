<template>
  <div class="main">
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
    <top-jiuwa-bar :avatar="model.userfeil.avatar_src" :nickname="jiuwa.petname" :basescore="model.aicao_num" :experience="jiuwa.experience" @editJiuwa="edit" v-if="is_hasJiuwa" />
    <div class="jiuwa-talk">
      <div class="talk-content" v-html="showInfo">       
      </div>
    </div>
    <div class="help-btn" @click="help" v-if="jiuwa.health<100"></div>
    <Jiuwa :model="jiuwa" @rescue="help" v-if="is_hasJiuwa"></Jiuwa>
    <myFooter :isShowPick="true" @pick="$go('/')" @checkOrder="checkOrder" />
      <van-popup v-model="showHelpList" :close-on-click-overlay="true" :overlay-style="{height:'100vh'}" :lock-scroll="false" class="help-div">
        <van-nav-bar title="您附近的灸疗师" />
        <!-- <HelpList :list="teacher_list"  :loading="loading" @loadmore="getList" @rqhelp="rqhelp"></HelpList>  -->
        <van-list  :finished="finish" v-model="loading"  @loadmore="getList" :immediate-check="false" :offset="50">
          <user-list-item v-for="item in teacher_list" :key="item.id" @btnClick="()=>{reqhelp(item)}" :disabled="item.disabled" :avatar="item.headimage" :title="item.nickname"/> 
            <p v-if="teacher_list.length<1">没有附近灸疗师数据</p>
          </van-list>  
              
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
import Bus from "../libs/bus.js";
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
        ill_name: ""
      },
      finish: false,
      loading: false,
      showHelpList: false,
      teacher_list: [],
      cur_page: 1,
      last_page: 1,
      page_size: 6
    };
  },
  computed: {
    showInfo() {
      let result;
      if (this.jiuwa.experience <= 100) {
        result = `给我采摘艾草<br/>我要快快长大`;
      } else {
        if (this.jiuwa.health == 100) {
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
        } else {
          result = `我现在生病了，${this.jiuwa.ill_name} 找灸疗师救助我`;
        }
      }
      return result;
    }
  },
  created() {
    this.getInfo();
    this.getList();
  },
  mounted() {
    Bus.$on("reload", () => {
      this.getInfo();
    });
  },
  methods: {
    getInfo() {
      let module_token = this.$api_urls["myinfo"];
      this.getData("com_manage", { module_token })
        .then(res => {
          if (res.data.code == 1) {
            this.model = res.data.data;
            this.jiuwa = res.data.data.xiaojiujiu;
            if (this.jiuwa.health < 100) {
              let m_t = this.$api_urls["illness"];
              this.getData("com_manage", { module_token: m_t }).then(res1 => {
                if (res1.data.code == 1) {
                  this.jiuwa.ill_name = res1.data.data;
                }
              });
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
          this.$suc("成功求助");
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
      let module_token = this.$api_urls["index"],
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
            });
            this.teacher_list = this.teacher_list.concat(res.data.data.lists);
            this.cur_page++;
            this.finished = this.cur_page > res.data.data.page_info.last_page;
            this.loading = false;
          }
        })
        .catch(rej => {
          this.$err(rej.msg);
          this.loading = false;
        });
    },
    edit(petname) {
      // Bus.$emit("showConfirm", petname);
      if (this.is_teacher || !this.is_hasJiuwa) return false;
      let jiujiu_id = this.jiuwa.id;
      console.log(petname);
      this.showAlert(petname, jiujiu_id);
    },
    checkOrder() {
      this.$alert_dlg("第二阶段加入此功能");
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
    right: 10vw;
    bottom: 40%;
    width: 40vw;
    height: 41vw;
    background-image: url("../assets/xjj_talk.png");
    background-repeat: no-repeat;
    background-size: contain;
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
  .van-list {
    max-height: 80%;
    overflow-y: auto;
  }
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
</style>


