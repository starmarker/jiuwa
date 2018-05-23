<template>
    <div class="team" >
        <a href="javascript:;" @click="prev" class="prev"><van-icon name="arrow-left" v-if="showNav && members.length>shownumber"/></a>
        <a href="javascript:;" @click="next" class="next"><van-icon name="arrow"  v-if="showNav && members.length>shownumber" /></a>
        <van-row>
          <van-col span="4" v-for="el in showArray" :key="el.user_token">
            <img :src="el.avatar_src" alt="" srcset=""  @click="click(el.user_token)">
          </van-col>
        </van-row>
        
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
          user_nickname: "",
          avatar_src: ""
        };
      }
    },
    shownumber: {
      type: Number,
      default: 5
    },
    showNav: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1
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
    }
  }
};
</script>
<style lang="less" scoped>
.team {
  display: table;
  white-space: nowrap;
  position: relative;
  min-height: 40px;
  min-width: 100px;
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
    width: 80%;
    margin: 0 auto;
    margin-left: 10%;
    .van-col img {
      width: 90%;
      border-radius: 50%;
    }
  }
}
</style>


