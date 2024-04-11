<script setup lang="ts">
import {useStore} from "@/stores/stateStore";
import {createPinia} from "pinia";

const props = defineProps({
  count: {
    type: Number,
    default: ''
  }
})

const pinia = createPinia()
const state = useStore(pinia)

const moveElevator = (floorCall:number) => {
  if(floorCall === state.currentLevel ) {
    setTimeout(()=>{
      if(state.floorNum.length!=0) {
        goToLevel()
      } else {
        state.busy = false
      }
    }, 3000)
  } else {
    state.busy = true
    state.currentLevel+=(state.currentLevel < floorCall) ? 1 : -1

    setTimeout(()=> {
      moveElevator(floorCall)
    }, 1000)
  }

  return state.currentLevel
}
const goToLevel = () => {
  if(state.floorNum.length > 0) {
    let level:number|undefined = state.floorNum.shift()

    if(level!=undefined) {
      moveElevator(level)
    }
  }
}
const addTurn = (floorCall:number) => {
  if(state.floorNum.length === 0 || state.floorNum.at(-1)!= floorCall) {
    // state.pushing(floorCall)
    state.floorNum.push(floorCall)
    if(!state.busy) {
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
        <div  :class="(!state.busy) ? 'elevator' : 'elevator-move'" v-if="item === state.currentLevel"/>

      </transition>
    </li>
  </ul>
</template>
