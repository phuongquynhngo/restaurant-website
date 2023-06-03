import { defineStore } from 'pinia';

export const useFocusedCategoryStore = defineStore('forcus-category', {
  state: () => ({
    focusedCategoryId: null as string | null,
    
  }),
  getters: {
    getFocusedCategoryId() {
      return this.focusedCategoryId;
    },
  },
  actions: {
    setFocusedCategoryId(categoryId: string) {
      this.focusedCategoryId = "category-" + categoryId;
    },
  },
});