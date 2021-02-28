<template>
  <div class="resourse">
    <list/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import list from './components/list.vue'

export default Vue.extend({
  name: 'ResourseIndex',
  components: { list }
})
</script>

<style scoped lang='scss'>
</style>
