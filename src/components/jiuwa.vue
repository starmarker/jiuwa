<template>
  <div class="main">
    <Jiuwa :model="model" @rescue="help"></Jiuwa>
    <myFooter :isShowPick="false" />
      <van-popup v-model="showHelpList" position="right" :overlay="false" style="width:100%">
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
  components: {
    Jiuwa,
    myFooter,
    HelpList
  },
  data() {
    return {
      model: {},
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
      this.$http.post("/api/jiujiu", {}).then(res => {
        console.log("object :", res.data);
        this.model = res.data;
      });
    },
    help() {
      this.showHelpList = true;
    },
    getList() {
      this.loading = true;
      this.$http
        .post("/api/rank", {})
        .then(res => {
          console.log("res.data :", res.data);
          this.cur_page++;
          this.teacher_list = this.teacher_list.concat(res.data.aicao);
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
</style>


