<template>
    <div class="main-body" v-if="is_showPage">
      <keep-alive>
        <router-view  v-if="$route.meta.keepAlive" />
      </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
             
        <global-footer ref="gfooter" v-if="!noFooter"></global-footer>
    </div>
</template>
<script>
import GlobalFooter from "./baseComponents/globalFooter";
import Base from "./baseComponents/base";
export default {
  name: "mainFrame",
  extends: Base,
  components: { GlobalFooter },
  mounted() {},

  // created() {
  //   this.isSigned();
  // },
  data() {
    return {};
  },

  watch: {
    $route: function(newvalue, oldvalue) {
      if (oldvalue.name == "sign") {
        this.$refs.gfooter.updateAct();
      }
    }
  },
  computed: {
    noFooter() {
      let noShowArr = ["myinfo", "myinfo1", "pick", "mypick", "jiuwa"];
      let cur_name = this.$route.name;
      return noShowArr.indexOf(cur_name) > -1;
    }
  },
  methods: {
    getData(name, obj) {
      this.$show_loading();
      let activity_token = this.activity_token;
      let obj1 = Object.assign({}, obj, {
        activity_token
      });
      return new Promise((resolve, reject) => {
        this.$api({
          name: name,
          params: obj1,
          callback: res => {
            resolve(res);
            this.$hide_loading();
          },
          errcallback: rej => {
            reject(rej);
            this.$hide_loading();
          },
          catchcallback: rej => {
            reject(rej);
            this.$hide_loading();
          }
        });
      });
    },
    isSigned() {
      let module_token = this.$api_urls["is_signed"];
      return new Promise((resolve, reject) => {
        this.getData("com_manage", { module_token }).then(res => {
          // Bus.$emit("isHasJiuwa", this.is_hasJiuwa);

          //Bus.$emit("isTeacher", this.is_teacher);
          this.is_signed = res.data;

          resolve(res.data);
        });
      });
    }
  }
};
</script>

