import { defineStore } from 'pinia';

export const useHeaderHeightStore = defineStore('header-height', {
  state: () => ({
    headerHeight: 0,
  }),
  getters: {
    getHeaderHeight() {
      return this.headerHeight;
    },
  },
  actions: {
    setHeaderHeight(height) {
      this.headerHeight = height;
    },
  },
});
