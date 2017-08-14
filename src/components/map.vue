<template>
  <div class="container" id="container">

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    mounted() {
      var map = new BMap.Map("container");
      var point = new BMap.Point(116.404, 39.915);
      map.centerAndZoom(point, 15);
    }
  }
</script>

<style>
  #container{
    width: 100%;
    height: 800px;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
  }

</style>