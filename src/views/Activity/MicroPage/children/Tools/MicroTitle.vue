<template>
  <div class="micro-title">
    <el-row>
      <el-col :span="6" style="padding: 10px;">标题名</el-col>
      <el-col :span="18">
        <el-input v-model="localData.text"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" style="padding: 10px;">字体颜色</el-col>
      <el-col :span="18">
        <el-color-picker v-model="localData.color"></el-color-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" style="padding: 10px;">显示位置</el-col>
      <el-col :span="18" style="padding: 10px 0;">
        <el-radio-group v-model="localData.align">
          <el-radio label="left">居左</el-radio>
          <el-radio label="center">居中</el-radio>
          <el-radio label="right">居右</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" style="padding: 10px;">字体大小</el-col>
      <el-col :span="18">
        <el-select v-model="localData.size">
          <el-option :value="it" v-for="it in sizeList" :key="it">{{it}}</el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
	name: 'MicroTitle',
	components: {},
	props: {
	  data: Object,
	  edit: Function,
	},
	data() {
	  return {
		localData: {},
	  }
	},
	created() {
	  this.localData = {
		...this.data.data || {
		  text: '',
		  color: '',
		  align: '',
		  size: 14,
		},
	  }
	},
	computed: {
	  sizeList() {
		return [14, 16, 18, 20, 22, 24, 28, 30, 32, 34, 36, 38, 40, 42]
	  },
	},
	watch: {
	  localData: {
		handler(now) {
		  this.edit && this.edit({...this.data, data: now})
		},
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .micro-title {
    .el-row {
      margin-bottom: 15px;
    }
  }
</style>
