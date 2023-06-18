<template>
    <div>
      <svg :style="{width,height}">
        <use :xlink:href='props.pre+props.name' :fill="color"></use>
      </svg>
      </div>
  </template>

<script setup lang="ts">
let props=defineProps({
    pre:{
        type:String,
        default:'#icon-',
    },
    name:{
        type: String,
        default: '',
    },
    color:{
        type: String,
        default: ''
    },
    width:{
        type: String,
        default:'16px'
    },
    height:{
        type: String,
        default:'16px'
    }

})
</script>

<style scoped>

</style>