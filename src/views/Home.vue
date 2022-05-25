<template>
  <div class="app__container">
    <div v-if="dataLoaded" class="home">
      <div v-if="!data.length" class="home__empty-block">
        <h2 class="home__empty-block-txt">Looks empty here...</h2>
        <router-link
          class="home__empty-block-link"
          :to="{ name: $routes.CREATE }"
        >
          Create Workout
        </router-link>
      </div>

      <div class="home__content-block">
        <div
          class="home__card-wrapper"
          v-for="(workout, index) in data"
          :key="index"
        >
          <router-link
            :to="{ name: $routes.WORKOUT, params: { workoutId: workout.id } }"
            class="home__card"
          >
            <img
              v-if="workout.workoutType === 'cardio'"
              class="home__card-img"
              src="@/assets/images/running.png"
              alt="cardio"
            />
            <img
              v-else
              class="home__card-img"
              src="@/assets/images/weights.png"
              alt="strength"
            />
            <span class="home__card-type">{{ workout.workoutType }}</span>
            <span class="home__card-name">{{ workout.workoutName }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { supabase } from '@/supabase/init'

export default defineComponent({
  name: 'home',
  components: {},
  setup() {
    const data = ref<unknown[] | null>([])
    const dataLoaded = ref<boolean | null>(null)

    const getData = async () => {
      try {
        const { data: workouts, error } = await supabase
          .from('workouts')
          .select('*')
        if (error) throw error
        data.value = workouts
        dataLoaded.value = true
      } catch (error) {
        console.warn((error as Error).message)
      }
    }

    onMounted(async () => {
      await getData()
    })

    return { data, dataLoaded }
  },
})
</script>

<style lang="scss" scoped>
.home {
  &__empty-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3.2rem;
  }

  &__empty-block-link {
    color: var(--clr__orange);
    text-decoration: none;
  }

  &__content-block {
    display: flex;
    flex-flow: row wrap;
    padding: 3.2rem 0;
  }

  &__card-wrapper {
    width: 25%;
    padding: 1.2rem;
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3.2rem;
    background-color: var(--clr__grey-1);
    text-decoration: none;

    &:hover {
      background-color: var(--clr__orange);
    }
  }

  &__card-img {
    width: 5rem;
  }

  &__card-type {
    display: block;
    padding: 0.5rem 1rem;
    background: var(--clr__black);
    color: var(--clr__white);
    margin: 1.2rem 0;
  }

  &__card-name {
    font-size: 1.8rem;
    color: var(--clr__black);
  }
}
</style>
