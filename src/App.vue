<script setup lang="ts">
import {useCounterStore} from "@/stores/counter";
let floor = useCounterStore()
const floors = [1, 2, 3, 4, 5, 6]
const floors2 = [1, 2, 3, 4, 5, 6]

const moveElevator = (floorCall:number) => {
  if(floorCall === floor.currentLevel ) {
    setTimeout(()=>{
      if(floor.floorNum.length!=0) {
        goToLevel()
      } else {
        floor.busy = false
      }
    }, 3000)
  } else {
    floor.busy = true
    floor.currentLevel+=(floor.currentLevel < floorCall) ? 1 : -1
    setTimeout(()=> {
      moveElevator((floorCall))
    }, 1000)
  }
  return floor.currentLevel
}
const addTurn = (floorCall:number) => {
  floor.floorNum.push(floorCall)
  console.log(floor.floorNum, 'addTurn')
  if(!floor.busy) {
    goToLevel()
  }
}
const goToLevel = () => {
  if(floor.floorNum.length > 0) {
    let level:number|undefined = floor.floorNum.shift()

    if(level!=undefined) {
      moveElevator(level)
    }
  }
}
</script>

<template>
<ul>
  <li v-for="item in floors" :key="item" >
    floor {{ item }}
    <button @click="addTurn(item)" ></button>
    <transition name="slide-fade">
      <div  :class=" (!floor.busy) ? 'elevator' : 'elevator-move' "  v-if="item === floor.currentLevel "/>
    </transition>
  </li>
</ul>
  <ul>
    <li v-for="item in floors2" :key="item" >
      floor {{ item }}
      <button @click="addTurn(item)" ></button>
      <transition name="slide-fade">
        <div  :class=" (!floor.busy) ? 'elevator' : 'elevator-move' "  v-if="item === floor.currentLevel "/>
      </transition>
    </li>
  </ul>
</template>
