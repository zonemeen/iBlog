import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (val, type) => {
  return dayjs(val).format(type)
})