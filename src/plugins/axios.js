import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDAyN2VkZmRjYmI5N2ZiMDUwMjU3NGJhNmNkMzYyYiIsInN1YiI6IjY0ZmYxNjI0ZmZjOWRlMGVlMDBjYzViOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9w9KtAdN9HW2NDYh0T-ljTXt7H_hyGbCSkwALRQITWY`
  }
})

export default api
