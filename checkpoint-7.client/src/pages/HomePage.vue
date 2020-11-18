<template>
  <div class="home container-fluid">
    <form class="row justify-content-center my-3" @submit.prevent="createBug">
      <div class="col-6">
        <input class="form-control" type="text" placeholder="Bug Name" v-model="state.newBug.title">
        <input class="form-control" type="text" placeholder="Who is reporting it" v-model="state.newBug.author">
        <input class="form-control" type="text" placeholder="What is the issue" v-model="state.newBug.body">
        <button class="btn btn-lg mb-2" type="submit">
          Report Bug
        </button>
      </div>
    </form>
    <div class="col-10 offset-1 ">
      <bug-component v-for="bug in bugs" :key="bug" :bug-prop="bug" />
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { bugService } from '../services/BugService'
import BugComponent from '../components/BugComponent'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      bugService.getBugs()
    })
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      createBug() {
        bugService.createBug(state.newBug)
      },
      users: computed(() => AppState.users),
      bugs: computed(() => AppState.bugs)
    }
  },
  components: { BugComponent }
}
</script>
