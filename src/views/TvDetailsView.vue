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
.companies {
  display: flex;
  flex-direction: row;
  column-gap: 3rem;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;  
}

.company {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.company-logo {
  width: 92px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.company-logo:hover {
  transform: scale(1.1);
}

.company-name {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .companies {
    column-gap: 1rem;
  }

  .company-logo {
    width: 72px;
  }

  .company-name {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .companies {
    flex-direction: column;
    align-items: flex-start;
  }

  .company {
    width: 100%;
    align-items: flex-start;
  }

  .company-logo {
    width: 100%;
    max-width: 92px;
  }

  .company-name {
    font-size: 0.8rem;
    text-align: left;
  }
}
  </style>
  