<template lang="pug">
v-list-item-content
  v-list-item-title
    | {{ `${id} ${course.name}` }}
  v-list-item-subtitle
    | {{ `${course.teacher} | ${course.credit} 學分` }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['getCourseById']),
    course() {
      return this.getCourseById(this.id)
    }
  }
}
</script>
