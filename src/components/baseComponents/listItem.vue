<template>
  <div class="listitem van-hairline--surround">
      <div class="item-header">
          <img :src="item.avatar_src" alt="" srcset="">
      </div>
      <div class="item-intro">
          <p class="match-no">{{item.match_no}}</p>
          <p class="user-name">{{item.user_nickname}}</p>
      </div>
      <div class="item-oper">
          <span class="user-score">{{item.user_score}}</span>
          <van-button size="small" type="primary" @click="pick">采集TA的艾草</van-button>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {
          avatar_src: "",
          match_no: "",
          user_token: "",
          user_nickname: "",
          user_score: ""
        };
      }
    }
  },
  methods: {
    pick() {
      this.$emit("pick", this.item.user_token);
    }
  }
};
</script>
<style lang="less" scoped>
.listitem {
  width: 96%;
  box-sizing: border-box;
  text-align: left;
  font-size: 14px;
  margin: 0 auto;
  padding: 5px;
  .item-header {
    text-align: center;
    img {
      width: 100%;
    }
  }
  .item-intro {
    overflow: hidden;
    .match-no {
      float: left;
    }
    .user-name {
      float: right;
    }
  }
  .item-oper {
    overflow: hidden;
    .user-score {
      float: left;
      line-height: 30px;
    }
    .van-button {
      float: right;
    }
  }
}
</style>


