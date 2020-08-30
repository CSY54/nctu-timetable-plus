<template lang="pug">
v-dialog(
  v-model="state"
  max-width="400px"
)
  v-card
    v-card-title.headline
      | {{ course.name }}
    v-card-text
      ul
        li 當期課號：{{ course.id }}
        li 開課教師	：{{ course.teacher }}
        li 選別：{{ course.type ? '必修' : '選修' }}
        li 上課時間、教室：{{ course.time }}
        li 學分：{{ course.credit }}
    v-card-actions
      v-spacer
      v-btn(
        @click="state = false"
        color="primary"
        text
      )
        | Close

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    dialog: {
      type: Boolean
    },
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getCourseById']),
    course() {
      return this.getCourseById(this.courseId) || {}
    },
    state: {
      get() {
        return this.dialog
      },
      set() {
        this.$emit('close')
      }
    }
  }
}
</script>
