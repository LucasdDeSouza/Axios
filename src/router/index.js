import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: () => import('../views/MoviesView.vue')
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('../views/TvView.vue')
  },
  {
    path: '/filmes/:movieId',
    name: 'MovieDetails',
    component: () => import('../views/MovieDetailsView.vue'),
    props: true
  },
  {
    path: '/tv/:tvId',
    name: 'TvDetails',
    component: () => import('../views/TvDetailsView.vue'),
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
