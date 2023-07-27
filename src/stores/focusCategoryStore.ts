import { defineStore } from 'pinia';

export const useFocusedCategoryStore = defineStore('focus-category', {
  state: () => ({
    focusedCategoryId: null as string | null,
    
  }),
  getters: {
    getFocusedCategoryId(): string | null {
      return this.focusedCategoryId;
    },
  },
  actions: {
    setFocusedCategoryId(categoryId: number) {
      this.focusedCategoryId = "category-" + categoryId;
    },
  },
});