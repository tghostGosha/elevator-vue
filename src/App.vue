<script setup lang="ts">
import {useCounterStore} from "@/stores/counter";
import type {Store} from "pinia";
let floor = useCounterStore()
const floors = [1, 2, 3, 4, 5, 6]

// const movingTime = (floorCall:number, currentFloor:number) =>{
//   if(floorCall > currentFloor) {
//     return (floorCall - currentFloor )*1000
//   }
//   if(floorCall < currentFloor) {
//     return (currentFloor - floorCall )*1000
//   }
// }
let count = 1
const moveElevator = (floorCall:number) => {
  if (count < floorCall) {
    count++
    setTimeout(()=>{
      floor.increment()
      floor.busy = true
      console.log(floor.busy)
      moveElevator(floorCall)
    }, 1000)
  }
  if(count > floorCall) {
    count--
    setTimeout(()=>{
      floor.decrease()
      floor.busy = true
      moveElevator(floorCall)
    }, 1000)
  }
  if(floorCall === floor.floorNum) {
    setTimeout(()=>{
      floor.busy = false
      console.log(floor.busy)
    }, 3000)
  }
  return count
}
</script>

<template>

<ul>
  <li v-for="item in floors" :key="item" >
    floor {{ item }}
    <button @click="moveElevator(item)" ></button>
    <transition name="slide-fade">
      <div  :class=" (!floor.busy) ? 'elevator' : 'elevator-move' "  v-if="item === floor.floorNum ">

      </div>
    </transition>

  </li>

</ul>

</template>
