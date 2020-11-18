<template>
  <div class="commentComponent">
    <h5>{{ state.changedComment.author }}</h5>
    <form class="form-group" @submit.prevent="editComment">
      <input class="form-control" type="text" v-model="state.changedComment.body">
    </form>
    <button class="btn btn-danger" @click="deleteComment">X</button>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { commentService } from '../services/CommentService'
export default {
  name: 'CommentComponent',
  props: ['commentProp'],
  setup(props) {
    const state = reactive({
      changedComment: {}
    })
    onMounted(() => {
      state.changedComment.author = props.commentProp.author
      state.changedComment.body = props.commentProp.body
      state.changedComment.taskId = props.commentProp.taskId
      state.changedComment.bugId = props.commentProp.bugId
    })
    return {
      state,
      getComment() {
        commentService.getComments(props.commentProp._id, state.changedComment)
      },
      editComment() {
        commentService.editComment(props.commentProp._id, state.changedComment)
      },
      deleteComment() {
        commentService.deleteComment(props.commentProp._id, state.changedComment)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
