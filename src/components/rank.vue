<template>
    <div class="main">
        <van-nav-bar
            title="排行榜"
            left-text="返回"  
            left-arrow
            @click-left="back"
        />
        <van-tabs v-model="active">
            <van-tab  title="灸疗师排行">
                <div class="page-body">
                    <van-cell-group>
                        <van-cell :value="item.user_score" v-for="(item,index) in aicao_rank" :key="item.user_token">
                            <template slot="title">
                            <van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag>
                            <span class="van-cell-text">
                                {{item.user_nickname}}</span>                            
                            </template>
                        </van-cell>
                    </van-cell-group>
                </div> 
            </van-tab>
            <van-tab  title="灸娃排行">
                <div class="page-body">
                    <van-cell-group>
                        <van-cell :value="item.user_score" v-for="(item,index) in jiuwa_rank" :key="item.user_token">
                            <template slot="title">
                            <van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag>
                            <span class="van-cell-text">
                                {{item.user_nickname}}</span>                            
                            </template>
                        </van-cell>
                    </van-cell-group>
                </div>
            </van-tab>
            <van-tab  title="团队排行">
                <div class="page-body">
                    <van-cell-group>
                        <van-cell :value="item.user_score" v-for="(item,index) in jiuwa_rank" :key="item.user_token">
                            <template slot="title">
                            <van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag>
                            <span class="van-cell-text">
                                {{item.user_nickname}}</span>                            
                            </template>
                        </van-cell>
                    </van-cell-group>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import Base from "./baseComponents/base";
export default {
  extends: Base,
  data() {
    return {
      active: 0,
      aicao_rank: [],
      jiuwa_rank: []
    };
  },
  created() {
    this.getRank();
  },
  methods: {
    getRank() {
      this.$http.post("/api/rank", {}).then(res => {
        console.log(res.data);

        //this.aicao_rank = res.data.aicao;
        this.aicao_rank = res.data.aicao.sort((x, y) => {
          return x.user_score > y.user_score ? -1 : 1;
        });
        this.jiuwa_rank = res.data.jiuwa.sort((x, y) => {
          return x.user_score > y.user_score ? -1 : 1;
        });
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
}
</style>


