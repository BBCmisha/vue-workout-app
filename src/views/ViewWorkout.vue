<template>
  <div class="app__container">
    <div class="view-workout">
      <div v-if="statusMsg || errorMsg" class="view-workout__status">
        <span class="view-workout__status-txt view-workout__status-txt_green">
          {{ statusMsg }}
        </span>
        <span class="view-workout__status-txt view-workout__status-txt_red">
          {{ errorMsg }}
        </span>
      </div>

      <div v-if="dataLoaded" class="view-workout__content">
        <div class="view-workout__content-main">
          <div v-if="user" class="view-workout__content-main-activities">
            <div
              @click="editMode"
              class="view-workout__content-main-activities-item"
            >
              <img
                class="view-workout__content-main-activities-icon"
                src="@/assets/images/pen.png"
                alt="edit"
              />
            </div>
            <div
              @click="deleteWorkout"
              class="view-workout__content-main-activities-item"
            >
              <img
                class="view-workout__content-main-activities-icon"
                src="@/assets/images/delete.png"
                alt="delete"
              />
            </div>
          </div>

          <img
            v-if="data.workoutType === 'cardio'"
            class="view-workout__content-main-image"
            src="@/assets/images/running.png"
            alt="cardio"
          />
          <img
            v-else
            class="view-workout__content-main-image"
            src="@/assets/images/weights.png"
            alt="weights"
          />
          <span class="view-workout__content-main-type">
            {{ data.workoutType }}
          </span>
          <div class="view-workout__content-main-edit">
            <input
              class="view-workout__content-main-edit-input"
              v-if="edit"
              type="text"
              v-model="data.workoutName"
            />
            <span v-else class="view-workout__content-main-name">
              {{ data.workoutName }}
            </span>
          </div>
        </div>

        <div class="view-workout__content-additional">
          <!-- Strength -->
          <div
            v-if="data.workoutType === 'strength'"
            class="view-workout__content-additional-section"
          >
            <div
              v-for="(item, idx) in data.exercises"
              :key="idx"
              class="view-workout__content-additional-row"
            >
              <div
                class="view-workout__content-additional-cell view-workout__content-additional-cell_big"
              >
                <label
                  for="exercise-name"
                  class="view-workout__content-additional-cell-title"
                >
                  Exercise
                </label>
                <input
                  v-if="edit"
                  type="text"
                  id="exercise-name"
                  class="view-workout__content-additional-cell-input"
                  v-model="item.exercise"
                />
                <span
                  v-else
                  class="view-workout__content-additional-cell-value"
                >
                  {{ item.exercise }}
                </span>
              </div>

              <div class="view-workout__content-additional-cell">
                <label
                  for="exercise-sets"
                  class="view-workout__content-additional-cell-title"
                >
                  Sets
                </label>
                <input
                  v-if="edit"
                  type="text"
                  id="exercise-sets"
                  class="view-workout__content-additional-cell-input"
                  v-model="item.sets"
                />
                <span
                  v-else
                  class="view-workout__content-additional-cell-value"
                >
                  {{ item.sets }}
                </span>
              </div>

              <div class="view-workout__content-additional-cell">
                <label
                  for="exercise-reps"
                  class="view-workout__content-additional-cell-title"
                >
                  Reps
                </label>
                <input
                  v-if="edit"
                  type="text"
                  id="exercise-reps"
                  class="view-workout__content-additional-cell-input"
                  v-model="item.reps"
                />
                <span
                  v-else
                  class="view-workout__content-additional-cell-value"
                >
                  {{ item.reps }}
                </span>
              </div>

              <div class="view-workout__content-additional-cell">
                <label
                  for="exercise-weight"
                  class="view-workout__content-additional-cell-title"
                >
                  Weight
                </label>
                <input
                  v-if="edit"
                  type="text"
                  id="exercise-weight"
                  class="view-workout__content-additional-cell-input"
                  v-model="item.weight"
                />
                <span
                  v-else
                  class="view-workout__content-additional-cell-value"
                >
                  {{ item.weight }}
                </span>
              </div>

              <img
                v-if="edit"
                @click="deleteExercise(item.id)"
                src="@/assets/images/delete.png"
                class="view-workout__content-additional-row-delete"
                alt="delete"
              />
            </div>
            <button
              v-if="edit"
              @click="addExercise"
              class="view-workout__content-additional-section-btn"
            >
              Add exercise
            </button>
          </div>

          <!-- Cardio -->
          <div
            v-if="data.workoutType === 'cardio'"
            class="view-workout__content-additional-section"
          >
            <div
              v-for="(item, idx) in data.exercises"
              :key="idx"
              class="view-workout__content-additional-row"
            >
              <div
                class="view-workout__content-additional-cell view-workout__content-additional-cell_big"
              >
                <label
                  for="cardio-type"
                  class="view-workout__content-additional-cell-title"
                >
                  Type
                </label>
                <select
                  v-if="edit"
                  type="text"
                  id="cardio-type"
                  class="view-workout__content-additional-cell-input"
                  v-model="item.cardioType"
                >
                  <option value="#">Select type</option>
                  <option value="run">Runs</option>
                  <option value="walk">Walk</option>
                </select>
                <span
                  v-else
                  class="view-workout__content-additional-cell-value"
                >
                  {{ item.cardioType }}
                </span>
              </div>

              <div class="view-workout__content-additional-cell">
                <label
                  for="distance"
                  class="view-workout__content-additional-cell-title"
                >
                  Distance
                </label>
                <input
                  v-if="edit"
                  type="text"
                  id="distance"
                  class="view-workout__content-additional-cell-input"
                  v-model="item.distance"
                />
                <span
                  v-else
                  class="view-workout__content-additional-cell-value"
                >
                  {{ item.distance }}
                </span>
              </div>

              <div class="view-workout__content-additional-cell">
                <label
                  for="duration"
                  class="view-workout__content-additional-cell-title"
                >
                  Duration
                </label>
                <input
                  v-if="edit"
                  type="text"
                  id="duration"
                  class="view-workout__content-additional-cell-input"
                  v-model="item.duration"
                />
                <span
                  v-else
                  class="view-workout__content-additional-cell-value"
                >
                  {{ item.duration }}
                </span>
              </div>

              <div class="view-workout__content-additional-cell">
                <label
                  for="pace"
                  class="view-workout__content-additional-cell-title"
                >
                  Pace
                </label>
                <input
                  v-if="edit"
                  type="text"
                  id="pace"
                  class="view-workout__content-additional-cell-input"
                  v-model="item.pace"
                />
                <span
                  v-else
                  class="view-workout__content-additional-cell-value"
                >
                  {{ item.pace }}
                </span>
              </div>

              <img
                v-if="edit"
                @click="deleteExercise(item.id)"
                src="@/assets/images/delete.png"
                class="view-workout__content-additional-row-delete"
                alt="delete"
              />
            </div>
            <button
              v-if="edit"
              @click="addExercise"
              class="view-workout__content-additional-section-btn"
            >
              Add exercise
            </button>
          </div>
        </div>

        <button
          v-if="edit"
          @click="update"
          class="view-workout__content-additional-section-btn"
        >
          Update workout
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { supabase } from '@/supabase/init'
import { ROUTE_NAMES } from '@/helpers/enums'
import { uid } from 'uid'

type WorkoutType = {
  id: number
  exercises: ExerciseType[]
  workoutType: string
  workoutName: string
}

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
  name: 'view-workout',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const data = ref<WorkoutType | null>(null)
    const dataLoaded = ref<boolean>(false)
    const errorMsg = ref<string | null>(null)
    const statusMsg = ref<string | null>(null)
    const user = computed(() => store.getters.getUser)

    const currentId = route.params.workoutId

    const getData = async () => {
      try {
        const { data: workouts, error } = await supabase
          .from('workouts')
          .select('*')
          .eq('id', currentId)
        if (error) throw error
        data.value = workouts ? workouts[0] : null
        dataLoaded.value = true
      } catch (error) {
        errorMsg.value = (error as Error).message
        setTimeout(() => (errorMsg.value = null), 5000)
      }
    }

    const deleteWorkout = async () => {
      try {
        const { error } = await supabase
          .from('workouts')
          .delete()
          .eq('id', currentId)
        if (error) throw error
        router.push({ name: ROUTE_NAMES.HOME })
      } catch (error) {
        errorMsg.value = `Error: ${(error as Error).message}`
        setTimeout(() => (errorMsg.value = null), 5000)
      }
    }

    const edit = ref<boolean>(false)

    const editMode = () => {
      edit.value = !edit.value
    }

    const addExercise = () => {
      if (!data.value) return
      if (data.value.workoutType === 'strength') {
        data.value.exercises.push({
          id: uid(),
          exercise: '',
          sets: '',
          reps: '',
          weight: '',
        })
      } else if (data.value.workoutType === 'cardio') {
        data.value.exercises.push({
          id: uid(),
          cardio: '',
          distance: '',
          duration: '',
          pace: '',
        })
      }
    }

    const deleteExercise = (id: string) => {
      if (!data.value) return
      if (data.value.exercises.length > 1) {
        data.value.exercises = data.value.exercises.filter(
          (exercise) => exercise.id !== id
        )
        return
      }
      errorMsg.value =
        'Error: Cannot remove, need to at least have one exercise'
      setTimeout(() => (errorMsg.value = null), 5000)
    }

    const update = async () => {
      try {
        const { error } = await supabase
          .from('workouts')
          .update({
            workoutName: data.value?.workoutName,
            exercises: data.value?.exercises,
          })
          .eq('id', currentId)
        if (error) throw error
        edit.value = false
        statusMsg.value = 'Success: Workout updated!'
        setTimeout(() => (statusMsg.value = null), 5000)
      } catch (error) {
        errorMsg.value = `Error: ${(error as Error).message}`
        setTimeout(() => (errorMsg.value = null), 5000)
      }
    }

    onMounted(async () => {
      await getData()
    })

    return {
      data,
      dataLoaded,
      errorMsg,
      statusMsg,
      user,
      edit,
      editMode,
      deleteWorkout,
      addExercise,
      deleteExercise,
      update,
    }
  },
})
</script>

<style lang="scss" scoped>
.view-workout {
  &__status {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3.2rem 0;
  }

  &__status-txt {
    &_green {
      color: lightgreen;
    }

    &_red {
      color: lightcoral;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 60rem;
    margin: 3.2rem auto 0;
  }

  &__content-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 5rem 2.4rem;
    background-color: var(--clr__grey-1);
  }

  &__content-main-activities {
    display: flex;
    gap: 0.8rem;
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
  }

  &__content-main-activities-item {
    width: 3rem;
    border-radius: 50%;
    padding: 0.6rem;
    background-color: var(--clr__orange);
    cursor: pointer;

    &:hover {
      background-color: var(--clr__white);
    }
  }

  &__content-main-image {
    width: 10rem;
  }

  &__content-main-type {
    display: block;
    margin: 1.6rem 0;
    padding: 0.5rem 1rem;
    background-color: var(--clr__black);
    color: var(--clr__white);
  }

  &__content-main-name {
    line-height: 2.8rem;
    font-size: 1.8rem;
  }

  &__content-main-edit-input {
    background: none;
    border: none;
    border-bottom: 0.2rem solid var(--clr__orange);

    &:focus {
      outline: none;
    }
  }

  &__content-additional {
    background-color: var(--clr__grey-1);
    margin-top: 2.4rem;
    padding: 0 1.2rem 1.6rem;
  }

  &__content-additional-section-btn {
    background: var(--clr__black);
    border: none;
    color: var(--clr__white);
    padding: 1rem 3rem;
    margin-top: 1.5rem;
    cursor: pointer;

    &:hover {
      background-color: var(--clr__orange);
    }
  }

  &__content-additional-row {
    display: flex;
    position: relative;
    margin-top: 1.6rem;
    gap: 1.6rem;
  }

  &__content-additional-cell {
    flex: 1;
    flex-direction: column;

    &_big {
      flex: 2;
    }
  }

  &__content-additional-cell-title {
    display: block;
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }

  &__content-additional-cell-input {
    width: 100%;
    background: none;
    border: none;
    border-bottom: 0.2rem solid var(--clr__orange);

    &:focus {
      outline: none;
    }
  }

  &__content-additional-cell-value {
    font-size: 1.8rem;
    line-height: 2.8rem;
  }

  &__content-additional-row-delete {
    position: absolute;
    top: 50%;
    left: -3.2rem;
    width: 2rem;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
