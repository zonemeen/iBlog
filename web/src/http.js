/* eslint-disable */
import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  timeout: 20 * 1000, // Timeout
})

export default http;