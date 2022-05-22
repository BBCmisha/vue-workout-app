<template>
  <header class="navigation__wrapper">
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
        <router-link class="navigation__list-item" :to="{ name: $routes.HOME }">
          Home
        </router-link>
        <router-link
          class="navigation__list-item"
          :to="{ name: $routes.CREATE }"
        >
          Create
        </router-link>
        <router-link
          class="navigation__list-item"
          :to="{ name: $routes.LOGIN }"
        >
          Login
        </router-link>
        <li class="navigation__list-item">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0.5rem;
  max-width: 102.4rem;
  margin: 0 auto;

  &__wrapper {
    border-bottom: 0.1rem solid var(--clr__grey-1);
  }

  &__list {
    display: flex;
    list-style: none;
  }

  &__list-item {
    color: var(--clr__text-primary);
    text-decoration: none;

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
