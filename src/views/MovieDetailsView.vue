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
  .movie-details {
    text-align: center;
    padding: 20px;
    background-color: #202020;
    border-radius : 10px;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    text-align: left;
  }

  .poster-image {
    width: 185px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin-right: 20px;
  }

  .details {
    max-width: 600px;
  }

  .movie-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #ff4500;
  }

  .tagline {
    font-style: italic;
    color: #777;
    margin-bottom: 10px;
  }

  .overview {
    margin-bottom: 10px;
  }

  .budget {
    margin-bottom: 10px;
  }

  .rating {
    font-weight: bold;
    color: #008080;
  }

  .production-companies {
    margin-top: 20px;
    background-color: white;
    text-align: center;
   }

  .companies-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #ff4500;
  }

  .companies-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .company {
    margin-bottom: 10px;
  }

  .company-logo {
    width: 92px;
    height: auto;
    margin-right: 10px;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  .company-name {
    margin-bottom: 10px;
    color: #333;
  }
  @media (max-width: 768px) {
  .content {
    flex-direction: column;
    align-items: center;
  }

  .poster-image {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .details {
    max-width: 100%;
    padding: 0 20px;
  }

  .companies-list {
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  .movie-title {
    font-size: 1.5rem;
  }

  .companies-title {
    font-size: 1.2rem;
  }

  .company-logo {
    width: 72px;
  }
}
  </style>
