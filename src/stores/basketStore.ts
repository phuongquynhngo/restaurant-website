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
            existingItem.totalPrice += Number(item.price);
          } else {
            const newItem = {
              ...item,
              quantity: 1,
              totalPrice: parseFloat(Number(item.price).toFixed(2)),
            };
            groupedItemsMap.set(item.id, newItem);
          }
        }
        
        this.groupedItems = Array.from(groupedItemsMap.values());
      },

    saveCartToCookie() { // save the current cart to a cookie
        Cookies.set('cart', JSON.stringify(this.selectedItems));
      },
    // Inside initializeCartFromCookie:
    initializeCartFromCookie() {
      const cartData = Cookies.get('cart');
      if (cartData) {
        try {
          const parsedItems = JSON.parse(cartData);
          if (Array.isArray(parsedItems)) {
            // Verify that parsedItems is an array of valid Item objects
            this.selectedItems = parsedItems;
            this.updateGroupedItems();
          } else {
            console.error('Invalid cart data format:', parsedItems);
            this.clearItems(); // Handle the error by clearing the cart
          }
        } catch (error) {
          console.error('Error parsing cart data:', error);
          this.clearItems(); // Handle the parsing error by clearing the cart
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
        const sum = state.groupedItems.reduce((total, item) => {
          const itemTotalPrice = parseFloat(Number(item.totalPrice).toFixed(2));
      
          if (!isNaN(itemTotalPrice) && typeof itemTotalPrice === 'number') {
            return total + itemTotalPrice;
          } else {
            console.error(`Invalid totalPrice for item with ID ${item.id}: ${item.totalPrice}`);
            return total; // Don't include invalid totalPrice in the sum
          }
        }, 0);
      
        return parseFloat(sum.toFixed(2)); // Round the sum to two decimal places
      },
      
    calculateSelectedItemsCount: (state) => state.selectedItems.length,
  },
  
});


// Create an instance of the store
const basketStore = useBasketStore();

// Initialize the cart from the cookie when the store is created
basketStore.initializeCartFromCookie();

export default basketStore;
