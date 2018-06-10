<template>
    <div class="main">
        <van-nav-bar
            title="排行榜"
            left-text="返回"  
            left-arrow
            @click-left="$router.back()"
        />
        <van-tabs v-model="activeTab">

            <van-tab  title="灸疗师排行">
                <div class="page-body">
                  <van-list v-model="loading" :finished="aicao_finish" :immediate-check="false"	 @onLoad="getRank" :offset="30">                    
                      <van-row class="van-hairline--bottom">
                        <van-col span="8">灸疗师</van-col>
                        <van-col span="4" class="odd">艾草</van-col>
                        <van-col span="4">下单</van-col>
                        <van-col span="4" class="odd">出货</van-col>
                        <van-col span="4">总成绩</van-col>
                      </van-row>                  
                      <van-row class="van-hairline--bottom" v-for="(item,index) in aicao_rank" :key="item.user_token">
                        <van-col span="8" class="first-column">
                          <van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag>
                          <img :src="item.headimage" alt="">
                          <span class="van-cell-text">
                              {{item.user_name}}
                          </span>
                        </van-col>
                        <van-col span="4" class="odd">{{item.aicao_sum}}</van-col>
                        <van-col span="4">{{item.order_sum}}</van-col>
                        <van-col span="4" class="odd">{{item.shipments}}</van-col>
                        <van-col span="4">{{item.total}}</van-col>
                      </van-row> 
                      <p v-if="aicao_rank.length==0" v-cloak>{{nodataText}}</p>                   
                  </van-list>
                </div> 
            </van-tab>
            <van-tab  title="团队排行">
                <div class="page-body">
                  <van-list v-model="s_loading" :finished="shop_finish" :immediate-check="false" @onLoad="getShopRank" :offset="30">
                      <van-row class="van-hairline--bottom">
                        <van-col span="2" class="odd">排名</van-col>
                        <van-col span="8">团队</van-col>
                        <van-col span="4" class="odd">艾草</van-col>
                        <van-col span="5">下单</van-col>
                        <van-col span="5"  class="odd">总成绩</van-col>
                      </van-row>                  
                      <van-row class="van-hairline--bottom" v-for="(item,index) in shop_rank" :key="item.stroe_name">
                        <van-col span="2" class="odd">
                          <van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag>

                        </van-col>
                        <van-col span="8" class="first-column">                         
                          <span class="van-cell-text" style="max-width:90%;padding-left:5px;">
                              {{item.stroe_name}}
                          </span>                          
                        </van-col>
                        <van-col span="4" class="odd">{{item.aicao_sum}}</van-col>
                        <van-col span="5">{{item.place_order}}</van-col>
                        <van-col span="5" class="odd">{{item.total_achievement}}</van-col>
                      </van-row> 
                      <p v-if="aicao_rank.length==0" v-cloak>{{nodataText}}</p> 
                    <!-- <table class="table van-hairline--bottom">
                        <thead>
                            <tr class="van-hairline--bottom">
                                <th style="width:10%;">排名</th>
                                <th style="width:37%;">团队</th>
                                <th class="odd" style="width:18%;">艾草</th>
                                <th style="width:18%;">下单</th>
                                <th class="odd" style="width:18%;">总成绩</th>
                                
                            </tr>
                        </thead>
                        <tbody v-if="shop_rank.length>0">
                            <tr v-for="(item,index) in shop_rank" :key="item.store_name" >
                              <td><van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag></td>
                                <td style="text-align:left;">
                                    <span class="van-cell-text">
                                        {{item.stroe_name}}
                                    </span>
                                </td>
                                <td class="odd">{{item.aicao_sum}}</td>
                                <td>{{item.place_order}}</td>
                                <td class="odd">{{item.total_achievement}}</td>
                                
                            </tr>
                        </tbody>
                        <tbody v-else>
                          <tr >
                            <td colspan="5">没有相关数据</td>
                          </tr>
                        </tbody>
                    </table> -->
                  </van-list>
                </div> 
            </van-tab>
            <van-tab  title="采摘排行">
                <div class="page-body">
                  <van-list v-model="j_loading" :finished="jiuwa_finish" :immediate-check="false" @onLoad="getJiuwaRank" :offset="30">
                      <van-row class="van-hairline--bottom">
                        <van-col span="5">名次</van-col>
                        <van-col span="11" class="odd">顾客</van-col>
                        <van-col span="8">总成绩</van-col>
                      </van-row>                  
                      <van-row class="van-hairline--bottom" v-for="(item,index) in jiuwa_rank" :key="item.user_token">
                        <van-col span="5">
                          <van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag>
                        </van-col>
                        <van-col span="11" class="first-column odd">
                          
                          <img :src="item.headimage" alt="">
                          <span class="van-cell-text">
                              {{item.nickname}}
                          </span>
                        </van-col>
                        <van-col span="8">{{item.total}}</van-col>
                      </van-row> 
                      <p v-if="jiuwa_rank.length==0" v-cloak>{{nodataText}}</p>  
                    <!-- <table class="table van-hairline--bottom">
                        <thead>
                            <tr class="van-hairline--bottom">
                                <th style="width:30%;">名次</th>
                                <th class="odd first-column" style="width:40%;text-align:center">顾客</th>
                                <th style="width:30%;">总成绩</th>
                            </tr>
                        </thead>
                        <tbody v-if="jiuwa_rank.length>0">
                            <tr v-for="(item,index) in jiuwa_rank" :key="item.user_token">
                                <td><van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag></td>
                                <td class="first-column odd user-rank">
                                    
                                    <img :src="item.headimage" alt="">
                                    <span class="van-cell-text">
                                        {{item.nickname}}
                                    </span>
                                </td>
                                <td >{{Number(item.total).toFixed(0)}}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                          <tr >
                            <td colspan="5">没有相关数据</td>
                          </tr>
                        </tbody>
                    </table> -->
                  </van-list>
                </div>
            </van-tab>
            <!-- <van-tab  title="团队排行">
                <div class="page-body">
                    <van-cell-group>
                        <van-cell :value="item.basescore+''" v-for="(item,index) in aicao_rank" :key="item.user_token">
                            <template slot="title">
                            <van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag>
                            <span class="van-cell-text">
                                {{item.nickname}}</span>                            
                            </template>
                        </van-cell>
                    </van-cell-group>
                </div> 
            </van-tab> -->

        </van-tabs>
        <!-- <GlobalFooter :teacher="is_teacher" :actived="1"></GlobalFooter> -->
    </div>
</template>
<script>
import Base from "./baseComponents/base";
// import GlobalFooter from "./baseComponents/globalFooter";
export default {
  extends: Base,
  //   components: { GlobalFooter },
  data() {
    return {
      activeTab: 0,
      aicao_rank: [],
      jiuwa_rank: [],
      shop_rank: [],
      loading: false,
      cur_aicao_page: 1,
      j_loading: false,
      aicao_finish: false,
      s_loading: false,
      cur_jiuwa_page: 1,
      jiuwa_finish: false,
      cur_shop_page: 1,
      shop_finish: false,
      u_arr: [1, 2, 0],
      nodataText: "没有相关数据"
    };
  },
  created() {
    // this.getWxConfig("rank");
    this.getRank();
    // this.getJiuwaRank();
    // this.getShopRank();
  },
  watch: {
    activeTab: function(newValue) {
      if(newValue==1 && this.cur_shop_page==1){
        this.getShopRank()
      }else if(newValue==2 && this.cur_jiuwa_page==1){
        this.getJiuwaRank();
      }
    }
  },
  mounted() {
    this.buildPageInfo();
    wx.onMenuShareAppMessage({ ...this.page_info });
    wx.onMenuShareTimeline({ ...this.page_info });
    wx.onMenuShareQQ({ ...this.page_info });
    wx.onMenuShareQZone({ ...this.page_info });
  },

  methods: {
    buildPageInfo() {
      const _this = this;
      let obj = {
        title: "第三届灸正堂杯明星灸疗师风采大赛开幕啦",
        desc: "第三届灸正堂杯明星灸疗师风采大赛开幕啦",
        link: location.href + "&inviter_code=" + _this.user.user_token,
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
    getShopRank() {
      let user_type = 2;
      let module_token = this.$api_urls["rank"];
      let page = this.cur_shop_page;
      this.getData("com_manage", { user_type, module_token, page })
        .then(res => {
          if (res.data.code == 1) {
            this.shop_rank = this.shop_rank.concat(res.data.data.lists);
            this.cur_shop_page++;
            this.shop_finish =
              this.cur_shop_page > res.data.data.page_info.nextpage;
            this.$nextTick(() => {
              this.s_loading = false;
            });
          } else {
            this.s_loading = false;
          }
        })
        .catch(rej => {
          this.s_loading = false;
        });
    },
    getJiuwaRank() {
      let user_type = 0;
      let module_token = this.$api_urls["rank"];
      let page = this.cur_jiuwa_page;
      this.getData("com_manage", { user_type, module_token, page })
        .then(res => {
          if (res.data.code == 1) {
            this.jiuwa_rank = this.jiuwa_rank.concat(res.data.data.lists);
            this.cur_jiuwa_page++;
            this.jiuwa_finish =
              this.cur_jiuwa_page > res.data.data.page_info.last_page;
            this.$nextTick(() => {
              this.j_loading = false;
            });
          } else {
            this.j_loading = false;
          }
        })
        .catch(rej => {
          this.j_loading = false;
        });
    },
    getRank() {
      let user_type = 1;
      let module_token = this.$api_urls["rank"];
      let page = this.cur_aicao_page;

      this.getData("com_manage", { user_type, module_token, page })
        .then(res => {
          // console.log(res.data);
          //this.aicao_rank = res.data.aicao;
          if (res.data.code == 1) {
            this.aicao_rank = this.aicao_rank.concat(res.data.data.lists);
            this.cur_aicao_page++;
            this.aicao_finish =
              this.cur_aicao_page > res.data.data.page_info.last_page;
            this.$nextTick(() => {
              this.loading = false;
            });
          } else {
            this.loading = false;
          }
        })
        .catch(rej => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.page-body {
  width: 100%;
  box-sizing: border-box;
  // height: calc(100vh - 150px);
  text-align: left;
  // overflow-y: auto;
  .van-list {
    min-height: 20vh;
    // max-height: calc(100vh - 80px);
    // overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;
  }
  .van-row {
    width: 100%;
    height: 40px;
    line-height: 40px;
    .van-col {
      color: #666;
      font-weight: normal;
      height: 40px;
      background-color: transparent;
      text-align: center;
      font-size: 14px;
      &.odd {
        background-color: rgba(255, 255, 255, 0.4);
      }
      .van-tag {
        top: -5px;
      }
      &.first-column {
        text-align: left;
        padding-left: 3px;
        .van-cell-text {
          white-space: nowrap;
          max-width: calc(100% - 60px);
          display: inline-block;
          text-overflow: clip;
          overflow: hidden;
          color: #666;
        }
        .van-tag {
          top: -15px;
        }
      }
      &.user-rank {
        padding-left: 2vw;
        // .van-cell-text {
        //   max-width: 100%;
        // }
      }
    }
  }

  .first-column img,
  .page-body img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: super;
  }
}
[v-cloak] {
  display: none;
}
</style>


