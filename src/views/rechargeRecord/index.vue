<template>
	<div class="rechargeRecord">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="开始时间">
				<el-date-picker @change="selectRechargeRecord" type="datetime" placeholder="选择日期" v-model="form.startTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
			</el-form-item>
			<el-form-item label="结束时间">
				<el-date-picker @change="selectRechargeRecord" type="datetime" placeholder="选择日期" v-model="form.endTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
			</el-form-item>
			<el-button style="margin-left:20px;" @click="selectRechargeRecord" type="primary">查询</el-button>
		</el-form>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="0">全部</el-menu-item>
			<el-menu-item index="1">充值</el-menu-item>
			<el-menu-item index="2">提现</el-menu-item>
		</el-menu>
		<el-table style="width:100%;border-right:1px solid #eee;" :data="tableData">
			<el-table-column prop="type" label="交易类型">
				<template slot-scope="scope">
					<span v-if="scope.row.type == 1">支付宝充值</span>
					<span v-if="scope.row.type == 2">微信充值</span>
					<span v-if="scope.row.type == 3">后台充值</span>
					<span v-if="scope.row.type == 4">提现</span>
				</template>
			</el-table-column>
			<el-table-column prop="money" label="交易金额">
			</el-table-column>
			<el-table-column prop="balance" label="账户余额">
			</el-table-column>
			<el-table-column prop="status" label="交易状态">
				<template slot-scope="scope">
					<span v-if="scope.row.status == 0">充值成功</span>
					<span v-if="scope.row.status == 1">提现审核中</span>
					<span v-if="scope.row.status == 2">提现成功</span>
					<span v-if="scope.row.status == 3">驳回</span>
				</template>
			</el-table-column>
			<el-table-column prop="" label="交易时间">
			</el-table-column>
		</el-table>
		<el-pagination 
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange" 
			:current-page="form.current" 
			:page-sizes="[30, 50, 100, 200]" 
			:page-size="form.size" 
			layout="total, sizes, prev, pager, next, jumper" 
			:total="total">
		</el-pagination>
	</div>
</template>

<script>
	import API from '@/utils/api'
	import { getLoginData } from '@/utils/auth'

	export default {
		data() {
			return {
				form: {
					current: 1,
					size: 10,
					id: '',
					uname: '',
					type: '0',
					money: '',
					balance: '',
					alipay: '',
					alipayName: '',
					status: '0',
					startTime: '',
					endTime: ''
				},
				activeIndex: '0',
				tableData: [{
					type: '1',
					money: 111,
					balance: 222,
					status: '0',
				}, {
					type: '2',
					money: 111,
					balance: 222,
					status: '1',
				}, {
					type: '3',
					money: 111,
					balance: 222,
					status: '2',
				}, {
					type: '4',
					money: 111,
					balance: 222,
					status: '3',
				}],
				total: 0
			}
		},
		mounted() {
			this.selectRechargeRecord()
		},
		methods: {
			handleSelect(key, keyPath) {
				this.form.type = key
				this.selectRechargeRecord()
			},
			//// 充值/提现记录
			selectRechargeRecord() {
				console.log(getLoginData())
				let loginData = JSON.parse(getLoginData())
				console.log(loginData)
				this.form.id = loginData.id
				this.form.uname = loginData.name
				API.selectRechargeRecord(this.form).then(res => {
					if(res.code == 200) {
						this.total = res.data.total
//						this.tableData = res.data.records
					}
				})
			},
			//点击页码跳转
			handleCurrentChange(val) {
				this.form.current = val;
				this.selectRechargeRecord()
			},
			//改变当前显示条数
			handleSizeChange(val) {
				this.form.size = val;
				this.selectRechargeRecord()
			},
		},
	}
</script>

<style>
	.rechargeRecord {
		margin-top: 20px;
	}
	
	.rechargeRecord .el-form-item {
		width: 300px;
		display: inline-block;
	}
	
	.rechargeRecord .el-form-item__content {
		width: 220px;
	}
	
	.rechargeRecord .el-table td,
	.rechargeRecord .el-table th.is-leaf {
		text-align: center;
	}
</style>