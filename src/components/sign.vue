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
      <div class="container">
        <div class="field-title van-hairline--bottom">参赛宣言</div>
        <van-field
          v-model="sign_info.declaration"
          type="textarea"
          placeholder="请输入参赛宣言"
          rows="4"
          autosize
          class="text-area"
        />
      </div>

      <div class="container">
        <div class="field-title van-hairline--bottom">我的照片</div>
            <van-uploader :after-read="onRead" accept="image/gif, image/jpeg,image/png">
            <div class="upload-icon">
              <van-icon name="photograph" /> 
            </div>
                     
          </van-uploader>        
      </div>

        <van-button type="primary" size="large" @click="submit">提交</van-button>
      
      <GlobalFooter :teacher="is_teacher" :actived="2"></GlobalFooter>
    </div>
</template>
<script>
import Base from "./baseComponents/base";
import GlobalFooter from "./baseComponents/globalFooter";
export default {
  extends: Base,
  data() {
    return {
      sign_info: {
        id: null,
        declaration: "",
        liliao_image: ""
      },
      avatar_id: "",
      avatar_src: "",
      photo: {}
    };
  },
  components: {
    GlobalFooter
  },
  computed: {
    bgi() {
      return "url(" + this.avatar_src + ")";
    }
  },
  async created() {
    await this.isTeacher();
    this.checkUser();
    this.getInfo();
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
    async submit() {
      let module_token = this.$route.params.token
        ? this.$api_urls["t_sign_update"]
        : this.$api_urls["sign"];
      let position = {};
      await this.getLocation()
        .then(res => {
          position = res;
        })
        .catch(() => {
          position = {
            longitude: "104.0678322315",
            latitude: "30.5465175160"
          };
        });
      let obj = Object.assign({}, this.sign_info, position, {
        module_token
      });
      this.getData("com_manage", obj)
        .then(res => {
          this.$alert_dlg("更新报名信息成功", "", () => {
            this.$go("/");
          });
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
    },
    getInfo() {
      let user_token = this.$route.params.token;
      if (user_token) {
        let module_token = this.$api_urls["t_info"];
        this.getData("com_manage", { module_token, user_token }).then(res => {
          //this.userInfo = res.data;
          //console.log("res :", res.data);
          this.sign_info.id = res.data.id;
          this.sign_info.declaration = res.data.declaration;
          this.avatar_src = res.data.liliao_image_src;
          this.sign_info.liliao_image = res.data.liliao_image;
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/base.less";
.main {
  .sign-header {
    .box-shadow();
    width: 100%;
    box-sizing: border-box;
    padding: 5vw 5vw;
    background-color: #fff;
    // background-image: linear-gradient(to right, orange, orangered);
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
  .container {
    .container();
    background-color: #fff;
    .field-title {
      line-height: 40px;
    }
    .text-area .van-field__control {
      border: 1px solid #9fc28a !important;
    }
  }

  .van-uploader {
    margin: auto;
    width: 100%;
    padding: 20px 0;
    .upload-icon {
      width: 20vw;
      height: 20vw;
      margin: auto;
      color: #9fc28a;
      border: 1px solid #9fc28a;
      border-radius: 50%;
      line-height: 30vw;
      i {
        font-size: 48px;
      }
    }
  }
  .van-button--primary {
    background-color: #9fc28a;
  }
  .van-button {
    border-radius: 0;
    border-color: #9fc28a;
  }
}
</style>


