<template>
    <div class="main">
        <!-- <div class="sign-header">
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
        </div> -->
        <div class="sign-header">
          <!-- <van-row>
              <van-col span="8">
                  <img :src="user.avatar_src" alt="">
              </van-col>
              <van-col span="16">
                  <div class="user-info">
                      <p>姓名：{{user.nick_name}}</p>
                      <p>电话:{{user.user_tel}}</p>
                  </div>
              </van-col>
          </van-row> -->
          <img :src="moreInfo.headimage" alt="" srcset="">
          <p class="user-name">{{moreInfo.user_name}} <van-icon name="edit-data" v-if="showEdit" @click="$go('/sign/'+moreInfo.user_token)"/></p>
          <div class="user-intro">{{moreInfo.declaration}}</div>
      </div>
       <div class="container">
        <div class="field-title van-hairline--bottom">  个人成绩</div>
        <van-cell>
          <div class="team-score">
            <van-row>
              <van-col span="8">
                <p>艾草成绩</p>
                <p class="score">{{moreInfo.aicao_num}}</p>
              </van-col>
              <van-col span="8">
                <p>下单成绩</p>
                <p class="score">{{moreInfo.order_num}}</p>
              </van-col>
              <van-col span="8">
                <p>出货成绩</p>
                <p class="score">68</p>
              </van-col>
              <van-col span="12">
                <p>总成绩</p>
                <p class="score">{{moreInfo.basescore}}</p>
              </van-col>
              <van-col span="12">
                <p>个人排名</p>
                <p class="score">{{moreInfo.paiming}}</p>
              </van-col>
            </van-row>
          </div>
        </van-cell>
      </div>
      <div class="container">
        <div class="field-title van-hairline--bottom"> <van-icon name="shop" /> 所在店铺</div>
        <van-cell>
          <div class="location">
            <van-icon name="location" /> 灸正堂蜀汉路店
          </div>
        </van-cell>
      </div>
      <div class="container">
        <div class="field-title van-hairline--bottom">  参赛照片</div>
        <van-cell>
          <div class="photo">
            <img :src="moreInfo.liliao_image_src" alt="" srcset="">
          </div>
        </van-cell>
      </div>
      <div class="container">
        <div class="field-title van-hairline--bottom"> <i class="iconfont icon-members"></i>Ta的队友</div>
        
          <teamMember :members="members" @avatar_click="goPage"></teamMember>
        
      </div>
       <div class="container">
        <div class="field-title van-hairline--bottom">  团队成绩</div>
        <van-cell>
          <div class="team-score">
            <van-row>
              <van-col span="8">
                <p>艾草成绩</p>
                <p class="score">68</p>
              </van-col>
              <van-col span="8">
                <p>下单成绩</p>
                <p class="score">68</p>
              </van-col>
              <van-col span="8">
                <p>出货成绩</p>
                <p class="score">68</p>
              </van-col>
              <van-col span="12">
                <p>总成绩</p>
                <p class="score">68</p>
              </van-col>
              <van-col span="12">
                <p>团队排名</p>
                <p class="score">68</p>
              </van-col>
            </van-row>
          </div>
        </van-cell>
      </div>     

      <div class="container">
        <div class="field-title van-hairline--bottom">比赛介绍</div>
        <van-cell>
          <div class="intro">
            <p>比赛介绍，这里是相关详情</p>
          </div>
        </van-cell>
      </div>
      
      <div class="picker" v-if="!is_teacher" @click="$go('/pick/'+$route.params.token)"></div>
      <globalFooter :actived="3"/>
    </div>  
</template>
<script>
import teamMember from "./baseComponents/teamMember";
import globalFooter from "./baseComponents/globalFooter";
import Base from "./baseComponents/base";
export default {
  name: "detail",
  extends: Base,
  components: {
    teamMember,
    globalFooter
  },
  data() {
    return {
      moreInfo: {
        avatar_src: "",
        nickname: "",
        headimage: "",
        user_name: "",
        basescore: 0,
        paiming: 0,
        aicao_num: 0,
        order_num: 0
      },
      // showEdit: false,
      members: []
    };
  },
  computed: {
    showEdit() {
      return (
        this.is_teacher && this.user.user_token == this.moreInfo.user_token
      );
    }
  },
  beforeMount() {
    this.getInfo();
    this.getTeamWorker();
  },
  methods: {
    pick() {
      this.$emit("click-pick");
    },
    getInfo() {
      let user_token = this.$route.params.token;
      let module_token = user_token
        ? this.$api_urls["t_info"]
        : this.$api_urls["myinfo"];

      this.getData("com_manage", { module_token, user_token }).then(res => {
        this.moreInfo = res.data;
        //console.log("res :", res.data);
      });
    },
    goPage(user_token) {
      this.$go("/my/" + user_token);
    },
    getTeamWorker() {
      let module_token = this.$api_urls["getTeam"];
      let user_token = this.$route.params.token;
      this.getData("com_manage", { module_token, user_token })
        .then(res => {
          this.members = res.data;
        })
        .catch(rej => {
          this.$err(rej.msg);
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/base.less";
@import "../assets/css/iconfont.css";
.main {
  position: relative;
  padding-bottom: 10px;
  .sign-header {
    .box-shadow();
    width: 100%;
    box-sizing: border-box;
    padding: 5vw 5vw;
    background-color: #fff;
    text-align: center;
    // background-image: linear-gradient(to right, orange, orangered);
    img {
      display: inline-block;
      width: 100px;
      height: 100px;
      border-radius: 50px;
    }
    .user-intro {
      width: 80%;
      margin: auto;
      text-align: left;
      box-sizing: border-box;
      padding: 5px;
      color: #999;
    }
  }
  .container {
    .container();
    background-color: #fff;
    .field-title {
      line-height: 40px;
      font-size: 18px;
      color: #cc163a;
      i {
        font-size: 22px;
        vertical-align: text-bottom;
        color: #9fc28a;
      }
      i.iconfont {
        vertical-align: baseline;
      }
    }
    .location {
      text-align: center;
      font-size: 16px;
    }
    .photo {
      text-align: center;
      img {
        max-height: 40vh;
      }
    }
    .team-score {
      text-align: center;
      p {
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        line-height: 1.6;
        font-size: 16px;
      }
      .score {
        color: #cc163a;
        font-size: 20px;
        font-weight: 700;
      }
    }
    .text-area .van-field__control {
      border: 1px solid #9fc28a !important;
    }
  }
  .messages,
  .picker {
    position: fixed;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    right: 10px;
    background-size: contain;
  }
  .messages {
    width: 80px;
    height: 60px;
    background-image: url("../assets/messages.jpg");
    bottom: 200px;
  }
  .picker {
    width: 80px;
    height: 80px;
    background-image: url("../assets/info_pick.png");
    bottom: 100px;
  }
}
</style>
