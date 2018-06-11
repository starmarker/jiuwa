<template>
  <div class="hello" style="margin-top:45px;">
<form action="/" style="position:fixed;top:0;left:0;width:100%;background-color:#fff;z-index:10;">
    <van-search
      v-model="user_name"
      placeholder="请输入理疗师名字"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
  </form>
  <div class="banner" id="banner">
    <img src="../assets/index_banner1.jpg" alt="" srcset="">
    <bullet-words :maxheight="80" style="position:absolute;top:0;height:80%" ref="bullet" v-if="showBullet"/>
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
       :offset="30"
       :immediate-check="false"
      v-if="!isSearch">
  <!-- <van-cell v-for="item in list" :key="item" :title="item + ''" /> -->
        <van-row>
          <van-col span="12" v-for="item in all_ther" :key="item.user_token" style="margin-top:1vh">
            <player-item :item="item" @pick="pick" @jumpPage="goPage" />
          </van-col>      
        </van-row>
    </van-list>
        <van-row v-else>
          <van-col span="12" v-for="item in search_list" :key="item.user_token" style="margin-top:1vh">
            <player-item :item="item" @pick="pick" @jumpPage="goPage" />
          </van-col> 
          <p v-if="search_list.length<1 && showSearch">搜索结果为空</p>     
        </van-row>   
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
      gameData: null,
      scrollHeight: 0,
      showBullet: true,
      page_info: {},
      search_list: [], //搜索结果数组
      showSearch: false //搜索结果为空的情况展示
    };
  },
  components: { playerItem, GlobalFooter, FlowBlock, GameDetail, BulletWords },
  async created() {
    await this.getWxConfig("index");
  },
  mounted() {
    this.getIndex();
    this.getIndexData();
    this.setJiuwa();
    // this.getBullet();
    // this.getBullet();
    window.addEventListener("scroll", e => {
      this.scrollHeight = JSON.stringify(window.pageYOffset);
    });

    this.buildPageInfo();

    console.log(this.$route);
    wx.onMenuShareAppMessage({ ...this.page_info });
    wx.onMenuShareTimeline({ ...this.page_info });
    wx.onMenuShareQQ({ ...this.page_info });
    wx.onMenuShareQZone({ ...this.page_info });
  },
  beforeUpdate() {},
  deactivated() {
    this.showBullet = false;
    this.$session("scrollY", this.scrollHeight);
  },
  activated() {
    this.showBullet = true;
    this.scrollHeight = this.$session("scrollY");
    window.scroll(0, ~~this.scrollHeight);
  },
  computed: {
    // scrollHeight() {
    //   return document.querySelector(".hello").scrollTop;
    // }
  },
  methods: {
    buildPageInfo() {
      const _this = this;
      let obj = {
        title: "第三届灸正堂杯明星灸疗师风采大赛开幕啦",
        desc: "第三届灸正堂杯明星灸疗师风采大赛开幕啦",
        link: location.href + "&inviter_code=" + this.user.user_token,
        imgUrl:
          location.host +
          "/web_app/jztwx/cj_accz/static/img/index_banner1.dd73ce2.jpg",
        trigger: function(res) {
          alert("用户点击分享");
        },
        complete: function(res) {
          alert(JSON.stringify(res));
        },
        success: function(res) {
          alert("已分享");
        },
        cancel: function(res) {
          alert("已取消");
        },
        fail: function(res) {
          alert(JSON.stringify(res));
        }
      };
      this.page_info = obj;
    },
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
            this.$suc(res.data.msg);
          } else if (res.data.code == 0) {
            this.$alert_dlg(res.data.msg, "", () => {
              this.$go("/jiuwa");
            });
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
      this.getData("com_manage", { module_token }).then(res => {
        if (res.data.code == 1) {
          this.current_ther = res.data.data;
        }
      });
    },
    async getIndex() {
      console.log(this.finished);
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
          } else {
            this.finished = true;
          }
          this.$nextTick(() => {
            this.loading = false;
          });
        })
        .catch(rej => {
          // this.$err(rej.msg);
          this.loading = false;
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

      this.search_list = [];
      this.getData("com_manage", {
        module_token,
        user_name
      })
        .then(res => {
          if (res.data.code == 1) {
            let arr = res.data.data;
            this.search_list = arr;
          } else {
            this.search_list = [];
          }

          // this.cur_page++;
          // this.finished = this.cur_page > res.data.page_info.last_page;
          // this.loading = false;
          this.showSearch = true;
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
    },
    savePt(e) {
      this.scrollHeight = e.target.scrollTop;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/css/base.less";
.hello {
  // height: 100vh;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: auto;
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
