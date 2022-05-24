<template>
  <div class="app__container">
    <div class="create">
      <div v-if="statusMsg || errorMsg" class="create__status">
        <p class="create__status-txt create__status-txt_green">
          {{ statusMsg }}
        </p>
        <p class="create__status-txt create__status-txt_red">{{ errorMsg }}</p>
      </div>

      <div class="create__form-wrapper">
        <form @submit.prevent="createWorkout" class="create__form">
          <h2 class="create__form-title">Record Workout</h2>

          <div class="create__form-section">
            <label class="create__form-label" for="workout-name">
              Workout name
            </label>
            <input
              type="text"
              required
              id="workout-name"
              class="create__form-input"
              v-model="workoutName"
            />
          </div>

          <div class="create__form-section">
            <label class="create__form-label" for="workout-type">
              Workout type
            </label>
            <select
              id="workout-type"
              class="create__form-select"
              required
              @change="workoutChange"
              v-model="workoutType"
            >
              <option value="select-workout">Select Workout</option>
              <option value="strength">Strength training</option>
              <option value="cardio">Cardio</option>
            </select>
          </div>

          <!-- Strength -->
          <div
            v-if="workoutType === 'strength'"
            class="create__form-additional"
          >
            <div
              v-for="(item, idx) in exercises"
              :key="idx"
              class="create__form-additional-item"
            >
              <div
                class="create__form-additional-section create__form-additional-section_big"
              >
                <label class="create__form-label" for="exercise-name">
                  Exercise
                </label>
                <input
                  type="text"
                  required
                  class="create__form-input"
                  v-model="item.exercise"
                />
              </div>
              <div class="create__form-additional-section">
                <label for="sets" class="create__form-label">Sets</label>
                <input
                  type="text"
                  required
                  class="create__form-input"
                  v-model="item.sets"
                />
              </div>
              <div class="create__form-additional-section">
                <label for="reps" class="create__form-label">Reps</label>
                <input
                  type="text"
                  required
                  class="create__form-input"
                  v-model="item.reps"
                />
              </div>
              <div class="create__form-additional-section">
                <label for="weight" class="create__form-label">Weight</label>
                <input
                  type="text"
                  required
                  class="create__form-input"
                  v-model="item.weight"
                />
              </div>
              <img
                class="create__form-additional-img"
                @click="deleteExercise(item.id)"
                src="@/assets/images/delete.png"
                alt="trash"
              />
            </div>
            <button class="create__form-btn" @click="addExercise" type="button">
              Add Exercise
            </button>
          </div>

          <!-- Cardio -->
          <div v-if="workoutType === 'cardio'" class="create__form-additional">
            <div
              v-for="(item, idx) in exercises"
              :key="idx"
              class="create__form-additional-item"
            >
              <div
                class="create__form-additional-section create__form-additional-section_big"
              >
                <label class="create__form-label" for="cardio-type">
                  Type
                </label>
                <select
                  id="cardio-type"
                  class="create__form-select"
                  v-model="item.cardioType"
                >
                  <option value="#">Select type</option>
                  <option value="run">Runs</option>
                  <option value="walk">Walk</option>
                </select>
              </div>
              <div class="create__form-additional-section">
                <label for="distance" class="create__form-label">
                  Distance
                </label>
                <input
                  type="text"
                  required
                  class="create__form-input"
                  v-model="item.distance"
                />
              </div>
              <div class="create__form-additional-section">
                <label for="duration" class="create__form-label">
                  Duration
                </label>
                <input
                  type="text"
                  required
                  class="create__form-input"
                  v-model="item.duration"
                />
              </div>
              <div class="create__form-additional-section">
                <label for="pace" class="create__form-label">Pace</label>
                <input
                  type="text"
                  required
                  class="create__form-input"
                  v-model="item.pace"
                />
              </div>
              <img
                class="create__form-additional-img"
                @click="deleteExercise(item.id)"
                src="@/assets/images/delete.png"
                alt="trash"
              />
            </div>
            <button class="create__form-btn" @click="addExercise" type="button">
              Add Exercise
            </button>
          </div>

          <button class="create__form-btn" type="submit">Record Workout</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { uid } from 'uid'
import { supabase } from '@/supabase/init'

type ExerciseType = {
  id: string
  exercise?: string
  sets?: string
  reps?: string
  weight?: string
  cardio?: string
  distance?: string
  duration?: string
  pace?: string
}

export default defineComponent({
  name: 'create',
  setup() {
    const workoutName = ref<string>('')
    const workoutType = ref<string>('select-workout')
    const exercises = ref<ExerciseType[]>([])
    const statusMsg = ref<string | null>(null)
    const errorMsg = ref<string | null>(null)

    const addExercise = () => {
      if (workoutType.value === 'strength') {
        exercises.value.push({
          id: uid(),
          exercise: '',
          sets: '',
          reps: '',
          weight: '',
        })
      } else if (workoutType.value === 'cardio') {
        exercises.value.push({
          id: uid(),
          cardio: '',
          distance: '',
          duration: '',
          pace: '',
        })
      }
    }

    const deleteExercise = (id: string) => {
      if (exercises.value.length > 1) {
        exercises.value = exercises.value.filter(
          (exercise) => exercise.id !== id
        )
        return
      }
      errorMsg.value =
        'Error: Cannot remove, need to at least have one exercise'
      setTimeout(() => (errorMsg.value = null), 5000)
    }

    const workoutChange = () => {
      exercises.value = []
      addExercise()
    }

    const createWorkout = async () => {
      try {
        const { error } = await supabase.from('workouts').insert([
          {
            workoutName: workoutName.value,
            workoutType: workoutType.value,
            exercises: exercises.value,
          },
        ])

        if (error) throw error
        statusMsg.value = 'Success: Workout created!'
        workoutName.value = ''
        workoutType.value = 'select-workout'
        exercises.value = []
        setTimeout(() => (statusMsg.value = null), 5000)
      } catch (error) {
        errorMsg.value = `Error: ${(error as Error).message}`
        setTimeout(() => (errorMsg.value = null), 5000)
      }
    }

    return {
      workoutName,
      workoutType,
      exercises,
      statusMsg,
      errorMsg,
      addExercise,
      workoutChange,
      deleteExercise,
      createWorkout,
    }
  },
})
</script>

<style lang="scss" scoped>
.create {
  &__status {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto 1.5rem;
  }

  &__status-txt {
    font-weight: 600;

    &_green {
      color: lightgreen;
    }

    &_red {
      color: lightcoral;
    }
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

  &__form-input,
  &__form-select {
    width: 100%;
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
    flex-direction: column;
    align-items: flex-start;
    margin-top: 2rem;
  }

  &__form-additional-item {
    display: flex;
    position: relative;
    max-width: 100%;
    gap: 1.5rem;
  }

  &__form-additional-section {
    flex: 1;

    &_big {
      flex: 2;
    }
  }

  &__form-additional-img {
    position: absolute;
    width: 2rem;
    top: 50%;
    left: -3rem;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
