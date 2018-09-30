<template>
  <div class="helpCointer">
    <div class="edit">
      <Tinymce ref="editor" :height="500" v-model="formLabelAlign.msg" />
    </div>
    <el-button style="margin-top:30px;" type="primary" @click="onsubmit">提交</el-button>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce' // 调用编辑器
import API from '@/utils/api'
export default {
  components: {
    // 使用编辑器
    Tinymce
  },
  data() {
    return {
      formLabelAlign: {
        id: '',
        type: 'day',
        msg: ''
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.Tinymce
    }
  },
  methods: {
    onsubmit() {
      this.modifyHelpConfig()
    },
    modifyHelpConfig() {
      // const loginData = JSON.parse(getLoginData())
      // this.tradeRecordForm.uid = loginData.id
      API.modifyHelpConfig(this.formLabelAlign).then(res => {

      })
    }
  }
}
</script>
<style>
	.helpCointer{
		padding-left:30px;
		/*text-align:center;*/
	}
	.helpCointer .edit{
		width:80%;
		margin-top:60px;

	}
	.helpCointer .editor-custom-btn-container{
		top:3px;
	}
</style>
