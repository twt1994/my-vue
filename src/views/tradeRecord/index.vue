<template>
  <div class="tradeRecord">
    <h3>交易记录</h3>
  </div>
</template>

<script>
import API from '@/utils/api'

export default{
  data() {
    return {
      tradeRecordData: {
        state: '-1',
        keyword: '',
        orderNumber: '',
        asin: '',
        uid: '1',
        site: '',
        current: 1,
        size: 1
      },
      dataForm: {
        phone: '15738662980',
        lv: '1',
        current: 1,
        size: 10

      }
    }
  },
  mounted() {
    this.selectGoodsOrder()
  },
  methods: {
    // 交易记录
    selectGoodsOrder() {
      API.selectGoodsOrder(this.tradeRecordData).then(res => {

      })
    },
    // 用户列表
    selectUserInfo() {
      API.selectUserInfo(this.dataForm).then(res => {

      })
    }
  }
}
</script>

<style>
</style>
