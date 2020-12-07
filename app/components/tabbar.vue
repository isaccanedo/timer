<template>
  <nav class="tabbar">
    <ul class="tab-list">
      <li class="tab-item" v-for="tab in tabsets">
        <router-link :to="tab.route">
          <i class="fa" :class="'fa-' + tab.icon"></i>
          <span>{{ tab.text }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'tabbar',

    data () {
      return {
        tabsets: [
          { text: '日志', icon: 'th-list', route: { name: 'log' } },
          { text: '计时器', icon: 'clock-o', route: { name: 'index' } },
          { text: '选项', icon: 'cog', route: { name: 'option' } }
        ]
      }
    }
  }
</script>

<style lang="less">
  .tabbar {
    .tab-list {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .tab-item {
      flex: 1;

      a {
        display: block;
        padding: .2rem;
        text-align: center;
        color: #c5c5c5;
        font-size: .75rem;

        i, span {
          display: block;
          margin-top: .4rem;
          margin-bottom: .4rem;
        }

        i {
          font-size: 1.2rem;
        }
      }
    }
  }
</style>
