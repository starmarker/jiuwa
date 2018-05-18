<template>
  <div class="hello">
    <van-row v-if="current_ther">
      <van-col span="12" offset="6">
        <player-item :item="current_ther" @pick="goPage" />
      </van-col>
    </van-row>
    <van-row>
      <van-col span="12" v-for="item in all_ther" :key="item.user_token" style="margin-top:1vh">
        <player-item :item="item" @pick="goPage" />
      </van-col>      
    </van-row>
    <globalFooter :teacher="is_teacher"></globalFooter>
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
  // async created() {
  //   await this.checkUser();
  // },
  mounted() {
    this.getInviter();
    this.getIndex();
  },
  beforeUpdate() {},
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
    goPage(user_token) {
      this.$go("/my/" + user_token);
    },
    getInviter() {
      let module_token = this.$api_urls["inviter"];
      this.getData("com_manage", { module_token })
        .then(res => {
          this.current_ther = res.data;
        })
        .catch(rej => {
          this.$err(rej.msg);
        });
    },
    getIndex() {
      let module_token = this.$api_urls["index"];
      console.log("module_token :", module_token);
      this.getData("com_manage", { module_token })
        .then(res => {
          console.log("object :", res.data);
          this.all_ther = res.data.lists;
        })
        .catch(rej => {
          this.$err(rej.msg);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
