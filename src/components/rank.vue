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
                  <van-list v-model="loading" :finished="aicao_finish" @onLoad="getRank" :offset="30">
                    <table class="table van-hairline--bottom">
                        <thead>
                            <tr class="van-hairline--bottom">
                                <th style="width:30%;">灸疗师</th>
                                <th class="odd" style="width:18%;">艾草</th>
                                <th style="width:18%;">下单</th>
                                <th class="odd" style="width:18%;">出货</th>
                                <th style="width:17%;">总成绩</th>
                            </tr>
                        </thead>
                        <tbody v-if="aicao_rank.length>0">
                            <tr v-for="(item,index) in aicao_rank" :key="item.user_token">
                                <td class="first-column">
                                    <van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag>
                                    <img :src="item.headimage" alt="">
                                    <span class="van-cell-text">
                                        {{item.user_name}}
                                    </span>
                                </td>
                                <td class="odd">{{item.aicao_sum}}</td>
                                <td>{{item.order_sum}}</td>
                                <td class="odd">{{item.shipments}}</td>
                                <td>{{item.total}}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                          <tr >
                            <td colspan="5">没有相关数据</td>
                          </tr>
                        </tbody>
                    </table>
                  </van-list>
                </div> 
            </van-tab>
            <van-tab  title="团队排行">
                <div class="page-body">
                  <van-list v-model="s_loading" :finished="shop_finish" @onLoad="getShopRank" :offset="30">
                    <table class="table van-hairline--bottom">
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
                    </table>
                  </van-list>
                </div> 
            </van-tab>
            <van-tab  title="采摘排行">
                <div class="page-body">
                  <van-list v-model="j_loading" :finished="jiuwa_finish" @onLoad="getJiuwaRank" :offset="30">
                    <table class="table van-hairline--bottom">
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
                    </table>
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
      u_arr: [1, 2, 0]
    };
  },
  created() {
    this.getRank();
    this.getJiuwaRank();
    this.getShopRank();
  },
  watch: {
    // activeTab: function(newValue) {
    //   this.getRank();
    // }
  },
  methods: {
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
              this.cur_shop_page > res.data.data.page_info.last_page;
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
  height: calc(100vh - 150px);
  text-align: left;
  overflow-y: auto;
  .van-list {
    min-height: 20vh;
    max-height: calc(100vh - 80px);
    overflow-y: scroll;
  }
  .table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    tr {
      border-bottom: 1px solid #f0e3d6;
      th,
      td {
        color: #666;
        font-weight: normal;
        height: 40px;
        background-color: transparent;
        text-align: center;
        font-size: 14px;
        &.odd {
          background-color: rgba(255, 255, 255, 0.4);
        }
        &.first-column {
          text-align: left;
          .van-cell-text {
            white-space: nowrap;
            max-width: calc(100% - 60px);
            display: inline-block;
            text-overflow: clip;
            overflow: hidden;
            color: #666;
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
  }
  .van-tag {
    top: -5px;
  }
  .first-column img,
  .page-body img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: text-bottom;
  }
}
</style>


