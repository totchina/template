<template>
  <span v-if="num.num !== undefined" v-text="num.num" :title="num.num"></span>
</template>
<script>
  import { tween } from 'shifty'

  const RE_FLOAT = /^\d+(\.\d+)?$/
  const RE_INT = /^\[1-9][0-9]*$/

  const isNumber = v => {
    return typeof v === 'number' || (
      typeof v === 'string' && (RE_FLOAT.test(v) || RE_INT.test(v))
    )
  }

  export default {
    props: {
      from: {
        type: [Number, String],
        required: true,
        validator: isNumber
      },
      to: {
        type: [Number, String],
        required: true,
        validator: isNumber
      }
    },
    data () {
      return {
        num: { num: undefined },
        duration: 1000,
        easing: 'easeOutQuad'
      }
    },
    computed: {
      options () {
        return {
          from: {
            x: parseFloat(this.from)
          },
          to: {
            x: parseFloat(this.to)
          },
          duration: this.duration,
          easing: this.easing
        }
      }
    },
    methods: {
      formatter (val) {
        return parseInt(val, 10)
      },
      _start (num) {
        const updateNumber = state => {
          if (num === this.num) {
            num.num = this.formatter(state.x)
          } else {
            // num过期，忽略不做处理
          }
        }
        tween({
          ...this.options,
          step: updateNumber
        }).then(updateNumber)
      },
      start () {
        this._start(this.num)
      }
    },
    mounted () {
      this.start()
    },
    activated () {
      this.start()
    },
    watch: {
      options (val) {
        this.num = { num: undefined }
        this.start()
      }
    }
  }
</script>
