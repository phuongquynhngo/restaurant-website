import { defineStore } from 'pinia';
export const useIsSmallScreenStore = defineStore('is-small-screen', {
    state: () => ({ smallScreen: false as boolean  | false }),
})