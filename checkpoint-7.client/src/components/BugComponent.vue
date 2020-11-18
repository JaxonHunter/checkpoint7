<template>
  <div class="bugComponent">
    <router-link :to="{name: 'ActiveBug', params: {bugId: bugProp._id}}">
      <ul>
        <h5 v-bind:class="{ completed: bugProp.completed, incomplete: !bugProp.completed }">
          Title: {{ bugProp.title }}
        </h5>
        <h5 v-bind:class="{ completed: bugProp.completed, incomplete: !bugProp.completed}">
         Reported by: {{ bugProp.author }}
        </h5>
        <h5 v-bind:class="{ completed: bugProp.completed, incomplete: !bugProp.completed }">
          Last edited: {{ cleanEditedDate }}
        </h5>
        <h5 v-bind:class="{ completed: bugProp.completed, incomplete: !bugProp.completed }">
          Resolved: {{ bugProp.completed }}
        </h5>
      </ul>
    </router-link>
    <button @click="resolveBug" v-if="!bugProp.completed">Mark as resolved</button>
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
      },
      resolveBug() {
        state.changedBug.completed = true
        bugService.editBug(props.bugProp._id, state.changedBug)
      }
    }
  },
  computed: {
    cleanEditedDate() {
      return new Date(this.bugProp.updatedAt).toDateString()
    }
  }
}
</script>
<style>
.completed{
  color: limegreen;
}
.incomplete{
  color: maroon;
}
</style>
