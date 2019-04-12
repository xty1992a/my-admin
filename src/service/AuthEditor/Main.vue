<template>
  <el-dialog :visible.sync="show" class="auth-editor"
             title="权限编辑器"
             @closed="closed"
  >
    <div class="auth-editor-content">
      <el-row>
        <el-col class="label" :span="4"><span>角色</span></el-col>
        <el-col :span="20">
          <el-input v-model="value.key" :disabled="type!=='add'" placeholder="添加后不可修改"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label" :span="4"><span>名称</span></el-col>
        <el-col :span="20">
          <el-input v-model="value.name" placeholder="添加名称"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label" :span="4"><span>描述</span></el-col>
        <el-col :span="20">
          <el-input v-model="value.description" placeholder="添加描述"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label" :span="4"><span>权限</span></el-col>
        <el-col :span="20">
          <el-tree
                  ref="tree"
                  :data="routes"
                  show-checkbox
                  node-key="key"
                  @check-change="checkChange"
                  :default-checked-keys="value.authList">
          </el-tree>
        </el-col>
      </el-row>
    </div>

    <div class="selector__foot">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>


  </el-dialog>
</template>

<script>
  export default {
	name: 'AuthEditor',
	components: {},
	data() {
	  return {
		routes: [],
		show: false,
	  }
	},
	methods: {
	  confirm() {
		let message = this.check()
		if (message) {
		  this.$message({
			message,
			type: 'error',
		  })
		  return
		}

		let fullCheckedKeys = this.$refs.tree.getCheckedKeys()
		let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()

		this.resolve({
		  success: true,
		  data: {
			...this.value,
			authList: [...fullCheckedKeys, ...halfCheckedKeys],
		  },
		})
		this.show = false
	  },
	  cancel() {
		this.resolve({
		  success: false,
		  data: '',
		})
		this.show = false
	  },
	  closed() {
		this.$destroy(true)
	  },
	  check() {
		let {key} = this.value
		if (!key) return '角色是必填项!'
		if (!/^[a-z0-9]+$/i.test(key)) return '角色必须是英文或数字!'
	  },
	  checkChange() {
		let fullCheckedKeys = this.$refs.tree.getCheckedKeys()
		let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()

		console.log([...fullCheckedKeys, ...halfCheckedKeys])
	  },
	},
	computed: {},
	beforeDestroy() {
	  this.$el && this.$el.remove()
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .auth-editor {

    .auth-editor-content {
      .el-row {
        margin-bottom: 15px;
      }

      .label {
        line-height: 36px;
        padding: 0 20px;
        text-align: right;
      }
    }

    .selector__foot {
      text-align: center;
      padding-top: 20px;
    }
  }

</style>
