<template>
  <div>
    <TheNavigation />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TheNavigation from '@/components/TheNavigation.vue'

export default defineComponent({
  components: {
    TheNavigation,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
@import '~@/assets/styles/main.scss';
</style>
