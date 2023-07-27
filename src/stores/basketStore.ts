import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import {Item} from '../models/Item';
export const useBasketStore = defineStore('basketStore', {
  state: () => ({
    selectedItems: [] as Item[], // Initial empty array to store the selected items
    groupedItems:  [] as Item[], // Initial empty array to store the grouped items
  }),
  actions: {
    addItem(item: Item) {
      this.selectedItems.push(item);
      this.updateGroupedItems();
      this.saveCartToCookie(); // save the updated cart to a cookie
    },
    removeItem(item: Item) {
      const index = this.selectedItems.findIndex((el) => el.id === item.id);// find the index of the item based on its unique identifier
      if (index !== -1) { //Check if the item was found in the selectedItems array.
        this.selectedItems.splice(index, 1);
        this.updateGroupedItems();
        this.saveCartToCookie();
      }
    },
    clearItems() {
      this.selectedItems = [];
      this.groupedItems = [];
      this.saveCartToCookie();
    },
    updateGroupedItems() {
        const groupedItemsMap = new Map();
        
        for (const item of this.selectedItems) {
          if (groupedItemsMap.has(item.id)) {
            const existingItem = groupedItemsMap.get(item.id);
            existingItem.quantity++;
            existingItem.totalPrice += item.price;
          } else {
            const newItem = {
              ...item,
              quantity: 1,
              totalPrice: parseFloat(item.price.toFixed(2)),
            };
            groupedItemsMap.set(item.id, newItem);
          }
        }
        
        this.groupedItems = Array.from(groupedItemsMap.values());
      },

    saveCartToCookie() { // save the current cart to a cookie
        Cookies.set('cart', JSON.stringify(this.selectedItems));
      },

    initializeCartFromCookie() { //Retrieve the cart from the cookie
        const cartData = Cookies.get('cart');
        if (cartData) {
          try {
            this.selectedItems = JSON.parse(cartData);
            this.updateGroupedItems();
          } catch (error) {
            // Handle the error when JSON data is invalid
            console.error('Error parsing cart data:', error);
            // You can choose to clear the cart or take any other appropriate action here
            this.clearItems();
          }
        }
      },
  
  },
  getters: {
    getSelectedItems: (state) => state.selectedItems,
    // getGroupedItems: (state) => state.groupedItems,
    getGroupedItems: (state) => {
        // Create a map of grouped item IDs for efficient lookup
        const groupedItemsMap: Record<number, Item> =  state.groupedItems.reduce((map: Record<number, Item>, item: Item) => {
          map[item.id] = item;
          return map;
        }, {});
      
        // Return an array of grouped items based on the original order
        return state.groupedItems.filter((item) => groupedItemsMap.hasOwnProperty(item.id));
      },
      
    calculateTotalSum: (state) => {
      const sum = state.groupedItems.reduce(
        (total, item) => total + parseFloat((item.totalPrice ?? 0).toFixed(2)), //round the sum to two decimal places and then convert it to a floating-point number
        0
      );
      return parseFloat(sum.toFixed(2));
    },
    calculateSelectedItemsCount: (state) => state.selectedItems.length,
  },
  
});


// Create an instance of the store
const basketStore = useBasketStore();

// Initialize the cart from the cookie when the store is created
basketStore.initializeCartFromCookie();

export default basketStore;
