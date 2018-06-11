<template>
    <div class="main">
        <div class="sign-header">
          <van-row>
              <van-col span="8">
                  <img :src="user.avatar_src" alt="">
              </van-col>
              <van-col span="16">
                  <div class="user-info">
                      <p>昵称：{{user.nick_name}}</p>
                      <p>电话:{{user.phones[0]}}</p>
                  </div>
              </van-col>
          </van-row>
      </div>
      <div class="container">
        <div class="field-title van-hairline--bottom">参赛姓名</div>
        <van-field
          v-model="sign_info.user_name"
          type="text"
          placeholder="请输入参赛者姓名" 
          required
        />
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

      <div class="container" style="min-height:30vh">
        <div class="field-title van-hairline--bottom">我的照片</div>
        <img :src="avatar_src" alt="" srcset="" class="cur-img" v-if="this.avatar_src">
            <van-uploader :after-read="onRead" :before-read="beforeRead" accept="image/*" result-type="dataUrl">
            <div class="upload-icon">
              <van-icon name="photograph" /> 
            </div>
                                 
          </van-uploader>        
      </div>

        <van-button type="primary" size="large" @click="submit" class="submit">提交</van-button>
        <van-popup v-model="show" :overlay="true" style="width:80%;height:70%;background-color:#fff" :close-on-click-overlay="false"	>
          <vue-cropper ref="cropper" :img="photo.content" :fixed="option.fixed" :fixedNumber="option.fixedNumber" 	:autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :full="option.full" :fixedBox="option.fixedBox"/>
          <van-button type="danger" @click="cancelFixed" >
             旋转
          </van-button>
          <van-button type="primary" @click="fixedImg">确定</van-button>
        </van-popup>
      
      <GlobalFooter :teacher="is_teacher" :isact="is_signed"></GlobalFooter>
    </div>
</template>
<script>
import Base from "./baseComponents/base";
import GlobalFooter from "./baseComponents/globalFooter";
import VueCropper from "vue-cropper";
export default {
  extends: Base,
  data() {
    return {
      sign_info: {
        id: null,
        declaration: "",
        liliao_image: "",
        user_name: ""
      },
      avatar_id: "",
      avatar_src: "",
      photo: {
        file: {},
        content: ""
      },
      show: false,
      option: {
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 250,
        autoCropHeight: 300,
        fixed: true,
        fixedNumber: [5, 6],
        full: false,
        fixedBox: true
      },
      baseImg: ""
    };
  },
  components: {
    GlobalFooter,
    VueCropper
  },
  computed: {
    bgi() {
      return "url(" + this.avatar_src + ")";
    }
  },
  async created() {
    // await this.isTeacher();

    this.checkUser();
    this.getInfo();
  },
  methods: {
    beforeRead() {
      return true;
    },
    onRead(files) {
      const _this = this;
      _this.$show_loading("图片读取中", 0);
      // if (files instanceof Array) {
      //   _this.photo = files.shift();
      //   if (!_this.photo) {
      //     return;
      //   }
      // } else {
      _this.photo = files;
      // }
      _this.show = true;
      // _this.$refs.cropper.startCrop();

      let img = document.querySelector(".cropper-box img");
      img.onload = () => {
        this.$hide_loading();
      };
      // this.$hide_loading();
      // this.$hide_loading();
    },
    upload(dataUrl) {
      // let params = new FormData();
      let _this = this; // 创建form对象
      let module_token = this.$api_urls["uploadPic"];
      //let bseurl = _this.baseImg.content;
      // params.append("file", _this.photo.file, _this.photo.file.name); // 通过append向form对象添加数据
      // params.append("module_token", module_token);
      // params.append("dir", "images");
      // params.append("from", "base64");
      // params.append("module", "album"); // 头像填写 avatar，相册上传写 album
      // params.append("name", "uploadImage");
      this.$show_loading("图片上传中", 0);
      let params = {
        file: dataUrl,
        //module_token: module_token,
        dir: "images",
        from: "base64",
        module: "album"
        //name: "uploadImage"
      };
      //return false;
      _this.$api({
        name: "uploadImage",
        params: params,
        // headers: {
        //   "Content-Type": "multipart/form-data"
        // },
        callback: function(res) {
          _this.$hide_loading();
          _this.$suc("上传成功", 1000);
          // 成功
          if (res.data.code == 1) {
            _this.avatar_id = res.data.id;
            _this.avatar_src = res.data.url;
            _this.sign_info.liliao_image = res.data.id;
            // console.log("success", res.data.id);
            // _this.editAvatar(res.data.id);
          } else {
            // 失败提示
            _this.$alert_dlg(res.data.msg, () => {});
            _this.$hide_loading();
          }
        },
        errcallback: function(err) {
          _this.$hide_loading();
          _this.$err(err.msg, 1000);
          console.log("图片上传失败", err);
        },
        uploadProgressCallBack: function(e) {
          console.log("图片上传中", e);
        }
      });
    },
    async submit() {
      if (
        this.sign_info.user_name == "" ||
        this.sign_info.user_name.length > 5
      ) {
        this.$alert_dlg("参赛姓名必填且长度为1-5个汉字");
        return false;
      }
      this.$show_loading("上传中", 0);
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
          if (res.data.code == 1) {
            this.$hide_loading();
            let msg = "报名成功";
            if (this.$route.params.token) {
              msg = "修改报名信息成功";
            }
            this.$alert_dlg(msg, "", () => {
              this.$go("/");
            });
          } else {
            this.$err(res.data.msg);
          }
        })
        .catch(rej => {
          this.$hide_loading();
          this.$alert_dlg("失败，异常错误", "", () => {});
        });
    },
    async checkUser() {
      await this.isSigned();
      //await this.getStatus();
      // console.log("is_teacher :", this.is_teacher);
      // if (!this.is_teacher) {
      //   this.$alert_dlg("你不是灸疗师,无须报名", "", () => {
      //     this.$router.back();
      //   });
      // }
    },
    getInfo() {
      let user_token = this.$route.params.token;
      if (user_token) {
        let module_token = this.$api_urls["t_info"];
        this.getData("com_manage", { module_token, user_token }).then(res => {
          //this.userInfo = res.data;
          //console.log("res :", res.data);
          if (res.data.code == 1) {
            this.sign_info.id = res.data.data.id;
            this.sign_info.declaration = res.data.data.declaration;
            this.avatar_src = res.data.data.liliao_image_src;
            this.sign_info.liliao_image = res.data.data.liliao_image;
            this.sign_info.user_name = res.data.data.user_name;
          }
        });
      }
    },
    fixedImg() {
      this.$refs.cropper.stopCrop();
      this.$refs.cropper.getCropData(data => {
        let old = this.photo.content;
        // console.log("old :", old);
        // this.baseImg = data;
        // this.photo.content = data;
        // this.avatar_src = data;
        this.upload(data);
        //console.log("this.photo.content :", this.baseImg);

        //console.log("object :", this.baseImg, this.photo.content);
      });
      this.$refs.cropper.getCropBlob(data => {
        this.photo.file = data;
      });
      this.show = false;
      this.$refs.cropper.rotate = 0;
      // console.log("this.photo :", this.photo);
    },
    cancelFixed() {
      this.$refs.cropper.rotateRight();
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
  .cur-img {
    position: relative;
    z-index: 0;
    max-width: 80%;
    max-height: 40vh;
    margin: auto;
  }
  .van-uploader {
    position: absolute;
    margin: auto;
    width: 100%;
    transform: translateY(-50%);
    top: 50%;
    left: 0;
    .upload-icon {
      z-index: 5;
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
  // .van-button--primary {

  // }
  .van-button.submit {
    background-color: #9fc28a;
    border-radius: 0;
    border-color: #9fc28a;
    margin-bottom: 10vh;
  }
}
</style>


