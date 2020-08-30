<template lang="pug">
v-simple-table(
  height="600"
  fixed-header
  :item="tableData"
)
  template(v-slot:default)
    thead
      tr.mb-2
        th 時段
        th(v-for="{ did, day } in days" :key="did") {{ day }}
        th(v-if="$vuetify.breakpoint.smAndDown") 時段
    tbody
      tr(v-for="[tid, interval] in Object.entries(times)" :key="tid")
        td
          span {{ tid }}
          span {{ interval }}
        td(v-for="{ did } in days" :key="`${did}${tid}`")
          v-chip(
            v-for="courseId in tableData[`${did}${tid}`]"
            :key="`${did}${tid}-${courseId}`"
            :color="courses[courseId].type ? 'primary' : ''"
            :dark="highlightId === courseId"
            :outlined="highlightId !== courseId"
            @click="handleClick(courseId)"
            small
          )
            | {{ courses[courseId].name }}
        td(v-if="$vuetify.breakpoint.smAndDown")
          span {{ tid }}
          span {{ interval }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    tableData: {},
    days: [
      { did: 7, day: '日' },
      { did: 1, day: '一' },
      { did: 2, day: '二' },
      { did: 3, day: '三' },
      { did: 4, day: '四' },
      { did: 5, day: '五' },
      { did: 6, day: '六' }
    ],
    times: {
      M: '6:00 ~ 6:50',
      N: '7:00 ~ 7:50',
      A: '8:00 ~ 8:50',
      B: '9:00 ~ 9:50',
      C: '10:10 ~ 11:00',
      D: '11:10 ~ 12:00',
      X: '12:20 ~ 13:10',
      E: '13:20 ~ 14:10',
      F: '14:20 ~ 15:10',
      G: '15:30 ~ 16:20',
      H: '16:30 ~ 17:20',
      Y: '17:30 ~ 18:20',
      I: '18:30 ~ 19:20',
      J: '19:30 ~ 20:20',
      K: '20:30 ~ 21:20',
      L: '21:30 ~ 22:20'
    },
    clickTimer: null,
    clickCount: 0
  }),
  computed: {
    ...mapGetters({
      selectedCourses: 'getSelectedCourses',
      courses: 'getCourses',
      highlightId: 'getHighlightCourseId'
    })
  },
  methods: {
    handleClick(courseId) {
      this.clickCount++
      if (this.clickCount === 1) {
        this.clickTimer = setTimeout(() => {
          this.clickCount = 0
          this.toggleHighlight(courseId)
        }, 200)
      } else {
        clearTimeout(this.clickTimer)
        this.toggleCourseDetails(courseId)
        this.clickCount = 0
      }
    },
    toggleHighlight(courseId) {
      this.$store.commit('toggleHighlight', courseId)
    },
    toggleCourseDetails(courseId) {
      this.$emit('showDetails', courseId)
    }
  },
  watch: {
    selectedCourses: {
      deep: true,
      handler: function(selected) {
        this.tableData = selected
          .filter(({ show }) => show)
          .map(({ id }) => this.courses[id])
          .reduce((res, course) => {
            course.time
              .split(',')
              .map((t) => t.split('-')[0].match(/\d[A-Z]+/g))
              .filter((t) => t)
              .flat()
              .map((t) => [...t].map((ch) => `${t[0]}${ch}`).slice(1))
              .flat()
              .forEach((t) => {
                if (!res[t]) {
                  res[t] = []
                }
                res[t].push(course.id)
              })

            return res
          }, {})
      }
    }
  }
}
</script>

<style scoped>
th,
td {
  text-align: center !important;
}

td:first-child,
td:last-child {
  width: 130px;
  min-width: 130px;
}

td:first-child span:first-child,
td:last-child span:first-child {
  display: block;
}
</style>
