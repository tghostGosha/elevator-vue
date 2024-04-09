import {defineStore} from 'pinia'
interface State {
  floorNum: number[]
  currentLevel: number
  busy: boolean
}
export const useCounterStore = defineStore('floor', {
  state: ():State => {
    return { floorNum: [], currentLevel: 1, busy: false }
  },
  // getters: {
  //   sortFloors: (state) => {
  //     state.floorNum = state.floorNum.reduce((acc: any, item) => {
  //       if (acc.includes(item)) {
  //         return acc;
  //       }
  //       return [...acc, item];
  //     }, [])
  //   }
  // },

  // actions: {
  //   increment() {
  //     this.floorNum[0]+=1
  //   },
  //   decrease () {
  //     this.floorNum[0]-=1
  //   }
  //
  // },
})
