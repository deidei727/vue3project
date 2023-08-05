<template>
  <div class="header">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <span class="title">智慧旅游可视化大数据平台</span>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间:{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import dayjs from 'dayjs'
import {useRouter} from 'vue-router'
let router=useRouter()


let time = ref(dayjs().format('YYYY年MM月DD HH:mm:ss'))
let timer=ref(0)
const goHome=()=>{
    router.push('/home')
}

onMounted(() => {
    timer.value = setInterval(() => {
      time.value = dayjs().format('YYYY年MM月DD HH:mm:ss')
    }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height:100% ;
  display: flex;

  .left {
    flex: 1.5;
    background: url('../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;
    cursor: pointer;

    .lbtn {
      width: 150px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      float: right;
      font-size: 20px;
      background: url('../images/dataScreen-header-btn-bg-l.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .center {
    flex: 2;
    height: 74px;
    background: url('../images/dataScreen-header-center-bg.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      color: #29fcff;
      font-size: 32px;
      letter-spacing: 0.3em;
    }
  }
  .right {
    flex: 1.3;
    background: url('../images/dataScreen-header-right-bg.png') no-repeat;
    background-size: cover;
    padding: 0 50px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .rbtn {
      float: left;
      width: 150px;
      height: 50px;
      background: url('../images/dataScreen-header-btn-bg-r.png') no-repeat;
      text-align: center;
      line-height: 50px;
      color: #29fcff;
      background-size: 100% 100%;
      font-size: 20px;
     
    }
    .time {
      color: #29fcff;
      font-size: 16px;
      padding-right: 15px;
    }
  }
}
</style>
