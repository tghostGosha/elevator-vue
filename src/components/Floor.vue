<script setup lang="ts">
// import {useStore} from "@/stores/stateStore";
// import {createPinia} from "pinia";

import {onMounted, reactive, ref} from "vue";

const props = defineProps({
  count: {
    type: Number,
    default: ''
  }
})
interface IState {
  floorNum: number[]
  currentLevel: number
  busy: boolean
}
const local = parseInt(localStorage.getItem('floorNumber'))
const stateElevator = reactive<IState>({
  floorNum: [],
  currentLevel: 1,
  busy: false
})

const addToLocalStorage = (value)=>{
  localStorage.setItem('floorNumber', value)
}
// const pinia = createPinia()
// const state = useStore(pinia)

const moveElevator = (floorCall:number) => {
  if(floorCall === stateElevator.currentLevel ) {
    setTimeout(()=>{
      if(stateElevator.floorNum.length!=0) {
        goToLevel()
      } else {
        stateElevator.busy = false
        addToLocalStorage(stateElevator.currentLevel)
        console.log(local, 'local')
      }
    }, 3000)
  } else {
    stateElevator.busy = true
    stateElevator.currentLevel+=(stateElevator.currentLevel < floorCall) ? 1 : -1

    console.log(stateElevator.currentLevel, 'new level')

    setTimeout(()=> {
      moveElevator(floorCall)
    }, 1000)
  }
  console.log(stateElevator.currentLevel, 'конечный уровень')
  return stateElevator.currentLevel
}
const goToLevel = () => {
  if(stateElevator.floorNum.length > 0) {
    let level:number|undefined = stateElevator.floorNum.shift()

    if(level!=undefined) {
      moveElevator(level)
    }
  }
}
const addTurn = (floorCall:number) => {
  if(stateElevator.floorNum.length === 0 || stateElevator.floorNum.at(-1)!= floorCall) {
    // state.pushing(floorCall)
    stateElevator.floorNum.push(floorCall)
    console.log(stateElevator.floorNum)
    if(!stateElevator.busy) {
      goToLevel()
    }
  }
}


</script>

<template>
  <ul>
    <li v-for="item in props.count" :key="item" >
      floor {{item}}
      <button @click="addTurn(item)" ></button>

      <transition name="slide-fade">
        <div  :class="(!stateElevator.busy) ? 'elevator' : 'elevator-move'" v-if="item === stateElevator.currentLevel"/>

      </transition>
    </li>
  </ul>
</template>
