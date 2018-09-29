<template>
	<div class="rechargeContainer">
		<h3>提现申请</h3>
		<el-form ref="form" :model="cashForm" label-width="90px">
			<el-form-item label="可提现金额">
				<span>111</span>
			</el-form-item>
			<el-form-item label="提现金额">
				<el-input v-model="cashForm.money"></el-input>
			</el-form-item>
			<el-form-item label="支付宝账号">
				<el-input v-model="cashForm.alipay"></el-input>
			</el-form-item>
			<el-form-item label="支付宝姓名">
				<el-input v-model="cashForm.alipayName"></el-input>
			</el-form-item>
			<el-button type="primary" @click="putForward">提交</el-button>
		</el-form>
	</div>
</template>

<script>
	import API from '@/utils/api'

	export default {

		data() {
			return {
				cashForm: {
					money: '',
					alipay: '',
					alipayName: ''
				}

			}
		},
		watch: {

		},

		methods: {
			//提现
			putForward() {
				this.cashForm.money = this.cashForm.money * 1
				API.putForward(this.cashForm).then(res => {

				})
			},
		}
	}
</script>