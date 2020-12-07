<template>
  <div id="app" :class="theme">
    <header class="header">
      <nav-bar>Timer</nav-bar>
    </header>
    <main class="main">
      <router-view></router-view>
    </main>
    <footer class="footer">
      <tab-bar></tab-bar>
    </footer>
  </div>
</template>

<script>
  import NavBar from './components/navbar'
  import TabBar from './components/tabbar'

  export default {
    name: 'app',

    components: { NavBar, TabBar },

    data () {
      return {
        theme: 'blue'
      }
    }
  }
</script>

<style lang="less">
  @import './assets/less/theme.less';

  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .header {

  }

  .main {
    flex: 1;
  }

  .footer {
    background-color: #fff;
    border-top: .0625rem solid #f5f5f5;
  }
</style>
