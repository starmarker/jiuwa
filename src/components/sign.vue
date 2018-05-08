<template>
    <div class="main">
        <div class="sign-header">
        <van-row>
            <van-col span="8">
                <img :src="user.avatar_src" alt="">
            </van-col>
            <van-col span="16">
                <div class="user-info">
                    <p>姓名：{{user.user_nickname}}</p>
                    <p>电话:{{user.user_tel}}</p>
                </div>
            </van-col>
        </van-row>
        </div>

    </div>
</template>
<script>
import Base from "./baseComponents/base";
export default {
  extends: Base
};
</script>
<style lang="less" scoped>
.main {
  .sign-header {
    width: 100%;
    box-sizing: border-box;
    padding: 5vw 2vw;
    background-image: linear-gradient(to right, orange, orangered);
    img {
      width: 80%;
      border-radius: 50%;
    }
    .user-info {
      text-align: left;
      font-size: 4vw;
      height: 26vw;
      display: flex;
      flex-direction: column;
      p {
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        line-height: 3em;
        flex-grow: 1;
      }
    }
  }
}
</style>


