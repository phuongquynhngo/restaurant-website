import { defineStore } from 'pinia';

export const useHeaderHeightStore = defineStore('header-height', {
  state: () => ({
    headerHeight: 0,
  }),
  getters: {
    getHeaderHeight(): number | null {
      return this.headerHeight;
    },
  },
  actions: {
    setHeaderHeight(height: number) {
      this.headerHeight = height;
    },
  },
});
