<template>
  <div class="activeBug container-fluid">
    <h3>{{ activeBug.title }}</h3>
    <div class="row">
      <form class="col-3 form-group" @submit.prevent="createComment">
        <input type="text" class="form-control" v-model="state.newComment.title">
        <button class="btn btn-info" type="submit">
          Create Comment
        </button>
      </form>
      <comment-component v-for="comment in comments" :key="comment" :comment-prop="comment" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { commentService } from '../services/CommentService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import CommentComponent from '../components/CommentComponent'
import { bugService } from '../services/BugService'

export default {
  name: 'ActiveBug',
  setup(props) {
    const state = reactive({
      newComment: {}
    })
    const route = useRoute()
    onMounted(async() => {
      await commentService.getComments(route.params.bugId)
      await bugService.getActiveBug(route.params.bugId)
    })
    return {
      state,
      activeBug: computed(() => AppState.activeBug),
      comments: computed(() => AppState.comments),
      createComment() {
        state.newComment.bugId = route.params.bugId
        commentService.createComment(state.newComment)
      }
    }
  },
  components: { CommentComponent }
}
</script>
