<template>
  <div class="app-container">
    <h1>添加任务</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="卖家名称">
        <el-input v-model="form.sellerName"></el-input>
      </el-form-item>
      <el-form-item label="ASIN">
        <el-input v-model="form.asin"></el-input>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="form.keyword"></el-input>
      </el-form-item>
      <el-form-item label="商品来源">
        <el-select v-model="form.source" placeholder="选择商品来源">
          <el-option label="亚马逊" value="亚马逊"></el-option>
          <el-option label="EBAy" value="EBAy"></el-option>
          <el-option label="沃尔玛" value="沃尔玛"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下单方式">
        <el-select v-model="form.singleWay" placeholder="选择下单方式">
          <el-option label="FBA" value="FBA"></el-option>
          <el-option label="FBM" value="FBM"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="站点">
        <el-select v-model="form.site" placeholder="选择站点">
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
      <el-form-item label="原价￥">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <p>佣金：您是白银会员，每单佣金20人民币</p>
      <el-form-item label="数量">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.msg"></el-input>
      </el-form-item>
    </el-form>
    <!-- <el-form-item> -->
      <el-button type="primary" @click="onSubmit">确定</el-button>
    <!-- </el-form-item> -->
  </div>
</template>
<script>
import API from '@/utils/api'
export default {
  data(){
    return{
      form:{
        title:'',
        sellerName:'',
        asin:'',
        keyword:'',
        source:'',
        singleWay:'',
        site:'',
        price:'',
        msg:'',
        number:''
      }
    }
  },
     methods: {
      onSubmit(){
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
         this.form.title=''
         this.form.sellerName=''
         this.form.asin=''
         this.form.keyword=''
         this.form.source=''
         this.form.price=''
         this.form.msg=''
         this.form.number=''
         this.form.singleWay=''
         this.form.site=''
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
