import {defineStore} from 'pinia'
import { useStorage } from '@vueuse/core'
interface State {
  floorNum: number[]
  currentLevel: any
  busy: boolean
}
export const useStore = defineStore('state', {

  state: ():State => {
    return {
      floorNum: [],
      currentLevel: useStorage(
          '',
          1,
          localStorage,
          // {
          //   mergeDefaults: true,
          // },
      ),
      busy: false,
    }
  },

  actions: {
    pushing(value:number) {
      this.floorNum.push(value)
    },
  },

})

