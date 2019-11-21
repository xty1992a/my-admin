<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    console.log(this.saveTagData);
  }
};
</script>

<style>
#app {
}
</style>
