<template>
  <div class="main">
    <div class="sign-header">
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
    </div>
    <Jiuwa :model="jiuwa" @rescue="help"></Jiuwa>
    <myFooter :isShowPick="false" />
      <van-popup v-model="showHelpList" position="right" :overlay="false" style="width:100%;height:100%;">
        <van-nav-bar title="附近的灸疗师" left-text="返回" left-arrow @click-left="showHelpList=false"/>
        <HelpList  :finished="finish" :list="teacher_list" @loadmore="getList" :loading="loading"></HelpList>
      </van-popup>
  </div>
</template>
<script>
import Jiuwa from "./baseComponents/jiujiu";
import Base from "./baseComponents/base";
import myFooter from "./baseComponents/myFooter";
import HelpList from "./baseComponents/helplist";
export default {
  name: "jiuwa",
  extends: Base,
  components: {
    Jiuwa,
    myFooter,
    HelpList
  },
  data() {
    return {
      model: {
        userfeil: {
          avatar_src: "",
          nickname: ""
        },
        aicao_num: ""
      },
      jiuwa: {},
      finish: false,
      loading: false,
      showHelpList: false,
      teacher_list: [],
      cur_page: 1
    };
  },
  created() {
    this.getInfo();
    this.getList();
  },
  methods: {
    getInfo() {
      let module_token = this.$api_urls["myinfo"];
      this.getData("com_manage", { module_token }).then(res => {
        console.log("object :", res.data);
        this.model = res.data;
        this.jiuwa = res.data.xiaojiujiu;
      });
    },
    help() {
      this.showHelpList = true;
    },
    getList() {
      this.loading = true;
      let module_token = this.$api_urls["index"];
      this.getData("com_manage", { module_token })
        .then(res => {
          console.log("res.data :", res.data);
          this.cur_page++;
          this.teacher_list = this.teacher_list.concat(res.data.lists);
          this.finish = this.cur_page >= 3;
          this.loading = false;
        })
        .catch(res => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
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
</style>


