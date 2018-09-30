<template>
  <div class="tradeRecord">
    <!--搜索-->
    <el-form ref="tradeRecordForm" :model="tradeRecordForm" @keyup.enter.native="selectGoodsOrder" label-width="80px">
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
          <el-option label="区域一" value="shanghai"/>
          <el-option label="区域二" value="beijing"/>
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
      <el-menu-item index="4">用户取消订单 </el-menu-item>
    </el-menu>
    <!--表格-->
    <el-table :data="tableData" style="width:100%;border-right:1px solid #eee;">
      <el-table-column prop="orderNumber" label="订单编号"/>
      <el-table-column prop="site" label="站点"/>
      <el-table-column prop="asin" label="ASIN"/>
      <el-table-column prop="" label="总价"/>
      <el-table-column prop="" label="官网单号"/>
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
      <el-table-column prop="" label="创建时间"/>
      <el-table-column prop="" label="操作">
        <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-table-column>
    </el-table>
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
      activeIndex: '0',
      tableData: [{
        orderNumber: '1111',
        site: '111',
        asin: '222',
        state: '0'
      }, {
        orderNumber: '1111',
        site: '111',
        asin: '222',
        state: '1'
      }, {
        orderNumber: '1111',
        site: '111',
        asin: '222',
        state: '2'
      }, {
        orderNumber: '1111',
        site: '111',
        asin: '222',
        state: '3'
      }]
    }
  },
  mounted() {
    this.selectGoodsOrder()
  },
  methods: {
    handleSelect(key, keyPath) {
      this.tradeRecordForm.state = key
      this.selectGoodsOrder()
    },
    // 交易记录
    selectGoodsOrder() {
      const loginData = JSON.parse(getLoginData())
      this.tradeRecordForm.uid = loginData.id
      API.selectGoodsOrder(this.tradeRecordForm).then(res => {

      })
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
</style>
