<template>
  <div class="hello">
    <van-row>
      <van-col span="12" offset="6">
        <player-item :item="current_ther"/>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="12" v-for="item in all_ther" :key="item.user_token" style="margin-top:1vh">
        <player-item :item="item" />
      </van-col>      
    </van-row>
    <globalFooter></globalFooter>
  </div>
</template>

<script>
import Base from "./baseComponents/base";
import playerItem from "./baseComponents/listItem";
import GlobalFooter from "./baseComponents/globalFooter";
export default {
  name: "HelloWorld",
  extends: Base,
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      current_ther: {},
      all_ther: []
    };
  },
  components: { playerItem, GlobalFooter },
  mounted() {
    this.$http("/api/single", {}).then(res => {
      this.current_ther = res.data;
      // console.log(res);
    });
    this.$http("/api/mutepuly", {}).then(res => {
      this.all_ther = res.data.lists;
      // console.log(res);
    });
    this.$nextTick(() => {
      this.checkUser();
    });

    // this.$http("/api/getuser", {}).then(res => {
    //   this.user = res.data;
    //   console.log(res.data);
  },
  methods: {
    alert1() {
      this.$confirm_dlg(
        "弹窗测试",
        () => {
          console.log("tijiao");
        },
        () => {
          console.log(1112);
        }
      );
      //     this.$suc("成功");
    },
    checkUser() {
      // this.user = this.$login_info();
      console.log("object :", this.user);
      if (this.user.is_ther && !this.user.is_singned) {
        this.$confirm_dlg(
          "灸疗师" +
            this.user.user_nickname +
            ",你还未报名参赛，是否报名参加活动",
          () => {
            this.$go("/sign");
          },
          () => {
            console.log("不参加活动");
          }
        );
      }
      if (!this.user.is_ther && !this.user.is_getpet) {
        this.$confirm_dlg(
          "顾客" + this.user.user_nickname + ",你还未领取灸娃，是否领取",
          () => {
            console.log("领取");
          },
          () => {
            console.log("不领取");
          }
        );
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
