
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
        const index = this.selectedItems.findIndex((el) => el.id === item.id); // find the index of the item based on its unique identifier
        if (index !== -1) {
          this.selectedItems.splice(index, 1);
        }
      },
    clearItems() {
      this.selectedItems = [];
    }
  },
  getters: {
    getSelectedItems: state => state.selectedItems,
    calculateTotalSum: (state) => {
        const sum = state.selectedItems.reduce((total: number, item) => total + parseFloat(item.price.toFixed(2)), 0);
        return parseFloat(sum.toFixed(2)); //round the sum to two decimal places and then convert it to a floating-point number
      },
    calculateSelectedItemsCount: state => {
        return state.selectedItems.length;
      }
  }
});

