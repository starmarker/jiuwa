<template>
    <div class="list-block">
        <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :immediate-check="false"
        :offset="800"
        >
            <van-cell v-for="item in list" :key="item.user_token"  >
                <img :src="item.headimage" alt="" slot="icon">
                <span slot="title">{{item.nickname}}</span> 
                <van-button type="primary" :disabled="item.disabled" size="small" slot="right-icon">向TA求助</van-button>
            </van-cell>
        </van-list>
    </div>
    
</template>
<script>
export default {
  props: ["list", "finished", "loading"],
  data() {
    return {};
  },
  methods: {
    onLoad() {
      this.$emit("loadmore");
    }
  }
};
</script>
<style lang="less" scoped>
.list-block {
  width: 100%;
  height: calc(100vh - 60px);
  overflow: auto;
}
.van-list {
  box-sizing: border-box;
  padding-bottom: 50px;

  .van-cell {
    text-align: left;
    line-height: 10vw;
    padding: 5px;
    overflow: auto;
    .van-cell__title span {
      padding-left: 5px;
    }
    img {
      width: 10vw;
      height: 10vw;
    }
  }
}
</style>


