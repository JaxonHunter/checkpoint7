<template>
  <div class="bugComponent">
    <router-link :to="{name: 'ActiveBug', params: {bugId: bugProp._id}}">
      <ul>
        <li>
          <h5 class="m-2">
            {{ bugProp.title }}
          </h5>
        </li>
        <li>
          <h5 class="m-2">
            {{ bugProp.author }}
          </h5>
        </li>
        <li>
          <h5 class="m-2">
            {{ bugProp.date }}
          </h5>
        </li>
        <li>
          <h5 class="m-2">
            {{ bugProp.complete }}
          </h5>
        </li>
      </ul>
    </router-link>
    <form class="form-group" @submit.prevent="editBug">
      <input class="form-control" type="text" v-model="state.changedBug.title">
      <button class="btn btn-primary btn-lg my-3" type="submit">
        Resolved
      </button>
    </form>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { bugService } from '../services/BugService'
export default {
  name: 'BugComponent',
  props: ['bugProp'],
  setup(props) {
    const state = reactive({
      changedBug: {}
    })
    return {
      state,
      users: computed(() => AppState.user),
      editBug() {
        bugService.editBug(props.bugProp._id, state.changedBug)
      }
    }
  }
}
</script>
