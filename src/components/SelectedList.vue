<template lang="pug">
v-list
  v-list-item-group
    template(v-if="selectedCourses.length === 0")
      .subtitle.text-center 尚無選取課程
    template(v-else)
      v-list-item(
        v-for="d in selectedCourses"
        :key="d.id"
        inactive
      )
        v-list-item-action
          v-checkbox(v-model="d.show")
        CourseItem(:id="d.id")
        //-
          v-list-item-content
            v-list-item-title {{ `${courses[d.id].name}` }}
            v-list-item-subtitle {{ `${courses[d.id].teacher} | ${courses[d.id].credit} 學分` }}
        v-list-item-action
          v-btn(
            @click="deleteCourse(d.id)"
            small
            icon
          )
            v-icon(small color="red lighten-2")
              | mdi-close
</template>

<script>
import { mapGetters } from 'vuex'

import CourseItem from '@/components/CourseItem'

export default {
  components: {
    CourseItem
  },
  computed: {
    ...mapGetters({
      selectedCourses: 'getSelectedCourses',
      courses: 'getCourses'
    })
  },
  methods: {
    deleteCourse(id) {
      this.$store.dispatch('deleteCourse', id)
    }
  }
}
</script>
