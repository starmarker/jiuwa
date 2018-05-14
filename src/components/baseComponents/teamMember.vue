<template>
    <div class="team" >
        <a href="javascript:;" @click="prev" class="prev"><van-icon name="arrow-left" /></a>
        <a href="javascript:;" @click="next" class="next"><van-icon name="arrow" /></a>
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
    }
  },
  data() {
    return {
      page: 1
    };
  },
  computed: {
    showArray() {
      let start = (this.page - 1) * 6,
        end = this.page * 6;
      return this.members.slice(start, end);
    },
    lastPage() {
      return Math.ceil(this.members.length / 6);
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
  a {
    position: absolute;
    top: 30%;
    &.prev {
      left: 10px;
    }
    &.next {
      right: 10px;
    }
  }
  .van-row {
    width: 80%;
    marign: 0 auto;
    margin-left: 10%;
    .van-col img {
      width: 90%;
      border-radius: 50%;
    }
  }
}
</style>


