<template>
    <div class="team">
        <a href="javascript:;" @click="prev" class="prev"><van-icon name="arrow-left" v-if="showNav && members.length>shownumber"/></a>
        <a href="javascript:;" @click="next" class="next"><van-icon name="arrow"  v-if="showNav && members.length>shownumber" /></a>
        <van-row>
          <van-col span="5" v-for="el in showArray" :key="el.user_token">
            <img :src="el.headimage" alt="" srcset=""  @click="click(el.user_token)">
          </van-col>
        <div class="members-btn" v-if="showBtn" @click="btnClick">
        </div>
        </van-row> 
 
       <van-popup v-model="showAll" :close-on-click-overlay="true" :overlay-style="{height:'100vh'}" :lock-scroll="true" class="help-div">
        <van-nav-bar title="全部队友" />
        <van-row>
          <van-col span="4" v-for="el in members" :key="el.user_token" style="padding-top:10px;">
            <img :src="el.headimage" alt="" srcset=""  @click="click(el.user_token)">
            <p>{{el.user_name}}</p>
          </van-col>
        </van-row>      
      </van-popup>      
    </div>
</template>
<script>
export default {
  name: "teamMember",
  props: {
    members: {
      type: Array,
      default: () => {
        return {
          user_token: "",
          nickname: "",
          headimage: "",
          user_name: "123"
        };
      }
    },
    shownumber: {
      type: Number,
      default: 4
    },
    showNav: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page: 1,
      showAll: false
    };
  },
  computed: {
    showArray() {
      let start = (this.page - 1) * this.shownumber,
        end = this.page * this.shownumber;
      return this.members.slice(start, end);
    },
    lastPage() {
      return Math.ceil(this.members.length / this.shownumber);
    }
  },
  methods: {
    click(user_token) {
      this.$emit("avatar_click", user_token);
    },
    prev() {
      if (this.page > 1) {
        this.page--;
      } else {
        this.page = this.lastPage;
      }
    },
    next() {
      if (this.page < this.lastPage) {
        this.page++;
      } else {
        this.page = 1;
      }
    },
    btnClick() {
      if (this.members.length > 0) {
        this.$emit("btnClick");
        this.showAll = true;
      } else {
        this.$alert_dlg("没有更多队友");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.team {
  max-width: 70vw;
  display: table;
  white-space: nowrap;
  position: relative;
  min-height: 40px;
  min-width: 100px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  a {
    position: absolute;
    top: 30%;
    color: #666;
    &.prev {
      left: 10px;
    }
    &.next {
      right: 10px;
    }
  }
  .van-row {
    width: fill-available;
    margin: 0 auto;
    margin-left: 10%;
    box-sizing: border-box;
    position: relative;
    padding-right: 11vw;
    .van-col {
      text-align: center;
      img {
        width: 90%;
        border-radius: 50%;
      }
      p {
        font-size: 10px;
        text-align: center;
        max-width: 100%;
        overflow: hidden;
        text-overflow: clip;
        white-space: nowrap;
      }
    }
  }
  .members-btn {
    width: 10vw;
    height: 10vw;
    background-image: url("../../assets/pick_team_btn.png");
    background-size: contain;
    float: right;
    position: absolute;
    right: 0;
    top: 0;
  }
  .help-div {
    width: 80%;
    max-height: 80%;
    background-color: rgba(255, 255, 255, 0.8);
    overflow-y: auto;
    .van-nav-bar {
      background-color: transparent;
      color: #45a50e;
      font-size: 18px;
    }
    .van-tab__pane {
      padding: 15px;
      padding-top: 3px;
      box-sizing: border-box;
    }
    .van-row {
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
      position: relative;
      padding-right: 0;
      .van-col {
        p {
          -webkit-margin-before: 0.2em;
          -webkit-margin-after: 0.2em;
          font-size: 10px;
          text-align: center;
          max-width: 90%;
          overflow: hidden;
          text-overflow: clip;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>


