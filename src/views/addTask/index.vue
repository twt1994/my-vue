<template>
  <div class="app-container">
    <h1 style="margin-left:100px;">添加任务</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题" style="width:300px;">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="卖家名称" style="width:300px;">
        <el-input v-model="form.sellerName"/>
      </el-form-item>
      <el-form-item label="ASIN" style="width:300px;">
        <el-input v-model="form.asin"/>
      </el-form-item>
      <el-form-item label="关键词" style="width:300px;">
        <el-input v-model="form.keyword"/>
      </el-form-item>
      <el-form-item label="商品来源" style="width:300px;">
        <el-select v-model="form.source" placeholder="选择商品来源">
          <el-option label="亚马逊" value="亚马逊"/>
          <el-option label="EBAy" value="EBAy"/>
          <el-option label="沃尔玛" value="沃尔玛"/>
        </el-select>
      </el-form-item>
      <el-form-item label="下单方式" style="width:300px;">
        <el-select v-model="form.singleWay" placeholder="选择下单方式">
          <el-option label="FBA" value="FBA"/>
          <el-option label="FBM" value="FBM"/>
        </el-select>
      </el-form-item>
      <el-form-item label="站点" style="width:300px;">
        <el-select v-model="form.site" placeholder="选择站点">
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
      <el-form-item label="原价￥" style="width:300px;">
        <el-input v-model="form.price"/>
      </el-form-item>
      <p>佣金：您是白银会员，每单佣金20人民币</p>
      <el-form-item label="数量" style="width:300px;">
        <el-input v-model="form.number"/>
      </el-form-item>
      <el-form-item label="备注" style="width:400px;">
        <el-input v-model="form.msg" type="textarea"/>
      </el-form-item>
    </el-form>
    <!-- <el-form-item> -->
    <el-button type="primary" style="margin-left:100px;" @click="onSubmit">确定</el-button>
    <el-button type="primary" style="margin-left:100px;" @click="goSubmit">模板下载</el-button>
    <!-- </el-form-item> -->
  </div>
</template>
<script>
import API from '@/utils/api'
export default {
  data() {
    return {
      form: {
        title: '',
        sellerName: '',
        asin: '',
        keyword: '',
        source: '',
        singleWay: '',
        site: '',
        price: '',
        msg: '',
        number: ''
      }
    }
  },
  methods: {
    goSubmit() {
      window.open('http://139.196.98.45/file/addgoods.xlsx')
    },
    onSubmit() {
      // console.log('submit!');
      this.addGoodsOrder()
      //  this.$refs.form.resetFields()
    },
    addGoodsOrder() {
      API.addGoodsOrder(this.form).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          this.form.title = ''
          this.form.sellerName = ''
          this.form.asin = ''
          this.form.keyword = ''
          this.form.source = ''
          this.form.price = ''
          this.form.msg = ''
          this.form.number = ''
          this.form.singleWay = ''
          this.form.site = ''
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        // this.loading = false
      })
    }
  }
}
</script>
<style>

</style>
