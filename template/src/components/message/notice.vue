<template>
  <transition :name="transitionName">
    <div class="ui-toast">
      <!-- 加类.hide隐藏toast -->
      <div class="toastwrap text" ref="content" v-html="content"></div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      duration: {
        type: Number,
        default: 1.5
      },
      content: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        required: true
      },
      onClose: {
        type: Function
      },
      transitionName: {
        type: String
      }
    },
    data () {
      return {
        withDesc: false
      }
    },
    computed: {
    },
    methods: {
      clearCloseTimer () {
        if (this.closeTimer) {
          clearTimeout(this.closeTimer)
          this.closeTimer = null
        }
      },
      close () {
        this.clearCloseTimer()
        this.onClose()
        this.$parent.close(this.name)
      }
    },
    mounted () {
      this.clearCloseTimer()

      if (this.duration !== 0) {
        this.closeTimer = setTimeout(() => {
          this.close()
        }, this.duration * 1000)
      }
    },
    beforeDestroy () {
      this.clearCloseTimer()
    }
  }
</script>
<style scoped>
  .ui-toast {
    position: fixed;
    z-index: 101;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 200px;
    background-color: #525252;
    border-radius: 3px;
  }

  .ui-toast .toastwrap {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 8px 8px
  }

  .ui-toast .text {
    font-size: 20px;
    color: #fff;
  }

  .ui-toast .action {
    cursor: pointer;
    border-bottom: 1px solid #e1915c;
    font-size: 14px;
    color: #e1915c
  }
</style>
