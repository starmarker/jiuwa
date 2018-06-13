<template>
	<div id="app">
		<!-- <img src="./assets/logo.png"> -->
		<div class="g-bg"></div>
		<router-view />
		<van-dialog ref="dlg" v-model="show" show-cancel-button :before-close="beforeClose" :title="title">
			<van-field v-model="petname" label="小灸灸昵称" placeholder="给小灸灸取一个名字" class="jiujiu" /> </van-dialog>
		<bindTel v-model="bindTelShow" @bindok="bindok" :showclose="show_close"></bindTel>
	</div>
</template>
<script>
	import bindTel from "./components/baseComponents/bindTel";
	export default {
		name: "App",
		components: {
			bindTel
		},
		data() {
			return {
				show: false,
				petname: "",
				id: "",
				title: "给小灸灸取一个名字",
				bindTelShow: false,
				//是否显示取消按钮
				show_close: false,
				bindok_topath: function() {}
			};
		},
		computed: {
			activity_token() {
				let result = this.getQueryString("token");
				return result;
			}
		},
		methods: {
			save_jiuwa_name(callback, errorcallback, petname, id) {
				let _this = this;
				let j_msg = "领养小灸灸成功，你可以采集艾草让小灸灸成长咯";
				let user_type = 0;
				let module_token = this.$api_urls["getJiuwa"];
				let inviter_token = this.inviter_token;
				if(id) {
					module_token = this.$api_urls["editJiuwa"];
					j_msg = "修改小灸灸昵称成功";
				}
				_this.$api({
					name: "com_manage",
					params: {
						activity_token: _this.activity_token,
						user_type: user_type,
						module_token: module_token,
						inviter_token: inviter_token,
						petname: petname,
						id: id
					},
					callback: function(res) {
						if(res.data.code == 1) {
							_this.$alert_dlg(j_msg, "", () => {
								window.location.reload();
							});
						} else {
							_this.$alert_dlg(res.data.msg);
							errorcallback();
						}
					},
					errcallback: function(res) {
						_this.$err("领养失败,原因未知");
						errorcallback();
					}
				});
			},
			beforeClose(action, done) {
				let _this = this;
				if(action == "confirm") {
					this.save_jiuwa_name(function() {
						done();
					}, function() {
						_this.$refs.dlg.loading[action] = false;
					}, this.petname, this.id)
				} else {
					this.petname = "";
					done();
				}
				this.$offEvent("subname");
			},
			bindPhone(show_close, topath) {
				console.log("触发了绑定手机号");
				this.bindTelShow = true;
				this.show_close = show_close;
				this.bindok_topath = topath;
			},
			bindok() {
				this.$go(this.bindok_topath);
			}
		},
		mounted() {
			this.$onEvent("showConfirm", (petname, id) => {
				this.show = true;
				if(id) {
					this.title = "给小灸灸换个好听的名字吧";
				}
				this.petname = petname;
				this.id = id;
			});
			this.$onEvent("bindPhone", this.bindPhone);
		}
	};
</script>
<style>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-bottom: 50px;
	}

	.g-bg {
		top: 0px;
		position: fixed;
		width: 100%;
		height: 100%;
		background-image: url("./assets/app_bg.jpg");
		background-attachment: fixed;
		background-size: 100% 100%;
		z-index: -1;
	}

	.jiujiu .van-field__control {
		border-bottom: 1px solid #38f;
		box-sizing: border-box;
		padding-left: 5px;
	}
</style>