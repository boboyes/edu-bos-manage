<template>
  <div class='menu-create'>
    <create-or-edit/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'menuCreate',
  components: {
    CreateOrEdit
  },
  data () {
    return {
    }
  },
  methods: {
  }
})
</script>

<style lang="scss" scope></style>
