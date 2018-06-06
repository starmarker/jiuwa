<template>
  <div class="listitem" v-if="item!==null">
      <div class="item-header" @click="jumpPage">
          <img :src="item.liliao_image_src" alt="" srcset="" >
          <div class="item-intro">
              <p class="match-no">编号:{{item.id}} <span class="user-name">{{item.user_name}}</span></p>
              <!-- <p class="user-name">{{item.nickname}}</p> -->          
          </div>
          <span class="user-score">得分:{{Number(item.basescore).toFixed(0)}}</span>
      </div>
      <div class="item-oper">
              
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
          user_name: "",
          basescore: ""
        };
      }
    }
  },
  computed: {
    match_no() {
      return (Array(4).join("0") + this.item.id).slice(-4);
      // let id = this.item.id + "";
      // return id.padStart(4, "0");
    }
  },
  methods: {
    pick() {
      this.$emit("pick", this.item.user_token);
    },
    jumpPage() {
      this.$emit("jumpPage", this.item.user_token);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/base.less";
.listitem {
  width: 96%;
  .box-shadow(3px);
  box-sizing: border-box;
  text-align: left;
  font-size: 14px;
  margin: 1vw auto;
  padding: 4px 4px 0px 4px;
  background-color: #fff;
  padding-bottom: 0;
  border-radius: 10px;
  .item-header {
    text-align: center;
    position: relative;
    height: 60vw;
    border: 1px solid #f3f3f3;
    box-sizing: border-box;
    // border-bottom: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    .user-score {
      position: absolute;
      top: 0px;
      left: 0px;
      text-align: left;
      width: 100%;
      box-sizing: border-box;
      padding-left: 5px;
      background-color: rgba(209, 31, 64, 0.5);
      color: #fff;
      font-size: 16px;
    }
  }
  .item-intro {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    // background-color: rgba(159, 194, 138, 0.4);
    background-color: rgba(209, 31, 64, 0.5);
    color: #fff;
    overflow: hidden;
    position: absolute;
    bottom: 0px;
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
      max-width: 60%;
      display: inline-block;
      overflow: hidden;
      text-overflow: clip;
      white-space: nowrap;
    }
  }
  .item-oper {
    overflow: hidden;
    padding: 5px 1px;
    box-sizing: border-box;

    a {
      // line-height: 36px;
      width: 100%;
      display: inline-block;
      color: rgb(203, 23, 58);
      font-weight: 700;
      background-color: rgba(159, 194, 138, 1);
      position: relative;
      box-sizing: border-box;
      text-align: center;
      color: #fff;
      padding: 4px 5px;
      border-radius: 4px;
    }
    .van-button {
      float: right;
    }
  }
}
</style>
