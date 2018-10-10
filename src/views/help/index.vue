<template>
  <div class="dashboard-container">
    <div class="dashboard-text">六六九海淘代购公告：</div>
    <p style="margin-left:150px;">{{ userMsg.msg }}</p>
  </div>
</template>

<script>
import API from '@/utils/api'
export default {
  name: 'Dashboard',
  data() {
    return {
      userMsg: {
        createTime: '',
        id: '',
        msg: ''
      }
    }
  },
  mounted() {
    this.getHelpConfig()
  },
  methods: {
    getHelpConfig() {
      API.getHelpConfig(this.userMsg).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.userMsg.createTime = res.data.createTime
          this.userMsg.id = res.data.id
          this.userMsg.msg = res.data.msg
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
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    text-align: center;
  }
}
</style>
