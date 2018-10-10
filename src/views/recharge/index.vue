<template>
  <div class="rechargeContainer">
    <h3>资金充值</h3>
    <el-form ref="form" :model="rechargeForm" label-width="80px">
      <el-form-item label="充值数量" style="width:300px;">
        <el-input v-model="rechargeForm.amount"/>
      </el-form-item>
      <el-form-item label="充值方式">
        <el-select v-model="rechargeForm.payWay">
          <el-option label="支付宝" value="zfb"/>
          <el-option label="微信" value="wexin"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {

  data() {
    return {
      rechargeForm: {
        amount: '',
        payWay: 'zfb'
      }

    }
  },
  watch: {

  },

  methods: {

  }
}
</script>
