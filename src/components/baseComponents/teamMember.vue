<template>
    <div class="team">
        <a href="javascript:;" @click="prev"><van-icon name="arrow-left" /></a>
        <a href="javascript:;" @click="next"><van-icon name="arrow" /></a>
        <img :src="el.avatar_src" alt="" srcset="" v-for="el in members" :key="el.user_token" @click="click(el.user_token)">
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
  methods: {
    click(user_token) {
      this.$emit("avatar_click", user_token);
    },
    prev() {},
    next() {}
  }
};
</script>
<style lang="less" scoped>
.team {
  display: table;
  white-space: nowrap;
}
</style>


