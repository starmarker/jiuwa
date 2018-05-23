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
            <van-tab  title="灸娃排行">
                <div class="page-body">
                    <van-cell-group>
                        <van-cell :value="item.aicao_num+''" v-for="(item,index) in jiuwa_rank" :key="item.user_token">
                            <template slot="title">
                            <van-tag :type="index==0?'danger':(index==1?'primary':(index==2?'success':''))">{{index+1}}</van-tag>
                            <span class="van-cell-text">
                                {{item.nickname}}</span>                            
                            </template>
                        </van-cell>
                    </van-cell-group>
                </div>
            </van-tab>
        </van-tabs>
        <GlobalFooter :teacher="is_teacher" :actived="1"></GlobalFooter>
    </div>
</template>
<script>
import Base from "./baseComponents/base";
import GlobalFooter from "./baseComponents/globalFooter";
export default {
  extends: Base,
  components: { GlobalFooter },
  data() {
    return {
      activeTab: 0,
      aicao_rank: [],
      jiuwa_rank: []
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
      let user_type = this.activeTab;
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
}
</style>


