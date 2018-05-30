<template>
    <div class="main">
        <van-nav-bar
            title="排行榜"
            left-text="返回"  
            left-arrow
            @click-left="back"
        />
        <van-tabs v-model="activeTab">

            <van-tab  title="灸疗师排行">
                <div class="page-body">
                    <table class="table van-hairline--bottom">
                        <thead>
                            <tr class="van-hairline--bottom">
                                <th style="width:30%;">&nbsp;</th>
                                <th class="odd" style="width:18%;">艾草</th>
                                <th style="width:18%;">下单</th>
                                <th class="odd" style="width:18%;">出货</th>
                                <th style="width:17%;">总成绩</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in aicao_rank" :key="item.user_token">
                                <td class="first-column">
                                    <van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag>
                                    <img :src="item.headimage" alt="">
                                    <span class="van-cell-text">
                                        {{item.nickname}}
                                    </span>
                                </td>
                                <td class="odd">{{item.aicao_num}}</td>
                                <td>2</td>
                                <td class="odd">3</td>
                                <td>{{item.basescore}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> 
            </van-tab>
            <van-tab  title="采摘排行">
                <div class="page-body">
                    <table class="table van-hairline--bottom">
                        <thead>
                            <tr class="van-hairline--bottom">
                                <th style="width:30%;">名次</th>
                                <th class="odd first-column" style="width:40%;text-align:center">顾客</th>
                                <th style="width:30%;">总成绩</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in jiuwa_rank" :key="item.user_token">
                                <td><van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag></td>
                                <td class="first-column odd user-rank">
                                    
                                    <img :src="item.headimage" alt="">
                                    <span class="van-cell-text">
                                        {{item.nickname}}
                                    </span>
                                </td>
                                <td >{{item.aicao_num}}</td>
                            </tr>
                        </tbody>
                    </table>
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
      u_arr: [1, 0, 1]
    };
  },
  created() {
    this.getRank();
  },
  watch: {
    activeTab: function(newValue) {
      this.getRank();
    }
  },
  methods: {
    getRank() {
      let user_type = this.u_arr[this.activeTab];
      let module_token = this.$api_urls["rank"];
      this.getData("com_manage", { user_type, module_token }).then(res => {
        console.log(res.data);
        //this.aicao_rank = res.data.aicao;
        if (user_type == 0) {
          this.jiuwa_rank = res.data;
        } else {
          this.aicao_rank = res.data;
        }
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
          .van-cell-text {
            max-width: 100%;
          }
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


