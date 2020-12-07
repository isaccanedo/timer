<template>
  <div class="container" :class="{ running: running }">
    <section class="views">
      <span class="task" v-show="running">{{ task }}中...</span>
      <timer :total="total" :current="current"></timer>
      <button class="done" v-show="running" @click="done">完成</button>
    </section>
    <section class="controls">
      <div class="inputs">
        <input type="text" placeholder="输入任务名，例如：看书、邮件" v-model="task">
      </div>
      <div class="buttons">
        <button @click="start">工作</button>
        <button @click="start">休息</button>
      </div>
    </section>
  </div>
</template>

<script>
  import Timer from '../components/timer'

  export default {
    name: 'index',
    path: '/timer',

    components: { Timer },

    data () {
      return {
        task: '',
        total: 0.1 * 60,
        current: 0.1 * 60,
        running: false,
        interval: null
      }
    },

    methods: {
      start () {
        this.running = true
        this.interval = setInterval(() => {
          this.current --
          if (this.current === 0) {
            this.done()
          }
        }, 1000)
      },
      done () {
        this.running = false
        this.current = this.total
        this.interval && clearInterval(this.interval)
      }
    }
  }
</script>

<style lang="less">
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .views {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @keyframes fade {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    .task {
      margin-top: -2.5rem;
      margin-bottom: 1.5rem;
      animation: fade 1s ease-in-out 0s infinite;
    }

    .done {
      height: 2.5rem;
      width: 5rem;
      margin-bottom: -2.5rem;
      margin-top: 1.5rem;
      border: .125rem dashed #fff;
      border-radius: 1rem;
      background-color: rgba(255, 255, 255, .1);
      color: #fff;
    }
  }

  .controls {
    display: flex;
    flex-direction: column;
    height: 12.5rem;
    transition: height .3s cubic-bezier(0.5, -1.49, 0.53, 2.68);

    .inputs {
      input {
        width: 100%;
        padding: .5rem;
        border: 0;
        border-bottom: .0625rem solid #f5f5f5;
        text-align: center;
        font-size: 1rem;
      }
    }

    .buttons {
      display: flex;
      flex: 1;
      justify-content: space-around;
      align-items: center;
      margin: 2rem 4rem;

      button {
        height: 5rem;
        width: 5rem;
        border: 0;
        border-radius: 50%;
        color: #fff;
      }
    }
  }

  .running .controls {
    height: 0;
  }
</style>
