import axios from 'axios'

export default axios.create({
  baseURL: 'https://localhost:7119/api',
  headers: { 'Content-Type': 'application/json' }
})
