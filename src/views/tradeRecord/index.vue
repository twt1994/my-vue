<template>
	<div class="tradeRecord">
		<!--搜索-->
		<el-form @keyup.enter.native="selectGoodsOrder" ref="tradeRecordForm" :model="tradeRecordForm" label-width="80px">
			<el-form-item label="关键字">
				<el-input v-model="tradeRecordForm.keyword"></el-input>
			</el-form-item>
			<el-form-item label="订单编号">
				<el-input v-model="tradeRecordForm.orderNumber"></el-input>
			</el-form-item>
			<el-form-item label="ASIN">
				<el-input v-model="tradeRecordForm.asin"></el-input>
			</el-form-item>
			<el-form-item label="站点">
				<el-select v-model="tradeRecordForm.site" placeholder="请选择站点">
					<el-option label="全部" value=""></el-option>
					<el-option label="美国" value="美国"></el-option>
					<el-option label="加拿大" value="加拿大"></el-option>
					<el-option label="墨西哥" value="墨西哥"></el-option>
					<el-option label="英国" value="英国"></el-option>
					<el-option label="法国" value="法国"></el-option>
					<el-option label="西班牙" value="西班牙"></el-option>
					<el-option label="德国" value="德国"></el-option>
					<el-option label="意大利" value="意大利"></el-option>
					<el-option label="日本" value="日本"></el-option>
					<el-option label="澳大利亚" value="澳大利亚"></el-option>
				</el-select>
			</el-form-item>
			<el-button style="margin-left:20px;" @click="selectGoodsOrder" type="primary">查询</el-button>
		</el-form>
		<!--选项卡-->
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="-1">全部</el-menu-item>
			<el-menu-item index="0">待付款</el-menu-item>
			<el-menu-item index="1">待审核 </el-menu-item>
			<el-menu-item index="2">交易成功 </el-menu-item>
			<el-menu-item index="3">驳回 </el-menu-item>
			<!--<el-menu-item index="4">用户取消订单 </el-menu-item>-->
		</el-menu>
		<!--表格-->
		<el-table style="width:100%;border-right:1px solid #eee;" :data="tableData">
			<el-table-column prop="orderNumber" label="">
				<template slot-scope="scope">
					<input @change="changeChose(scope.row.id,$event)" type="checkbox" />
				</template>
			</el-table-column>
			<el-table-column prop="orderNumber" label="订单编号">
			</el-table-column>
			<el-table-column prop="site" label="站点">
			</el-table-column>
			<el-table-column prop="asin" label="ASIN">
			</el-table-column>
			<el-table-column prop="totalPrice" label="总价">
			</el-table-column>
			<el-table-column prop="networkNumber" label="官网单号">
				<template slot-scope="scope">
					<span>{{scope.row.networkNumber?scope.row.networkNumber:'-'}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="state" label="状态">
				<template slot-scope="scope">
					<span v-if="scope.row.state == -1">全部</span>
					<span v-if="scope.row.state == 0">待付款</span>
					<span v-if="scope.row.state == 1">待审核 </span>
					<span v-if="scope.row.state == 2">交易成功</span>
					<span v-if="scope.row.state == 3">驳回</span>
					<span v-if="scope.row.state == 4">用户取消订单</span>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<span @click="detail(scope.row)" style="color:blue;cursor:pointer">查看</span>
					<span @click="paymentGoodsOrder(scope.row.id)" style="color:blue;cursor:pointer">付款</span>
					<span @click="cancelOrder(scope.row.orderNumber)" style="color:blue;cursor:pointer">取消订单</span>
				</template>
			</el-table-column>
		</el-table>
		<el-button @click="paymentGoodsOrder(multipleSelection)" style="margin-top:40px;margin-left:30px;">批量付款</el-button>
		<el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tradeRecordForm.current" :page-sizes="[30, 50, 100, 200]" :page-size="tradeRecordForm.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
		<!--添加的弹出框-->
		<el-dialog class='dialogDiv' title="详情" :visible.sync="addDialogVisible">
			<el-form ref="addJson">

				<el-form-item prop='orderNumber' label="订单编号:" :label-width="formLabelWidth">
					<span>{{detailData.orderNumber}}</span>
				</el-form-item>

				<el-form-item prop='site' label="站点:" :label-width="formLabelWidth">
					<span>{{detailData.site}}</span>
				</el-form-item>

				<el-form-item prop='ASIN' label="ASIN:" :label-width="formLabelWidth">
					<span>{{detailData.asin}}</span>
				</el-form-item>

				<el-form-item prop='ASIN' label="原价($):" :label-width="formLabelWidth">
					<span>{{detailData.price}}</span>
				</el-form-item>

				<el-form-item prop='ASIN' label="汇率:" :label-width="formLabelWidth">
					<span>{{detailData.exchangeRate}}</span>
				</el-form-item>

				<el-form-item prop='ASIN' label="佣金费:" :label-width="formLabelWidth">
					<span>{{detailData.commission}}</span>
				</el-form-item>

				<el-form-item prop='totalPrice' label="总价:" :label-width="formLabelWidth">
					<span>{{detailData.totalPrice}}</span>
				</el-form-item>

				<el-form-item prop='networkNumber' label="官网单号:" :label-width="formLabelWidth">
					<span>{{detailData.networkNumber?detailData.networkNumber:'-'}}</span>
				</el-form-item>

				<el-form-item prop='logisticsNumber' label="物流单号:" :label-width="formLabelWidth">
					<span>{{detailData.logisticsNumber?detailData.logisticsNumber:'-'}}</span>
				</el-form-item>

				<el-form-item prop='ASIN' label="状态:" :label-width="formLabelWidth">
						<span v-if="detailData.state == -1">全部</span>
						<span v-if="detailData.state == 0">待付款</span>
						<span v-if="detailData.state == 1">待审核 </span>
						<span v-if="detailData.state == 2">交易成功</span>
						<span v-if="detailData.state == 3">驳回</span>
						<span v-if="detailData.state == 4">用户取消订单</span>
				</el-form-item>

				<el-form-item prop='ASIN' label="创建时间:" :label-width="formLabelWidth">
					<span>{{detailData.createTime}}</span>
				</el-form-item>

				<el-form-item prop='reject' label="驳回原因:" :label-width="formLabelWidth">
					<span>{{detailData.reject?detailData.reject:'-'}}</span>
				</el-form-item>

			</el-form>
			<div slot="footer" style="text-align:center">
				<el-button type="primary" @click="addDialogVisible=false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import API from '@/utils/api'
	import store from '@/store'
	import { getLoginData } from '@/utils/auth'

	export default {
		data() {
			return {
				tradeRecordForm: {
					state: -1,
					keyword: '',
					orderNumber: '',
					asin: '',
					uid: '',
					site: '',
					current: 1,
					size: 10,
				},
				total: 0,
				activeIndex: '0',
				tableData: [],
				addDialogVisible: false,
				detailData: {},
				formLabelWidth: '80px',
				multipleSelection:[],
			}
		},
		mounted() {
			this.selectGoodsOrder()
		},
		methods: {
			//选项卡
			handleSelect(key, keyPath) {
				this.tradeRecordForm.state = key
				this.selectGoodsOrder()
			},
			//交易记录
			selectGoodsOrder() {
				let loginData = JSON.parse(getLoginData())
				this.tradeRecordForm.uid = loginData.id
				API.selectGoodsOrder(this.tradeRecordForm).then(res => {
					if(res.code == 200) {
						this.total = res.data.total
						this.tableData = res.data.records
						this.tableData.forEach(ele => {
							let time = new Date(ele.createTime)
							ele.createTime = time.getFullYear() + '-' +
								(time.getMonth() + 1) + '-' +
								time.getDate() + ' ' +
								time.getHours() + ':' +
								time.getMinutes() + ':' +
								time.getSeconds();
						})
					}
				})
			},
			//详情
			detail(data) {
				console.log(data)
				this.addDialogVisible = true
				this.detailData = data
			},
			//付款
			paymentGoodsOrder(ids){
				let idArr = []
				console.log(ids instanceof Array)
				if(ids instanceof Array){
					idArr = ids
				}else{
					idArr = [ids]
				}
				console.log(idArr)
				API.paymentGoodsOrder(idArr).then(res => {
					if(res.code == 200){
						this.$message({
							showClose: true,
							message:'付款成功',
							type: 'success'
						});
						this.selectGoodsOrder()
					}else{
						this.$message({
							showClose: true,
							message: res.message,
							type: 'error'
						});
					}
				})
			},
			//点击选中某一条数据
			changeChose(id,e){
				if(e.target.checked){
					this.multipleSelection.push(id)
				}else{
					this.multipleSelection.splice( this.multipleSelection.indexOf( id ), 1 );
				}
			},
			//取消订单
			cancelOrder(cancelOrder){
				API.cancelOrder(cancelOrder).then(res => {
					if(res.code = 200){
						this.selectGoodsOrder()
					}
				})
			},
			//点击页码跳转
			handleCurrentChange(val) {
				this.tradeRecordForm.current = val;
				this.selectRechargeRecord()
			},
			//改变当前显示条数
			handleSizeChange(val) {
				this.tradeRecordForm.size = val;
				this.selectRechargeRecord()
			},
		}
	}
</script>

<style>
	.tradeRecord {
		margin-top: 20px;
	}
	
	.tradeRecord .el-form-item {
		width: 300px;
		display: inline-block;
	}
	
	.tradeRecord .el-form-item__content {
		width: 220px;
	}
	
	.tradeRecord .el-select {
		width: 100%;
	}
	
	.tradeRecord .el-table td,
	.tradeRecord .el-table th.is-leaf {
		text-align: center;
	}
	
	.pagination {
		float: right;
		margin-top: 40px;
	}
</style>