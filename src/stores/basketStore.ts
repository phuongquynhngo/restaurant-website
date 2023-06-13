// import { defineStore } from 'pinia';
// import Cookies from 'js-cookie';

// export const useBasketStore = defineStore('basketStore', {
//   state: () => ({
//     selectedItems: [], // Initial empty array to store the selected items
//     groupedItems: [], // Initial empty array to store the grouped items
//   }),
//   actions: {
//     addItem(item) {
//       this.selectedItems.push(item);
//       this.updateGroupedItems();
//       this.saveCartToCookie();
//     },
//     removeItem(item) {
//       const index = this.selectedItems.findIndex((el) => el.id === item.id);// find the index of the item based on its unique identifier
//       if (index !== -1) { //Check if the item was found in the selectedItems array.
//         this.selectedItems.splice(index, 1);
//         this.updateGroupedItems();
//         this.saveCartToCookie();
//       }
//     },
//     clearItems() {
//       this.selectedItems = [];
//       this.groupedItems = [];
//       this.saveCartToCookie();
//     },
//     updateGroupedItems() { // this.groupedItems is updated based on the items in this.selectedItems 
//         //by using the reduce method and a reducer function that performs the necessary grouping and accumulation logic.
//       this.groupedItems = this.selectedItems.reduce((accumulator, item) => { //Use the reduce method on the selectedItems array to iterate over each item and accumulate the grouped items.
//         const existingItem = accumulator.find((el) => el.id === item.id); //find method with el represents the current element being processed in the array.


//         //update an existing item in the accumulator array or add a new item. 

//         if (existingItem) {
//           // update quantity and totalPrice properties of existingItem.
//           existingItem.quantity++;
//           existingItem.totalPrice += item.price;

//         } else { //no existing item in accumulator is found
//           const newItem = {  // create newItem  with the necessary properties (including quantity and totalPrice) 
//             ...item,
//             quantity: 1,
//             totalPrice: parseFloat(item.price.toFixed(2)),
//           };
//           accumulator.push(newItem); //push newItem to the accumulator.
//         }

//         return accumulator;
//       }, []);//The empty array [] is used as the initial value for the accumulator array. 
  
//     },
//     saveCartToCookie() {
//         Cookies.set('cart', JSON.stringify(this.updateGroupedItems));
//       },
//       initializeCartFromCookie() {
//         const cartData = Cookies.get('cart');
//         if (cartData) {
//           this.selectedItems = JSON.parse(cartData);
//           this.updateGroupedItems();
//         }
//       },
//   },
//   getters: {
//     getSelectedItems: (state) => state.selectedItems,
//     getGroupedItems: (state) => state.groupedItems,
//     calculateTotalSum: (state) => {
//       const sum = state.groupedItems.reduce(
//         (total, item) => total + parseFloat(item.totalPrice.toFixed(2)), //round the sum to two decimal places and then convert it to a floating-point number
//         0
//       );
//       return parseFloat(sum.toFixed(2));
//     },
//     calculateSelectedItemsCount: (state) => state.selectedItems.length,
//   },
  
// });


// // Create an instance of the store
// const basketStore = useBasketStore();

// // Initialize the cart from the cookie when the store is created
// basketStore.initializeCartFromCookie();

// export default basketStore;

import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useBasketStore = defineStore('basketStore', {
  state: () => ({
    selectedItems: [],
    groupedItems: [],
  }),
  actions: {
    addItem(item) {
      this.selectedItems.push(item);
      this.updateGroupedItems();
      this.saveCartToCookie();
    },
    removeItem(item) {
      const index = this.selectedItems.findIndex((el) => el.id === item.id);
      if (index !== -1) {
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
      this.groupedItems = this.selectedItems.reduce((accumulator, item) => {
        const existingItem = accumulator.find((el) => el.id === item.id);

        if (existingItem) {
          existingItem.quantity++;
          existingItem.totalPrice += item.price;
        } else {
          const newItem = {
            ...item,
            quantity: 1,
            totalPrice: parseFloat(item.price.toFixed(2)),
          };
          accumulator.push(newItem);
        }

        return accumulator;
      }, []);
    },
    saveCartToCookie() {
      Cookies.set('cart', JSON.stringify(this.selectedItems));
    },
    initializeCartFromCookie() {
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
      }
      
  },
  getters: {
    getSelectedItems: (state) => state.selectedItems,
    getGroupedItems: (state) => state.groupedItems,
    calculateTotalSum: (state) => {
      const sum = state.groupedItems.reduce(
        (total, item) => total + parseFloat(item.totalPrice.toFixed(2)),
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
