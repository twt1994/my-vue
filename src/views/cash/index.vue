<template>
  <div class="rechargeContainer">
    <h3>提现申请</h3>
    <el-form ref="form" :model="cashForm" label-width="90px">
      <el-form-item label="可提现金额">
        <span>{{ cashForm.money }}元</span>
      </el-form-item>
      <el-form-item label="提现金额">
        <el-input v-model="cashForm.money"/>
      </el-form-item>
      <el-form-item label="支付宝账号">
        <el-input v-model="cashForm.alipay"/>
      </el-form-item>
      <el-form-item label="支付宝姓名">
        <el-input v-model="cashForm.alipayName"/>
      </el-form-item>
      <el-button type="primary" @click="onsubmit">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import API from '@/utils/api'
import { getLoginData } from '@/utils/auth'
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
  mounted() {
  },
  methods: {
    onsubmit() {
      this.putForward()
      this.getPreMonth()
      this.getMonth()
    },
    getPreMonth() {
      var date = new Date()
      var sign1 = '-'
      var sign2 = ':'
      var year = date.getFullYear() // 年
      var month = date.getMonth() + 1 // 月
      var day = date.getDate() // 日
      var hour = date.getHours() // 时
      var minutes = date.getMinutes() // 分
      var seconds = date.getSeconds() // 秒
      // var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
      // var week = weekArr[date.getDay()]
      // 给一位数数据前面加 “0”
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (day >= 0 && day <= 9) {
        day = '0' + day
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      var currentdate = year + sign1 + month + sign1 + day + ' ' + hour + sign2 + minutes + sign2 + seconds + ' '
      console.log(currentdate)
      return currentdate
    },
    getMonth() {
      var date = new Date()
      var sign1 = '-'
      var sign2 = ':'
      var year = date.getFullYear() // 年
      var month = date.getMonth() // 月
      var day = date.getDate() // 日
      var hour = date.getHours() // 时
      var minutes = date.getMinutes() // 分
      var seconds = date.getSeconds() // 秒
      // var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
      // var week = weekArr[date.getDay()]
      // 给一位数数据前面加 “0”
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (day >= 0 && day <= 9) {
        day = '0' + day
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      var currentdate = year + sign1 + month + sign1 + day + ' ' + hour + sign2 + minutes + sign2 + seconds + ' '
      console.log(currentdate)
      return currentdate
    },
    // 提现
    putForward() {
      console.log(getLoginData(), 1111111111111)
      const loginData = JSON.parse(getLoginData())
      console.log(loginData)
      this.cashForm.money = loginData.money * 1
      API.putForward(this.cashForm).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
        }
      })
    }
  }
}
</script>
