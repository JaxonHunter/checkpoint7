<template>
  <div class="activeBug container-fluid">
    <form class="row form-group" @submit.prevent="editBug">
      <label>Bug Name</label>
      <input type="text" class="form-control" placeholder="Comment Author" v-model="activeBug.title" :disabled="activeBug.completed">
      <label>Author</label>
      <input type="text" class="form-control" placeholder="Comment Author" v-model="activeBug.author" :disabled="activeBug.completed">
      <label>Description</label>
      <input type="text" class="form-control" placeholder="Comment Author" v-model="activeBug.body" :disabled="activeBug.completed">
      <button type="submit" class="btn btn-success shadow-lg" :disabled="activeBug.completed">
        Commit Change
      </button>
    </form>
    <hr>
    <comment-component v-for="comment in comments[activeBug.id]" :key="comment" :comment-prop="comment" />
    <form class="row form-group" @submit.prevent="createComment" v-if="!activeBug.completed">
      <input type="text" class="form-control" placeholder="Comment Author" v-model="state.newComment.author">
      <input type="text" class="form-control" placeholder="Comment Text" v-model="state.newComment.body">
      <button type="submit" class="btn btn-success shadow-lg">
        Post Comment
      </button>
    </form>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import CommentComponent from '../components/CommentComponent'
import { commentService } from '../services/CommentService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
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
      editBug() {
        bugService.editBug(this.activeBug._id, this.activeBug)
      },
      createComment() {
        state.newComment.bugId = route.params.bugId
        commentService.createComment(state.newComment)
      }
    }
  },
  components: { CommentComponent }
}
</script>
