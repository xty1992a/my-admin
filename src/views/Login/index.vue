<template>
  <div class="login">
    <div class="content" @keypress.enter="enterPress">
      <div class="cell">
        <h3>请登录</h3>
      </div>
      <div class="cell">
        <el-input v-model="params.username">
          <span class="label" slot="prepend">用户名</span>
        </el-input>
      </div>
      <div class="cell">
        <el-input v-model="params.userAccount">
          <span class="label" slot="prepend">工号</span>
        </el-input>
      </div>
      <div class="cell">
        <el-input v-model="params.password" type="password">
          <span class="label" slot="prepend">密码</span>
        </el-input>
      </div>
      <div class="cell">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
	name: 'login',
	data() {
	  return {
		params: {
		  username: '',
		  password: '',
		  userAccount: '',
		},
	  }
	},
	created() {
	},
	methods: {
	  enterPress() {
		this.login()
	  },
	  async login() {
		console.log('login')
		if (Object.keys(this.params).some(key => !this.params[key])) {
		  this.$message({
			type: 'error',
			message: '请填写完整!',
		  })
		  return
		}
		let res = await this.$store.dispatch('User/LoginByUsername', this.params)
		if (res.success) {
		  this.$router.push('/')
		}
	  },
	},
	computed: {},
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    background-repeat: no-repeat;
    background-size: cover;

    .content {
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;

      h3 {
        line-height: 30px;
        font-size: 18px;
      }

      .cell {
        margin-bottom: 15px;
        width: 320px;

        .label {
          display: inline-block;
          width: 40px;
        }
      }

      .el-button {
        width: 100%;
      }

    }
  }
</style>
