<template>
  <header class="navigation__wrapper">
    <div class="app__container">
      <nav class="navigation">
        <div class="logo">
          <img
            class="logo__image"
            src="@/assets/images/workout-logo.png"
            alt="logo"
          />
          <span class="logo__text">Workout tracker</span>
        </div>

        <ul class="navigation__list">
          <router-link
            class="navigation__list-item"
            :to="{ name: $routes.HOME }"
          >
            Home
          </router-link>
          <router-link
            v-if="user"
            class="navigation__list-item"
            :to="{ name: $routes.CREATE }"
          >
            Create
          </router-link>
          <router-link
            v-if="!user"
            class="navigation__list-item"
            :to="{ name: $routes.LOGIN }"
          >
            Login
          </router-link>
          <li v-if="user" class="navigation__list-item" @click="logout">
            Logout
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/init'
import { ROUTE_NAMES } from '@/helpers/enums'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const user = computed(() => store.getters.getUser)

    const logout = async () => {
      await supabase.auth.signOut()
      router.push({ name: ROUTE_NAMES.LOGIN })
    }
    return { user, logout }
  },
})
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0rem;

  &__wrapper {
    background-color: var(--clr__grey-1);
  }

  &__list {
    display: flex;
    list-style: none;
  }

  &__list-item {
    color: var(--clr__text-primary);
    text-decoration: none;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 1rem;
    }

    &.router-link-active,
    .router-link-exact-active {
      color: var(--clr__orange);
    }
  }
}

.logo {
  display: flex;
  align-items: center;

  &__image {
    width: 5rem;
    margin-right: 1rem;
  }

  &__text {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 1rem;
  }
}
</style>
