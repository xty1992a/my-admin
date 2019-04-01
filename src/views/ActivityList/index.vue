<template>
  <div class="activity-list">
    <el-table
            :data="tableData"
            style="width: 100%">
      <el-table-column
              prop="name"
              label="活动名称"
              width="180">
        <template slot-scope="scope">
          <router-link :to="`/Activity/ActivityListDetail/${scope.row.guid}`">
            <p>{{scope.row.guid}}-{{scope.row.name}}</p>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
              prop="date"
              label="活动时间"
              width="180"/>
      <el-table-column
              prop="address"
              label="活动地址"/>
    </el-table>
  </div>
</template>

<script>
  export default {
	name: 'ActivityList',
	components: {},
	data() {
	  return {
		tableData: [{
		  date: '2016-05-02',
		  name: '吃饭',
		  address: '上海市普陀区金沙江路 1518 弄',
		  guid: 1,
		},
		  {
			date: '2016-05-04',
			name: '睡觉',
			address: '上海市普陀区金沙江路 1517 弄',
			guid: 2,
		  },
		  {
			date: '2016-05-01',
			name: '打豆豆',
			address: '上海市普陀区金沙江路 1519 弄',
			guid: 3,
		  },
		  {
			date: '2016-05-03',
			name: '我是豆豆',
			address: '上海市普陀区金沙江路 1516 弄',
			guid: 4,
		  }],
	  }
	},
	created() {
	},
	methods: {},
	computed: {},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .activity-list {
    padding: 10px;

    .activity-item {
    }
  }
</style>
