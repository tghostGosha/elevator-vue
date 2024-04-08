import { defineStore } from 'pinia'

export const useCounterStore = defineStore('floor', {
  state: () => {
    return { floorNum: 1, busy: false }
  },
  actions: {
    increment() {
      this.floorNum++
    },
    decrease () {
      this.floorNum--
    }

  },
})
