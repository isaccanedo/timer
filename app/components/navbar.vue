<template>
  <nav class="navbar">
    <h1 class="title"><slot></slot></h1>
  </nav>
</template>

<script>
  export default {
    name: 'navbar',

    data () {
      return { }
    }
  }
</script>

<style lang="less">
  .navbar {
    .title {
      margin: 0;
      text-align: center;
      font-size: 1.1rem;
      font-weight: normal;
      line-height: 3rem;
    }
  }
</style>
