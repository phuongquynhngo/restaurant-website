

import { defineStore } from 'pinia';

export const useBasketStore = defineStore('basketStore', {
  state: () => ({
    selectedItems: [], // Initial empty array to store the selected items
    groupedItems: [], // Initial empty array to store the grouped items
  }),
  actions: {
    addItem(item) {
      this.selectedItems.push(item);
      this.updateGroupedItems();
    },
    removeItem(item) {
      const index = this.selectedItems.findIndex((el) => el.id === item.id);// find the index of the item based on its unique identifier
      if (index !== -1) { //Check if the item was found in the selectedItems array.
        this.selectedItems.splice(index, 1);
        this.updateGroupedItems();
      }
    },
    clearItems() {
      this.selectedItems = [];
      this.groupedItems = [];
    },
    updateGroupedItems() { // this.groupedItems is updated based on the items in this.selectedItems 
        //by using the reduce method and a reducer function that performs the necessary grouping and accumulation logic.
      this.groupedItems = this.selectedItems.reduce((accumulator, item) => { //Use the reduce method on the selectedItems array to iterate over each item and accumulate the grouped items.
        const existingItem = accumulator.find((el) => el.id === item.id); //find method with el represents the current element being processed in the array.


        //update an existing item in the accumulator array or add a new item. 

        if (existingItem) {
          // update quantity and totalPrice properties of existingItem.
          existingItem.quantity++;
          existingItem.totalPrice += item.price;

        } else { //no existing item in accumulator is found
          const newItem = {  // create newItem  with the necessary properties (including quantity and totalPrice) 
            ...item,
            quantity: 1,
            totalPrice: parseFloat(item.price.toFixed(2)),
          };
          accumulator.push(newItem); //push newItem to the accumulator.
        }

        return accumulator;
      }, []);//The empty array [] is used as the initial value for the accumulator array. 
  
    },
  },
  getters: {
    getSelectedItems: (state) => state.selectedItems,
    getGroupedItems: (state) => state.groupedItems,
    calculateTotalSum: (state) => {
      const sum = state.groupedItems.reduce(
        (total, item) => total + parseFloat(item.totalPrice.toFixed(2)), //round the sum to two decimal places and then convert it to a floating-point number
        0
      );
      return parseFloat(sum.toFixed(2));
    },
    calculateSelectedItemsCount: (state) => state.selectedItems.length,
  },
});


