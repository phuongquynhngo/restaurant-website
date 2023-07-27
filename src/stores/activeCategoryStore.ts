import { defineStore } from 'pinia';

export const useActiveCategoryStore = defineStore('active-category', {
  state: () => ({
    activeCategoryId: null as number | null,
    
  }),
  getters: {
    getActiveCategoryId(): number | null {
      return this.activeCategoryId;
    },
  },
  actions: {
    setActiveCategoryId(categoryId: number) {
      this.activeCategoryId = categoryId;
    },
  },
});