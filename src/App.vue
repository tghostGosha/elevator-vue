<script setup lang="ts">
import {useCounterStore} from "@/stores/counter";
let floor = useCounterStore()
const floors = [1, 2, 3, 4, 5, 6]



// console.log(floor.floorNum, 'unique')
// let count = 1
const moveElevator = (floorCall:number) => {
  console.log(floorCall, floor.currentLevel, 'floorCall, floor.currentLevel')
  if (floor.currentLevel < floorCall) {
    floor.currentLevel++
    setTimeout(()=>{
      floor.busy = true
      moveElevator(floorCall)
    }, 1000)
  }
  if(floor.currentLevel  > floorCall) {
    floor.currentLevel--
    setTimeout(()=>{
      moveElevator(floorCall)
    }, 1000)
  }
  if(floorCall === floor.currentLevel ) {
    setTimeout(()=>{
      floor.busy = false
      console.log(floor.floorNum, 'конец')
    }, 3000)
  }
  return floor.currentLevel
}
let timer:any = null

const addTurn = (floorCall:number) => {
  // clearTimeout(timer)
  let start =  floor.floorNum.length === 0
  floor.floorNum.push(floorCall)
  console.log(floor.floorNum, 'addTurn')
  if(start) {
    goToLevel()
  }
  // timer = setTimeout(()=>{
  //   goToLevel()
  // }, 2000)

}
const goToLevel = () => {
  if(floor.floorNum.length > 0) {
    let level:number|undefined = floor.floorNum.shift()

    if(level!=undefined) {
      let stepsTimer:number=Math.abs((floor.currentLevel - level)*1000)
      console.log(level, stepsTimer, 'level')
      moveElevator(level)
      setTimeout(()=>{
        goToLevel()
      },stepsTimer+ 3000)

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
      <div  :class=" (!floor.busy) ? 'elevator' : 'elevator-move' "  v-if="item === floor.currentLevel ">

      </div>
    </transition>

  </li>

</ul>

</template>
