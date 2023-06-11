
// store/index.js

import { defineStore } from 'pinia';

export const useBasketStore = defineStore('basketStore', {
  state: () => ({
    selectedItems: [] // Initial empty array to store the selected items (piani)
  }),
  actions: {
    addItem(item) {
      this.selectedItems.push(item);
    },
    removeItem(item) {
      const index = this.selectedItems.indexOf(item);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    },
    clearItems() {
      this.selectedItems = [];
    }
  },
  getters: {
    getSelectedItems: state => state.selectedItems
  }
});

