<template lang="pug">
v-alert(
  type="warning"
  outlined
  dismissible
)
  .title Disclaimer
  | 此網頁僅供排課上之便利，如有錯誤不會承擔任何責任。
  br
  | 所有資料皆
  a(
    href="https://github.com/CSY54/nctu-timetable-plus/blob/master/get_data.py"
    target="_blank"
    rel="noopener noreferrer"
  )
    | 從此獲取
  v-icon(small) mdi-open-in-new
  | ，如發現有缺漏，歡迎發 PR。
</template>
