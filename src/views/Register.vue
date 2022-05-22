<template>
  <div class="app__container">
    <div class="register">
      <!-- Error handling -->
      <div v-if="errorMsg" class="register__error-block">
        <p class="register__error-block-text">{{ errorMsg }}</p>
      </div>

      <form class="register__form" @submit.prevent="submit">
        <h2 class="register__form-title">Register</h2>

        <div class="register__form-section">
          <label class="register__form-label" for="email">Email</label>
          <input
            class="register__form-input"
            type="text"
            required
            id="email"
            v-model="email"
          />
        </div>

        <div class="register__form-section">
          <label class="register__form-label" for="password">Password</label>
          <input
            class="register__form-input"
            type="password"
            required
            id="password"
            v-model="password"
          />
        </div>

        <div class="register__form-section">
          <label class="register__form-label" for="confirmPassword">
            Confirm Password
          </label>
          <input
            class="register__form-input"
            type="password"
            required
            id="confirmPassword"
            v-model="confirmPassword"
          />
        </div>

        <button class="register__form-btn" type="submit">Register</button>

        <div class="register__form-additional">
          <router-link
            class="register__form-additional-link"
            :to="{ name: $routes.LOGIN }"
          >
            Already have an account?
            <span class="register__form-additional-txt">Login</span>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'register',
  setup() {
    const email = ref<string | null>(null)
    const password = ref<string | null>(null)
    const confirmPassword = ref<string | null>(null)
    const errorMsg = ref<string | null>(null)

    const submit = () => {
      console.log('Submit user information')
    }

    return { email, password, confirmPassword, errorMsg, submit }
  },
})
</script>

<style lang="scss" scoped>
.register {
  padding-top: 5rem;

  &__error-block-text {
    color: red;
  }

  &__form {
    width: 50rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3rem;
    margin: 0 auto;
  }

  &__form-title {
    color: var(--clr__orange);
  }

  &__form-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1.5rem;
  }

  &__form-label {
    margin-bottom: 0.5rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--clr__grey-1);
  }

  &__form-input {
    border: none;
    border-bottom: 0.2rem solid var(--clr__grey-1);

    &:focus {
      outline: none;
      border-bottom: 0.2rem solid var(--clr__orange);
    }
  }

  &__form-btn {
    margin-top: 1.5rem;
    border: none;
    background-color: var(--clr__grey-1);
    color: var(--clr__white);
    padding: 1rem 3rem;

    &:hover {
      background-color: var(--clr__orange);
      cursor: pointer;
    }
  }

  &__form-additional {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 3.2rem;
  }

  &__form-additional-link {
    text-decoration: none;
    color: inherit;
    font-size: 1.4rem;
    cursor: pointer;
  }

  &__form-additional-txt {
    color: var(--clr__orange);
  }
}
</style>
