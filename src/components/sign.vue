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
      <div class="sign-body">
       <van-cell-group>
        <van-field
          v-model="sign_info.message"
          label="参赛宣言"
          type="textarea"
          placeholder="请输入参赛宣言"
          rows="1"
          autosize
        />

        <van-cell title="我的照片"></van-cell>        
        <van-cell>
          <van-uploader :after-read="onRead" accept="image/gif, image/jpeg">
            <div class="update-photo" :style="{'background-image':bgi}">
              <p>+</p>
            </div>        
          </van-uploader>
        </van-cell>

        </van-cell-group>
        <van-button type="primary" size="large">提交</van-button>
      </div>

    </div>
</template>
<script>
import Base from "./baseComponents/base";
export default {
  extends: Base,
  data() {
    return {
      sign_info: {
        message: ""
      }
    };
  },
  computed: {
    bgi() {
      return "url(" + this.user.avatar_src + ")";
    }
  },
  methods: {
    onRead() {}
  }
};
</script>
<style lang="less" scoped>
@import "vant/lib/vant-css/panel.css";
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
  .sign-body {
    text-align: left;
    .van-cell {
      font-size: 4vw;
      .van-cell__title span {
      }
    }
    .van-uploader {
      margin: auto;
      width: 100%;
    }
    .update-photo {
      display: block;
      margin: auto;
      width: 250px;
      text-align: center;
      font-size: 20vw;
      line-height: 250px;
      height: 250px;
      p {
        display: none;
      }
      &:hover p {
        display: block;
      }
    }
  }
}
</style>


