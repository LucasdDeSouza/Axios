<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useGenreStore } from '@/stores/genre';
import { useRouter } from 'vue-router'
const router = useRouter()

import Loading from 'vue-loading-overlay';

const isLoading = ref(false);


const genreStore = useGenreStore();

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');



onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('tv');
  isLoading.value = false;
});

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('tv');
  isLoading.value = false;
});

const programas = ref([]);

const listTvs = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });
  programas.value = response.data.results;
  isLoading.value = false;
};

function openTv(programaId) {
  router.push({ name: 'TvDetails', params: { programaId } });
}


</script>

<template>
  <h1>Programas de Tv</h1>
  <ul class="genre-list">
    <li v-for="genre in genreStore.genres" :key="genre.id" @click="listTvs(genre.id)" class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }">

      {{ genre.name }}

    </li>
  </ul>

  <loading v-model:active="isLoading" is-full-page />

  <div class="tv-list">
    <div v-for="programa in programas" :key="programa.id" class="tv-card">
      <img :src="`https://image.tmdb.org/t/p/w500${programa.poster_path}`" :alt="programa.name"
        @click="openTv(programa.id)" />
      <div class="tv-details">
        <p class="tv-name">{{ programa.name }}</p>
        <p class="tv-original-name">{{ programa.original_name }}</p>
        <p class="tv-release-date">{{ formatDate(programa.first_air_date) }}</p>
        <p class="tv-genres">
          <span v-for="genre_id in programa.genre_ids" :key="genre_id" @click="listTvs(genre_id)"
            :class="{ active: genre_id === genreStore.currentGenreId }">
            {{ genreStore.getGenreName(genre_id) }}
          </span>


        </p>
      </div>

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

h1 {
  text-align: center;
  margin: 2rem 0;
  color: #333;
}

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.genre-item:hover {
  background-color: #285a3a;
  transform: scale(1.05);
}

.genre-item.active {
  background-color: #285a3a;
  font-weight: bold;
}

.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.tv-card {
  width: 100%;
  max-width: 200px;
  cursor: pointer;
  transition: transform 0.3s;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tv-card:hover {
  transform: scale(1.05);
}

.tv-card img {
  width: 100%;
  height: auto;
}

.tv-details {
  padding: 0.5rem;
  text-align: center;
}

.tv-title {
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}

.tv-release-date,
.tv-genres {
  font-size: 0.9rem;
  color: #666;
}

.tv-genres span {
  cursor: pointer;
  margin-right: 0.5rem;
}

.tv-genres span.active {
  font-weight: bold;
  color: #000;
}

@media (min-width: 600px) {
  .tv-card {
    max-width: 150px;
  }
}

@media (min-width: 900px) {
  .tv-card {
    max-width: 200px;
  }
}
</style>