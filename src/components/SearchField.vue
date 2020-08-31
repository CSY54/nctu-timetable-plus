<template lang="pug">
v-autocomplete(
  v-model="model"
  :items="items"
  :search-input.sync="search"
  :no-data-text="hint"
  @keyup.native.enter="submit"
  @click:append-outer="submit"
  @focus="setSuggestion()"
  label="課程代號/課程名稱/授課教師"
  placeholder="例：0311、微積分..."
  prepend-icon="mdi-magnify"
  append-outer-icon="mdi-plus"
  item-text="id"
  item-value="id"
  outlined
  clearable
  no-filter
  hide-details
  hide-selected
  auto-select-first
)
  template(v-slot:item="{ item }")
    CourseItem(:id="item.id")
</template>

<script>
import { mapGetters } from 'vuex'

import CourseItem from '@/components/CourseItem'

export default {
  components: {
    CourseItem
  },
  data: () => ({
    model: null,
    items: [],
    search: null,
    hint: '',
    wtf: [
      '微積分',
      '程式設計',
      '數位電路',
      '線性代數',
      '人工智慧',
      '資料結構',
      '[object Object]'
    ]
  }),
  computed: {
    ...mapGetters(['searchCourse'])
  },
  methods: {
    addCourse(courseId) {
      this.$store.dispatch('addCourse', courseId)
    },
    submit() {
      this.addCourse(this.model)
      this.model = null
    },
    setSuggestion() {
      const rnd = Math.floor(this.wtf.length * Math.random())
      this.hint = `想來點 ${this.wtf[rnd]} 嗎？`
    }
  },
  watch: {
    search(keyword) {
      if (!keyword) {
        this.setSuggestion()
      } else {
        this.hint = '404 Not Found QQ'
      }
      this.items = this.searchCourse(keyword)
    }
  },
  mounted() {
    this.setSuggestion()
  }
}
</script>
