<template lang="pug">
v-container.mb-4(fluid)
  Disclaimer
  v-row
    v-col(cols="12" md="3")
      v-card
        v-card-title 選課
        v-card-text
          v-text-field(
            v-model="input"
            label="課程代號"
            append-outer-icon="mdi-plus"
            @click:append-outer="addCourse"
            dense
            outlined
          )
      v-card
        v-card-title 已選課程
        SelectedList
        v-card-text
          | 總計： {{ getCredit.toFixed(2) }} 學分
    v-col(cols="12" md="9")
      v-card.pb-2.overflow
        v-card-title 課表
        v-alert.ma-2(
          color="info"
          icon="mdi-cursor-default-click"
          dismissible
          dense
          outlined
        )
          | Click once to highlight the course, twice to view the details.
          
        TimeTable(
          @showDetails="showDetails"
        )
  CourseDetailsDialog(
    :dialog="dialog"
    :courseId="detailCourseId"
    @close="dialog = false"
  )
</template>

<script>
import { mapGetters } from 'vuex'

import Disclaimer from '@/components/Disclaimer'
import SelectedList from '@/components/SelectedList'
import TimeTable from '@/components/TimeTable'
import CourseDetailsDialog from '@/components/CourseDetailsDialog'

export default {
  components: {
    Disclaimer,
    SelectedList,
    TimeTable,
    CourseDetailsDialog
  },
  data: () => ({
    input: '',
    dialog: false,
    detailCourseId: ''
  }),
  computed: {
    ...mapGetters(['getCredit'])
  },
  methods: {
    addCourse() {
      this.$store.dispatch('addCourse', this.input)
      this.input = ''
    },
    showDetails(courseId) {
      this.detailCourseId = courseId
      this.dialog = true
    }
  }
}
</script>

<style scoped>
.v-card + .v-card {
  margin-top: 20px;
}

.overflow {
  overflow-x: scroll;
  width: 100%;
}
</style>
