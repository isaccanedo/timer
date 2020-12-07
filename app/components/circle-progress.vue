<template>
  <div class="progress">
    <div class="left">
      <div class="border" :style="{ transform: 'rotate(' + left + 'deg)' }"></div>
    </div>
    <div class="right">
      <div class="border" :style="{ transform: 'rotate(' + right + 'deg)' }"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'circle-progress',

    props: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 100 },
      value: { type: Number, default: 0 }
    },

    computed: {
      left () {
        let percent = (this.value - this.min) / (this.max - this.min)
        percent = percent < 0 ? 0 : percent
        percent = percent > 1 ? 1 : percent
        return percent < 0.5 ? -135 : -135 + 360 * (percent - 0.5)
      },
      right () {
        let percent = (this.value - this.min) / (this.max - this.min)
        percent = percent < 0 ? 0 : percent
        percent = percent > 1 ? 1 : percent
        return percent >= 0.5 ? -135 + 180 : -135 + 360 * percent
      }
    },

    updated () {

    }
  }
</script>

<style lang="less">
  @height: 15rem;
  @width: 15rem;
  @border: .75rem;

  .progress {
    display: flex;
    height: @height;
    width: @width;

    div {
      flex: 1;
      overflow: hidden;
      position: relative;

      .border {
        position: absolute;
        height: @height - @border * 2;
        width: @width - @border * 2;
        border-width: @border;
        border-style: solid;
        border-radius: 50%;
        // transform: rotate(-135deg);
        transition: transform .4s linear
      }

      &.left .border {
        left: 0;
        border-left: @border solid #fff;
        border-bottom: @border solid #fff;
      }

      &.right .border {
        right: 0;
        border-top: @border solid #fff;
        border-right: @border solid #fff;
      }
    }
  }
</style>
