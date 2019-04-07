<template>
  <div class="no-auth">
    <p>您没有访问权限</p>
  </div>
</template>

<script>
  export default {
    name: 'NoAuth',
    components: {},
    data() {
      return {}
    },
    created() {
    },
    methods: {},
    computed: {},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .no-auth {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
