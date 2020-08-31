import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const parseSelected = (s) => s.map(({ id }) => id)

const state = {
  courses: {},
  selectedCourses: [],
  highlightCourseId: ''
}

const getters = {
  courseIdExists: (state) => (id) => !!state.courses[id],
  getCourses: (state) => state.courses,
  getCourseById: (state) => (id) => state.courses[id],
  getSelectedCourses: (state) => state.selectedCourses,
  getCredit: (state) => (addAll) => {
    return state.selectedCourses
      .filter(({ show }) => addAll || show)
      .map(({ id }) => state.courses[id].credit)
      .reduce((sum, cur) => sum + parseFloat(cur), 0.0)
  },
  getHighlightCourseId: (state) => state.highlightCourseId,
  searchCourse: (state) => (keyword) => {
    if (!keyword) {
      return []
    }

    const re = new RegExp(keyword, 'ui')
    return Object.values(state.courses)
      .filter(
        (course) =>
          course.id.match(re) ||
          course.teacher.match(re) ||
          course.name.match(re)
      )
      .slice(0, 10)
  }
}

const mutations = {
  setSelected(state, selected) {
    state.selectedCourses = selected
  },
  setCourse(state, courses) {
    state.courses = courses
    localStorage.setItem('courses', JSON.stringify(courses))
  },
  addCourse(state, courseId) {
    state.selectedCourses.push({
      id: courseId,
      show: true
    })
    localStorage.setItem(
      'selectedCourses',
      JSON.stringify(parseSelected(state.selectedCourses))
    )
  },
  deleteCourse(state, courseId) {
    const idx = state.selectedCourses.findIndex((c) => c.id === courseId)
    if (idx != -1) {
      state.selectedCourses.splice(idx, 1)
    }
    localStorage.setItem(
      'selectedCourses',
      JSON.stringify(parseSelected(state.selectedCourses))
    )
  },
  toggleHighlight(state, courseId) {
    if (state.highlightCourseId === courseId) {
      state.highlightCourseId = ''
    } else {
      state.highlightCourseId = courseId
    }
  }
}

const actions = {
  async init({ commit }) {
    try {
      let data = JSON.parse(localStorage.getItem('courses'))

      if (Object.keys(data).length === 0) {
        throw new Error()
      }

      commit('setCourse', data)
    } catch (e) {
      const data = await fetch('parsed.json').then((res) => res.json())
      commit('setCourse', data)
    }

    try {
      const selected = JSON.parse(localStorage.getItem('selectedCourses'))
      if (!Array.isArray(selected)) {
        throw new Error()
      }
      commit(
        'setSelected',
        selected.map((id) => ({
          id,
          show: true
        }))
      )
    } catch (e) {
      localStorage.removeItem('selectedCourses')
    }
  },
  addCourse({ state, getters, commit }, courseId) {
    if (
      !state.selectedCourses.some((c) => c.id === courseId) &&
      getters.courseIdExists(courseId)
    ) {
      commit('addCourse', courseId)
    }
  },
  deleteCourse({ commit }, courseId) {
    commit('deleteCourse', courseId)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
