<template>
  <div v-if="appReady">
    <TheNavigation />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { supabase } from '@/supabase/init'

import TheNavigation from '@/components/TheNavigation.vue'

export default defineComponent({
  components: {
    TheNavigation,
  },
  setup() {
    const store = useStore()
    const appReady = ref<boolean | null>(null)
    const user = supabase.auth.user()

    if (!user) appReady.value = true

    supabase.auth.onAuthStateChange((_, session) => {
      store.dispatch('setUser', session)
      appReady.value = true
    })
    return { appReady }
  },
})
</script>

<style lang="scss">
@import '~@/assets/styles/main.scss';
</style>
