import { defineStore } from 'pinia'
export const useCartShowStores = defineStore('cart-show', {
    state: () => ({ shown: false }),
})