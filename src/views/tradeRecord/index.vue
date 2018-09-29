<template>
   <div class="tradeRecord">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="关键字">
        <el-input v-model="form.keyword"></el-input>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="form.orderNumber"></el-input>
      </el-form-item>
      <el-form-item label="ASIN">
        <el-input v-model="form.asin"></el-input>
      </el-form-item>
      <el-form-item label="站点">
        <el-select v-model="form.site" placeholder="全部">
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
    </el-form>
    <el-button type="primary" @click="onSubmit">确定</el-button>
  </div>
</template>

<script>
import API from '@/utils/api'
import { getLoginData } from '@/utils/auth'
export default{
  data() {
    return {
      form:{
         asin:'',
        keyword:'',
        site:'',
        orderNumber:''
      },
      dataForm: {
        // token:'',
        phone: '15038232374',
        lv: '0',
        current: '1',
        size: '1'

      }
    }
  },
  mounted() {
    this.selectUserInfo()
  },
  methods: {
    onSubmit(){
      
      },
    // 交易记录
    selectGoodsOrder() {
      API.selectGoodsOrder(this.form).then(res => {

      })
    },
    // 用户列表
    selectUserInfo() {
      console.log(getLoginData())
      let loginData = JSON.parse(getLoginData())
      // this.dataForm.phone=loginData.name
      // this.dataForm.lv=loginData.lv
      // this.dataForm.token=loginData.token
      // this.dataForm.current=loginData.current
      // this.dataForm.size=loginData.size
      console.log(loginData)
      API.selectUserInfo(this.dataForm).then(res => {
          if(res.code===200){

          }
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
	
	.tradeRecord .el-table td,
	.tradeRecord .el-table th.is-leaf {
		text-align: center;
	}
</style>
