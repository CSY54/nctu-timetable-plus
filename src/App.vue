<template lang="pug">
v-app
  v-app-bar(
    app
    color="primary"
    dark
    dense
  )
    v-toolbar-title.title
      | NCTU Timetable+
    v-spacer
    v-btn(
      href="https://github.com/CSY54/nctu-timetable-plus"
      target="_blank"
      rel="noopener noreferrer"
      text
    )
      v-icon(left small) mdi-github
      | GitHub
      v-icon(right small) mdi-open-in-new
  v-main
    router-view
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('init')
  }
}
</script>
