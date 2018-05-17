<template>
    <div class="main">
        <div class="sign-header">
          <van-row>
              <van-col span="8">
                  <img :src="user.avatar_src" alt="">
              </van-col>
              <van-col span="16">
                  <div class="user-info">
                      <p>姓名：{{user.nick_name}}</p>
                      <p>电话:{{user.user_tel}}</p>
                  </div>
              </van-col>
          </van-row>
      </div>
      <div class="sign-body">
       <van-cell-group>
        <van-field
          v-model="sign_info.declaration"
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
              
            </div>
            <p>+</p>        
          </van-uploader>
          
        </van-cell>

        </van-cell-group>
        <van-button type="primary" size="large" @click="submit">提交</van-button>
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
        message: "",
        liliao_image: ""
      },
      avatar_id: "",
      avatar_src: "",
      photo: {}
    };
  },
  computed: {
    bgi() {
      return "url(" + this.avatar_src + ")";
    }
  },
  async created() {
    await this.isTeacher();
    this.checkUser();
  },
  methods: {
    onRead(files) {
      let module_token = this.$api_urls["uploadPic"];
      const _this = this;
      if (files instanceof Array) {
        _this.photo = files.shift();
        if (!_this.photo) {
          return;
        }
      } else {
        _this.photo = files;
      }
      let params = new FormData(); // 创建form对象
      params.append("file", _this.photo.file, _this.photo.file.name); // 通过append向form对象添加数据
      params.append("module_token", module_token);
      params.append("dir", "images");
      params.append("from", "");
      params.append("module", "album"); // 头像填写 avatar，相册上传写 album
      params.append("name", "uploadImage");
      //return false;
      _this.$api({
        name: "com_manage",
        params: params,
        headers: {
          "Content-Type": "multipart/form-data"
        },
        callback: function(res) {
          console.log("图片上传成功", res);
          // 成功
          if (res.data.code == 1) {
            _this.avatar_id = res.data.id;
            _this.avatar_src = res.data.path;
            _this.sign_info.liliao_image = res.data.id;
            // console.log("success", res.data.id);
            // _this.editAvatar(res.data.id);
          } else {
            // 失败提示
            _this.$err(res.data.info);
          }
        },
        errcallback: function(err) {
          console.log("图片上传失败", err);
        },
        uploadProgressCallBack: function(e) {
          console.log("图片上传中", e);
        }
      });
    },
    submit() {
      let module_token = this.$api_urls["sign"];
      let obj = Object.assign({}, this.sign_info, { module_token });
      this.getData("com_manage", obj)
        .then(res => {
          this.$alert_dlg("更新报名信息成功", "", () => {});
        })
        .catch(rej => {
          this.$alert_dlg(rej.msg, "", () => {});
        });
    },
    async checkUser() {
      //await this.getStatus();
      console.log("is_teacher :", this.is_teacher);
      if (!this.is_teacher) {
        this.$alert_dlg("你不是灸疗师,无须报名", "", () => {
          this.$router.back();
        });
      }
    }
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
      p {
        position: absolute;
        font-size: 20vw;
        top: 0;
        left: 0;
        text-align: center;
        width: 100%;
        line-height: 100%;
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


