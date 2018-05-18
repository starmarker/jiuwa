<template>
  <div class="listitem van-hairline--surround" v-if="item!==null">
      <div class="item-header">
          <img :src="item.liliao_image_src" alt="" srcset="">
          <div class="item-intro">
              <p class="match-no">编号:{{match_no}} <span class="user-name">{{item.nickname}}</span></p>
              <!-- <p class="user-name">{{item.nickname}}</p> -->          
          </div>
      </div>
      <div class="item-oper">
          <span class="user-score">得分:{{item.basescore}}</span>    
          <a href="javascript:;" @click="pick">采TA的艾草</a>    
          
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
          liliao_image_src: "",
          id: "",
          user_token: "",
          nickname: "",
          basescore: ""
        };
      }
    }
  },
  computed: {
    match_no() {
      let id = this.item.id + "";
      return id.padStart(4, "0");
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
  padding-bottom: 0;
  border-radius: 10px;
  .item-header {
    text-align: center;
    position: relative;
    img {
      width: 100%;
    }
  }
  .item-intro {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    background-color: rgba(209, 31, 64, 0.5);
    color: #fff;
    overflow: hidden;
    position: absolute;
    bottom: 2px;
    p {
      -webkit-margin-before: 0em;
      -webkit-margin-after: 0em;
      width: 100%;
      text-align: left;
      font-weight: 700;
      // line-height: 30px;
      // height: 30px;
      box-sizing: border-box;
    }

    .user-name {
      float: right;
    }
  }
  .item-oper {
    overflow: hidden;
    .user-score,
    a {
      line-height: 30px;
      color: rgb(203, 23, 58);
      font-weight: 700;
    }
    a {
      float: right;
    }
    .van-button {
      float: right;
    }
  }
}
</style>


