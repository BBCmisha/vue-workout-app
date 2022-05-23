<template>
  <div class="app__container">
    <div class="login">
      <!-- Error handling -->
      <div v-if="errorMsg" class="login__error-block">
        <p class="login__error-block-text">{{ errorMsg }}</p>
      </div>

      <form class="login__form" @submit.prevent="submit">
        <h2 class="login__form-title">Login</h2>

        <div class="login__form-section">
          <label class="login__form-label" for="email">Email</label>
          <input
            class="login__form-input"
            type="text"
            required
            id="email"
            v-model="email"
          />
        </div>

        <div class="login__form-section">
          <label class="login__form-label" for="password">Password</label>
          <input
            class="login__form-input"
            type="password"
            required
            id="password"
            v-model="password"
          />
        </div>

        <button class="login__form-btn" type="submit">Login</button>

        <div class="login__form-additional">
          <router-link
            class="login__form-additional-link"
            :to="{ name: $routes.REGISTER }"
          >
            Don't have an account?
            <span class="login__form-additional-txt">Register</span>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/init'
import { ROUTE_NAMES } from '@/helpers/enums'

export default defineComponent({
  name: 'login',
  setup() {
    const router = useRouter()
    const email = ref<string | undefined>()
    const password = ref<string | undefined>()
    const errorMsg = ref<string | null>(null)

    const submit = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        })
        if (error) throw error
        router.push({ name: ROUTE_NAMES.HOME })
      } catch (error) {
        errorMsg.value = `Error: ${(error as Error).message}`
        setTimeout(() => (errorMsg.value = null), 5000)
      }
    }

    return { email, password, errorMsg, submit }
  },
})
</script>

<style lang="scss" scoped>
.login {
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
