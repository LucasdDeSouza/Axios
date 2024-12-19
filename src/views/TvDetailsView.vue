<script setup>
import { onMounted } from 'vue';
import { useTvStore } from '@/stores/tv';

const tvStore = useTvStore();

const props = defineProps({
    tvId: {
        type: String,
        required: true,
    },
});

onMounted(async () => {
    await tvStore.getTvDetail(props.tvId);
});

</script>

<template>
    <div class="tv-details">
      <div class="content">
        <img
          :src="`https://image.tmdb.org/t/p/w185${tvStore.currentTv.poster_path}`"
          :alt="tvStore.currentTv.name"
          class="poster-image"
        />
  
        <div class="details">
          <h1 class="tv-title">{{ tvStore.currentTv.name }}</h1>
          <p class="tagline">{{ tvStore.currentTv.tagline }}</p>
          <p class="overview">{{ tvStore.currentTv.overview }}</p>
          <p class="rating">Avaliação: {{ tvStore.currentTv.vote_average }}</p>
        </div>
      </div>
  
      <div class="production-companies">
        <p class="companies-title">Produtoras</p>
        <div class="companies-list">
          <template v-for="company in tvStore.currentTv.production_companies" :key="company.id">
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
  .tv-details {
    text-align: center;
    padding: 20px;
    background-color: #3d3d3d;
    color: #fff;
  }
  
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .poster-image {
    width: 185px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(175, 175, 175, 0.2);
    margin-right: 20px;
  }
  
  .details {
    max-width: 600px;
  }
  
  .tv-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #ffd700; 
  }
  
  .tagline {
    font-style: italic;
    color: #777;
    margin-bottom: 10px;
  }
  
  .overview {
    margin-bottom: 10px;
  }
  
  .rating {
    font-weight: bold;
    color: #00ff00; 
  }
  
  .production-companies {
    margin-top: 20px;
  }
  
  .companies-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #ffd700; 
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
    box-shadow: 0 0 5px rgb(214, 214, 214);
  }
  
  .company-name {
    margin-bottom: 10px;
    color: #fff; 
  }
  </style>
  