<template>
    <div class="main">
        <van-nav-bar
        :title="title"
        left-text="返回"        
        left-arrow
        @click-left="$router.back()"        
        />
        <div class="detail-body">
            <!-- <h2>{{title}}</h2> -->
            <!-- <p><img :src="img_src" alt="" srcset=""></p> -->
            <div v-html="detail"></div>
        </div>
    </div>

</template>
<script>
import Base from "./baseComponents/base";
export default {
  name: "detail",
  extends: Base,
  data() {
    return {
      title: "",
      img_src: "",
      detail: ""
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let module_token = this.$api_urls["act_detail"];
      this.getData("com_manage", { module_token })
        .then(res => {
          if (res.data.code == 1) {
            this.detail = res.data.data.activity_desc;
            this.title = res.data.data.activity_title;
          } else {
            // this.$alert_dlg(res.data.msg, "", () => {
            //   //   this.$router.back();
            // });
          }
        })
        .catch(rej => {
          this.$err(rej.msg);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.detail-body {
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.7);
  min-height: 10vw;
  box-sizing: border-box;
  padding: 2vw;

  img {
    max-width: 90%;
    margin: auto;
  }
  p,
  div {
    text-align: left;
    text-indent: 2em;
    word-break: break-all;
    line-height: 2;
  }
  p {
    -webkit-margin-before: 0.2em !important;
    -webkit-margin-after: 0.2em !important;
  }
}
</style>


