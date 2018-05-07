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
  </div>
</template>

<script>
import Base from "./baseComponents/base";
import playerItem from "./baseComponents/listItem";
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
  components: { playerItem },
  created() {
    this.$http("/api/single", {}).then(res => {
      this.current_ther = res.data;
      console.log(res);
    });
    this.$http("/api/mutepuly", {}).then(res => {
      this.all_ther = res.data.lists;
      console.log(res);
    });
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
