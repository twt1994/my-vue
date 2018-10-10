<template>
  <div class="rechargeContainer">
    <h3>提现申请</h3>
    <!-- <div>可提现金额:{{ userMsg.money }}</div> -->
    <el-form ref="form" :model="cashForm" label-width="90px">
      <el-form-item label="可提现金额">
        <span>{{ userMsg.money }}</span>
      </el-form-item>
      <el-form-item label="提现金额" style="width:350px;">
        <el-input v-model="cashForm.money"/>
      </el-form-item>
      <el-form-item label="支付宝账号" style="width:350px;">
        <el-input v-model="cashForm.alipay"/>
      </el-form-item>
      <el-form-item label="支付宝姓名" style="width:350px;">
        <el-input v-model="cashForm.alipayName"/>
      </el-form-item>
      <el-button type="primary" style="margin-left:100px;" @click="onsubmit">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import API from '@/utils/api'
// import { getLoginData } from '@/utils/auth'
export default {

  data() {
    return {
      userMsg: {
        // name: '',
        // id: '',
        money: ''
      },
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
    this.getUserInfo()
  },
  methods: {
    // 个人信息展示余额
    getUserInfo() {
      API.getUserInfo(this.userMsg).then(res => {
        if (res.code === 200) {
          // console.log(res.data)
          // this.userMsg.name = res.data.name
          // this.userMsg.id = res.data.id
          this.userMsg.money = res.data.money + '元'
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 提现
    putForward() {
      // console.log(getLoginData(), 1111111111111)
      // const loginData = JSON.parse(getLoginData())
      // console.log(loginData)
      // this.cashForm.money = loginData.money * 1
      API.putForward(this.cashForm).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          this.getUserInfo()
          this.cashForm.money = ''
          this.cashForm.alipay = ''
          this.cashForm.alipayName = ''
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
    },
    onsubmit() {
      this.putForward()
    }
  }
}
</script>
