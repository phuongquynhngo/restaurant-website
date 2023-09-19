import { Order } from "../models/Order";
import { defineStore } from 'pinia';

export const useCreatedOrderStore = defineStore('createdOrder', {
  state: () => ({
    order:  null as Order | null,
  }),
  actions: {
    setOrder(newOrder: Order) {
      this.order = newOrder;
    },
    clearOrder() {
      this.order = null;
    },
  },
  getters: {
    getOrder(): Order | null  {
      return this.order;
    },
  },
});

const createdOrderStore = useCreatedOrderStore();
export default createdOrderStore;
