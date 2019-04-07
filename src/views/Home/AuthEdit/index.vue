<template>
  <div class="auth-edit">
    <layout-block title="用户编辑">
      <div class="table-container" v-loading="loading.user">
        <el-table :data="userList">
          <el-table-column label="头像" prop="key">
            <template slot-scope="scope">
              <Avatar :src="scope.row.avatar"/>
            </template>
          </el-table-column>
          <el-table-column label="用户名" prop="name"/>
          <el-table-column label="签名" prop="introduction"/>
          <el-table-column label="角色关键字" prop="roles"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="`/Home/UserEdit?user=${scope.row.name}`">
                <el-button type="primary">编辑</el-button>
              </router-link>
              <el-button type="danger" @click="delUser(scope.row.token)" :disabled="scope.row.token==='admin'">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="btn-wrap">
          <router-link to="/Home/UserEdit">
            <el-button type="primary">添加</el-button>
          </router-link>
        </div>
      </div>
    </layout-block>

    <layout-block title="编辑权限">
      <div class="table-container" v-loading="loading.edit">
        <el-table :data="editorList">
          <el-table-column label="关键字" prop="key"/>
          <el-table-column label="名称" prop="name"/>
          <el-table-column label="描述" prop="description"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="editAuth(scope.row)">编辑</el-button>
              <el-button type="danger" @click="delEditor(scope.row.key)" :disabled="scope.row.key==='admin'">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="btn-wrap">
          <el-button @click="addEditor" type="primary">添加</el-button>
        </div>
      </div>
    </layout-block>

  </div>
</template>

<script>
  import * as API from '@/api'
  import editAuth from '@/service/AuthEditor'
  import {mapState} from 'vuex'
  import Avatar from '@/components/Avatar'
  import LayoutBlock from '@/components/LayoutBlock'

  const filterRoutes = (routes) => routes.filter(it => {
    if (it.children) {
      it.children = filterRoutes(it.children)
    }
    return it.hasOwnProperty('meta')
  })

  const fmtRoutes = (routes, path = '') => routes.map(it => {
    let route = {
      enable: true,
      label: it.meta.title,
      key: it.name,
    }
    if (it.children) {
      route.children = fmtRoutes(it.children, it.path.toLowerCase())
    }
    return route
  })

  export default {
    name: 'AuthEdit',
    components: {LayoutBlock, Avatar},
    data() {
      return {
        loading: {
          edit: false,
          user: false,
        },
      }
    },
    created() {
      this.getEditorList()
      this.getUserList()
    },
    methods: {
      async getEditorList() {
        this.loading.edit = true
        await this.$store.dispatch('User/getEditorList')
        this.loading.edit = false
      },

      async getUserList() {
        this.loading.user = true
        await this.$store.dispatch('User/getUserList')
        this.loading.user = false
      },

      async editAuth(role) {
        let res = await editAuth({
          value: role,
          type: 'edit',
          routes: this.routes,
        })

        if (res.success) {
          let editor = this.editorList.find(it => it.key === role.key)
          Object.keys(editor).forEach(k => {
            editor[k] = res.data[k]
          })
          let result = await API.editEditor({
            data: res.data,
          })

          console.log(result)
        }
      },

      delUser(token) {
        this.$confirm('该操作不可恢复，确定继续吗？')
          .then(async () => {
            let res = await API.deleteUser(token)
            console.log('response ', res);
            if (res.success) {
              this.getUserList()
            }
          })
          .catch(() => {
          })

      },

      delEditor(key) {
        this.$confirm('该操作不可恢复,确定继续吗?')
          .then(async () => {
            let res = await API.deleteEditor(key)

            if (res.success) {
              this.getEditorList()
            }
            console.log(res)
          })
          .catch(() => {
          })
      },

      async addEditor() {
        let data = await editAuth({
          value: {
            name: '',
            key: Math.random().toString(36).substr(2, 15),
            description: '',
            authList: [],
          },
          type: 'add',
          routes: this.routes,
        })

        if (data.success) {
          let res = await API.addEditor({
            data: data.data,
          })
          if (res.success) {
            this.getEditorList()
          }
        }

      },
    },
    computed: {
      /*	  ...mapState('Router', [
                'rawRoutes',
              ]),*/
      rawRoutes() {
        return this.$store.state.Router.rawRoutes
      },
      ...mapState('User', [
        'editorList',
        'userList',
      ]),
      routes() {
        return fmtRoutes(filterRoutes(JSON.parse(JSON.stringify(this.rawRoutes))))
      },
    },
  }
</script>

<style lang="less" rel="stylesheet/less">

  .auth-edit {
    padding: 10px;

    .table-container {
      padding: 0 20px 20px;

      .el-table {
        border: 1px solid #EBEEF5;
        border-bottom-width: 0;

        .el-button {
          padding: 7px 20px;
        }
      }

      thead {
        tr, td, th {
          background-color: #f0f0f0;
        }
      }
    }


    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .btn-wrap {
      text-align: center;
      padding-top: 30px;

      button {
        width: 120px;
      }
    }
  }
</style>
