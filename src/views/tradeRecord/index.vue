<template>
  <div class="tradeRecord">
    <!--搜索-->
    <el-form ref="tradeRecordForm" :model="tradeRecordForm" label-width="80px" @keyup.enter.native="selectGoodsOrder">
      <el-form-item label="关键字">
        <el-input v-model="tradeRecordForm.keyword"/>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="tradeRecordForm.orderNumber"/>
      </el-form-item>
      <el-form-item label="ASIN">
        <el-input v-model="tradeRecordForm.asin"/>
      </el-form-item>
      <el-form-item label="站点">
        <el-select v-model="tradeRecordForm.site" placeholder="请选择站点">
          <el-option label="全部" value=""/>
          <el-option label="美国" value="美国"/>
          <el-option label="加拿大" value="加拿大"/>
          <el-option label="墨西哥" value="墨西哥"/>
          <el-option label="英国" value="英国"/>
          <el-option label="法国" value="法国"/>
          <el-option label="西班牙" value="西班牙"/>
          <el-option label="德国" value="德国"/>
          <el-option label="意大利" value="意大利"/>
          <el-option label="日本" value="日本"/>
          <el-option label="澳大利亚" value="澳大利亚"/>
        </el-select>
      </el-form-item>
      <el-button style="margin-left:20px;" type="primary" @click="selectGoodsOrder">查询</el-button>
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
    <el-table :data="tableData" style="width:100%;border-right:1px solid #eee;">
      <el-table-column prop="orderNumber" label="">
        <template slot-scope="scope">
          <input type="checkbox" @change="changeChose(scope.row.id,$event)" >
        </template>
      </el-table-column>
      <el-table-column prop="orderNumber" label="订单编号"/>
      <el-table-column prop="site" label="站点"/>
      <el-table-column prop="asin" label="ASIN"/>
      <el-table-column prop="totalPrice" label="总价"/>
      <el-table-column prop="networkNumber" label="官网单号">
        <template slot-scope="scope">
          <span>{{ scope.row.networkNumber?scope.row.networkNumber:'-' }}</span>
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
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span style="color:blue;cursor:pointer" @click="detail(scope.row)">查看</span>
          <span v-if="scope.row.state == 0" style="color:blue;cursor:pointer" @click="paymentGoodsOrder(scope.row.id)">付款</span>
          <span v-if="scope.row.state == 0" style="color:blue;cursor:pointer" @click="cancelOrder(scope.row.orderNumber)">取消订单</span>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin-top:40px;margin-left:30px;" @click="paymentGoodsOrder(multipleSelection)">批量付款</el-button>
    <el-pagination :current-page="tradeRecordForm.current" class="pagination" :page-sizes="[30, 50, 100, 200]" @size-change="handleSizeChange" :page-size="tradeRecordForm.size" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="total"/>
    <!--添加的弹出框-->
    <el-dialog :visible.sync="addDialogVisible" class="dialogDiv" title="详情">
      <el-form ref="addJson">

        <el-form-item :label-width="formLabelWidth" prop="orderNumber" label="订单编号:">
          <span>{{ detailData.orderNumber }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="site" label="站点:">
          <span>{{ detailData.site }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="ASIN" label="ASIN:">
          <span>{{ detailData.asin }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="ASIN" label="原价($):">
          <span>{{ detailData.price }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="ASIN" label="汇率:">
          <span>{{ detailData.exchangeRate }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="ASIN" label="佣金费:">
          <span>{{ detailData.commission }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="totalPrice" label="总价:">
          <span>{{ detailData.totalPrice }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="networkNumber" label="官网单号:">
          <span>{{ detailData.networkNumber?detailData.networkNumber:'-' }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="logisticsNumber" label="物流单号:">
          <span>{{ detailData.logisticsNumber?detailData.logisticsNumber:'-' }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="ASIN" label="状态:">
          <span v-if="detailData.state == -1">全部</span>
          <span v-if="detailData.state == 0">待付款</span>
          <span v-if="detailData.state == 1">待审核 </span>
          <span v-if="detailData.state == 2">交易成功</span>
          <span v-if="detailData.state == 3">驳回</span>
          <span v-if="detailData.state == 4">用户取消订单</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="ASIN" label="创建时间:">
          <span>{{ detailData.createTime }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="reject" label="驳回原因:">
          <span>{{ detailData.reject?detailData.reject:'-' }}</span>
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
        size: 10
      },
      total: 0,
      activeIndex: '0',
      tableData: [],
      addDialogVisible: false,
      detailData: {},
      formLabelWidth: '80px',
      multipleSelection: []
    }
  },
  mounted() {
    this.selectGoodsOrder()
  },
  methods: {
    // 选项卡
    handleSelect(key, keyPath) {
      this.tradeRecordForm.state = key
      this.selectGoodsOrder()
    },
    // 交易记录
    selectGoodsOrder() {
      const loginData = JSON.parse(getLoginData())
      this.tradeRecordForm.uid = loginData.id
      API.selectGoodsOrder(this.tradeRecordForm).then(res => {
        if (res.code == 200) {
          this.total = res.data.total
          this.tableData = res.data.records
          this.tableData.forEach(ele => {
            const time = new Date(ele.createTime)
            ele.createTime = time.getFullYear() + '-' +
								(time.getMonth() + 1) + '-' +
								time.getDate() + ' ' +
								time.getHours() + ':' +
								time.getMinutes() + ':' +
								time.getSeconds()
          })
        }
      })
    },
    // 详情
    detail(data) {
      console.log(data)
      this.addDialogVisible = true
      this.detailData = data
    },
    // 付款
    paymentGoodsOrder(ids) {
      let idArr = []
      console.log(ids instanceof Array)
      if (ids instanceof Array) {
        idArr = ids
      } else {
        idArr = [ids]
      }
      console.log(idArr)
      API.paymentGoodsOrder(idArr).then(res => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: '付款成功',
            type: 'success'
          })
          this.selectGoodsOrder()
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 点击选中某一条数据
    changeChose(id, e) {
      if (e.target.checked) {
        this.multipleSelection.push(id)
      } else {
        this.multipleSelection.splice(this.multipleSelection.indexOf(id), 1)
      }
    },
    // 取消订单
    cancelOrder(cancelOrder) {
      API.cancelOrder(cancelOrder).then(res => {
        if (res.code = 200) {
          this.selectGoodsOrder()
        }
      })
    },
    // 点击页码跳转
    handleCurrentChange(val) {
      this.tradeRecordForm.current = val
      this.selectRechargeRecord()
    },
    // 改变当前显示条数
    handleSizeChange(val) {
      this.tradeRecordForm.size = val
      this.selectRechargeRecord()
    }
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
