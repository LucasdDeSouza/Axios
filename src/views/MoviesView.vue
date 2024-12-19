<script setup>
import { ref, onMounted } from 'vue'
import Loading from 'vue-loading-overlay'
import api from '@/plugins/axios'
import genreStore from '@/stores/genre'
import { useRouter } from 'vue-router'
const router = useRouter()

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}

const isLoading = ref(false)
onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('movie')
  isLoading.value = false
})

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const movies = ref([])

const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  })
  movies.value = response.data.results
  isLoading.value = false
}
</script>
<template>
  <div class="movies-container">
    <h1 class="hero-title">Descubra Novos Filmes</h1>
    <ul class="genre-list">
      <li
        v-for="genre in genreStore.genres"
        :key="genre.id"
        @click="listMovies(genre.id)"
        class="genre-item"
      >
        {{ genre.name }}
      </li>
    </ul>

    <loading v-model:active="isLoading" is-full-page />

    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img
  :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
  :alt="movie.title"
  @click="openMovie(movie.id)"
/>   
        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
          <div class="movie-genres">
            <span
              v-for="genre_id in movie.genre_ids"
              :key="genre_id"
              @click="listMovies(genre_id)"
              class="genre-tag"
            >
              {{ genreStore.getGenreName(genre_id) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movies-container {
  text-align: center;
  padding: 20px;
  background-color: #101010;
  color: #fff;
  
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.genre-item:hover {
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  background-color: #202020;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
}

.movie-details {
  padding: 1rem;
}

.movie-title {
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 1.5;
  height: 3.5rem;
  margin-bottom: 0.5rem;
}
.movie-release-date {

  font-size: 1rem;
 
}

.movie-release-date:hover {
  color: var(--primary-color);
}

.movie-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
}

.genre-tag {
  background-color: #086387;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.genre-tag:hover {
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

</style>
