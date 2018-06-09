<template>
  <div class="jiu-info" :class="{'baby':model.type==0,'normal':model.fall_type==0 && model.type==1}" :style="disease_bg">
      <!-- <p>你的艾草颗数:{{model.aicao_number}}</p> -->
      <!-- <p>{{model.name}}</p>
      <div class="progress">
          小九九成长度:{{model.experience+'/100'}}
      </div>
      <div class="jiu-img">
         <img :src="model.img_url" alt="" srcset=""> 
         {{showInfo}}
         <van-button size="small" @click="dealInfo">{{buttonText}}</van-button>
      </div> -->
  </div>
</template>
<script>
export default {
  name: "jiuInfo",
  props: {
    model: {
      type: Object,
      default: () => {
        return {
          ill_name: "感冒",
          type: 0,
          fall_type: 0
        };
      }
    },
    img: {
      type: String,
      default: ""
    }
  },
  computed: {
    disease_bg() {
      let result = {};
      if (this.model.fall_type == 1 && this.model.type == 1) {
        result = { "background-image": "url(" + this.img + ")" };
      }
      return result;
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.jiu-info {
  position: absolute;
  bottom: 18vh;
  left: 18vw;
  width: 60vw;
  height: 62vw;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 3;
}
.baby {
  background-image: url("../../assets/xjj_baby.gif");
  background-size: 80% 80%;
}
.illness {
  background-image: url("../../assets/xjj_illness.png");
}
.normal {
  background-image: url("../../assets/xjj_normal.gif");
}
</style>


