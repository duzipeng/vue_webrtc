<template>
  <div id="app">
    <router-link to="/" class="tab-item" exact>地图</router-link>
    <router-link to="/video" class="tab-item" exact>视频</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>

</style>
