<template>
  <div class="dashboard">
    <layout-block title="事故率" icon="menu_activity_creation">
      <ChartsLinear :data="linearData" zoom/>
    </layout-block>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import ChartsLinear from '@/components/Charts/Linear'
  import LayoutBlock from '@/components/LayoutBlock'

  export default {
	name: 'Dashboard',
	components: {ChartsLinear, LayoutBlock},
	data() {
	  return {}
	},
	created() {
	},
	methods: {},
	computed: {
	  linearData() {
		const list = [...Array(30)].map((n, i) => {
		  return {
			date: dayjs().format('YYYY-MM-DD'),

		  }
		})
		let len = list.length
		return {
		  xAxis: list.map(it => it.date),
		  list: [
			list.map((it, i) => i <= len / 2 ? i : '-'),
			list.map((it, i) => i >= len / 2 ? len - i : '-'),
		  ],
		  labels: ['改革前', '改革后'],
		  colors: ['#9ed0ff', '#81da9c'],
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .dashboard {
    padding: 10px;
  }
</style>
