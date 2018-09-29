<template>
	<div class="register-container">
		<el-form @keyup.enter.native="handleLogin" ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">
			<h3 class="title">后台管理</h3>
			<el-form-item prop="phone">
				<span class="svg-container">
          <!--<svg-icon icon-class="user" />-->
          	手机号
        </span>
				<el-input v-model="registerForm.phone" name="username" type="text" auto-complete="on" placeholder="请输入手机号" />
			</el-form-item>
			<el-form-item prop="telStr">
				<span class="svg-container">
          	验证码
        </span>
				<el-input style="width:calc(100% - 200px)" v-model="registerForm.telStr" name="username" type="text" auto-complete="on" placeholder="请输入手机验证码" />
				<span @click="getCode" style="cursor:pointer;width:100px;" class="svg-container">
          	获取验证码
        </span>
			</el-form-item>
			<el-form-item prop="password">
				<span class="svg-container">
          	新密码
        </span>
				<el-input v-model="registerForm.password" name="username" :type="pwdType" auto-complete="on" placeholder="请输入密码" />
				<span class="show-pwd" @click="showPwd">
      		<svg-icon icon-class="eye" />
        </span>
			</el-form-item>
			<el-form-item prop="pawAgain">
				<span class="svg-container">
          	确认密码
        </span>
				<el-input :type="pwdType2" v-model="registerForm.pawAgain" name="password" auto-complete="on" placeholder="请重新输入密码" />
				<span class="show-pwd" @click="showPwd2">
          <svg-icon icon-class="eye" />
        </span>
			</el-form-item>
			<el-form-item>
				<el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="goRegister">
					注册
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { Message, MessageBox } from 'element-ui'
	import { isvalidUsername } from '@/utils/validate'
	import API from '@/utils/api'
	let vm;
	export default {
		name: 'register',
		data() {
			const validatePhone = (rule, value, callback) => {
				if(value.length != 11) {
					callback(new Error('请输入正确的手机号'))
				} else {
					callback()
				}
			}
			const validateTelStr = (rule, value, callback) => {
				if(value.length < 1) {
					callback(new Error('验证码不能为空'))
				} else {
					callback()
				}
			}
			const validatePass = (rule, value, callback) => {
				if(value.length < 5) {
					callback(new Error('密码不能小于5位'))
				} else {
					callback()
				}
			}
			return {
				registerForm: {
					phone: '',
					telStr: '',
					password: '',
					pawAgain: ''
				},
				registerRules: {
					phone: [{
						required: true,
						trigger: 'blur',
						validator: validatePhone
					}],
					telStr: [{
						required: true,
						trigger: 'blur',
						validator: validateTelStr
					}],
					password: [{
						required: true,
						trigger: 'blur',
						validator: validatePass
					}],
					pawAgain: [{
						required: true,
						trigger: 'blur',
						validator: validatePass
					}]
				},
				loading: false,
				pwdType: 'password',
				pwdType2: 'password',
				redirect: undefined
			}
		},
		mounted(){
			vm = this;
		},
		watch: {
			$route: {
				/*handler: function(route) {
					this.redirect = route.query && route.query.redirect
				},
				immediate: true*/
			}
		},
		methods: {
			showPwd() {
				if(this.pwdType === 'password') {
					this.pwdType = ''
				} else {
					this.pwdType = 'password'
				}
			},
			showPwd2() {
				if(this.pwdType2 === 'password') {
					this.pwdType2 = ''
				} else {
					this.pwdType2 = 'password'
				}
			},
			//获取短信验证码
			getCode() {
				API.getCode('token', this.registerForm.phone).then(res => {
					console.log('sucess,sucess')
					if(res.code == 200) {
						this.$message({
							showClose: true,
							message: '验证码发送成功',
							type: 'success'
						});
					} else {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'error',
						})
					}
				})
			},
			goRegister() {
				this.$refs.registerForm.validate(valid => {
					if(!valid) {
						return
					}
					this.loading = true
					API.goRegister(this.registerForm.phone, this.registerForm.telStr, this.registerForm.password).then(res => {
						this.loading = false
						this.loading = false
						if(res.code == 200) {
							vm.$router.push('login')
						}else if (res.code == 400) {
							this.$message({
								showClose: false,
								message: res.message,
								type: 'warning',
								close:function(index){
									console.log(index)
									vm.$router.push('login')
								}
							})
							
						}else {
							this.$message({
								message: res.message,
								type: 'error',
							})
						}
					})

				})
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	$bg:#2d3a4b;
	$light_gray:#eee;
	/* reset element-ui css */
	
	.register-container {
		.el-input {
			display: inline-block;
			height: 47px;
			width: calc(100% - 90px);
			input {
				background: transparent;
				border: 0px;
				-webkit-appearance: none;
				border-radius: 0px;
				padding: 12px 5px 12px 15px;
				color: $light_gray;
				height: 47px;
				&:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
					-webkit-text-fill-color: #fff !important;
				}
			}
		}
		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #454545;
		}
	}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
	$bg:#2d3a4b;
	$dark_gray:#889aa4;
	$light_gray:#eee;
	.register-container {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: $bg;
		.register-form {
			position: absolute;
			left: 0;
			right: 0;
			width: 520px;
			max-width: 100%;
			padding: 35px 35px 15px 35px;
			margin: 120px auto;
		}
		.tips {
			font-size: 14px;
			color: #fff;
			margin-bottom: 10px;
			span {
				&:first-of-type {
					margin-right: 16px;
				}
			}
		}
		.svg-container {
			padding: 6px 5px 6px 15px;
			color: $dark_gray;
			vertical-align: middle;
			width: 80px;
			display: inline-block;
		}
		.title {
			font-size: 26px;
			font-weight: 400;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
		.show-pwd {
			position: absolute;
			right: 10px;
			top: 7px;
			font-size: 16px;
			color: $dark_gray;
			cursor: pointer;
			user-select: none;
		}
	}
</style>