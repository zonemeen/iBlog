import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (val, type) => {
  if (!val) return '';

  return dayjs(val).format(type)
})