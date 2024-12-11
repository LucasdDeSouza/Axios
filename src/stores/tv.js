import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useTvStore = defineStore('programa', () => {
  const state = reactive({
    currentTv: {},
  });

  const currentTv = computed(() => state.currentTv);

  const getTvDetail = async (programaId) => {
    const response = await api.get(`programa/${programaId}`);
    state.currentTv = response.data;
  };

  return { currentTv, getTvDetail };
});
