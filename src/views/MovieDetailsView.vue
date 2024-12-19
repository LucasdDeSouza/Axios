<script setup>
import { onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie';

const movieStore = useMovieStore();

const props = defineProps({
    movieId: {
        type: String,
        required: true,
    },
});

onMounted(async () => {
    await movieStore.getMovieDetail(props.movieId);
});
</script>

<template>
    <div class="movie-details">
      <div class="content">
        <img
          :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.poster_path}`"
          :alt="movieStore.currentMovie.title"
          class="poster-image"
        />
  
        <div class="details">
          <h1 class="movie-title">{{ movieStore.currentMovie.title }}</h1>
          <p class="tagline">{{ movieStore.currentMovie.tagline }}</p>
          <p class="overview">{{ movieStore.currentMovie.overview }}</p>
          <p class="budget">Orçamento: ${{ movieStore.currentMovie.budget }}</p>
          <p class="rating">Avaliação: {{ movieStore.currentMovie.vote_average }}</p>
        </div>
      </div>
  
      <div class="production-companies">
        <p class="companies-title">Produtoras</p>
        <div class="companies-list">
          <template v-for="company in movieStore.currentMovie.production_companies" :key="company.id">
            <div class="company">
              <img
                v-if="company.logo_path"
                :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
                :alt="company.name"
                class="company-logo"
              />
              <p v-else class="company-name">{{ company.name }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </template>
  

<style scoped>
.companies {
  display: flex;
  flex-direction: row;
  column-gap: 3rem;
  align-items: center;
  margin-bottom: 2rem;
}
</style>
