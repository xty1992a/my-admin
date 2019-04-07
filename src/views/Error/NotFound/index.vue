<template>
  <div class="not-found">
    <div class="center">
      <svg-icon icon="404"/>
      <p>啊哦，你找页面不见了～～～</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
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

<style lang="less" rel="stylesheet/less" scoped>

  .not-found {
    width: 100vw;
    height: 100vh;
    background-color: #f7f7f7;
    display: flex;
    align-items: center;
    justify-content: center;

    .center {
      text-align: center;
      font-size: 100px;
    }

    svg {
    }

    p {
      padding-top: 20px;
      font-size: 24px;
    }
  }
</style>
