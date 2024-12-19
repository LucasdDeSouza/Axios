<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import genreStore from '@/stores/genre'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false);
const tvs = ref([]);

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const listTvs = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  tvs.value = response.data.results
  isLoading.value = false;
};

function openTv(tvId) {
  router.push({ name: 'TvDetails', params: { tvId } });
}

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('tv');
  isLoading.value = false;
})
</script>

<template>
  <div class="tv-container">
    <h1 class="hero-title">Programas de TV</h1>
  <ul class="genre-list">
    <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listTvs(genre.id)"
      class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }"
    >
      {{ genre.name }}
    </li>
  </ul>

  <loading v-model:active="isLoading" is-full-page />

  <div class="Tv-list">
    <div v-for="Tv in tvs" :key="Tv.id" class="Tv-card">
      <img
        :src="`https://image.tmdb.org/t/p/w500${Tv.poster_path}`"
        :alt="Tv.name"
        @click="openTv(Tv.id)"
      />
      <div class="Tv-details">
        <p class="Tv-title">{{ Tv.name }}</p>
        <p class="Tv-first-air-date">{{ formatDate(Tv.first_air_date) }}</p>
        <p class="Tv-genres">
          <span
            v-for="genre_id in Tv.genre_ids"
            :key="genre_id"
            @click="listTvs(genre_id)"
            :class="{ active: genre_id === genreStore.currentGenreId }"
          >
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.tv-container {
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
  align-self: center;
  color: #fff;
  display: flex;
  justify-content: center;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}

.Tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.Tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  background-color: #202020;
}

.Tv-card:hover {
  transform: scale(1.05);
}
.Tv-card img {
  width: 100%;
  height: 20rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
}

.Tv-details {
  padding: 1rem;
}

.Tv-title {
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 1.5;
  height: 3.5rem;
  margin-bottom: 0.5rem;
}
.Tv-first-air-date{

font-size: 1rem;

}

.Tv-first-air-date:hover {
color: var(--primary-color);
}
.Tv-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
}

.Tv-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.Tv-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

.active {
  background-color: #67b086;
  font-weight: bolder;
}

.Tv-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>