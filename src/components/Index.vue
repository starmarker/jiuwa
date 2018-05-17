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
    let module_token = this.$api_urls["index"];
    // this.getData("com_manage", { module_name }).then(res => {
    //   console.log(res.data);
    // });
    // this.getData("com_manage", { module_name }).then(res => {
    //   console.log("res :", res);
    // });
    console.log("module_token :", module_token);
    this.getData("com_manage", { module_token })
      .then(res => {
        console.log("object :", res.data);
      })
      .catch(rej => {
        this.$err(rej.msg);
      });

    // this.$http("/api/getuser", {}).then(res => {
    //   this.user = res.data;
    //   console.log(res.data);
  },
  beforeUpdate() {
    this.checkUser();
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
    async checkUser() {
      // this.user = this.$login_info();
      await this.getStatus();
      console.log(this.is_teacher, this.is_signed, this.is_hasJiuwa);
      if (this.is_teacher && !this.is_signed) {
        this.$confirm_dlg(
          "灸疗师" + this.user.nick_name + ",你还未报名参赛，是否报名参加活动",
          () => {
            this.$go("/sign");
          },
          () => {
            console.log("不参加活动");
          }
        );
      }
      if (!this.is_teacher && !this.is_hasJiuwa) {
        this.$confirm_dlg(
          "顾客" + this.user.nick_name + ",你还未领取灸娃，是否领取",
          () => {
            this.getJiuwa();
          },
          () => {
            console.log("不领取");
          }
        );
      }
    },
    getJiuwa() {
      let user_type = 0,
        module_token = this.$api_urls["getJiuwa"],
        inviter_token = "263764d167ee33343036fb1510a58503";
      this.getData("com_manage", {
        user_type,
        module_token,
        inviter_token
      }).then(res => {
        this.$alert_dlg(
          "领养小灸灸成功，你可以采集艾草让小灸灸成长咯",
          "",
          () => {}
        );
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
