<template>
  <div class="user-edit page">
    <layout-block :title="isAdd?'添加用户':'编辑用户'">

      <el-row type="flex">
        <el-col class="label" :span="2">头像</el-col>
        <el-col :span="20" style="display: flex;align-items: center;">
          <Avatar :src="data.avatar" :size="80" style="margin-right: 20px;"/>
          <el-button ref="avatarBtn">编辑头像</el-button>
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col class="label" :span="2">用户名</el-col>
        <el-col :span="20">
          <el-input v-model="data.name" style="width: 300px;" placeholder="登录用户名" :disabled="disabled"/>
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col class="label" :span="2">签名</el-col>
        <el-col :span="20">
          <el-input v-model="data.introduction" style="width: 300px;" type="textarea" placeholder="没什么卵用"/>
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col class="label" :span="2">角色</el-col>
        <el-col :span="20">
          <el-select v-model="data.role" :disabled="disabled">
            <el-option v-for="role in roles" :key="role.value" :value="role.value" :label="role.label"></el-option>
          </el-select>
          <span style="color:#999;">决定用户的权限</span>
        </el-col>
      </el-row>

    </layout-block>

    <layout-block>
      <div style="text-align: center;padding: 20px;">
        <el-button type="primary" style="width: 120px;" @click="confirm" v-if="!isAdd">保存</el-button>
        <el-button type="primary" style="width: 120px;" @click="addUser" v-if="isAdd">添加</el-button>
      </div>

    </layout-block>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ImageUploader from '@redbuck/image-uploader'
  import '@redbuck/image-uploader/lib/imageUploader.css'
  import Avatar from '@/components/Avatar'
  import LayoutBlock from '@/components/LayoutBlock'
  import * as API from '../../../api'

  const copy = o => JSON.parse(JSON.stringify(o))

  export default {
	name: 'UserEdit',
	components: {LayoutBlock, Avatar},
	data() {
	  return {
		data: {
		  'role': '',
		  'introduction': '',
		  'avatar': '/imgs/1554272067618_1554272067599.png',
		  'name': '',
		},
	  }
	},
	async created() {
	  this.getPageData()
	  await this.$store.dispatch('User/getRoleList', false)
	},
	mounted() {
	  this.createUploader()
	},
	methods: {
	  createUploader() {
		this.uploader = new ImageUploader({
		  width: 300,
		  height: 300,
		  el: this.$refs.avatarBtn.$el,
		  uploadUrl: '/api/upload',
		  fileName: 'file',
		})
		this.uploader.on('upload', res => {
		  if (res.success) {
			this.data.avatar = '/imgs/' + res.data.filename
		  }
		})
	  },
	  async getPageData() {
		if (this.isAdd) return

		if (this.cacheData) {
		  this.data = copy(this.cacheData.data)
		  this.dataSnap = copy(this.cacheData.dataSnap)
		  return
		}

		const res = await API.login({
		  username: this.$route.query.user,
		}, false)

		if (res.success) {
		  this.dataSnap = copy(res.data)
		  this.data = res.data
		}
	  },
	  async confirm() {
		const sharp = o => JSON.stringify(o)
		if (sharp(this.dataSnap) === sharp(this.data)) {
		  this.$message({
			message: '请修改后再提交!',
		  })
		  return
		}
		let res = await API.editUser({
		  data: this.data,
		})

		if (res.success) {
		  this.exitPage()
		}

		console.log(res)
	  },
	  async addUser() {
		if (['role', 'introduction', 'name'].some(k => !this.data[k])) {
		  this.$message({
			message: '所有选项必填!',
			type: 'error',
		  })
		  return
		}
		let res = await API.addUser({
		  data: this.data,
		})

		if (res.success) {
		  this.exitPage()
		}

		console.log(res)

	  },
	  exitPage() {
		this.$store.commit('Router/DEL_TAG', this.$route)
	  },
	},
	computed: {
	  ...mapState('Router', [
		'tagCache',
	  ]),
	  cacheData() {
		if (!this.tagCache.length) return null
		const key = this.$route.fullPath.toLowerCase()
		return this.tagCache.find(it => it.key === key).data
	  },
	  roleList() {
		return this.$store.state.User.roleList
	  },
	  roles() {
		return this.roleList.map(it => ({value: it.key, label: it.key}))
	  },
	  disabled() {
		if (this.isAdd) return false
		return this.$route.query.user.toLowerCase() === 'admin'
	  },
	  isAdd() {
		return !this.$route.query.hasOwnProperty('user')
	  },
	},
	watch: {
	  data: {
		handler(now) {
		  this.$store.commit('Router/UPDATE_TAG_CACHE', {
			key: this.$route.fullPath.toLowerCase(),
			data: {
			  dataSnap: this.dataSnap,
			  data: copy(now),
			},
		  })
		}, deep: true,
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .user-edit {

    .el-row {
      margin-bottom: 15px;

      .label {
        display: flex;
        align-items: center;
        padding: 10px;
        font-size: 16px;
      }
    }
  }
</style>
