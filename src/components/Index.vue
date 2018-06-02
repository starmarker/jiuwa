<template>
  <div class="hello">
<form action="/">
    <van-search
      v-model="user_name"
      placeholder="请输入理疗师名字"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
  </form>
  <div class="banner">
    <img src="../assets/index_banner.jpg" alt="" srcset="">
    <bullet-words :maxheight="80" style="position:absolute;top:0;height:80%"/>
  </div>
  <div class="container">
    <flow-block />
  </div>
  
  <div class="container">
    <game-detail :teachernumber="gameData.liliaoshi_num" :picktotal="gameData.caizhai_num" :gamertotal="gameData.guke_num" v-if="gameData"/>
  </div>
    <van-row v-if="current_ther!=null">
      <van-col span="12" offset="6">
        <player-item :item="current_ther" @pick="pick" @jumpPage="goPage"/>
      </van-col>
    </van-row>
    
      <van-list
        v-model="loading"
        :finished="finished"
        @load="getIndex"
        :immediate-check="false"
      >
  <!-- <van-cell v-for="item in list" :key="item" :title="item + ''" /> -->
        <van-row>
          <van-col span="12" v-for="item in all_ther" :key="item.user_token" style="margin-top:1vh">
            <player-item :item="item" @pick="pick" @jumpPage="goPage" />
          </van-col>      
        </van-row>
    </van-list>
    
    <!-- <globalFooter :teacher="is_teacher"></globalFooter> -->
  </div>
</template>

<script>
import Base from "./baseComponents/base";
import playerItem from "./baseComponents/listItem";
import GlobalFooter from "./baseComponents/globalFooter";
import FlowBlock from "./baseComponents/flow";
import GameDetail from "./baseComponents/gamedetail";
import BulletWords from "./baseComponents/bullet_words";
export default {
  name: "HelloWorld",
  extends: Base,
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      current_ther: null,
      all_ther: [],
      showTest: false,
      list: [],
      loading: false,
      finished: false,
      cur_page: 1,
      user_name: "",
      isSearch: false,
      gameData: null
    };
  },
  components: { playerItem, GlobalFooter, FlowBlock, GameDetail, BulletWords },
  // async created() {
  //   await this.checkUser();
  // },
  mounted() {
    this.getIndex();
    this.getIndexData();
    // this.getBullet();
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
      this.$go("/pick/" + user_token);
    },
    pick(user_token) {
      if (this.is_teacher) {
        this.$err("灸疗师不能采摘");
        return false;
      }
      if (!this.is_hasJiuwa) {
        this.$err("领取小灸灸后方可采摘");
        return false;
      }
      let module_token = this.$api_urls["pick"];
      let moxibustion_token = user_token;
      let plucking_type = 0;
      this.getData("com_manage", {
        module_token,
        moxibustion_token,
        plucking_type
      })
        .then(res => {
          if (res.data.code == 1) {
            this.$suc("成功采摘1棵");
          } else {
            this.$err(res.data.msg);
          }
        })
        .catch(rej => {
          this.$err(rej.msg);
        });
    },
    getInviter() {
      let module_token = this.$api_urls["inviter"];
      this.getData("com_manage", { module_token })
        .then(res => {
          if (res.data) {
            this.current_ther = res.data;
          }
        })
        .catch(rej => {
          this.$err(rej.msg);
        });
    },
    async getIndex() {
      let position = {};
      await this.getInviter();
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
      let module_token = this.$api_urls["index"];
      console.log("module_token :", module_token);
      this.loading = true;
      let obj = Object.assign(
        {},
        {
          module_token,
          page: this.cur_page
        },
        position
      );
      this.getData("com_manage", obj)
        .then(res => {
          if (res.data.code == 1) {
            let arr = res.data.data.lists;
            if (this.current_ther !== null && this.current_ther !== false) {
              arr = arr.filter(item => {
                return item.id != this.current_ther.id;
              });
            }
            if (this.cur_page == 1) {
              this.all_ther = [];
            }
            this.all_ther = this.all_ther.concat(arr);
            this.cur_page++;
            this.finished = this.cur_page > res.data.data.page_info.last_page;
            this.loading = false;
          }
        })
        .catch(rej => {
          this.$err(rej.msg);
          // this.loading = false;
        });
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    onSearch() {
      this.isSearch = true;

      let module_token = this.$api_urls["search"],
        user_name = this.user_name;
      this.cur_page = 1;
      this.list = [];
      this.getData("com_manage", {
        module_token,
        page: this.cur_page,
        user_name
      })
        .then(res => {
          if (res.data.code == 1) {
            let arr = res.data.data;
            if (this.cur_page == 1) {
              this.all_ther = [];
            }
            this.all_ther = this.all_ther.concat(arr);
          }

          // this.cur_page++;
          // this.finished = this.cur_page > res.data.page_info.last_page;
          // this.loading = false;
        })
        .catch(rej => {
          this.$err(rej.msg);
        });
    },
    onCancel() {
      this.isSearch = false;
      this.cur_page = 1;
      // this.list = [];
      this.user_name = "";
      // this.getIndex();
    },
    getIndexData() {
      let module_token = this.$api_urls["index_data"];
      this.getData("com_manage", { module_token }).then(res => {
        if (res.data.code == 1) {
          this.gameData = res.data.data;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/css/base.less";
.hello {
  .banner {
    .box-shadow();
    //box-shadow: 0 3px 0px 3px #aaa;
    // height: 40vw;
    position: relative;
    img {
      display: block;
      width: 100%;
      z-index: 0;
    }
  }
  .van-list {
    padding-bottom: 20px;
  }
  .container {
    .container;
  }
}
</style>
