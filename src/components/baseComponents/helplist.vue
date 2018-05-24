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
                <van-button :type="item.type" :disabled="item.disabled" size="small" slot="right-icon" @click="rqHelp(item)">{{item.type=="disabled"?'已发送请求':'向TA求助'}}</van-button>
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
    },
    rqHelp(item) {
      if (item.type == "disabled") {
        return false;
      }
      this.$emit("rqhelp", item);
    }
  }
};
</script>
<style lang="less" scoped>
.list-block {
  width: 100%;
  height: calc(80vh - 60px);
  overflow-y: auto;
  z-index: 3;
}
.van-list {
  box-sizing: border-box;
  padding-bottom: 50px;

  .van-cell {
    text-align: left;
    line-height: 10vw;
    padding: 5px;
    background-color: rgba(255, 255, 255, 0.6);
    .van-cell__title span {
      padding-left: 5px;
    }
    img {
      width: 10vw;
      height: 10vw;
      border-radius: 50%;
    }
  }
}
</style>


