<template>
  <div class="timer">
    <span class="time">{{ time }}</span>
    <circle-progress :max="total" :value="current"></circle-progress>
  </div>
</template>

<script>
  import CircleProgress from './circle-progress'
  import util from '../libraries/util'

  export default {
    name: 'timer',

    props: {
      total: { type: Number, default: 100 },
      current: { type: Number, default: 0 }
    },

    components: { CircleProgress },

    computed: {
      time () {
        return util.timeFormat(this.current)
      }
    }
  }
</script>

<style lang="less">
  .timer {
    position: relative;

    .time {
      position: absolute;
      width: 16rem;
      height: 4rem;
      margin-left: -8rem;
      margin-top: -2rem;
      left: 50%;
      top:50%;
      text-align: center;
      font-size: 4rem;
      font-weight: bold;
      line-height: 4rem;
    }
  }
</style>
