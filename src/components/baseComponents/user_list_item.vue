<template>
    <van-cell>
        <img :src="avatar" alt="" slot="icon" v-if="!!avatar">
        <div slot="title" :class="{'hastel':tel1!=''}">{{title}}<br/><small v-if="tel1!=''">{{tel1}}</small>  </div> 
        <van-button :type="cur_type" size="small" slot="right-icon" @click="btn_click">{{cur_text}}</van-button>        
    </van-cell>
</template>
<script>
export default {
  name: "user-list-item",
  props: {
    avatar: {
      type: String,
      default: ""
    },
    title: "",
    normalType: {
      default: "danger"
    },
    disType: { default: "disabled" },
    mormalText: { default: "向TA求助" },
    disText: { default: "已发送请求" },
    disabled: { default: false },
    tel: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    cur_type() {
      let result = !this.disabled ? this.normalType : this.disType;
      return result;
    },
    cur_text() {
      let result = !this.disabled ? this.mormalText : this.disText;
      return result;
    },
    tel1() {
      return this.tel[0] || "";
    }
  },
  methods: {
    btn_click() {
      if (!this.disabled) {
        this.$emit("btnClick");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.van-cell {
  text-align: left;
  line-height: 10vw;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.6);
  .van-cell__title div {
    padding-left: 5px;
  }
  img {
    width: 10vw;
    height: 10vw;
    border-radius: 50%;
  }
  .van-button {
    margin: auto;
  }
  .van-button--disabled {
    background-color: #666;
    color: #fff;
  }
  .hastel {
    line-height: 5vw !important;
  }
}
</style>


