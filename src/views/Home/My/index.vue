<template>
  <div class="home page">
    <UserBlock style="margin-bottom: 15px;"/>

    <el-row :gutter="15">
      <el-col :md="12" :xs="24">
        <LayoutBlock title="访问来源">
          <div class="charts-wrap">
            <ChartsPie :data="pieData"/>
          </div>
        </LayoutBlock>
      </el-col>
      <el-col :md="12" :xs="24">
        <LayoutBlock title="访问来源">
          <div class="charts-wrap">
            <ChartsBar :data="barData"/>
          </div>
        </LayoutBlock>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ChartsPie from '@/components/Charts/Pie'
  import ChartsBar from '@/components/Charts/Bar'
  import LayoutBlock from '@/components/LayoutBlock'
  import UserBlock from './children/UserBlock'

  const list = [
	{value: 335, name: '直接访问'},
	{value: 310, name: '邮件营销'},
	{value: 274, name: '联盟广告'},
	{value: 235, name: '视频广告'},
	{value: 400, name: '搜索引擎'},
  ]

  export default {
	name: 'Home',
	components: {UserBlock, ChartsPie, ChartsBar, LayoutBlock},
	data() {
	  return {
		pieData: {
		  list,
		},
		barData: {
		  series: list.map(it => it.value),
		  xAxis: list.map(it => it.name),
		},
	  }
	},
	methods: {},
	computed: {
	  ...mapState('User', [
		'userInfo',
	  ]),

	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .home {

    .charts-wrap {
      padding: 0 10px;
      height: 300px;
    }
  }

</style>
