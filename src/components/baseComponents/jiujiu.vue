<template>
  <div class="jiu-info" :class="{'baby':model.experience<100,'illness':model.health<100,'normal':model.experience>100&&model.health==100}">
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
          ill_name: "感冒"
        };
      }
    }
  },
  computed: {
    buttonText() {
      let text = this.model.health >= 100 ? "采集艾草" : "邀请求助";
      return text;
    },
    showInfo() {
      let result;
      if (this.model.experience <= 100) {
        result = "给我采摘艾草\n我要快快长大";
      } else {
        if (this.model.health == 100) {
          let now = new Date().getHours();
          if (now < 11) {
            result = "早上好";
          } else if (now >= 11 && now < 13) {
            result = "中午好";
          } else if (now >= 13 && now < 17) {
            result = "下午好";
          } else {
            result = "晚上好";
          }
        } else {
          result = `我现在生病了，${this.model.ill_name} 找灸疗师救助我`;
        }
      }
      return result;
    },
    process_txt() {
      return this.model.experience + "/" + 100;
    },
    percentage() {
      let result = Number(this.model.experience / 100) * 100;

      return ~~result;
    }
  },
  methods: {
    dealInfo() {
      if (this.model.health < 100) {
        this.$emit("rescue");
      } else {
        this.$go("/");
      }
    }
  }
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
}
.baby {
  background-image: url("../../assets/xjj_baby.png");
}
.illness {
  background-image: url("../../assets/xjj_illness.png");
}
.normal {
  background-image: url("../../assets/xjj_illness.png");
}
</style>


