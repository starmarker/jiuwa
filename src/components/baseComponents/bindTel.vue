<template>
	<van-dialog ref="dlg" v-model="show" :show-cancel-button="showclose" :before-close="beforeClose">
		<div class="bind_main">
			<div class="bind_title">绑定手机</div>
			<van-cell-group>
				<van-field v-model="phone" type="phone" label="手机号" placeholder="请输入手机号"></van-field>
				<van-field center v-model="sms" label="验证码" placeholder="请输入短信验证码" icon="clear" @click-icon="sendCode">
					<!-- <van-button slot="icon" size="small" type="primary" :disabled="isSended">{{isSended?seconds+'秒':'获取验证码'}}</van-button> -->
					<sendMessage slot="icon" :tag="sms_tag" v-model="phone" ref="sendCode"></sendMessage>
				</van-field>
			</van-cell-group>
		</div>
	</van-dialog>
	<!-- <button @click="back">返回</button> --></template>
<script>
	import { Toast } from "vant";
	import sendMessage from "../sendSMSCode";
	export default {
		props: {
			value: Boolean,
			showclose: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show: false,
				phone: "",
				sms: "",
				isSended: false,
				seconds: 5,
				sms_tag: "绑定手机号码"
			};
		},
		watch: {
			value(new_v, old_v) {
				this.show = new_v;
			},
			show(new_v, old_v) {
				this.$emit("input", new_v);
			}
		},
		components: {
			sendMessage
		},
		computed: {
			title() {
				return this.$route.meta.title;
			}
		},
		mounted() {},
		methods: {
			beforeClose(action, done) {
				const _this = this;
				if(action === 'confirm') {
					if(_this.phone == "") {
						Toast.fail("电话不能为空");
						_this.$refs.dlg.loading[action] = false;
						return false;
					} else if(_this.sms == "") {
						Toast.fail("验证码必填");
						_this.$refs.dlg.loading[action] = false;
						return false;
					}
					_this.$api({
						name: "bindphone",
						params: {
							phone: _this.phone,
							code: _this.sms,
							sms_tag: _this.sms_tag
						},
						callback: function(json_result) {
							if(json_result.data !== false) {
								_this.$session("is_ckbindphone", "1");
								done();

								if(json_result.data !== true){
									//更新登录信息
									_this.$login_info(json_result.data);
								}

								//只能用alert不是会被遮挡
								alert("绑定成功！");
								if(!_this.showclose) {
									window.location.reload();
								} else {
									_this.$emit("bindok");
								}
							} else {
								alert(json_result.msg);
								_this.$refs.dlg.loading[action] = false;
							}
						},
						errcallback: function(json_result) {
							alert(json_result.msg);
							_this.$refs.dlg.loading[action] = false;
						},
						catchcallback: function(message) {
							alert(message);
							_this.$refs.dlg.loading[action] = false;
						}
					});
				} else {
					done();
				}
			},
			sendCode() {
				//前面逻辑
				const tel = /^1[1-9]\d{9}/;
				if(!tel.test(this.phone)) {
					Toast.fail("电话不合法");
					return false;
				} else {
					console.log("验证通过");
					this.$refs.sendCode.send_phone_code();
					//执行获取验证码操作
				}
			}
		}
	};
</script>
<style scoped>
	.bind_main {
		padding-bottom: 20px;
	}

	.bind_title {
		padding: 20px 0px;
		font-size: 19px;
		text-align: center;
	}
</style>