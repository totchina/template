<template>
  <span>
    <span v-if="num === undefined">-</span>
    <animate-number v-else :from="0" :to="num"></animate-number>
  </span>
</template>
<script>
  import AnimateNumber from 'components/animate-number'

  export default {
    props: {
      num: {
        type: [Number, String]
      }
    },
    components: {
      AnimateNumber
    }
  }
</script>
