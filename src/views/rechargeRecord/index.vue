<template>
	<div class="rechargeRecord">
		<h3>充值记录</h3>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="活动时间">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
			</el-form-item>
			<el-form-item label="活动时间">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.date2"></el-date-picker>
			</el-form-item>
		</el-form>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1">全部</el-menu-item>
			<el-menu-item index="2">充值</el-menu-item>
			<el-menu-item index="3">提现</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	import API from '@/utils/api'
	import { getToken } from '@/utils/auth'
	
	export default {
		data() {
			return {
				form:{
					date1:'',
					date2:''
				},
				activeIndex: '1',
			}
		},
		mounted() {
			this.selectRechargeRecord()
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			selectRechargeRecord(){
//				let token = getToken()
				API.selectRechargeRecord({}).then(res => {
					
				})
			},
		},
	}
</script>

<style>
	.rechargeRecord{
		/*overflow:hidden;*/
	}
	.rechargeRecord .el-form-item{
		width:300px;
		display:inline-block;
		/*float:left;*/
	}
	.rechargeRecord .el-form-item__content{
		width:220px;
	}
</style>