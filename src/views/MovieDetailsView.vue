<script setup>
import { defineProps, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie';
const movieStore = useMovieStore();

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  await movieStore.getMovieDetail(props.movieId);
});
</script>

<template>
  <div class="main">
    <div class="content">
      <img
        :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.poster_path}`"
        :alt="movieStore.currentMovie.title"
        class="movie-poster"
      />
      <div class="details">
        <h1>{{ movieStore.currentMovie.title }}</h1>
        <p class="tagline">{{ movieStore.currentMovie.tagline }}</p>
        <p class="overview">{{ movieStore.currentMovie.overview }}</p>
        <p class="budget">Orçamento: ${{ movieStore.currentMovie.budget }}</p>
        <p class="rating">Avaliação: {{ movieStore.currentMovie.vote_average }}</p>
      </div>
    </div>
    <p class="producers-title">Produtoras</p>
    <div class="companies">
      <template
        v-for="company in movieStore.currentMovie.production_companies"
        :key="company.id"
      >
        <img
          v-if="company.logo_path"
          :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
          :alt="company.name"
          class="company-logo"
        />
        <p v-else class="company-name">{{ company.name }}</p>
      </template>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  max-width: 800px;
  width: 100%;
}

.movie-poster {
  width: 100%;
  max-width: 185px;
  border-radius: 0.5rem;
}

.details {
  text-align: center;
  margin-top: 1rem;
}

.details h1 {
  font-size: 2rem;
  color: #333;
}

.details .tagline {
  font-style: italic;
  color: #666;
}

.details .overview {
  margin-top: 1rem;
  color: #333;
}

.details .budget,
.details .rating {
  margin-top: 0.5rem;
  color: #666;
}

.producers-title {
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #333;
}

.companies {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.company-logo {
  width: 92px;
  height: auto;
  border-radius: 0.5rem;
}

.company-name {
  font-size: 1rem;
  color: #333;
}

@media (min-width: 600px) {
  .content {
    flex-direction: row;
    align-items: flex-start;
  }

  .details {
    text-align: left;
    margin-left: 2rem;
  }
}
</style>